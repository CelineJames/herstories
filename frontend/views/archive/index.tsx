import Image from "next/image";

export default function Archive(): React.ReactElement {
  return (
    <div className="w-full flex flex-col items-center justify-start mt-24">
      <div className="text-center relative w-[600px] h-[400px]">
        <Image
          src="/assets/archive-image.jpg"
          alt=""
          fill
          className=" object-cover rounded-2xl"
        />
      </div>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold font-alnevrada">COMING SOON....</h1>
        <p>
          A digital archive filled with vast data on women&#39;s history in
          Africa, <br />
          <span className="text-primary font-bold font-alnevrada">
            Stay Tuned.
          </span>
        </p>
      </div>
    </div>
  );
}
