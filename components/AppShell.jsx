"use client";

import { useState } from "react";
import Loader from "./Loader";
import Cursor from "./Cursor";

export default function AppShell({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Cursor />
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {children}
      </div>
    </>
  );
}
