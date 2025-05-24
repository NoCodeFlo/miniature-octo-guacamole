'use client';

import React, { useRef, useState } from 'react';

const SEGMENTS = [
  'Hannsi', 'Flowsi', 'Gemeinsam', 'Hannsi',
  'Flowsi', 'Gemeinsam', 'Hannsi', 'Flowsi',
];
const COLORS = [
  '#EF4444', '#3B82F6', '#22C55E', '#F87171',
  '#60A5FA', '#4ADE80', '#F87171', '#60A5FA',
];

const SIZE = 300; // SVG viewBox size
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 10;

function getCoordinatesForAngle(angle: number, radius = RADIUS) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export default function SpinningWheel() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Choose a random segment (0..7)
    const segmentIdx = Math.floor(Math.random() * SEGMENTS.length);

    // Number of full spins (for visual effect)
    const fullSpins = 5 * 360;
    // Offset so that the winning segment lands at the pointer (top, i.e. -90deg)
    const segmentAngle = 360 / SEGMENTS.length;
    const randomRotation = segmentIdx * segmentAngle + segmentAngle / 2;
    const targetRotation = fullSpins + (360 - randomRotation);

    // Spin with CSS transition
    setRotation(targetRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(SEGMENTS[segmentIdx]);
    }, 4000); // Duration should match CSS transition
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Who Will Be Cooking Tonight? 👩‍🍳👨‍🍳</h1>
      <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
        {/* Pointer */}
        <svg
          width={SIZE}
          height={30}
          style={{ position: 'absolute', top: -30, left: 0, zIndex: 2, pointerEvents: 'none' }}
        >
          <polygon
            points={`${CENTER - 15},30 ${CENTER + 15},30 ${CENTER},2`}
            fill="#111"
          />
        </svg>
        {/* Wheel */}
        <svg
          ref={wheelRef}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{
            transition: spinning
              ? 'transform 3.8s cubic-bezier(0.25, 1, 0.3, 1)'
              : undefined,
            transform: `rotate(${rotation}deg)`,
            borderRadius: '50%',
            boxShadow: '0 2px 24px #0001',
            background: '#fff',
          }}
        >
          {/* Wheel segments */}
          {SEGMENTS.map((label, i) => {
            const startAngle = (360 / SEGMENTS.length) * i;
            const endAngle = startAngle + 360 / SEGMENTS.length;

            const start = getCoordinatesForAngle(startAngle);
            const end = getCoordinatesForAngle(endAngle);

            // Large arc flag is always 0 since 360/8 < 180
            const d = [
              `M ${CENTER} ${CENTER}`,
              `L ${start.x} ${start.y}`,
              `A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`,
              'Z',
            ].join(' ');

            // Label angle (middle of wedge)
            const textAngle = startAngle + (360 / SEGMENTS.length) / 2;

            const labelPos = getCoordinatesForAngle(textAngle, RADIUS * 0.65);

            return (
              <g key={i}>
                <path
                  d={d}
                  fill={COLORS[i]}
                  stroke="#fff"
                  strokeWidth={2}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={18}
                  fill="#fff"
                  fontWeight="bold"
                  style={{
                    userSelect: 'none',
                    transform: `rotate(0deg)`,
                  }}
                >
                  {label}
                </text>
              </g>
            );
          })}
          {/* Outer border */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={7}
          />
        </svg>
      </div>
      <button
        className="bg-black text-white py-2 px-6 rounded-full text-lg mt-10 hover:bg-gray-800 disabled:opacity-50 transition"
        style={{ minWidth: 160 }}
        onClick={spin}
        disabled={spinning}
      >
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
      {result && (
        <div className="mt-8 text-2xl font-semibold">
          <span className="mr-2">🎉</span>
          {result} will be cooking tonight!
        </div>
      )}
    </div>
  );
}