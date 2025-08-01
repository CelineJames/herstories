import CallToAction from "./cta";
import FeaturedBio from "./featured-biography";
import Hero from "./hero";
import WhyRemember from "./why-remember";

export default function HomePage() : React.ReactElement {
  return (
    <div>
      <Hero />
      <FeaturedBio />
      <WhyRemember />
      <CallToAction />
    </div>
  );
}