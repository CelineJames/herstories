import Image from "next/image";
import Button from "@/components/button";

// const team = [
//   {
//     image: "/assets/team.png",
//     name: "Itoro James",
//     position: "Founder & Curator",
//   },
//   {
//     image: "/assets/team.png",
//     name: "Kemi Adeyemi",
//     position: "Archivist",
//   },
//   {
//     image: "/assets/team.png",
//     name: "Chinwe Okoro",
//     position: "Research Lead",
//   },
//   {
//     image: "/assets/team.png",
//     name: "Celestina Nwokedi",
//     position: "Tech Lead",
//   },
// ];

export default function AboutUs(): React.ReactElement {
  return (
    <main className="min-h-screen mt-24 bg-white">
      <div className="w-full bg-primary md:max-w-[80vw] mx-auto relative aspect-[4/4] md:aspect-[5/2] overflow-hidden md:rounded-xl max-h-[400px]">
        {/* Background Image */}
        <Image
          src="/logo-white.png"
          alt="HerStories Logo"
          fill
          className="object-cover"
        />

        {/* Text Overlay at Bottom */}
        <div className="absolute bottom-0 w-full text-center text-white pb-2">
          <p className="text-lg font-semibold">
            Documenting Her, Defining Us...
          </p>
        </div>
      </div>
      {/* who are we */}
      <div className="px-6 w-full md:w-[50%] mx-auto font-poppins mt-6">
        <Button className="mt-6">Our Mission</Button>
        <h1 className="font-alnevrada text-3xl font-semibold mb-4">
          Who are we?
        </h1>
        <p className="font-light">
          <span className="font-semibold font-alnevrada">HerStories</span> is a
          digital sanctuary where the voices of African women, past and present
          are remembered, revered, and re-centered.
          <br />
          <br />
          We exist to tell the stories that history forgot. The ones passed down
          in kitchens, at firesides, in whispers, and in songs. The ones etched
          not in textbooks but in the wrinkles of grandmothers’ faces, in the
          callused hands of market women, in the battle cries of female
          warriors, and in the silence of those who were never given the space
          to speak.
          <br />
          <br />
          Our mission is to preserve, amplify, and celebrate the narratives of
          African women across time, space, and generations from ancient queens
          to modern-day changemakers because no history is complete without Her.
        </p>
      </div>
      {/* what are we after */}
      <div className="flex flex-col md:flex-row-reverse md:justify-center items-start md:items-center gap-10 mt-24 px-6 md:w-[90%] mx-auto">
        {/* Image Section */}
        <div className="w-full md:w-[40%] max-w-[400px] aspect-[1/1] rounded-xl overflow-hidden relative">
          <Image
            src="/assets/aboutus-2.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 space-y-4 font-poppins">
          <Button>Our Vision</Button>

          <h2 className="font-alnevrada text-2xl md:text-3xl font-bold ">
            What are we after?
          </h2>

          <p className="text-base md:text-lg">We envision a world where:</p>

          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            <li>
              African girls grow up seeing themselves reflected in greatness.
            </li>
            <li>
              Scholars and storytellers find rich, credible, and nuanced
              resources on African women&apos;s histories.
            </li>
            <li>
              Communities rediscover pride in the legacies of the women who
              built and nurtured them.
            </li>
            <li>
              Memory is justice and remembering becomes a radical act of
              healing.
            </li>
          </ul>
          <p>
            We are building a living archive, one that grows with each
            submission, each voice, and each story shared. A space that refuses
            to let erasure win.
          </p>
        </div>
      </div>

      {/* why herstories */}
      <div className="flex flex-col md:flex-row md:justify-center items-start md:items-center gap-10 mt-24 px-6 md:w-[90%] mx-auto">
        <div className="relative w-full md:w-[40%] max-w-[400px] h-[500px] rounded-xl overflow-hidden">
          <Image
            src="/assets/aboutus-1.webp"
            alt="Ngozi Okonjo-Iweala"
            fill
            className="object-cover"
          />
        </div>

        <div className="md:w-1/2 space-y-4 font-poppins">
          <Button className="py-2">Why Herstories?</Button>
          <h2 className="font-alnevrada font-bold text-2xl md:text-3xl">
            “Until the lion learns to write, every story will glorify the
            hunter.”
          </h2>
          <span className="font-alnevrada font-semibold text-xl">
            — African proverb
          </span>
          <p>
            History, as it’s often taught, is a selective memory. It is curated
            through lenses that have too often excluded African women even
            though they led revolutions, formed intellectual networks, protected
            cultures, bore nations, and resisted oppression in ways both loud
            and quiet. History has been made by women countless times, even by
            our mothers and foremothers, my professor once said in class, your
            grandmother probably made history, but who wrote it? Nobody.
          </p>
          <span className="font-alnevrada font-semibold inline-block">
            - Dr Obar Irom
          </span>
          <br />
          <p>
            <span className="font-bold font-alnevrada">HerStories</span> is not
            just about correction, it&apos;s about expansion. We are expanding
            the frame so that no girl, woman, or community ever doubts the power
            in their lineage.
          </p>
          <p>This project is a bridge between:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            <li>The past and the present</li>
            {/* <br /> */}
            <li>Memory and technology</li>
            {/* <br /> */}
            <li>Academia and oral tradition</li>
            {/* <br /> */}
            <li>Grief and celebration</li>
            {/* <br /> */}
            <li>Silence and voice</li>
          </ul>
        </div>
      </div>

      {/* How we work */}
      <div className="flex flex-col md:flex-row-reverse md:justify-center items-start md:items-center gap-10 mt-24 px-6 md:w-[90%] mx-auto">
        {/* Image Section */}
        <div className="w-full md:w-[40%] max-w-[400px] aspect-[1/1] rounded-xl overflow-hidden relative">
          <Image
            src="/assets/community-work.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 space-y-4 font-poppins">
          <Button>How We Work</Button>

          <h2 className="font-alnevrada text-2xl md:text-3xl font-bold ">
            How do we get it all done?
          </h2>

          <p className="text-base md:text-lg">
            <span className="font-alnevrada font-bold">HerStories</span> is a
            collaborative project. We:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            <li>Digitize oral accounts, photos, and documents.</li>
            <li>
              Invite users to submit stories or tributes through our platform.
            </li>
            <li>
              Organize content by timelines, regions, and themes for
              accessibility.
            </li>
            <li>
              Work with historians, community elders, creatives, and developers
              to ensure depth, dignity, and truth.
            </li>
          </ul>
          <p>
            We’re not here to dominate the narrative. We’re here to gather it,
            protect it, and pass it on
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 flex flex-col md:flex-row md:justify-between md:items-center bg-primarydeep text-white p-6 md:p-10 lg:p-24 mx-4 rounded-xl md:rounded-3xl gap-8">
        <div>
          <h3 className="font-alnevrada text-2xl md:text-3xl mb-6">
            This is your archive too.
          </h3>
          <p className="font-poppins font-light mb-8">
            We invite everyone, storytellers, scholars, community members, and
            seekers, to walk with us in this journey of restoration. Whether
            you’re here to read, to contribute, to listen, or to learn, welcome
            home. Because when we document Her, we define ourselves.
          </p>
          <p className="font-alnevrada font-semibold text-xl md:text-xl">
            Because when we document Her, we define ourselves.
          </p>
        </div>
        <div className="font-poppins text-sm flex flex-col md:flex-row md:justify-end md:items-center md:w-[40%] gap-4">
          <button className="bg-primary rounded-md w-full py-2 md:max-w-44 md:px-4 transition-all duration-300 hover:-translate-y-1">
            Submit a Story
          </button>
          <button className="border border-ashwhite rounded-md w-full md:max-w-44 py-2 md:px-4 hover:bg-ashwhite transition-all duration-300 hover:text-primary hover:-translate-y-1">
            Get Involved
          </button>
        </div>
      </div>

      {/* supporters section to be added */}

      {/* Our team */}
      {/* <div className="mt-14 ">
        <div className="text-center mb-8">
          <Button>Our team</Button>
          <h2 className="font-alnevrada text-2xl md:text-3xl w-[60%] mx-auto mb-4">
            An amazing team crafting modern digital memories
          </h2>
          <p className="font-poppins font-light w-[50%] mx-auto">
            As a team with solid interest in the histories of our wonderful
            African Women, we bring HerStories.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden text-center p-4"
            >
              <div className="relative w-full max-w-[200px] aspect-[1/1] rounded-2xl overflow-hidden mb-3 mx-auto">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-alnevrada text-xl font-semibold">
                {member.name}
              </h3>
              <p className="text-base ">{member.position}</p>
            </div>
          ))}
        </div>
      </div> */}
    </main>
  );
}
