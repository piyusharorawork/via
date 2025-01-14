import { useStore } from "@/store/store";

export default function EditorPage() {
  const transitions = useStore((state) => state.transitions);

  return <div>Editor Page</div>;
}
