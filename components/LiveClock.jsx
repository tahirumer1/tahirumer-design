"use client";

import { useState, useEffect } from "react";

export default function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts = { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d));
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);
  return <span>{time}</span>;
}
