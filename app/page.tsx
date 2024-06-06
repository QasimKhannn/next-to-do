import Image from "next/image";
import ToDoList from "./to-do-list/page";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>

      {/* <ToDoList heading="Welcome to the List" /> */}
      <Link href="/to-do-list" className="cursor-pointer">
        Go to List
      </Link>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
