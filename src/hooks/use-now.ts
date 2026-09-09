import { useEffect, useState } from 'react';

const ONE_MINUTE = 60_000;

/** Returns the current time, refreshed periodically so day-based counters stay live. */
export function useNow(intervalMs: number = ONE_MINUTE): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
