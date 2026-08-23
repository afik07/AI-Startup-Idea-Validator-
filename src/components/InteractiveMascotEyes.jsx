import React, { useEffect, useRef, useState } from "react";
import { Eye, Sparkles } from "lucide-react";

export function InteractiveMascotEyes({ report }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
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

  // Eye tracking & canvas rendering engine
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

    // Periodic natural blinking (every 3.5s - 5s)
    let blinkTimer;
    const scheduleNextBlink = () => {
      blinkTimer = setTimeout(() => {
        isBlinking = true;
        blinkProgress = 0;
      }, 3500 + Math.random() * 2000);
    };
    scheduleNextBlink();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasRect = canvas.getBoundingClientRect();
      if (canvasRect.width === 0 || canvasRect.height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Base eye coordinates on the 2880 x 1264 canvas (scaled to actual dimensions)
      // Matching Vida's exact facial eye placement:
      // Left eye: (1400, 930), Right eye: (1520, 930), radius ~ 42px
      const leftEyeBase = { x: 1395, y: 940, radius: 46 };
      const rightEyeBase = { x: 1525, y: 940, radius: 46 };

      const eyes = [leftEyeBase, rightEyeBase];

      // Handle blink interpolation
      if (isBlinking) {
        blinkProgress += 0.12;
        if (blinkProgress >= 1) {
          isBlinking = false;
          blinkProgress = 0;
          scheduleNextBlink();
        }
      }

      const blinkScale = isBlinking ? Math.max(0.08, 1 - Math.sin(blinkProgress * Math.PI) * 0.92) : 1;

      eyes.forEach((eye) => {
        // Calculate screen coordinates of eye center
        const screenEyeX = canvasRect.left + (eye.x / canvas.width) * canvasRect.width;
        const screenEyeY = canvasRect.top + (eye.y / canvas.height) * canvasRect.height;

        const deltaX = mousePos.x - screenEyeX;
        const deltaY = mousePos.y - screenEyeY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.hypot(deltaX, deltaY);

        // Pupil offset calculation
        const maxOffset = 18;
        const offset = Math.min(maxOffset, distance / 24);
        const pupilX = eye.x + Math.cos(angle) * offset;
        const pupilY = eye.y + Math.sin(angle) * offset;

        // 1. Draw Sclera (White of the eye)
        ctx.save();
        ctx.translate(eye.x, eye.y);
        ctx.scale(1, blinkScale);
        ctx.translate(-eye.x, -eye.y);

        ctx.beginPath();
        ctx.arc(eye.x, eye.y, eye.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#0d0f12";
        ctx.stroke();

        // 2. Draw Pupil (Deep Black / Indigo) with clipping to stay inside sclera
        ctx.save();
        ctx.beginPath();
        ctx.arc(eye.x, eye.y, eye.radius - 2, 0, Math.PI * 2);
        ctx.clip();

        ctx.beginPath();
        const pupilRadius = 24;
        ctx.arc(pupilX, pupilY, pupilRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0f172a";
        ctx.fill();

        // 3. Primary Specular Catchlight (Gleam in the eye)
        ctx.beginPath();
        ctx.arc(pupilX - 7, pupilY - 7, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // 4. Secondary Soft Specular Catchlight
        ctx.beginPath();
        ctx.arc(pupilX + 7, pupilY + 6, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.fill();

        ctx.restore();
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
      className="w-full flex flex-col items-center justify-end relative pt-8 pb-0 overflow-hidden select-none"
    >
      {/* Speech / Thought Bubble */}
      {speechBubble && (
        <div className="mb-3 px-4 py-2 rounded-2xl bg-slate-950 text-white text-xs font-bold shadow-2xl border border-slate-700 animate-bounce flex items-center gap-2 z-30 max-w-sm text-center">
          <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0 animate-spin" />
          <span>{speechBubble}</span>
        </div>
      )}

      {/* Mascot Stage Container (Vida Style) */}
      <div
        onClick={handleMascotClick}
        className="relative w-full max-w-2xl h-56 sm:h-72 flex items-end justify-center cursor-pointer group select-none overflow-hidden"
        title="Click me to chat!"
      >
        {/* Video Body Layer (Alpha-transparent HEVC / QuickTime with fallback) */}
        <video
          ref={videoRef}
          className="absolute bottom-0 w-full max-w-md h-full object-contain pointer-events-none z-10"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          src="https://vida-web-assets.einsia.com/_astro/bunny-body-hevc-alpha.Cl1HdgWc.mov"
        />

        {/* High-Fidelity SVG Fallback Body (Renders instantly and ensures zero blank canvas) */}
        <svg
          viewBox="0 0 600 400"
          className={`absolute bottom-0 w-full max-w-md h-full object-contain pointer-events-none transition-opacity duration-500 z-0 ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <defs>
            <radialGradient id="bunnyFur" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#2c2f38" />
              <stop offset="65%" stopColor="#15171e" />
              <stop offset="100%" stopColor="#0a0b0e" />
            </radialGradient>
          </defs>

          {/* Left Ear */}
          <path
            d="M 230 250 C 180 120, 150 40, 220 20 C 270 10, 280 120, 270 230 Z"
            fill="url(#bunnyFur)"
          />
          {/* Right Ear */}
          <path
            d="M 370 250 C 420 120, 450 40, 380 20 C 330 10, 320 120, 330 230 Z"
            fill="url(#bunnyFur)"
          />

          {/* Devil Tail */}
          <path
            d="M 390 320 Q 480 280, 460 200 Q 450 170, 470 160"
            fill="none"
            stroke="#15171e"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <polygon points="470,140 495,175 450,178" fill="#15171e" />

          {/* Main Body Head */}
          <ellipse cx="300" cy="350" rx="160" ry="130" fill="url(#bunnyFur)" />
        </svg>

        {/* Interactive Eye Tracking Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={2880}
          height={1264}
          className="absolute bottom-0 w-full max-w-md h-full object-contain pointer-events-none z-20"
        />

        {/* Hover Cue Tag */}
        <div className="absolute top-2 right-12 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-teal-300 border border-slate-700/60 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 z-30">
          <Eye className="w-3 h-3 text-teal-400" />
          <span>Tracking cursor</span>
        </div>
      </div>

      {/* Decorative Bottom Baseline Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
    </div>
  );
}
