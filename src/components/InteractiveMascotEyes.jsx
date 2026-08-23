import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Bot, Eye, Heart, MessageSquare } from "lucide-react";

export function InteractiveMascotEyes({ report }) {
  const containerRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  const [leftPupil, setLeftPupil] = useState({ x: 0, y: 0 });
  const [rightPupil, setRightPupil] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [speechBubble, setSpeechBubble] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const startupTitle = report?.idea?.title || "your startup";
  const viabilityScore = report?.comparison?.validationScore || 88;

  const mascotThoughts = [
    `I'm keeping both eyes on ${startupTitle}'s competitors! 👀`,
    `Viability score is ${viabilityScore}/100! Looking solid! 🚀`,
    `Move your cursor around—I love following your moves! ✨`,
    `8 autonomous agents just validated your venture! 🤖`,
    `Need a budget plan? Ask our AI Advisor in the chat tab! 💬`,
    `Defensibility moat looks strong! Keep building! 🛡️`
  ];

  // Mouse tracking for eyes
  useEffect(() => {
    const handlePointerMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const calcPupilOffset = (eyeEl) => {
        if (!eyeEl) return { x: 0, y: 0 };
        const rect = eyeEl.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.hypot(deltaX, deltaY);

        // Maximum travel distance within eye socket
        const maxOffset = 11;
        const offset = Math.min(maxOffset, distance / 18);

        return {
          x: Math.cos(angle) * offset,
          y: Math.sin(angle) * offset
        };
      };

      if (leftEyeRef.current) {
        setLeftPupil(calcPupilOffset(leftEyeRef.current));
      }
      if (rightEyeRef.current) {
        setRightPupil(calcPupilOffset(rightEyeRef.current));
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4200);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleMascotClick = () => {
    setClickCount((prev) => prev + 1);
    const nextThought = mascotThoughts[(clickCount + 1) % mascotThoughts.length];
    setSpeechBubble(nextThought);

    // Auto-hide speech bubble after 4 seconds
    setTimeout(() => {
      setSpeechBubble((current) => (current === nextThought ? null : current));
    }, 4500);
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-end relative pt-12 pb-0 overflow-hidden select-none"
    >
      {/* Speech / Thought Bubble */}
      {speechBubble && (
        <div className="mb-3 px-4 py-2 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-xl border border-slate-700 animate-bounce flex items-center gap-2 z-20 max-w-sm text-center">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 animate-spin" />
          <span>{speechBubble}</span>
        </div>
      )}

      {/* Interactive Mascot Peeking Container */}
      <div
        onClick={handleMascotClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer group transition-transform duration-300 transform hover:scale-105 active:scale-95"
        title="Click me to chat!"
      >
        {/* Mascot SVG Vector Character (Fluffy Dark Bunny Peeking from Bottom) */}
        <svg
          viewBox="0 0 320 220"
          className="w-56 sm:w-72 h-auto drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Fur gradient */}
            <radialGradient id="mascotFur" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#242731" />
              <stop offset="70%" stopColor="#13151b" />
              <stop offset="100%" stopColor="#090a0d" />
            </radialGradient>

            {/* Ear inner shadow */}
            <linearGradient id="earInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1c23" />
              <stop offset="100%" stopColor="#0d0e12" />
            </linearGradient>

            {/* Eye Sclera Gradient */}
            <radialGradient id="scleraGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>

            {/* Pupil Gradient with Deep Indigo Glow */}
            <radialGradient id="pupilGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Subtle glow filter */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Ear */}
          <path
            d="M 100 130 C 80 50, 45 20, 85 10 C 120 5, 135 60, 130 120 Z"
            fill="url(#mascotFur)"
            className="transition-transform duration-500 origin-bottom group-hover:-rotate-3"
          />
          <path
            d="M 95 110 C 82 55, 65 35, 85 25 C 105 20, 118 55, 115 105 Z"
            fill="url(#earInner)"
            opacity="0.6"
          />

          {/* Right Ear */}
          <path
            d="M 220 130 C 240 50, 275 20, 235 10 C 200 5, 185 60, 190 120 Z"
            fill="url(#mascotFur)"
            className="transition-transform duration-500 origin-bottom group-hover:rotate-3"
          />
          <path
            d="M 225 110 C 238 55, 255 35, 235 25 C 215 20, 202 55, 205 105 Z"
            fill="url(#earInner)"
            opacity="0.6"
          />

          {/* Devil / Playful Little Tail on the Right */}
          <g className="transition-transform duration-300 origin-bottom-left group-hover:rotate-12">
            <path
              d="M 245 160 Q 285 130, 275 95 Q 270 80, 280 75"
              fill="none"
              stroke="#13151b"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <polygon
              points="280,60 295,80 268,82"
              fill="#13151b"
            />
          </g>

          {/* Main Body (Fluffy Peeking Head) */}
          <ellipse
            cx="160"
            cy="185"
            rx="105"
            ry="85"
            fill="url(#mascotFur)"
          />

          {/* Cute Fluffy Cheeks */}
          <circle cx="95" cy="180" r="30" fill="#13151b" opacity="0.4" />
          <circle cx="225" cy="180" r="30" fill="#13151b" opacity="0.4" />

          {/* Left Eye Socket */}
          <g
            ref={leftEyeRef}
            transform="translate(125, 160)"
            className="transition-transform duration-75"
            style={{
              transformOrigin: "125px 160px",
              transform: isBlinking ? "scaleY(0.08)" : "scaleY(1)"
            }}
          >
            {/* Sclera (Eyeball) */}
            <ellipse
              cx="0"
              cy="0"
              rx="24"
              ry="26"
              fill="url(#scleraGrad)"
              stroke="#090a0d"
              strokeWidth="2"
            />

            {/* Pupil (Follows Cursor) */}
            <g transform={`translate(${leftPupil.x}, ${leftPupil.y})`}>
              <circle
                cx="0"
                cy="0"
                r="13"
                fill="url(#pupilGrad)"
              />
              {/* Primary Specular Highlight */}
              <circle
                cx="-4"
                cy="-4"
                r="4.5"
                fill="#ffffff"
              />
              {/* Secondary Specular Highlight */}
              <circle
                cx="4"
                cy="4"
                r="2"
                fill="#ffffff"
                opacity="0.8"
              />
            </g>
          </g>

          {/* Right Eye Socket */}
          <g
            ref={rightEyeRef}
            transform="translate(195, 160)"
            className="transition-transform duration-75"
            style={{
              transformOrigin: "195px 160px",
              transform: isBlinking ? "scaleY(0.08)" : "scaleY(1)"
            }}
          >
            {/* Sclera (Eyeball) */}
            <ellipse
              cx="0"
              cy="0"
              rx="24"
              ry="26"
              fill="url(#scleraGrad)"
              stroke="#090a0d"
              strokeWidth="2"
            />

            {/* Pupil (Follows Cursor) */}
            <g transform={`translate(${rightPupil.x}, ${rightPupil.y})`}>
              <circle
                cx="0"
                cy="0"
                r="13"
                fill="url(#pupilGrad)"
              />
              {/* Primary Specular Highlight */}
              <circle
                cx="-4"
                cy="-4"
                r="4.5"
                fill="#ffffff"
              />
              {/* Secondary Specular Highlight */}
              <circle
                cx="4"
                cy="4"
                r="2"
                fill="#ffffff"
                opacity="0.8"
              />
            </g>
          </g>

          {/* Cute Tiny Nose / Snout */}
          <ellipse cx="160" cy="188" rx="5" ry="3.5" fill="#334155" />
        </svg>

        {/* Floating Interactive Badge */}
        <div className="absolute -top-2 right-4 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-indigo-300 border border-slate-700/60 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
          <Eye className="w-3 h-3 text-indigo-400" />
          <span>Tracking cursor</span>
        </div>
      </div>

      {/* Decorative Bottom Baseline Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
    </div>
  );
}
