import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CreateTemplateForm = () => {
  return (
    <form className="py-6 px-3 flex flex-col gap-6">
      <div className="flex flex-col justify-start items-start gap-1.5">
        <Label className="text-gray-900">Template Name </Label>
        <Input
          className="text-gray-800"
          type="text"
          placeholder="Provide meaningful name "
          required
        />
      </div>

      <div className="flex flex-col justify-start items-start gap-1.5">
        <Label className="text-gray-900">Website Url </Label>
        <Input
          className="text-gray-800"
          type="url"
          placeholder="e.g. https://www.youtube.com/shorts/hK3sHK2_osE"
          required
        />
      </div>

      <Button onClick={() => console.log("create")}>
        <span>Create</span>
      </Button>
    </form>
  );
};
