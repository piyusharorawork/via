"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useTemplateBuilderStore } from "../store/template-builder.provider";

export const useRemoveTemplate = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const store = useTemplateBuilderStore();

  const { isPending, mutate } = useMutation({
    mutationKey: ["removeTemplate", id],
    mutationFn: async () => {
      const url = `http://localhost:8080/api/templates/${id}`;
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete template");
      }
    },
    onSuccess: () => {
      router.push("/template-builder");
      queryClient.invalidateQueries({ exact: true, queryKey: ["templates"] });
      store.send({ type: "removeTemplateSuccess" });
    },
  });

  return { isPending, deleteTemplate: mutate };
};
