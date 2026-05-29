"use client"

import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"

export default function Editor({
  code = "",
  setCode = () => {},
}: Readonly<{
  code: string;
  setCode: (code: string) => void;
}>) {
  return (
    <CodeMirror
      value={code}
      height="100%"
      extensions={[javascript({ jsx: true })]}
      onChange={(value) => setCode(value)}
    />
  );
}