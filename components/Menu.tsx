import LoginButton from "./LoginButton";
import MySketchList from "./MySketchList";

export default function Menu() {

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">e3web</a>
      </div>
      <div className="flex gap-2">
        <MySketchList />
        <LoginButton />
      </div>
    </div>
  );
}