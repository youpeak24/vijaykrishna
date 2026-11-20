/** Career timeline shown on the home page. Photos live in public/ceo, public/chairman and public/producer. */
export interface TimelinePhoto {
  src: string;
  alt: string;
  /** Small caption chip shown over the photo (e.g. the role the photo belongs to). */
  label: string;
}

export type TimelineIcon = 'briefcase' | 'film' | 'clapperboard';
export type TimelineStatus = 'current' | 'past' | 'upcoming';

export interface TimelineEntry {
  id: string;
  /** Large year shown behind the text, e.g. "2023". */
  year: string;
  /** Human readable period, e.g. "2023 — Current". */
  period: string;
  status: TimelineStatus;
  /** Big headline, one string per line. The last line is rendered as an outline when there are 2+ lines. */
  title: string[];
  subtitle: string;
  organisation?: string;
  description: string;
  tags: string[];
  icon: TimelineIcon;
  /** Accent colour used for this chapter (any CSS colour). */
  accent: string;
  photos: TimelinePhoto[];
}

const NAME = 'S Vijay Krishnan';

/** Ordered chronologically — oldest chapter first, the future at the end. */
export const timeline: TimelineEntry[] = [
  {
    id: 'producer-chairman',
    year: '2021',
    period: '2021 — 2023',
    status: 'past',
    title: ['Co-Producer', 'Chairman'],
    subtitle: 'Film Co-Producer & Chairman',
    description:
      'Two years of backing stories from both sides of the table — producing on the sets and steering the company as Chairman.',
    tags: ['Film Production', 'Co-Producer', 'Chairman'],
    icon: 'film',
    accent: '#FF304F',
    photos: [
      { src: '/producer/producer-01.jpg', label: 'Producer', alt: `${NAME} as film producer, seated beside a cinema camera on set` },
      { src: '/producer/producer-02.jpg', label: 'Producer', alt: `${NAME} in a director's chair surrounded by studio lights` },
      { src: '/producer/producer-03.jpg', label: 'Producer', alt: `${NAME} in a charcoal blazer in front of a film light and camera` },
      { src: '/producer/producer-04.jpg', label: 'Producer', alt: `${NAME}, portrait in black against a dark studio backdrop` },
      { src: '/chairman/chairman-01.jpg', label: 'Chairman', alt: `${NAME} as chairman, standing in his office at sunset` },
      { src: '/chairman/chairman-02.jpg', label: 'Chairman', alt: `${NAME} seated at the head of a boardroom table` },
      { src: '/chairman/chairman-03.jpg', label: 'Chairman', alt: `${NAME} walking through a modern corporate lobby` },
      { src: '/chairman/chairman-04.jpg', label: 'Chairman', alt: `${NAME} seated in a leather armchair in a study` },
    ],
  },
  {
    id: 'ceo',
    year: '2023',
    period: '2023 — Current',
    status: 'current',
    title: ['CEO'],
    subtitle: 'Chief Executive Officer',
    organisation: 'Youpeak Tech',
    description:
      'Leading Youpeak Tech as Chief Executive Officer — setting the vision, building the team and driving the company forward.',
    tags: ['Youpeak Tech', 'Leadership', 'Vision'],
    icon: 'briefcase',
    accent: '#E9B96E',
    photos: [
      { src: '/ceo/ceo-01.jpg', label: 'CEO · Youpeak Tech', alt: `${NAME}, CEO of Youpeak Tech, by a boardroom window` },
      { src: '/ceo/ceo-02.jpg', label: 'CEO · Youpeak Tech', alt: `${NAME} in a maroon suit walking through a modern lobby` },
      { src: '/ceo/ceo-03.jpg', label: 'CEO · Youpeak Tech', alt: `${NAME} in a navy suit seated in a warm office` },
      { src: '/ceo/ceo-04.jpg', label: 'CEO · Youpeak Tech', alt: `${NAME} as a panelist at a conference` },
    ],
  },
  {
    id: 'new-movie',
    year: '2027',
    period: '2027',
    status: 'upcoming',
    title: ['Launching', 'New Movie'],
    subtitle: 'The next chapter',
    description:
      'The camera rolls again. A brand-new movie launches in 2027 — and the story is only just beginning.',
    tags: ['New Movie', '2027', 'Stay Tuned'],
    icon: 'clapperboard',
    accent: '#8B5CF6',
    photos: [
      { src: '/producer/producer-02.jpg', label: 'Coming Soon', alt: `${NAME} in a director's chair on a film set` },
      { src: '/producer/producer-03.jpg', label: 'Coming Soon', alt: `${NAME} standing in front of a film light and camera` },
    ],
  },
];
