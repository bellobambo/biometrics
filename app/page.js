import Image from "next/image";
import Login from "./Components/Login";

export default function Home() {
  return (
    <div>
      <button className="btn btn-accent">Accent</button>
      <Login />
    </div>
  );
}
