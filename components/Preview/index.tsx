"use client"

export default function Preview({
  iframeRef,
}: Readonly<{
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}>) {
  return (
    <iframe
      ref={iframeRef}
      title="preview"
      sandbox="allow-scripts"
      className="w-full h-96 border"
    />
  );
}