import { useEffect, useRef, useState } from "react";

function Timer({
  duration = 30,
  onTimeUp,
  questionKey,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const onTimeUpRef = useRef(onTimeUp);
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    setTimeLeft(duration);
    hasExpiredRef.current = false;

    const timerId = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timerId);

          if (!hasExpiredRef.current) {
            hasExpiredRef.current = true;
            setTimeout(() => {
              onTimeUpRef.current?.();
            }, 0);
          }

          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [duration, questionKey]);

  const progress = Math.max(0, (timeLeft / duration) * 100);

  let timerStatus = "normal";

  if (timeLeft <= 10) {
    timerStatus = "danger";
  } else if (timeLeft <= 20) {
    timerStatus = "warning";
  }

  return (
    <div className={`timer timer-${timerStatus}`}>
      <div className="timer-header">
        <span className="timer-label">⏱️ Time Remaining</span>

        <span className="timer-count">
          00:{String(timeLeft).padStart(2, "0")}
        </span>
      </div>

      <div
        className="timer-track"
        role="progressbar"
        aria-label="Time remaining"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={timeLeft}
      >
        <div
          className="timer-progress"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default Timer;