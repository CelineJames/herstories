import CallToAction from "./cta";
import FeaturedBio from "./featured-biography";
import Hero from "./hero";
import WhyRemember from "./why-remember";
import Container from "@/components/container";

export default function HomePage(): React.ReactElement {
  return (
    <div>
      <Hero />
      <Container>
        <FeaturedBio />
        <WhyRemember />
        <CallToAction />
      </Container>
    </div>
  );
}
