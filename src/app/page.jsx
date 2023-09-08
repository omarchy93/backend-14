import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row gap-4">
      <div>
        <Link href={"/login"}>
          <button className="btn btn-accent">Login page</button>
        </Link>
      </div>
      <div>
        <Link href={"/dashboard"}>
          {" "}
          <button className="btn btn-accent">Dashboard page</button>
        </Link>
      </div>
    </div>
  );
}
