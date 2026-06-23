"use client";
import { useAuth } from "@/app/providers";
import { useRef, useContext, useState } from "react";
import { AuthContext } from "@/app/providers";

export default function MySketchList() {
  const { user } = useAuth();
  const ref = useRef<HTMLDialogElement>(null);
  const dialogModalRef = useRef<HTMLDialogElement>(null);
  const { sketches, deleteSketch, loadSketches, setCode } = useContext(AuthContext);
  const [currentDeleteSketchData, setCurrentDeleteSketchData] = useState<{
    title: string;
    id: string;
  } | null>(null);

  return user ? (
    <>
      <button
        className="btn btn-sm"
        onClick={() => ref.current?.showModal()}
      >
        My Sketches
      </button>
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">My Sketches</h3>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sketches).map(([sketchId, sketch]) => (
                <tr key={sketchId}>
                  <td>
                    <button
                      className="underline btn btn-ghost"
                      onClick={() => {
                        loadSketches(sketchId).then((res) => {
                          if (res && res.success) {
                            ref.current?.close();
                            setCode(res.code);
                          }
                        });
                      }}>
                      {sketch.title}
                    </button>
                  </td>
                  <td>{new Date(sketch.modifiedAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => {
                        setCurrentDeleteSketchData({ title: sketch.title, id: sketchId });
                        dialogModalRef.current?.showModal();
                      }}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog ref={dialogModalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <p className="py-4">
            本当に以下のスケッチデータを削除して良いですか？
          </p>
          <div>
            <p>{currentDeleteSketchData?.title}</p>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              <button
                className="btn btn-error"
                onClick={() => {
                  if (currentDeleteSketchData) {
                    deleteSketch(currentDeleteSketchData.id);
                  }
                }}
              >
                削除
              </button>
              <button className="btn">
                キャンセル
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  ) : null
}