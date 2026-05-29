"use client"

export default function Preview({
  iframeRef,
  className = "",
}: Readonly<{
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  className?: string;
}>) {
  return (
    <iframe
      ref={iframeRef}
      title="preview"
      sandbox="allow-scripts allow-same-origin"
      allow="fullscreen"
      className={`w-full aspect-square max-h-100 border ${className}`}
    />
  );
}