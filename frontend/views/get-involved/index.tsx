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
            <button className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition">
              Become a Volunteer
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
