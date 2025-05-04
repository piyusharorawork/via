import { useQuery } from "@tanstack/react-query";
import { useDraftTemplatesStore } from "./draft-templates.provider";
import { DraftTemplatesState } from "./draft-templates.store";

export const useFetchTemplates = () => {
  const store = useDraftTemplatesStore();
  const { isLoading, isError } = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8080/api/templates");
      const templates = await res.json();
      store.send({ type: "fetchTemplatesSuccess", templates });
      return templates;
    },
  });

  return { isLoading, isError };
};
