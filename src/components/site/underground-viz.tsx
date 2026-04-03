"use client";

import { motion } from "framer-motion";

const UTILITY_LINES = [
  { depth: 80, color: "#eab308", label: "Gas", width: 12 },
  { depth: 140, color: "#3b82f6", label: "Water", width: 16 },
  { depth: 200, color: "#ef4444", label: "Electric", width: 10 },
  { depth: 260, color: "#f97316", label: "Telecom", width: 8 },
  { depth: 310, color: "#22c55e", label: "Sewer", width: 20 },
];

export function UndergroundViz() {
  return (
    <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#0c1220] to-[#0a0e18]">
      <svg
        viewBox="0 0 800 450"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground surface */}
        <line
          x1="0"
          y1="60"
          x2="800"
          y2="60"
          stroke="#2a3548"
          strokeWidth="2"
        />
        <text
          x="20"
          y="50"
          fill="#4b5563"
          fontSize="10"
          fontFamily="monospace"
        >
          SURFACE
        </text>

        {/* Depth markers */}
        {[1, 2, 3, 4, 5].map((d) => (
          <g key={`depth-${d}`}>
            <line
              x1="0"
              y1={60 + d * 70}
              x2="800"
              y2={60 + d * 70}
              stroke="#1a2233"
              strokeWidth="0.5"
              strokeDasharray="4 8"
            />
            <text
              x="760"
              y={55 + d * 70}
              fill="#2a3548"
              fontSize="8"
              fontFamily="monospace"
            >
              {d}m
            </text>
          </g>
        ))}

        {/* Scan beams from rover */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {[340, 370, 400, 430, 460].map((x, i) => (
            <motion.line
              key={`beam-${x}`}
              x1={x}
              y1="40"
              x2={x - 20 + i * 10}
              y2="420"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeOpacity="0.12"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.15, duration: 1.5 }}
            />
          ))}
        </motion.g>

        {/* Utility pipes */}
        {UTILITY_LINES.map((utility, i) => (
          <motion.g
            key={utility.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 + i * 0.25, duration: 0.8 }}
          >
            {/* Confidence halo */}
            <ellipse
              cx="400"
              cy={60 + utility.depth}
              rx="130"
              ry={utility.width + 6}
              fill={utility.color}
              opacity="0.04"
            />
            {/* Pipe line */}
            <motion.line
              x1="120"
              y1={60 + utility.depth}
              x2="680"
              y2={60 + utility.depth}
              stroke={utility.color}
              strokeWidth={utility.width / 4}
              strokeLinecap="round"
              opacity="0.7"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 + i * 0.25, duration: 1.2 }}
            />
            {/* Label */}
            <motion.text
              x="695"
              y={64 + utility.depth}
              fill={utility.color}
              fontSize="10"
              fontFamily="monospace"
              opacity="0.8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6 + i * 0.25, duration: 0.6 }}
            >
              {utility.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Rover silhouette */}
        <motion.g
          initial={{ y: -15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <rect
            x="370"
            y="22"
            width="60"
            height="14"
            rx="3"
            fill="#1c1c22"
          />
          <rect
            x="378"
            y="14"
            width="44"
            height="8"
            rx="2"
            fill="#18181d"
          />
          <circle cx="376" cy="39" r="5" fill="#0a0a0e" />
          <circle cx="424" cy="39" r="5" fill="#0a0a0e" />
          <rect
            x="386"
            y="37"
            width="28"
            height="2.5"
            rx="1"
            fill="#3b82f6"
            opacity="0.8"
          />
          {/* Sensor mast */}
          <rect
            x="398"
            y="6"
            width="2"
            height="8"
            rx="1"
            fill="#3a3a40"
          />
          <circle cx="399" cy="4" r="3" fill="#1a1a1e" />
        </motion.g>
      </svg>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0c1220] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0e18] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0e18] to-transparent" />
    </div>
  );
}
