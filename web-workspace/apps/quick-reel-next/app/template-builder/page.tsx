import { Separator } from "@/components/ui/separator";
import { NoTemplatesMessage } from "./components/no-templates-message";
import { CreateNewTemplateButton } from "./components/create-new-template-button";
import { TemplateList } from "./components/template-list";

export default function TemplateBuilderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 items-center px-6 justify-between">
        <h1 className="text-2xl font-bold">Template Builder</h1>
        <CreateNewTemplateButton />
      </header>
      <Separator />
      <main className="grow relative">
        <NoTemplatesMessage />
        <TemplateList />
      </main>
    </div>
  );
}
