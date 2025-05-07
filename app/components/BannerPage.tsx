"use client";

import { cn } from "../../lib/utils";
import GridPattern from "../../components/ui/grid-pattern";
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CoolMode } from "../../components/ui/cool-mode";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handle window resize and set initial size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Update mouse position
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    // Also track touch for mobile devices
    const updateTouchPosition = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("touchmove", updateTouchPosition);
    window.addEventListener("touchstart", updateTouchPosition);

    // Particle class
    class Particle {
      canvas: HTMLCanvasElement;
      x: number;
      y: number;
      baseSize: number;
      size: number;
      speedX: number;
      speedY: number;
      baseColor: string;
      color: string;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;

        // Smaller base size for small screens
        const scaleFactor = Math.min(1, canvas.width / 1000);
        this.baseSize = (Math.random() * 2 + 0.5) * scaleFactor;
        this.size = this.baseSize;

        // Slower speed for small screens
        const speedFactor = Math.min(1, canvas.width / 1000);
        this.speedX = (Math.random() * 2 - 1) * speedFactor;
        this.speedY = (Math.random() * 2 - 1) * speedFactor;

        this.baseColor = `rgba(255, 255, 255, ${Math.random() * 0.4})`;
        this.color = this.baseColor;
      }

      update() {
        if (!this.canvas) return;

        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Screen wrapping
        if (this.x > this.canvas.width) this.x = 0;
        else if (this.x < 0) this.x = this.canvas.width;

        if (this.y > this.canvas.height) this.y = 0;
        else if (this.y < 0) this.y = this.canvas.height;

        // React to mouse - adjust interaction distance based on screen size
        const interactionRadius = Math.min(100, this.canvas.width / 8);
        const mouseX = mousePosition.current.x;
        const mouseY = mousePosition.current.y;
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < interactionRadius) {
          // Particles grow and brighten as mouse approaches, but less on small screens
          const growFactor = Math.min(1, this.canvas.width / 1000);
          const scale =
            1 +
            ((interactionRadius - distance) / interactionRadius) * growFactor;
          this.size = this.baseSize * scale;

          // Push particles away from mouse slightly, less force on small screens
          const angle = Math.atan2(dy, dx);
          const forceFactor = Math.min(1, this.canvas.width / 1000);
          const force =
            ((interactionRadius - distance) / interactionRadius) *
            0.2 *
            forceFactor;
          this.x += Math.cos(angle) * force;
          this.y += Math.sin(angle) * force;

          // Change color to a light blue glow near mouse
          const glow = Math.min(
            1,
            (interactionRadius - distance) / interactionRadius
          );
          this.color = `rgba(120, 190, 255, ${0.2 + glow * 0.5})`;
        } else {
          // Return to base size and color when away from mouse
          this.size = this.baseSize;
          this.color = this.baseColor;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles - fewer for smaller screens
    const particlesArray: Particle[] = [];
    const baseParticleCount = 300;
    const screenSizeFactor = Math.min(
      1,
      (canvas.width * canvas.height) / (1920 * 1080)
    );
    const numberOfParticles = Math.max(
      50,
      Math.floor(baseParticleCount * screenSizeFactor)
    );

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas));
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);

        // Draw lines between nearby particles - shorter max distance on small screens
        const lineMaxDistance = Math.min(100, canvas.width / 10);

        // Limit number of connections on smaller screens for performance
        const connectionLimit = canvas.width < 768 ? 3 : particlesArray.length;
        let connections = 0;

        for (let j = i; j < particlesArray.length; j++) {
          if (connections >= connectionLimit) break;

          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < lineMaxDistance) {
            connections++;
            ctx.beginPath();

            // Check if either particle is near mouse for line color
            const mouseX = mousePosition.current.x;
            const mouseY = mousePosition.current.y;
            const interactionRadius = Math.min(100, canvas.width / 8);
            const dist1 = Math.sqrt(
              (particlesArray[i].x - mouseX) ** 2 +
                (particlesArray[i].y - mouseY) ** 2
            );
            const dist2 = Math.sqrt(
              (particlesArray[j].x - mouseX) ** 2 +
                (particlesArray[j].y - mouseY) ** 2
            );

            if (dist1 < interactionRadius || dist2 < interactionRadius) {
              // Brighter blue lines near mouse
              ctx.strokeStyle = `rgba(120, 190, 255, ${
                0.15 - distance / (lineMaxDistance * 5)
              })`;
              ctx.lineWidth = 0.5;
            } else {
              // Normal white lines elsewhere, thinner on mobile
              const lineOpacity = canvas.width < 768 ? 0.05 : 0.1;
              ctx.strokeStyle = `rgba(255, 255, 255, ${
                lineOpacity - distance / (lineMaxDistance * 10)
              })`;
              ctx.lineWidth = canvas.width < 768 ? 0.3 : 0.5;
            }

            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("touchmove", updateTouchPosition);
      window.removeEventListener("touchstart", updateTouchPosition);
    };
  }, [windowSize.width, windowSize.height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

// Banner content for the carousel
const bannerContents = [
  {
    id: 1,
    heading1: "Leave the",
    heading2: "tech",
    heading3: "to us",
    image: "/images/design.png",
    buttonText: "Discover How",
    buttonLink: "/tc",
  },
  {
    id: 2,
    heading1: "Scale your",
    heading2: "vision",
    heading3: "effortlessly",
    image: "/images/design.png",
    buttonText: "Learn More",
    buttonLink: "/marathon",
  },
];

interface CarouselSlideProps {
  content: {
    id: number;
    heading1: string;
    heading2: string;
    heading3: string;
    image: string;
    buttonText: string;
    buttonLink: string;
  };
  isActive: boolean;
  direction: number;
}

// Individual Carousel Slide Component with enhanced animations
const CarouselSlide: React.FC<CarouselSlideProps> = ({
  content,
  isActive,
  direction,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction > 0 ? 300 : -300,
        scale: 0.85,
      }}
      animate={{
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : direction > 0 ? -300 : 300,
        scale: isActive ? 1 : 0.85,
      }}
      exit={{
        opacity: 0,
        x: direction > 0 ? -300 : 300,
        scale: 0.85,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
      }}
      className="absolute top-0 left-0 w-full h-full flex items-center"
    >
      <div className="mx-auto max-w-5xl w-full px-4 h-full flex flex-col justify-center">
        <div className="flex flex-row items-center justify-center space-x-4 sm:space-x-8 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-1/2 sm:w-2/5"
          >
            <div className="relative">
              <Image
                src={content.image}
                alt="Remote CTO"
                width={500}
                height={500}
                className="rounded-lg object-contain"
                style={{ maxWidth: "100%", height: "auto" }}
                priority
              />
            </div>
          </motion.div>

          <div className="w-1/2 sm:w-3/5">
            <motion.h1
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-thin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="whitespace-nowrap font-['Agrandir-GrandLight'] text-black tracking-wider">
                {content.heading1}
              </span>{" "}
              <br />
              <motion.span
                className="relative whitespace-nowrap font-['Agrandir-GrandLight'] text-black bg-clip-text tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {content.heading2}
                <motion.span
                  className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-yellow-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{ transformOrigin: "left" }}
                ></motion.span>
              </motion.span>{" "}
              <motion.span
                className="text-black font-['Agrandir-GrandLight']"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {content.heading3}
              </motion.span>
            </motion.h1>
          </div>
        </div>
        <CoolMode>
          <motion.div
            className="mt-10 mb-5 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link href={content.buttonLink}>
              <button
                type="button"
                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-xl rounded-lg text-lg px-6 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src="/images/Logo.png"
                  alt="icon"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                {content.buttonText}
              </button>
            </Link>
          </motion.div>
        </CoolMode>
      </div>
    </motion.div>
  );
};

