export interface PressItem {
  id: string;
  publication: string;
  headline: string;
  excerpt: string;
  date: string;
  url: string;
  type: 'interview' | 'review' | 'feature' | 'news';
  logo: string;
}

export const press: PressItem[] = [
  {
    id: 'p1',
    publication: 'The Hindu',
    headline: 'S Vijay Krishnan: The filmmaker who lets silence speak',
    excerpt:
      '"There is a kind of storytelling that happens in the spaces between words," says S Vijay Krishnan, speaking ahead of the release of his acclaimed film Nilavil Ondru.',
    date: '2023-12-15',
    url: '#',
    type: 'interview',
    logo: 'TH',
  },
  {
    id: 'p2',
    publication: 'Film Companion',
    headline: 'Kaadu Kuyil Review: A pulse-pounding thriller rooted in the natural world',
    excerpt:
      'S Vijay Krishnan delivers a masterclass in tension-building, using the sounds and sights of the Nilgiri forest as instruments of dread and wonder.',
    date: '2022-09-20',
    url: '#',
    type: 'review',
    logo: 'FC',
  },
  {
    id: 'p3',
    publication: 'Scroll.in',
    headline: 'The new generation of Tamil filmmakers is rewriting the rules',
    excerpt:
      'Among the names most frequently cited by critics and peers alike is S Vijay Krishnan, whose distinctive visual approach has set him apart in a crowded field.',
    date: '2023-06-10',
    url: '#',
    type: 'feature',
    logo: 'SC',
  },
  {
    id: 'p4',
    publication: 'Indian Express',
    headline: 'Chennai International Film Festival: Nilavil Ondru wins Best Director',
    excerpt:
      'The festival jury praised the film\'s "rare combination of technical mastery and emotional authenticity," awarding S Vijay Krishnan the Best Director prize.',
    date: '2023-12-20',
    url: '#',
    type: 'news',
    logo: 'IE',
  },
  {
    id: 'p5',
    publication: 'Cinema Express',
    headline: 'S Vijay Krishnan: "Every film I make is a conversation with my audience"',
    excerpt:
      'In an exclusive interview, the director opens up about his creative process, his influences, and why he chooses difficult subjects for his films.',
    date: '2022-11-05',
    url: '#',
    type: 'interview',
    logo: 'CE',
  },
  {
    id: 'p6',
    publication: 'Variety',
    headline: 'Tamil cinema\'s rising star heads to Busan with forest thriller',
    excerpt:
      'Kaadu Kuyil, the second feature from director S Vijay Krishnan, has been selected for the New Currents section at the Busan International Film Festival.',
    date: '2022-08-30',
    url: '#',
    type: 'news',
    logo: 'VR',
  },
];
