'use client';

import { useRef, useState } from 'react';

const names = ['Hannsi', 'Flowsi', 'Hannsi', 'Flowsi', 'Hannsi', 'Flowsi', 'Hannsi', 'Flowsi'];

export default function Who() {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);

  const spin = () => {
    if (spinning) return;

    setSpinning(true);

    // Spin at least 3 full turns, then land randomly in 8 slices
    const fullRotations = 3 * 360;
    const randomOffset = Math.floor(Math.random() * 8) * 45;
    const totalRotation = fullRotations + randomOffset;

    const nextAngle = angle + totalRotation;

    setAngle(nextAngle);

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 3.5s cubic-bezier(0.25, 1, 0.3, 1)';
      wheelRef.current.style.transform = `rotate(${nextAngle}deg)`;
    }

    setTimeout(() => setSpinning(false), 3500);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Who Will Be Cooking Tonight? 👩‍🍳👨‍🍳</h1>

      <div className="relative w-[300px] h-[300px] rounded-full border-[10px] border-gray-200 mb-8">
        <div
          ref={wheelRef}
          className="absolute inset-0 rounded-full origin-center"
          style={{ transition: 'transform 0s' }}
        >
          {names.map((name, i) => {
            const rotation = i * 45;
            return (
              <div
                key={i}
                className="absolute w-1/2 h-1/2 left-1/2 top-1/2 origin-left rotate-[--angle]"
                style={{
                  transform: `rotate(${rotation}deg) translateX(-50%)`,
                  transformOrigin: 'left center',
                }}
              >
                <div
                  className={`text-sm text-white font-semibold text-center py-1 px-2 rounded-full ${
                    name === 'Hannsi' ? 'bg-red-400' : 'bg-blue-400'
                  }`}
                  style={{
                    transform: 'rotate(-22.5deg) translateX(80px)',
                    display: 'inline-block',
                    width: '80px',
                  }}
                >
                  {name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Spinner pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-transparent border-b-black" />
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="bg-black text-white py-2 px-6 rounded-full text-lg hover:bg-gray-800 disabled:opacity-50 transition"
      >
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
    </div>
  );
}