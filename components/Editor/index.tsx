"use client"

import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { githubLight } from "@uiw/codemirror-theme-github";

export default function Editor({
  code = "",
  className = "",
  setCode = () => {},
}: Readonly<{
  code: string;
  className?: string;
  setCode: (code: string) => void;
}>) {
  return (
    <div
      className={`${className}`}
    >
      <CodeMirror
        value={code}
        height="480px"
        width="100%"
        style={{
          width: "100%",
        }}
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => setCode(value)}
        theme={githubLight}
        className="border"
      />
    </div>
  );
}