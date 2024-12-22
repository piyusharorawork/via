import { Button } from "../components/button.component.tsx";
import { Separator } from "../components/separator.component.tsx";
import { AddUserIcon } from "./icons.tsx";

export default function Navbar() {
  return (
    <section id="navbar flex flex-col">
      <main className="h-12 flex items-center justify-between mx-4">
        <h1 className="text-xl">Reelify</h1>
        <Button variant="link">
          <AddUserIcon />
          <span>Signup</span>
        </Button>
      </main>
      <Separator className="bg-gray-600" />
    </section>
  );
}
