import { useState } from "react";

type Props = {
  isGenerating: boolean;
  onGenerate: (prompt: string, quote: string) => void;
};

export const GenerateVideoForm = (props: Props) => {
  const [prompt, setPrompt] = useState("");
  const [quote, setQuote] = useState("");

  return (
    <div className="card bg-base-100 w-96 shadow-xl px-4 py-2">
      <div className="card-body">
        <h2 className="card-title">Generate Video</h2>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Describe the video</span>
          </div>
          <input
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Quote</span>
          </div>
          <textarea
            onChange={(e) => setQuote(e.target.value)}
            className="textarea textarea-bordered h-24"
            placeholder="Enter text to overlay"
          ></textarea>
        </label>

        <div className="card-actions justify-end my-2">
          <button
            className="btn btn-primary"
            onClick={() => props.onGenerate(prompt, quote)}
          >
            Generate
            {props.isGenerating && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
