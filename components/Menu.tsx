import LoginButton from "./LoginButton";
import MySketchList from "./MySketchList";
import { config } from "../config";

export default function Menu() {

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
      <div className="flex-1 flex justify-start items-center gap-2">
        <a className="btn btn-ghost text-xl">e3web</a>
        <div className="text-sm text-gray-400">
          easy-three@{config.easyThree.version}
        </div>
      </div>
      <div className="flex gap-2">
        <MySketchList />
        <LoginButton />
      </div>
    </div>
  );
}