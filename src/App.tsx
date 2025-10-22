import { useState, useEffect, useRef } from "react";
import "./index.css";
import { FaRedo } from "react-icons/fa";

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Start / Stop the timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Format time: mm:ss:ms
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    // const milliseconds = Math.floor((time % 1000) / 10)
    //   .toString()
    //   .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleTap = () => setIsRunning((prev) => !prev);
  const handleReset = () => setTime(0);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white select-none">
      <div onClick={handleTap} className="text-[30vh] font-mono cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {formatTime(time)}
      </div>

      {/* Control buttons visible only when paused */}
      {!isRunning && (
        <button onClick={handleReset} className="absolute w-full bottom-0 text-white text-5xl basis-1/2 flex items-center justify-center pointer-cursor py-20">
          <FaRedo />
        </button>
      )}
    </div>
  );
}
