import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDraftTemplatesStore } from "./draft-templates.provider";
import { useCreateTemplate } from "./use-create-template";
import { Loader2 } from "lucide-react";

export const CreateTemplateForm = () => {
  const store = useDraftTemplatesStore();

  return (
    <span className="py-6 px-3 flex flex-col gap-6">
      <span className="flex flex-col justify-start items-start gap-1.5">
        <Label className="text-gray-900">Template Name </Label>
        <Input
          className="text-gray-800"
          type="text"
          placeholder="Provide meaningful name "
          required
          onChange={(e) =>
            store.send({
              type: "changeInputTemplateName",
              templateName: e.target.value,
            })
          }
        />
      </span>

      <span className="flex flex-col justify-start items-start gap-1.5">
        <Label className="text-gray-900">Website Url </Label>
        <Input
          className="text-gray-800"
          type="url"
          placeholder="e.g. https://www.youtube.com/shorts/hK3sHK2_osE"
          required
          onChange={(e) =>
            store.send({
              type: "changeInputWebsiteUrl",
              websiteUrl: e.target.value,
            })
          }
        />
      </span>

      <CreateTemplateButton />
    </span>
  );
};

const CreateTemplateButton = () => {
  const { createTemplate, isPending } = useCreateTemplate();

  return (
    <Button
      onClick={() => {
        createTemplate();
      }}
      disabled={isPending}
    >
      <CreateTemplateButtonText isPending={isPending} />
    </Button>
  );
};

const CreateTemplateButtonText = (props: { isPending: boolean }) => {
  if (!props.isPending) {
    return <span>Create</span>;
  }

  return (
    <span className="flex justify-center items-center gap-1">
      <Loader2 className="animate-spin" />
      Creating
    </span>
  );
};
