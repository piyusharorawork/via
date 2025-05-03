import { TemplateHeader } from "./template-header";

export default function SingleTemplatePage() {
  return (
    <div className="h-screen flex flex-col">
      <section className="h-[10vh] ">
        <TemplateHeader />
      </section>
      <section className="h-[45vh] bg-red-500 "></section>
      <section className="h-[45vh] bg-gray-700"></section>
    </div>
  );
}
