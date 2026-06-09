"use client";
import { useAuth } from "@/app/providers";
import { useRef } from "react";

export default function MySketchList() {
  const { user } = useAuth();
  const ref = useRef<HTMLDialogElement>(null);

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

            </tbody>
          </table>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  ) : null
}