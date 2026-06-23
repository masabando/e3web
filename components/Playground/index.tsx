"use client";
import { useState, useRef } from "react";
import Editor from "../Editor";
import Preview from "../Preview";
import { createPreviewHtml } from "@/functions/Base";
import Fullscreen from "./Fullscreen";
import Presets from "./Presets";
import Save from "./Save";
import { useContext } from "react";
import { AuthContext } from "@/app/providers";


export default function Playground() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { sketches, currentSketch, code, setCode, title, setTitle } = useContext(AuthContext);
  const titleModalRef = useRef<HTMLDialogElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

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
        <Presets setCode={setCode} setTitle={setTitle} />
        <Save code={code} title={title} />
      </div>
      <div className="mb-2">
        <button
          className="btn btn-ghost"
          onClick={() => {
            if (titleInputRef.current) {
              titleInputRef.current.value = title;
            }
            titleModalRef.current?.showModal();
          }}
        >
          {currentSketch ? sketches[currentSketch]?.title : title}
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <Editor code={code} setCode={setCode} className="flex-1 min-w-0" />
        <Preview iframeRef={iframeRef} className="flex-1 min-w-0" />
      </div>
      <dialog ref={titleModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">プロジェクトタイトルの変更</h3>
          <input
            type="text"
            defaultValue={title}
            className="input input-bordered w-full"
            ref={titleInputRef}
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary" onClick={() => {
                setTitle(titleInputRef.current?.value || title);
              }}>
                変更
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
