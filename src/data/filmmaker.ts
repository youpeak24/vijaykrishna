import { getEnv } from '../config/env';

export const filmmaker = {
  name: "S VIJAY KRISHNAN",
  nameShort: "S VIJAY KRISHNAN",
  monogram: "VK",
  logo: "/logo/apple-touch-icon.png",
  logoHighRes: "/logo/android-chrome-512x512.png",
  tagline: "Crafting Stories That Live Beyond the Screen.",
  philosophy: "Cinema is where imagination becomes emotion.",
  bio: "An award-winning Indian filmmaker with a passion for stories that transcend boundaries. With over a decade of experience across feature films, short films, and commercial productions, S Vijay Krishnan brings a distinctive visual language and emotional depth to every frame.",
  bioExtended:
    "Born into a world of stories, S Vijay Krishnan discovered the power of cinema as a child watching the timeless classics of Indian cinema. That spark evolved into a lifelong mission: to craft films that resonate deeply, challenge perceptions, and celebrate the rich tapestry of human experience. From the streets of Tamil Nadu to international film festivals, every project is approached with the same unwavering commitment to artistic excellence and authentic storytelling.",
  roles: ["PRODUCER", "DIRECTOR", "STORYTELLER"],
  location: "Chennai, Tamil Nadu, India",
  email: getEnv('VITE_CONTACT_EMAIL', 'contact@vijaykrishnan.in'),
  phone: getEnv('VITE_CONTACT_PHONE', '+91 98400 00000'),
  social: {
    instagram: getEnv('VITE_SOCIAL_INSTAGRAM', 'https://instagram.com/vijaykrishnan'),
    youtube: getEnv('VITE_SOCIAL_YOUTUBE', 'https://youtube.com/@vijaykrishnan'),
    imdb: getEnv('VITE_SOCIAL_IMDB', 'https://imdb.com/name/vijaykrishnan'),
    linkedin: getEnv('VITE_SOCIAL_LINKEDIN', 'https://linkedin.com/in/vijaykrishnan'),
  },
  awards: [
    {
      title: "Best Director",
      festival: "Chennai International Film Festival",
      year: "2023",
      project: "Nilavil Ondru",
    },
    {
      title: "Special Jury Award",
      festival: "MAMI Mumbai Film Festival",
      year: "2022",
      project: "Kaadu Kuyil",
    },
    {
      title: "Best Short Film",
      festival: "BIFFES Bangalore",
      year: "2021",
      project: "Mazhai",
    },
  ],
  stats: [
    { number: "12+", label: "Years of Experience" },
    { number: "8", label: "Feature Films" },
    { number: "15+", label: "Awards Won" },
    { number: "3", label: "International Festivals" },
  ],
};
