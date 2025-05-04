import { useQuery } from "@tanstack/react-query";
import { useDraftTemplatesStore } from "../draft-templates.provider";
import { useParams } from "next/navigation";

export const useFetchTemplate = () => {
  const { id } = useParams();

  const store = useDraftTemplatesStore();
  const { isLoading, isError } = useQuery({
    queryKey: ["template", id],
    queryFn: async () => {
      const url = `http://localhost:8080/api/templates/${id}`;
      const res = await fetch(url);
      const template = await res.json();
      store.send({ type: "fetchSingleTemplateSuccess", template });
      return template;
    },
  });
  return { isLoading, isError };
};
