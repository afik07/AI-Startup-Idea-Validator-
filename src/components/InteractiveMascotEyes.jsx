import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

export function InteractiveMascotEyes({ report }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const [speechBubble, setSpeechBubble] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const startupTitle = report?.idea?.title || "your startup";
  const viabilityScore = report?.comparison?.validationScore || 88;

  const mascotThoughts = [
    `I'm keeping both eyes on ${startupTitle}! 👀`,
    `Viability Score: ${viabilityScore}/100! 🚀`,
    `Move your cursor—I'm tracking your every move! ✨`,
    `8 autonomous AI agents audited this venture! 🤖`,
    `Ask anything in the AI Advisor Chat tab! 💬`,
    `Defensibility moat looks strong! Keep building! 🛡️`
  ];

  // 1:1 Canvas pupil tracking engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationFrameId;
    let isBlinking = false;
    let blinkProgress = 0;

    const handlePointerMove = (e) => {
      mousePos = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", handlePointerMove);

    // Periodic natural blinking
    let blinkTimer;
    const scheduleNextBlink = () => {
      blinkTimer = setTimeout(() => {
        isBlinking = true;
        blinkProgress = 0;
      }, 3800 + Math.random() * 2000);
    };
    scheduleNextBlink();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasRect = canvas.getBoundingClientRect();
      if (canvasRect.width === 0 || canvasRect.height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Exact pixel centers of the white eyeball spheres on the 3D bunny body (2880 x 1264 space)
      // Left eye: (1400, 1234), socket radius: 42px, pupil radius: 17.5px (Confirmed Perfect!)
      // Right eye: (1502, 1220), socket radius: 43px, pupil radius: 17.5px (Shifted further left)
      const eyes = [
        { x: 1400, y: 1234, radius: 42, pupilRadius: 17.5, maxOffset: 11 },
        { x: 1502, y: 1220, radius: 43, pupilRadius: 17.5, maxOffset: 11 }
      ];

      // Blink animation
      if (isBlinking) {
        blinkProgress += 0.16;
        if (blinkProgress >= 1) {
          isBlinking = false;
          blinkProgress = 0;
          scheduleNextBlink();
        }
      }

      const blinkScale = isBlinking ? Math.max(0.05, 1 - Math.sin(blinkProgress * Math.PI) * 0.95) : 1;

      eyes.forEach((eye) => {
        // Screen coordinates of the eye center
        const screenEyeX = canvasRect.left + (eye.x / canvas.width) * canvasRect.width;
        const screenEyeY = canvasRect.top + (eye.y / canvas.height) * canvasRect.height;

        const deltaX = mousePos.x - screenEyeX;
        const deltaY = mousePos.y - screenEyeY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.hypot(deltaX, deltaY);

        // Smooth offset strictly contained in socket
        const offset = Math.min(eye.maxOffset, distance / 35);
        const pupilX = eye.x + Math.cos(angle) * offset;
        const pupilY = eye.y + Math.sin(angle) * offset;

        ctx.save();
        ctx.translate(eye.x, eye.y);
        ctx.scale(1, blinkScale);
        ctx.translate(-eye.x, -eye.y);

        // Strict circular clip inside the 3D white sphere boundary
        ctx.save();
        ctx.beginPath();
        ctx.arc(eye.x, eye.y, eye.radius - 3, 0, Math.PI * 2);
        ctx.clip();

        // 1. Black Eyeball Pupil
        ctx.beginPath();
        ctx.arc(pupilX, pupilY, eye.pupilRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#08090c";
        ctx.fill();

        // 2. Primary White Specular Gleam
        ctx.beginPath();
        ctx.arc(pupilX - 4.5, pupilY - 4.5, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // 3. Secondary Soft Specular Catchlight
        ctx.beginPath();
        ctx.arc(pupilX + 4.5, pupilY + 4, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();

        ctx.restore();

        // Eyelid line during blink
        if (isBlinking && blinkScale < 0.4) {
          ctx.beginPath();
          ctx.arc(eye.x, eye.y, eye.radius, 0, Math.PI);
          ctx.lineWidth = 5;
          ctx.strokeStyle = "#101216";
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(blinkTimer);
    };
  }, []);

  const handleMascotClick = () => {
    setClickCount((prev) => prev + 1);
    const nextThought = mascotThoughts[(clickCount + 1) % mascotThoughts.length];
    setSpeechBubble(nextThought);

    setTimeout(() => {
      setSpeechBubble((current) => (current === nextThought ? null : current));
    }, 4500);
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-end relative pt-0 pb-0 -mt-6 sm:-mt-10 select-none"
    >
      {/* Speech / Thought Bubble */}
      {speechBubble && (
        <div className="mb-2 px-4 py-2 rounded-2xl bg-slate-950 text-white text-xs font-bold shadow-2xl border border-slate-700 animate-bounce flex items-center gap-2 z-30 max-w-sm text-center">
          <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0 animate-spin" />
          <span>{speechBubble}</span>
        </div>
      )}

      {/* Mascot Stage Container */}
      <div
        onClick={handleMascotClick}
        className="relative w-full max-w-xl h-60 sm:h-68 flex items-end justify-center cursor-pointer select-none group overflow-hidden"
        title="Click me!"
      >
        {/* Soft Ambient Floor Shadow */}
        <div className="absolute bottom-0 w-72 h-5 bg-slate-950/20 rounded-full blur-xl -z-10"></div>

        {/* Scaled Wrapper Matching Authentic Proportion */}
        <div className="relative w-[1000px] sm:w-[1150px] aspect-[2880/1264] origin-bottom transform scale-[2.7] sm:scale-[2.95] translate-y-1 sm:translate-y-2 flex items-end justify-center pointer-events-none">
          {/* Authentic Transparent Video Body */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            src="https://vida-web-assets.einsia.com/_astro/bunny-body-hevc-alpha.Cl1HdgWc.mov"
          />

          {/* 1:1 Canvas Overlay rendering glossy pupils inside the white eyeball spheres */}
          <canvas
            ref={canvasRef}
            width={2880}
            height={1264}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
          />
        </div>
      </div>

      {/* Baseline Divider Line */}
      <div className="w-full h-[1px] bg-slate-200"></div>
    </div>
  );
}
