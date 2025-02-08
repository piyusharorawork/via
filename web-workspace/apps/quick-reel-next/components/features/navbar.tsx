import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddUserIcon } from "@/components/features/icons";
import Link from "next/link";

export const Navbar = () => {
  return (
    <section id="navbar flex flex-col">
      <main className="h-12 flex items-center justify-between mx-4">
        <Link href="/">
          <Button variant="link">
            <span className="text-xl">Quick Reel</span>
          </Button>
        </Link>
        <Button variant="link">
          <AddUserIcon />
          <span>Signup</span>
        </Button>
      </main>
      <Separator className="bg-gray-600" />
    </section>
  );
};