interface BannerPageProps {
  remoteCTOWayRef: React.RefObject<HTMLDivElement>;
}

const BannerPage: React.FC<BannerPageProps> = ({ remoteCTOWayRef }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Auto rotate carousel
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoplay) {
      interval = setInterval(() => {
        setDirection(1);
        setActiveSlide((prev) => (prev + 1) % bannerContents.length);
      }, 3000); 
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setDirection(index > activeSlide ? 1 : -1);
    setActiveSlide(index);
    setIsAutoplay(false); 

   
    setTimeout(() => setIsAutoplay(true), 5000);
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % bannerContents.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 5000);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveSlide((prev) =>
      prev === 0 ? bannerContents.length - 1 : prev - 1
    );
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 5000);
  };

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTouchStart(null);
  };

  return (
    <div className="font-mono overflow-hidden relative">
      <section className="bg-gray-100 mb-10 relative z-10">
        <ParticleBackground />
        <Navbar />
        <div
          className="mx-auto lg:min-h-screen flex items-center relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel slides with AnimatePresence for smooth transitions */}
          <AnimatePresence initial={false} mode="wait">
            {bannerContents.map(
              (content, index) =>
                activeSlide === index && (
                  <CarouselSlide
                    key={content.id}
                    content={content}
                    isActive={activeSlide === index}
                    direction={direction}
                  />
                )
            )}
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-all duration-300"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center z-30">
            {bannerContents.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="mx-1 relative h-2 w-8 rounded-full transition-all duration-300 overflow-hidden"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="absolute inset-0 bg-gray-300"></span>
                {activeSlide === index && (
                  <motion.span
                    className="absolute inset-0 bg-blue-600"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: isAutoplay ? [0, 1] : 1,
                    }}
                    transition={{
                      duration: isAutoplay ? 5 : 0.3,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "opacity-85",
            "[mask-image:radial-gradient(400px_circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0))]",
            "inset-x-0 inset-y-[-20%] h-[150%] skew-y-6"
          )}
          style={{
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
          }}
        />
      </section>
    </div>
  );
};

export default BannerPage;
