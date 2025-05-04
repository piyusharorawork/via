import { Separator } from "@/components/ui/separator";
import { NoTemplatesMessage } from "./no-templates-message";
import { CreateNewTemplateButton } from "./create-new-template-button";
import { TemplateList } from "./template-list";

export default function DraftTemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 items-center px-6 justify-between">
        <h1 className="text-2xl font-bold">Draft Templates</h1>
        <CreateNewTemplateButton />
      </header>
      <Separator />
      <main className="grow relative px-4">
        <NoTemplatesMessage />
        <TemplateList />
      </main>
    </div>
  );
}
