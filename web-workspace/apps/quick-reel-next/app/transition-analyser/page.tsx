import { Input } from "@/components/ui/input";
import { Ui } from "./ui";
import { VideoForm } from "./video-form";

export default function TransitionAnalyserPage() {
  return (
    <div className="h-screen flex flex-col">
      {/* <Ui /> */}
      <h1 className="text-center text-2xl">Transition Analyser</h1>

      <section className="bg-black flex-grow shrink-0"></section>
      <section className="h-64 shrink-0">
        <VideoForm />
      </section>
    </div>
  );
}
