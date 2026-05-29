"use client"

import { useState } from "react";

export default function Fullscreen({
  iframeRef,
}: Readonly<{
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}>) {
  const [alert, setAlert] = useState<string | null>(null);

  const fullscreen = async () => {
    if (!iframeRef.current) return;
    if (typeof iframeRef.current.requestFullscreen === "function") {
      await iframeRef.current.requestFullscreen();
    } else {
      setAlert("このブラウザはフルスクリーンに対応していません。");
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return <>
    <button className="btn btn-primary" onClick={fullscreen}>
      Full Screen
    </button>
    {alert &&
      <div
        role="alert"
        className="alert alert-error alert-soft w-[90%] fixed top-20 z-50 opacity-90 left-1/2 -translate-x-1/2 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{alert}</span>
      </div>
    }
  </>
}