import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Button from "@/components/button";

export default function WhyRemember(): React.ReactElement {
  return (
    <>
      {/* Why we remeber section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 py-10 px-6 lg:px-24 bg-ashwhite dark:bg-dark-bg transition-colors duration-300">
        <div className="px-6 md:px-0">
          <Button className="">Our Vision</Button>
          <h2 className="font-alnevrada text-3xl font-semibold mb-2 dark:text-dark-text">
            Why we remember
          </h2>
          <p className="font-poppins text-navyblue dark:text-dark-muted font-light">
            We preserve memories to honor lives, inspire hope, and connect
            generations
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-secondary border-b border-secondary pb-[1px] group transition mt-8"
          >
            About Us
            <ArrowUpRight
              size={16}
              className="mt-[2px] transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </div>
        <div className="w-full rounded-xl md:w-[40%] max-w-[400px] relative aspect-[1/1] overflow-hidden">
          <Image
            src="https://herstories-media.s3.us-east-1.amazonaws.com/assets/ourvision-image.jpg"
            alt="Our vision"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}
