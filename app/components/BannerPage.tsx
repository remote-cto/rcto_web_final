"use client";

import { cn } from "../../lib/utils";
import GridPattern from "../../components/ui/grid-pattern";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CoolMode } from "../../components/ui/cool-mode";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    // Handle window resize and set initial size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
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
        mousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
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
          const scale = 1 + ((interactionRadius - distance) / interactionRadius) * growFactor;
          this.size = this.baseSize * scale;

          // Push particles away from mouse slightly, less force on small screens
          const angle = Math.atan2(dy, dx);
          const forceFactor = Math.min(1, this.canvas.width / 1000);
          const force = ((interactionRadius - distance) / interactionRadius) * 0.2 * forceFactor;
          this.x += Math.cos(angle) * force;
          this.y += Math.sin(angle) * force;

          // Change color to a light blue glow near mouse
          const glow = Math.min(1, (interactionRadius - distance) / interactionRadius);
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
    const screenSizeFactor = Math.min(1, canvas.width * canvas.height / (1920 * 1080));
    const numberOfParticles = Math.max(50, Math.floor(baseParticleCount * screenSizeFactor));

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
              ctx.strokeStyle = `rgba(120, 190, 255, ${0.15 - distance / (lineMaxDistance * 5)})`;
              ctx.lineWidth = 0.5;
            } else {
              // Normal white lines elsewhere, thinner on mobile
              const lineOpacity = canvas.width < 768 ? 0.05 : 0.1;
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity - distance / (lineMaxDistance * 10)})`;
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
      <section className="bg-gradient-to-r from-indigo-500 to-blue-500 mb-10 relative z-10">
        <ParticleBackground />
        <Navbar />
        <div className="mx-auto lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <div className="flex items-center justify-center space-x-8 mb-4">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image
                  src="/images/design.png"
                  alt="Remote CTO"
                  width={400}
                  height={400}
                  className="rounded-lg w-158 h-158"
                />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl font-extrabold sm:text-7xl font-montserrat"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span
                    className="inline-block whitespace-nowrap font-['Montserrat'] mb-2 lg:mb-5 text-white"
                    // style={{
                    //   textShadow:
                    //     "0 0 5px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.3)",
                    // }}
                  >
                    Leave the
                  </span>{" "}
                  <span
                    className="font-['Orbitron'] bg-gradient-to-r from-cyan-300 to-green-200 text-transparent bg-clip-text mb-2 lg:mb-4"
                    // style={{
                    //   textShadow:
                    //     "0 0 5px rgba(6,182,212,0.8), 0 0 10px rgba(6,182,212,0.5), 0 0 15px rgba(167,243,208,0.5)",
                    // }}
                  >
                    TECH
                  </span>{" "}
                  <span
                    className="inline-block whitespace-nowrap text-white font-['Montserrat'] mt-1 lg:mt-3"
                    // style={{
                    //   textShadow:
                    //     "0 0 5px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.3)",
                    // }}
                  >
                    to us
                  </span>
                </motion.h1>
              </div>
            </div>

            {/* <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            > */}
              {/* <CoolMode> */}
                <Link href="/tc">
                <button
                  type="button"
                  // onClick={scrollToLearnMore}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-xl rounded-lg text-lg px-6 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  🚀 Discover How
                </button>
                </Link>
              {/* </CoolMode> */}
            {/* </motion.div> */}
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
