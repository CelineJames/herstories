export default function GetInvolved(): React.ReactElement {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdf6f0] to-white px-6 py-16">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-primary font-alnevrada">
          Want to Support the Cause?
        </h1>
        <p className="text-lg text-gray-700">
          You can contribute by sharing the stories, lending your skills, or
          volunteering to help us amplify the voices of African women.
        </p>

        <div className="flex items-center justify-center mt-8">
          <a href="mailto:">
            <button className="relative border border-primary px-6 py-3 text-primary rounded-lg cursor-pointer font-semibold overflow-hidden z-10 transition-colors group">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                Become a Volunteer
              </span>
              <span className="absolute top-0 right-0 h-full w-0 bg-primary transition-all duration-500 ease-in-out group-hover:w-full group-hover:left-0 z-[-1]"></span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
