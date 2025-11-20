// Enhanced scroll effects configuration and utilities

export interface ScrollEffectConfig {
  threshold: number;
  duration: number;
  easing: string;
}

export const SCROLL_EFFECTS = {
  section: {
    threshold: 0.15,
    duration: 900,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  card: {
    threshold: 0.2,
    duration: 700,
    easing: "ease-out",
  },
  text: {
    threshold: 0.25,
    duration: 600,
    easing: "ease-out",
  },
  image: {
    threshold: 0.1,
    duration: 800,
    easing: "ease-out",
  },
} as const;

export const addScrollObserver = (
  element: HTMLElement | null,
  callback: (isVisible: boolean) => void,
  threshold = 0.1
): (() => void) => {
  if (!element) return () => {};

  const observer = new IntersectionObserver(
    ([entry]) => {
      callback(entry.isIntersecting);
    },
    { threshold }
  );

  observer.observe(element);

  return () => {
    observer.unobserve(element);
  };
};

export const addScrollParallax = (
  element: HTMLElement | null,
  speed = 0.5
): (() => void) => {
  if (!element) return () => {};

  const handleScroll = () => {
    const rect = element.getBoundingClientRect();
    const scroll = window.scrollY;
    const yOffset = rect.top + scroll;

    const offset = (scroll - yOffset) * speed;
    element.style.transform = `translateY(${offset}px)`;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
};

export const addScrollFade = (
  element: HTMLElement | null,
  minOpacity = 0.3
): (() => void) => {
  if (!element) return () => {};

  const handleScroll = () => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementHeight = rect.height;

    // Calculate position in viewport
    let opacity = 1;
    if (rect.top > viewportHeight) {
      opacity = minOpacity;
    } else if (rect.bottom < 0) {
      opacity = minOpacity;
    } else {
      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const ratio = visibleHeight / elementHeight;
      opacity = minOpacity + (1 - minOpacity) * ratio;
    }

    element.style.opacity = opacity.toString();
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initial call
  return () => window.removeEventListener("scroll", handleScroll);
};

export const addScrollScale = (
  element: HTMLElement | null,
  minScale = 0.95
): (() => void) => {
  if (!element) return () => {};

  const handleScroll = () => {
    const rect = element.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const viewport = window.innerHeight / 2;

    let scale = 1;
    if (Math.abs(center - viewport) < viewport) {
      const distance = Math.abs(center - viewport);
      scale = 1 - (distance / viewport) * (1 - minScale);
    } else {
      scale = minScale;
    }

    element.style.transform = `scale(${scale})`;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initial call
  return () => window.removeEventListener("scroll", handleScroll);
};

export const addScrollRotate = (
  element: HTMLElement | null,
  maxRotation = 10
): (() => void) => {
  if (!element) return () => {};

  const handleScroll = () => {
    const rect = element.getBoundingClientRect();
    const viewport = window.innerHeight;
    const progress = 1 - Math.max(0, Math.min(1, rect.top / viewport));

    const rotation = progress * maxRotation;
    element.style.transform = `rotateZ(${rotation}deg)`;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initial call
  return () => window.removeEventListener("scroll", handleScroll);
};
