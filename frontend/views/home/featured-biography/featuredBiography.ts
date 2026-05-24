export type featuredBiog = {
  image: string;
  name: string;
  details: string;
  slug: string;
};

const featuredBiography: featuredBiog[] = [
  {
    slug: "ngozi-okonjo-iweala",
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/ngozi-iweala.jpg",
    name: "Ngozi Okonjo-Iweala",
    details:
      "A Nigerian economist and international development expert, Ngozi Okonjo-Iweala has broken multiple glass ceilings — she was the first woman and first African to serve as Director-General of the World Trade Organization, and previously twice served as Nigeria's Finance Minister, leading crucial economic reforms and securing debt relief during fiscal crises.",
  },
  {
    slug: "ala-salah",
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/ala-salah2.jpg",
    name: "Alaa Salah",
    details:
      "Known internationally as the 'Woman in White,' Alaa Salah became a symbol of Sudan's 2019 revolution when a viral photograph captured her leading chants atop a car. A 22-year-old architecture student at the time, Salah later spoke at the UN Security Council calling for gender equality in Sudan's transition.",
  },
  {
    slug: "amel-karboul",
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/amel-kabourl.jpg",
    name: "Amel Karboul",
    details:
      "Tunisian author, speaker, and politician, Amel Karboul was the first woman to serve as Tunisia's Minister of Tourism and later led the Education Outcomes Fund, a UNICEF-hosted initiative to improve education for millions globally.",
  },
  {
    slug: "aoua-keita",
    image:
      "https://herstories-media.s3.us-east-1.amazonaws.com/assets/aoua-keita.jpeg",
    name: "Aoua Keïta",
    details:
      "A pioneering Malian independence figure born in 1912, Aoua Keïta was a midwife, author, and political activist who co-founded the Sudanese Union – African Democratic Rally and wrote her memoir, Femme d'Afrique, sharing a rare female perspective on decolonization.",
  },
];

export default featuredBiography;
