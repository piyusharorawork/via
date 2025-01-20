import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Preview } from "./preview";

export default function Home() {
  return (
    <section className="h-screen flex flex-col">
      <h1 className="text-center">Home</h1>
      <div className="flex gap-2 items-center">
        <Button>Click Me</Button>
        <Link href="/about">About</Link>
      </div>
      <Preview />
    </section>
  );
}
