import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "@xstate/store/react";
import { useDraftTemplatesStore } from "./draft-templates.provider";
import { useRef } from "react";

export const useCreateTemplate = () => {
  const store = useDraftTemplatesStore();
  const templateName = useSelector(
    store,
    (state) => state.context.inputTemplateName
  );
  const websiteUrl = useSelector(
    store,
    (state) => state.context.inputWebsiteUrl
  );
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      abortControllerRef.current = new AbortController();
      const url = `http://localhost:8080/api/templates`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: templateName,
          websiteUrl,
        }),
        signal: abortControllerRef.current.signal,
      });
      if (!res.ok) {
        throw new Error("Failed to create template");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ exact: true, queryKey: ["templates"] });
      store.send({ type: "changeTemplateDialogOpened", open: false });
    },
    onSettled: () => {
      abortControllerRef.current = null;
    },
  });

  const cancel = () => {
    abortControllerRef.current?.abort();
  };
  return { createTemplate: mutate, isPending, cancel };
};
