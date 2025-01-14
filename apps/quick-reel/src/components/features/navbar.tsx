import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { AddUserIcon } from "@/components/features/icons";

export const Navbar = () => {
  return (
    <section id="navbar flex flex-col">
      <main className="h-12 flex items-center justify-between mx-4">
        <Link to="/">
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
