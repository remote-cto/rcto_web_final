"use client";

import { cn } from "../../lib/utils";
import GridPattern from "../../components/ui/grid-pattern";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CoolMode } from "../../components/ui/cool-mode";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
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
      x: number;
      y: number;
      size: number;
      baseSize: number;

      speedX: number;
      speedY: number;
      color: string;
      baseColor: string;
      canvas: HTMLCanvasElement;

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

const Carousel = ({ children }: { children: React.ReactNode[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = React.Children.count(children);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child) => (
            <div className="w-full flex-shrink-0">{child}</div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-8 sm:left-12 md:left-16 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 sm:p-3 backdrop-blur-sm z-10 shadow-md transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 sm:right-12 md:right-16 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 sm:p-3 backdrop-blur-sm z-10 shadow-md transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const BannerPage = ({
  remoteCTOWayRef,
}: {
  remoteCTOWayRef: React.RefObject<HTMLDivElement>;
}) => {
  const scrollToLearnMore = () => {
    remoteCTOWayRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="font-mono overflow-hidden relative">
      <section className="bg-gray-100 relative z-10">
        <ParticleBackground />
        <Navbar />

        <div className="mx-auto lg:min-h-screen flex items-center">
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <Carousel>

               <div className="py-8 sm:py-12 md:py-16">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 md:space-x-12 mb-4">
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-4/5 sm:w-2/5 mx-auto sm:mx-0"
                  >
                    <div className="relative">
                      <Image
                        src="/images/design.png"
                        alt="Remote CTO"
                        width={500}
                        height={500}
                        className="rounded-lg object-contain"
                        style={{ maxWidth: "100%", height: "auto" }}
                        priority
                      />
                    </div>
                  </motion.div>

                  <div className="w-full sm:w-3/5 text-center sm:text-left px-4 sm:px-0">
                    <motion.h1
                      className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-thin"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <span className="whitespace-nowrap font-['Agrandir-GrandLight'] text-black tracking-wider">
                        Leave the
                      </span>{" "}
                      <br />
                      <span className="relative whitespace-nowrap font-['Agrandir-GrandLight'] text-black bg-clip-text tracking-wider">
                        tech
                        <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-yellow-500"></span>
                      </span>{" "}
                      <span className="text-black font-['Agrandir-GrandLight']">
                        to us
                      </span>
                    </motion.h1>
                    <div className="mt-6 sm:mt-8 flex justify-center sm:justify-start">
                      <Link href="/tc">
                        <button
                          type="button"
                          className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base sm:text-lg px-5 sm:px-6 py-2 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Image
                            src="/images/Logo.png"
                            alt="icon"
                            width={24}
                            height={24}
                            className="mr-2"
                          />
                          Discover How
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>







 <div className="py-8 sm:py-12 md:py-16">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 md:space-x-12 mb-4">
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-4/5 sm:w-2/5 mx-auto sm:mx-0"
                  >
                    <div className="relative">
                      <Image
                        src="/images/Ideathon.png"
                        alt="Global Ideathon"
                        width={600}
                        height={600}
                        className="rounded-lg object-contain"
                        style={{ maxWidth: "100%", height: "auto" }}
                        priority
                      />
                    </div>
                  </motion.div>

                  <div className="w-full sm:w-3/5 text-center sm:text-left px-4 sm:px-0">
                    <motion.h1
                      className="text-xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <span className="whitespace-nowrap font-['Agrandir-GrandLight'] text-black tracking-wider fon-bold">
                        The Remote CTO
                      </span>{" "}
                      <br />
                      <span className="relative whitespace-nowrap font-['Agrandir-GrandLight'] text-black bg-clip-text tracking-wider">
                        Insider Circle
                        <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-yellow-500"></span>
                      </span>
                    </motion.h1>
                    <motion.p
                      className="text-sm sm:text-base md:text-lg mt-4 text-gray-700 max-w-lg mx-auto sm:mx-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                     Early Insights, Expert Guidance & Priority Access to Solutions
                    </motion.p>
                    <div className="mt-6 sm:mt-8 flex justify-center sm:justify-start">
                      <Link href="/ic">
                        <button
                          type="button"
                          className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base sm:text-lg px-5 sm:px-6 py-2 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Image
                            src="/images/Ideathon.png"
                            alt="icon"
                            width={24}
                            height={24}
                            className="mr-2"
                          />
                          Know More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>











              <div className="py-8 sm:py-12 md:py-16">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 md:space-x-12 mb-4">
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-4/5 sm:w-2/5 mx-auto sm:mx-0"
                  >
                    <div className="relative">
                      <Image
                        src="/images/Ideathon.png"
                        alt="Global Ideathon"
                        width={600}
                        height={600}
                        className="rounded-lg object-contain"
                        style={{ maxWidth: "100%", height: "auto" }}
                        priority
                      />
                    </div>
                  </motion.div>

                  <div className="w-full sm:w-3/5 text-center sm:text-left px-4 sm:px-0">
                    <motion.h1
                      className="text-xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <span className="whitespace-nowrap font-['Agrandir-GrandLight'] text-black tracking-wider fon-bold">
                        The Remote CTO
                      </span>{" "}
                      <br />
                      <span className="relative whitespace-nowrap font-['Agrandir-GrandLight'] text-black bg-clip-text tracking-wider">
                        Global Ideathon
                        <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-yellow-500"></span>
                      </span>
                    </motion.h1>
                    <motion.p
                      className="text-sm sm:text-base md:text-lg mt-4 text-gray-700 max-w-lg mx-auto sm:mx-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      A Global call for early-stage startups and anyone with big
                      ideas but no team to build them.
                    </motion.p>
                    <div className="mt-6 sm:mt-8 flex justify-center sm:justify-start">
                      <Link href="/ideathon">
                        <button
                          type="button"
                          className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base sm:text-lg px-5 sm:px-6 py-2 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Image
                            src="/images/Ideathon.png"
                            alt="icon"
                            width={24}
                            height={24}
                            className="mr-2"
                          />
                          Know More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

             
            </Carousel>
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
