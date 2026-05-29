"use client";
import { useState, useRef } from "react";
import Editor from "../Editor";
import Preview from "../Preview";
import { createPreviewHtml } from "@/functions/Base";
import { initialCode } from "@/functions/Settings";
import Fullscreen from "./Fullscreen";
import Presets from "./Presets";


export default function Playground() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState(initialCode);

  const run = () => {
    if (!iframeRef.current) return;
    iframeRef.current.srcdoc = createPreviewHtml(code);
  };

  return (
    <div className="w-full p-2">
      <div className="flex gap-2 m-4">
        <button className="btn btn-accent" onClick={run}>
          Run
        </button>
        <Fullscreen iframeRef={iframeRef} />
        <Presets setCode={setCode} />
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <Editor code={code} setCode={setCode} className="flex-1 min-w-0" />
        <Preview iframeRef={iframeRef} className="flex-1 min-w-0" />
      </div>
    </div>
  );
}
