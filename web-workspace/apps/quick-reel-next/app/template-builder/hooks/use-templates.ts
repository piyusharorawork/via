import { useQuery } from "@tanstack/react-query";
import { useTemplateBuilderStore } from "../store/template-builder.provider";

export const useTemplates = () => {
  const store = useTemplateBuilderStore();
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
