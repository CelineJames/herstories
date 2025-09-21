import Link from "next/link";

export default function CallToAction(): React.ReactElement {
  return (
    <>
      {/* Call to action */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-primarydeep text-white p-6 md:p-10 lg:p-24 mx-4 rounded-xl md:rounded-3xl gap-8">
        <div>
          <h3 className="font-alnevrada text-lg mb-2 md:text-2xl">
            Be part of the community
          </h3>
          <p className="font-poppins font-light mb-4">
            Join us by submitting a story or be involved by partnering with us
            or donating to the cause.
          </p>
        </div>
        <div className="font-poppins text-sm flex flex-col md:flex-row md:justify-end md:items-center md:w-[40%] gap-4">
          <Link href="/submit-story">
            <button className="bg-primary rounded-md w-full py-2 md:max-w-44 md:px-4 transition-all duration-300 hover:-translate-y-1">
              Submit a Story
            </button>
          </Link>
          <Link href="/get-involved">
            <button className="border border-ashwhite rounded-md w-full md:max-w-44 py-2 md:px-4 hover:bg-ashwhite transition-all duration-300 hover:text-primary hover:-translate-y-1">
              Get Involved
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
