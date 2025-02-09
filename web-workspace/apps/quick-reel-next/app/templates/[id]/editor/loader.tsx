"use client";

export const Loader = () => {
  return (
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce [animation-delay:0ms]"></div>
      <div className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce [animation-delay:150ms]"></div>
      <div className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce [animation-delay:300ms]"></div>
    </div>
  );
};
