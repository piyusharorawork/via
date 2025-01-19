import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-center">Home</h1>
      <div className="flex gap-2 items-center">
        <Button>Click Me</Button>
        <Link href="/about">About</Link>
      </div>
    </>
  );
}
