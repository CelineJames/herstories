export default function GetInvolved(): React.ReactElement {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdf6f0] to-white dark:from-dark-bg dark:to-dark-surface px-6 py-16 transition-colors duration-300">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-primary dark:text-dark-text font-alnevrada">
          Want to Support the Cause?
        </h1>
        <p className="text-lg text-gray-700 dark:text-dark-muted">
          You can contribute by sharing the stories, lending your skills, or
          volunteering to help us amplify the voices of African women.
        </p>

        <div className="flex items-center justify-center mt-8">
          <a href="mailto:">
            <button className="relative border border-primary dark:border-dark-muted px-6 py-3 text-primary dark:text-dark-muted rounded-lg cursor-pointer font-semibold overflow-hidden z-10 transition-colors group">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                Become a Volunteer
              </span>
              <span className="absolute top-0 right-0 h-full w-0 bg-primary dark:bg-dark-muted transition-all duration-500 ease-in-out group-hover:w-full group-hover:left-0 z-[-1]"></span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
