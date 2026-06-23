"use client"
import { useRef } from "react";
import { simple, ocean } from "@/presets/basic";
import { clock } from "@/presets/advanced";
import { useContext } from "react";
import { AuthContext } from "@/app/providers";

const presets = [
  simple, ocean, clock
]

export default function Presets({
  setCode,
  setTitle
}: Readonly<{
  setCode: (code: string) => void;
  setTitle: (title: string) => void;
}>) {
  const ref = useRef<HTMLDialogElement>(null);
  const { setCurrentSketch } = useContext(AuthContext);
  return (
    <>
      <button className="btn btn-primary" onClick={() => {
        if (ref.current) {
          ref.current.showModal();
        }
      }}>
        Presets
      </button>
      <dialog
        ref={ref}
        id="presets_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Presets</h3>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>内容</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {presets.map((preset, index) => (
                <tr key={index}>
                  <td>{preset.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                        setCode(preset.code);
                        setTitle(preset.description);
                        setCurrentSketch(null);
                        if (ref.current) {
                          ref.current.close();
                        }
                      }}
                    >
                      Load
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
    </>
  )
}