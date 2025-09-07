import Image from "next/image";

export default function Archive(): React.ReactElement {
  return (
    <div className="relative w-full h-screen">
      {/* Background image */}
      <Image
        src="/assets/archive-image.jpg"
        alt="Archive background"
        fill
        priority
        className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold font-alnevrada animate-pulse">
          COMING SOON...
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          A digital archive filled with vast data on women&#39;s history in
          Africa,
          <br />
          <span className=" font-bold font-alnevrada">Stay Tuned.</span>
        </p>
      </div>
    </div>
  );
}
