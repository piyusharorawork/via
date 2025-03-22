import { projectStore } from "@/store/project.store";
import { useQuery } from "@tanstack/react-query";

export const useLayers = () => {
  useQuery({ queryKey: ["layers"], queryFn: fetchLayers });
};

const fetchLayers = async () => {
  const res = await fetch("http://localhost:8080/layers");
  const layers = await res.json();
  projectStore.send({ type: "setLayers", layers });
  return layers;
};
