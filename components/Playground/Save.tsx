"use client"
import { useRef, useContext, useState } from "react";
import { AuthContext } from "@/app/providers";

export default function Save({
  code = "",
  title = "",
}: Readonly<{
  code: string;
  title: string;
}>) {
  const { user, currentSketch, saveSketch } = useContext(AuthContext);
  const toastRef = useRef<HTMLDivElement>(null);
  const [toastVisible, setToastVisible] = useState(false);
  return (
    <>
      <button
        className="btn btn-secondary"
        disabled={!user}
        onClick={() => {
          if (!user) return;
          saveSketch(currentSketch ? currentSketch : "", {
            code: code,
            title: title,
            modifiedAt: Date.now()
          })
            .then(() => {
              if (toastRef.current) {
                setToastVisible(true);
                setTimeout(() => {
                  if (toastRef.current) {
                    setToastVisible(false);
                  }
                }, 3000);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        保存
      </button>
      <div className="toast" hidden={!toastVisible} ref={toastRef}>
        <div className="alert alert-info">
          <span>保存しました</span>
        </div>
      </div>
    </>
  )
}