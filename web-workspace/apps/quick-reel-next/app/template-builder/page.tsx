import { PlusIcon } from "@/components/features/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NoTemplatesMessage } from "./no-templates-message";

export default function TemplateBuilderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 items-center px-6 justify-between">
        <h1 className="text-2xl font-bold">Template Builder</h1>
        <Button className="flex">
          <PlusIcon />
          <span>Create New</span>
        </Button>
      </header>
      <Separator />
      <main className="grow relative">
        <NoTemplatesMessage />
      </main>
    </div>
  );
}
