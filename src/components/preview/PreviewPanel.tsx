"use client";

import { useEffect, useRef, useState } from "react";
import { ResumeData } from "@/app/types/resume";
import ResumeDocument from "./ResumeDocument";

interface Props {
  data: ResumeData;
}

const RESUME_WIDTH = 794;

export default function PreviewPanel({ data }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [docHeight, setDocHeight] = useState(1123);

  // Recompute scale when wrapper is resized
  useEffect(() => {
    const updateScale = () => {
      if (!wrapperRef.current) return;
      const available = wrapperRef.current.offsetWidth - 32; // 16px padding each side
      setScale(Math.min(1, available / RESUME_WIDTH));
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  // Track actual resume document height (content can grow/shrink)
  useEffect(() => {
    if (!docRef.current) return;
    const ro = new ResizeObserver((entries) => {
      setDocHeight(entries[0].contentRect.height);
    });
    ro.observe(docRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="py-8 px-4 min-h-full flex justify-center">
      {/* Outer box sized to the scaled dimensions so scroll works correctly */}
      <div
        style={{
          width: RESUME_WIDTH * scale,
          height: docHeight * scale,
          flexShrink: 0,
        }}
      >
        <div
          ref={docRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="shadow-xl"
        >
          <ResumeDocument data={data} />
        </div>
      </div>
    </div>
  );
}
