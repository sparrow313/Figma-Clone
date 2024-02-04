import React, { useCallback } from "react";
import LiveCursor from "@/components/cursor/LiveCursor";
import { useOthers, useMyPresence } from "@/liveblocks.config";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresense] = useMyPresence() as any;

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresense({ cursor: { x, y } });
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    updateMyPresense({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresense({ cursor: { x, y }, message: null });
  }, []);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="border-2 border-green-500 h-[100vh] w-full flex justify-center items-center"
    >
      <h1 className="text-2xl text-white">Live Block Figma Clone</h1>
      <LiveCursor others={others} />
    </div>
  );
};

export default Live;
