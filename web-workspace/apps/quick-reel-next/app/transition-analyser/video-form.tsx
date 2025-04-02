"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const VideoForm = () => {
  return (
    <div className="flex flex-col px-8 h-full py-4">
      <h2 className="text-center text-xl">Enter Video Info</h2>
      <section className="flex flex-col gap-4 grow ">
        <UrlField />
        <ClipInfoField />
      </section>
    </div>
  );
};

const UrlField = () => {
  return (
    <div className="flex flex-col">
      <Label>Video Url</Label>
      <Input
        type="url"
        placeholder="https://test-v1.blr1.digitaloceanspaces.com/temp/aa155c2d-35ed-405d-8c52-2bac2f4a1eee/bappa.mp4"
      />
    </div>
  );
};

const ClipInfoField = () => {
  return (
    <div className="grow flex flex-col gap-2">
      <Label>ClipInfo</Label>
      <Textarea className="grow" placeholder="Paste Clip Info" />
    </div>
  );
};
