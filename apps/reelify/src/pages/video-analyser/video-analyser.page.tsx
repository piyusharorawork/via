export default function VideoAnalyserPage() {
  return (
    <div className="h-screen">
      <h1>Video Analyser</h1>

      <section className="flex flex-col items-center bg-red-100">
        <video crossOrigin="anonymous" className="h-[640px] w-[360px]">
          <source
            src="https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736600178/hotel-highlight-reel-original.mp4"
            type="video/mp4"
          />
        </video>

        <div className="mt-4"></div>
      </section>
    </div>
  );
}
