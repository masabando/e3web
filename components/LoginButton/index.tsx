"use client";
import { useAuth } from "@/app/providers";
import Image from "next/image";
import defaultAvatar from "./neko_white.png";

export default function LoginButton() {
  const { user, loading, signIn, signOut } = useAuth();

  return loading ? (
    <div className="loading loading-spinner loading-md" ></div>
  ) : user ? (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
            <Image
              src={user.photoURL || defaultAvatar}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full" />
        </div>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a onClick={signOut}>Logout</a>
        </li>
      </ul>
    </div>
  ) : (
    <div className="btn btn-outline btn-sm" onClick={signIn}>
      ログイン
    </div>
  );
}