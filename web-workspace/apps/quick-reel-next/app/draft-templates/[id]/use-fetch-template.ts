import { useQuery } from "@tanstack/react-query";
import { useDraftSingleTemplateStore } from "./draft-single-template.provider";
import { useParams } from "next/navigation";

export const useFetchTemplate = () => {
  const { id } = useParams();

  const store = useDraftSingleTemplateStore();
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
