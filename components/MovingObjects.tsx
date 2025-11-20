"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDarkMode } from "@/lib/context/DarkModeContext";

interface MovingObjectsProps {
  variant?: "hero" | "about" | "skills" | "projects" | "contact";
  density?: "low" | "medium" | "high";
  mode?: "global" | "section"; // 'global' = fixed, 'section' = absolute
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  shape: "circle" | "square" | "triangle" | "hexagon" | "star" | "diamond";
  rotation: number;
  rotationSpeed: number;
}

const MovingObjects: React.FC<MovingObjectsProps> = ({
  variant = "hero",
  density = "medium",
  mode = "global",
}) => {
  const { darkMode } = useDarkMode();
  const [particles, setParticles] = useState<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [mouseFollowerPosition, setMouseFollowerPosition] = useState({
    x: 0,
    y: 0,
  });

  // Scroll detection to pause animations during scroll
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Resume animations 150ms after scroll stops
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Particle count based on density
  const particleCount = useMemo(
    () =>
      ({
        low: 15,
        medium: 25,
        high: 40,
      }[density]),
    [density]
  );

  // Colors based on variant and theme
  const colors = useMemo(() => {
    const colorSchemes = {
      hero: darkMode
        ? ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]
        : ["#7c3aed", "#2563eb", "#059669", "#d97706", "#dc2626"],
      about: darkMode
        ? ["#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"]
        : ["#0891b2", "#7c3aed", "#059669", "#d97706"],
      skills: darkMode
        ? ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]
        : ["#2563eb", "#7c3aed", "#0891b2", "#059669", "#d97706"],
      projects: darkMode
        ? ["#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#10b981"]
        : ["#d97706", "#dc2626", "#7c3aed", "#0891b2", "#059669"],
      contact: darkMode
        ? ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#06b6d4"]
        : ["#059669", "#2563eb", "#d97706", "#7c3aed", "#0891b2"],
    };

    return colorSchemes[variant];
  }, [variant, darkMode]);

  // Shape distribution based on variant for uniqueness
  const getShapeForVariant = useMemo(
    () =>
      (index: number): Particle["shape"] => {
        const shapes: Record<string, Particle["shape"][]> = {
          hero: ["circle", "square", "triangle", "hexagon", "star"],
          about: ["circle", "diamond", "hexagon", "star"],
          skills: ["hexagon", "star", "diamond", "circle", "square"],
          projects: ["square", "triangle", "star", "diamond", "circle"],
          contact: ["circle", "hexagon", "star", "triangle", "diamond"],
        };
        const variantShapes = shapes[variant] || ["circle", "square"];
        return variantShapes[index % variantShapes.length];
      },
    [variant]
  );

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x:
          Math.random() *
          (typeof window !== "undefined" ? window.innerWidth : 1920),
        y:
          Math.random() *
          (typeof window !== "undefined" ? window.innerHeight : 1080),
        size: Math.random() * 6 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: getShapeForVariant(i),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
      });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);
  }, [particleCount, colors, variant, getShapeForVariant]);

  // Mouse movement effect with throttling
  useEffect(() => {
    let throttleTimer: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse updates to reduce re-renders
      if (throttleTimer) return;

      throttleTimer = setTimeout(() => {
        const newPosition = {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        };
        mousePositionRef.current = newPosition;
        setMouseFollowerPosition(newPosition);
        throttleTimer = undefined!;
      }, 16); // ~60fps throttling
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  // Animation loop with requestAnimationFrame for better performance
  useEffect(() => {
    let animationId: number;
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Pause animations during scrolling
      if (isScrolling) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (currentTime - lastTime >= frameInterval) {
        setParticles((prevParticles) =>
          prevParticles.map((particle) => {
            let newX = particle.x + particle.speedX;
            let newY = particle.y + particle.speedY;

            // Wrap around screen edges
            if (newX < -50) newX = window.innerWidth + 50;
            if (newX > window.innerWidth + 50) newX = -50;
            if (newY < -50) newY = window.innerHeight + 50;
            if (newY > window.innerHeight + 50) newY = -50;

            // Mouse interaction (reduced influence for smoother scrolling)
            const mouseInfluence = 0.01;
            const dx =
              mousePositionRef.current.x * window.innerWidth - particle.x;
            const dy =
              mousePositionRef.current.y * window.innerHeight - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
              // Reduced interaction radius
              newX += (dx / distance) * mouseInfluence;
              newY += (dy / distance) * mouseInfluence;
            }

            return {
              ...particle,
              x: newX,
              y: newY,
              rotation: particle.rotation + particle.rotationSpeed,
            };
          })
        );
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isScrolling]);

  const renderShape = (particle: Particle) => {
    const baseClasses = `absolute will-change-transform transition-none`;
    const style = {
      transform: `translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotation}deg)`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      opacity: particle.opacity,
      backgroundColor: particle.color,
      boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
    };

    switch (particle.shape) {
      case "circle":
        return (
          <div
            key={particle.id}
            className={`${baseClasses} rounded-full`}
            style={style}
          />
        );
      case "square":
        return (
          <div
            key={particle.id}
            className={`${baseClasses} rounded-lg`}
            style={style}
          />
        );
      case "triangle":
        return (
          <div
            key={particle.id}
            className={`${baseClasses}`}
            style={{
              transform: `translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotation}deg)`,
              width: 0,
              height: 0,
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
              backgroundColor: "transparent",
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
              opacity: particle.opacity,
            }}
          />
        );
      case "hexagon":
        return (
          <div
            key={particle.id}
            className={`${baseClasses}`}
            style={{
              ...style,
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
        );
      case "star":
        return (
          <div
            key={particle.id}
            className={`${baseClasses}`}
            style={{
              ...style,
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
        );
      case "diamond":
        return (
          <div
            key={particle.id}
            className={`${baseClasses}`}
            style={{
              ...style,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`${
        mode === "global" ? "fixed" : "absolute"
      } inset-0 pointer-events-none z-0 overflow-hidden will-change-transform`}
    >
      {/* Variant-specific animated gradient orbs */}
      {variant === "hero" && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse will-change-transform"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse will-change-transform"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-linear-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse will-change-transform"
            style={{ animationDelay: "4s" }}
          ></div>
        </>
      )}

      {variant === "about" && (
        <>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-linear-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse will-change-transform"></div>
          <div
            className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-linear-to-tr from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse will-change-transform"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-60 h-60 bg-linear-to-bl from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse will-change-transform"
            style={{ animationDelay: "6s" }}
          ></div>
        </>
      )}

      {variant === "skills" && (
        <>
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-linear-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse will-change-transform"></div>
          <div
            className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-linear-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse will-change-transform"
            style={{ animationDelay: "2.5s" }}
          ></div>
          <div
            className="absolute top-2/3 left-1/2 w-64 h-64 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse will-change-transform"
            style={{ animationDelay: "5s" }}
          ></div>
        </>
      )}

      {variant === "projects" && (
        <>
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-linear-to-br from-orange-400/15 to-red-400/15 rounded-full blur-3xl animate-pulse will-change-transform"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-linear-to-tl from-purple-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse will-change-transform"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-60 h-60 bg-linear-to-br from-cyan-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse will-change-transform"
            style={{ animationDelay: "4.5s" }}
          ></div>
        </>
      )}

      {variant === "contact" && (
        <>
          <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-linear-to-br from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse will-change-transform"></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-linear-to-tr from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse will-change-transform"
            style={{ animationDelay: "2.5s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/2 w-60 h-60 bg-linear-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse will-change-transform"
            style={{ animationDelay: "5s" }}
          ></div>
        </>
      )}

      {/* Moving particles */}
      {particles.map(renderShape)}

      {/* Variant-specific floating geometric shapes */}
      {variant === "hero" && (
        <>
          <div
            className="absolute top-20 left-20 w-16 h-16 border-2 border-purple-400/30 rotate-45 animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-40 right-32 w-12 h-12 border-2 border-blue-400/30 rounded-full animate-ping"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-32 left-40 w-20 h-8 bg-linear-to-r from-emerald-400/20 to-cyan-400/20 rounded-full animate-pulse"
            style={{ animationDuration: "5s" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-14 h-14 border-2 border-pink-400/30 rotate-12 animate-spin"
            style={{ animationDuration: "6s" }}
          ></div>
        </>
      )}

      {variant === "about" && (
        <>
          <div
            className="absolute top-1/4 right-1/4 w-12 h-12 border-2 border-cyan-400/30 rounded-full animate-ping"
            style={{ animationDuration: "3.5s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-16 h-16 border-2 border-purple-400/20 rotate-45 animate-bounce"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-10 h-10 border-2 border-emerald-400/25 rounded-lg animate-pulse"
            style={{ animationDuration: "5s" }}
          ></div>
        </>
      )}

      {variant === "skills" && (
        <>
          <div
            className="absolute top-1/3 left-1/4 w-14 h-14 border-2 border-blue-400/30 rounded-full animate-spin"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/3 w-16 h-16 border-2 border-emerald-400/25 rotate-45 animate-bounce"
            style={{ animationDuration: "3.5s" }}
          ></div>
          <div
            className="absolute top-2/3 left-1/2 w-12 h-12 bg-linear-to-r from-amber-400/20 to-orange-400/20 rounded-lg animate-pulse"
            style={{ animationDuration: "5s" }}
          ></div>
        </>
      )}

      {variant === "projects" && (
        <>
          <div
            className="absolute top-1/4 left-1/3 w-14 h-14 border-2 border-orange-400/30 rotate-12 animate-spin"
            style={{ animationDuration: "5s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-16 h-16 border-2 border-purple-400/25 rounded-full animate-bounce"
            style={{ animationDuration: "3.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-12 h-12 bg-linear-to-r from-cyan-400/15 to-emerald-400/15 rounded-lg animate-pulse"
            style={{ animationDuration: "4.5s" }}
          ></div>
        </>
      )}

      {variant === "contact" && (
        <>
          <div
            className="absolute top-1/3 right-1/3 w-14 h-14 border-2 border-emerald-400/30 rounded-lg animate-bounce"
            style={{ animationDuration: "3.5s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-12 h-12 border-2 border-blue-400/30 rotate-45 animate-spin"
            style={{ animationDuration: "4.5s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/2 w-16 h-16 bg-linear-to-r from-purple-400/15 to-pink-400/15 rounded-full animate-pulse"
            style={{ animationDuration: "5s" }}
          ></div>
        </>
      )}

      {/* Mouse follower glow */}
      <div
        className="absolute w-32 h-32 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-xl transition-all duration-300 ease-out will-change-transform"
        style={{
          left: `${mouseFollowerPosition.x * 100}%`,
          top: `${mouseFollowerPosition.y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </div>
  );
};

export default MovingObjects;
