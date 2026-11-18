export interface Award {
  id: string;
  title: string;
  category: string;
  festival: string;
  year: string;
  project: string;
  country: string;
  type: 'win' | 'nomination';
}

export const awards: Award[] = [
  {
    id: 'a1',
    title: 'Best Director',
    category: 'Direction',
    festival: 'Chennai International Film Festival',
    year: '2023',
    project: 'Nilavil Ondru',
    country: 'India',
    type: 'win',
  },
  {
    id: 'a2',
    title: 'Special Jury Award',
    category: 'Jury Recognition',
    festival: 'MAMI Mumbai Film Festival',
    year: '2022',
    project: 'Kaadu Kuyil',
    country: 'India',
    type: 'win',
  },
  {
    id: 'a3',
    title: 'Best Short Film',
    category: 'Short Film',
    festival: 'BIFFES Bangalore',
    year: '2021',
    project: 'Mazhai',
    country: 'India',
    type: 'win',
  },
  {
    id: 'a4',
    title: 'Best Film (Tamil)',
    category: 'Feature Film',
    festival: 'National Film Awards',
    year: '2023',
    project: 'Nilavil Ondru',
    country: 'India',
    type: 'nomination',
  },
  {
    id: 'a5',
    title: 'Best Cinematography',
    category: 'Technical',
    festival: 'Filmfare Awards South',
    year: '2022',
    project: 'Kaadu Kuyil',
    country: 'India',
    type: 'nomination',
  },
  {
    id: 'a6',
    title: 'Rising Filmmaker Award',
    category: 'Career Achievement',
    festival: 'Tamil Nadu State Film Awards',
    year: '2021',
    project: 'Career',
    country: 'India',
    type: 'win',
  },
  {
    id: 'a7',
    title: 'Best Screenplay',
    category: 'Writing',
    festival: 'South Indian International Movie Awards',
    year: '2022',
    project: 'Ratchagan Rises',
    country: 'India',
    type: 'win',
  },
  {
    id: 'a8',
    title: 'Official Selection',
    category: 'International',
    festival: 'Busan International Film Festival',
    year: '2022',
    project: 'Kaadu Kuyil',
    country: 'South Korea',
    type: 'nomination',
  },
];
