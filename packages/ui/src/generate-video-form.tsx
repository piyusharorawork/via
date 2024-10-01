import classNames from "classnames";
import { useState } from "react";

type Props = {
  isGenerating: boolean;
  enableGenerate: boolean;
  onPromptChange: (prompt: string) => void;
  onQuoteChange: (quote: string) => void;
  onGenerate: () => void;
};

export const GenerateVideoForm = (props: Props) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl px-4 py-2">
      <div className="card-body">
        <h2 className="card-title">Generate Video</h2>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Describe the video</span>
          </div>
          <textarea
            onChange={(e) => props.onPromptChange(e.target.value)}
            placeholder="Type here"
            className="textarea input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Quote</span>
          </div>
          <textarea
            onChange={(e) => props.onQuoteChange(e.target.value)}
            className="textarea textarea-bordered h-24"
            placeholder="Enter text to overlay"
          ></textarea>
        </label>

        <div className="card-actions justify-end my-2">
          <button
            className={classNames("btn btn-primary", {
              "btn-disabled": !props.enableGenerate,
            })}
            onClick={() => props.onGenerate()}
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
