import { useQuery } from "@tanstack/react-query";
import { useTemplateBuilderStore } from "../store/template-builder.provider";
import { useParams } from "next/navigation";

export const useTemplate = () => {
  const { id } = useParams();

  const store = useTemplateBuilderStore();
  const { isLoading, isError } = useQuery({
    queryKey: ["template", id],
    queryFn: async () => {
      const url = `http://localhost:8080/api/templates/${id}`;
      const res = await fetch(url);
      const template = await res.json();
      store.send({ type: "setTemplate", template });
      return template;
    },
  });
  return { isLoading, isError };
};
