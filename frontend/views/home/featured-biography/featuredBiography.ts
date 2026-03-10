export type featuredBiog = {
  image: string;
  name: string;
  details: string;
  id: number;
};

const featuredBiography: featuredBiog[] = [
  {
    id: 2,
    image: "/assets/ngozi-iweala.jpg",
    name: "Ngozi Okonjo-Iweala",
    details:
      "A Nigerian economist and international development expert, Ngozi Okonjo-Iweala has broken multiple glass ceilings—she was the first woman and first African to serve as Director-General of the World Trade Organization, and previously twice served as Nigeria’s Finance Minister, leading crucial economic reforms and securing debt relief during fiscal crises.",
  },
  {
    id: 12,
    image: "/assets/ala-salah2.jpg",
    name: "Alaa Salah",
    details:
      "Known internationally as the “Woman in White,” Alaa Salah became a symbol of Sudan’s 2019 revolution when a viral photograph captured her leading chants atop a car. A 22-year-old architecture student at the time, Salah later spoke at the UN Security Council calling for gender equality in Sudan’s transition, and received the Hillary Rodham Clinton Award in 2023 for her activism.",
  },
  {
    id: 13,
    image: "/assets/amel-kabourl.jpg",
    name: "Amel Karboul",
    details:
      "Tunisian author, speaker, and politician, Amel Karboul was the first woman to serve as Tunisia’s Minister of Tourism (2014–2015) and later led the Education Outcomes Fund, a UNICEF-hosted initiative to improve education for millions globally. She is also the author of ‘Coffin Corner’ and has held leadership roles at Mercedes-Benz, BCG, and global education initiatives.",
  },

  {
    id: 14,
    image: "/assets/aoua-keita.jpeg",
    name: "Aoua Keïta",
    details:
      "A pioneering Malian independence figure born in 1912, Aoua Keïta was a midwife, author, and political activist who co-founded the Sudanese Union – African Democratic Rally, served in Mali’s first government, and wrote her memoir, *Femme d’Afrique*, sharing a rare female perspective on decolonization.",
  },
];

export default featuredBiography;
