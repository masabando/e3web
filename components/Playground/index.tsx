"use client";
import { useState, useRef } from "react";
import Editor from "../Editor";
import Preview from "../Preview";
import { createPreviewHtml } from "@/functions/Base";
import { initialCode } from "@/functions/Settings";


export default function Playground() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState(initialCode);

  const run = () => {
    if (!iframeRef.current) return;
    iframeRef.current.srcdoc = createPreviewHtml(code);
  };
  return (
    <div>
      <div>
        <button className="btn btn-primary" onClick={run}>
          Run
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Editor code={code} setCode={setCode} />
        <Preview iframeRef={iframeRef} />
      </div>
    </div>
  );
}
