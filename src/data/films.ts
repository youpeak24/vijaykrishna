export interface Film {
  id: string;
  slug: string;
  title: string;
  year: string;
  language: string;
  genre: string[];
  role: string;
  type: 'feature' | 'short' | 'commercial';
  runtime: string;
  synopsis: string;
  directorNote: string;
  tagline: string;
  poster: string;
  backdrop: string;
  trailerUrl: string;
  stills: string[];
  cast: { actor: string; character: string }[];
  credits: {
    director?: string;
    producer?: string;
    cinematography?: string;
    music?: string;
    editing?: string;
    artDirection?: string;
    soundDesign?: string;
    production?: string;
  };
  awards: string[];
  accentColor: string;
  status: 'released' | 'post-production' | 'pre-production';
  featured: boolean;
}

export const films: Film[] = [
  {
    id: '1',
    slug: 'nilavil-ondru',
    title: 'NILAVIL ONDRU',
    year: '2023',
    language: 'Tamil',
    genre: ['Drama', 'Romance', 'Poetic Realism'],
    role: 'Director',
    type: 'feature',
    runtime: '138 mins',
    tagline: 'Under the same moon, two destinies rewrite their stars.',
    synopsis:
      'Set against the nocturnal poetry of Madurai’s heritage streets, Nilavil Ondru charts the delicate collision of two divergent worlds. An archivist chronicling vanishing temple murals crosses paths with a free-spirited Carnatic fusion vocalist. Amidst ancient courtyards and contemporary estrangements, their shared silence becomes a language of healing, challenging societal orthodoxy through an evocative tapestry of emotion and light.',
    directorNote:
      'This film was born from a twilight conversation in Madurai about how tradition and desire negotiate space in modern hearts. I wanted the camera to breathe like a silent confidant — allowing long, contemplative takes where the light speaks before the characters do. Cinema at its core is the capture of unspoken longing.',
    poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    stills: [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1000&q=80',
    ],
    cast: [
      { actor: 'Arjun Das', character: 'Kathir (The Archivist)' },
      { actor: 'Aparna Balamurali', character: 'Meera (The Vocalist)' },
      { actor: 'Nasser', character: 'Somasundaram' },
      { actor: 'Rohini', character: 'Kamala' },
    ],
    credits: {
      director: 'S Vijay Krishnan',
      producer: 'S Vijay Krishnan & Red Giant Movies',
      cinematography: 'Rajan Kumar (ISC)',
      music: 'Santhosh Narayanan',
      editing: 'Praveen K.L.',
      artDirection: 'R. K. Vijay Murugan',
      soundDesign: 'Tapash Nayak',
      production: 'VK Productions in association with Red Giant Movies',
    },
    awards: [
      'Winner — Best Director, Chennai International Film Festival 2023',
      'Special Jury Mention — MAMI Mumbai Film Festival 2023',
      'Official Selection — International Film Festival of Kerala (IFFK)',
    ],
    accentColor: '#8B5CF6',
    status: 'released',
    featured: true,
  },
  {
    id: '2',
    slug: 'kaadu-kuyil',
    title: 'KAADU KUYIL',
    year: '2022',
    language: 'Tamil',
    genre: ['Mystery', 'Environmental Thriller', 'Noir'],
    role: 'Director & Producer',
    type: 'feature',
    runtime: '124 mins',
    tagline: 'The forest forgets nothing. It merely waits.',
    synopsis:
      'High in the misty shola forests of the Western Ghats, a nocturnal wildlife photographer captures an anomalous disturbance deep within an undocumented reserve. What begins as a solitary quest to document a near-extinct avian species unspools into a chilling confrontation with illegal timber syndicates and subterranean ancient rites. As rainfall erodes the slopes, the wilderness itself claims retribution.',
    directorNote:
      'We spent three weeks inhabiting the Nilgiris before rolling a single frame. The soundscape of mist, dripping leaves, and unseen predators had to dictate our film rhythm. We shot largely in natural twilight and anamorphic lenses to render the wilderness not as a backdrop, but as an ancient, sentient witness.',
    poster: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    stills: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=80',
    ],
    cast: [
      { actor: 'Kishore', character: 'Rajan (Forest Ranger)' },
      { actor: 'Shraddha Srinath', character: 'Ananya (Field Biologist)' },
      { actor: 'Guru Somasundaram', character: 'Velu' },
      { actor: 'MS Bhaskar', character: 'Muthu' },
    ],
    credits: {
      director: 'S Vijay Krishnan',
      producer: 'VK Productions',
      cinematography: 'Nikhil S. Praveen',
      music: 'Sean Roldan',
      editing: 'Anthony',
      artDirection: 'Jacki',
      soundDesign: 'Resul Pookutty (CAS)',
      production: 'VK Productions',
    },
    awards: [
      'Winner — Best Cinematography & Sound, State Film Awards 2022',
      'Official Selection — Singapore South Asian International Film Festival',
      'Nominated — Golden Gateway Award, MAMI 2022',
    ],
    accentColor: '#2DD4BF',
    status: 'released',
    featured: true,
  },
  {
    id: '3',
    slug: 'ratchagan-rises',
    title: 'RATCHAGAN RISES',
    year: '2021',
    language: 'Tamil',
    genre: ['Action', 'Political Drama', 'Crime'],
    role: 'Director',
    type: 'feature',
    runtime: '154 mins',
    tagline: 'When the law is weaponized, justice must become revolutionary.',
    synopsis:
      'A principled young district collector posted to an industrial coastal belt uncovers an entrenched nexus between offshore chemical dumping syndicates and corrupt state administrators. Faced with bureaucratic paralysis and lethal threats to his family, he wages an asymmetric war of tactical exposure, transforming civil defiance into an unstoppable grassroots revolution.',
    directorNote:
      'I wanted to craft a political thriller that refused cheap melodrama. In India, real courage is slow, institutional, and relentlessly tested against compromised systems. We paced the narrative like an accelerating countdown, balancing kinetic action set-pieces with intimate boardroom ethical dilemmas.',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    stills: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1000&q=80',
    ],
    cast: [
      { actor: 'Suriya (Special Appearance)', character: 'Mentor IAS' },
      { actor: 'Atharvaa', character: 'Madhavan IAS' },
      { actor: 'Prakash Raj', character: 'Minister Thangavel' },
      { actor: 'Aishwarya Rajesh', character: 'Advocate Veni' },
    ],
    credits: {
      director: 'S Vijay Krishnan',
      producer: 'Studio Green & VK Productions',
      cinematography: 'P.C. Sreeram (ISC)',
      music: 'Harris Jayaraj',
      editing: 'Ruben',
      artDirection: 'Milan',
      soundDesign: 'Kunal Rajan',
      production: 'Studio Green in association with VK Productions',
    },
    awards: [
      'Commercial & Critical Landmark — Top 10 Indian Films 2021',
      'Winner — Best Screenplay, Ananda Vikatan Cinema Awards',
      'Winner — Best Action Choreography, Behindwoods Gold Medals',
    ],
    accentColor: '#FF304F',
    status: 'released',
    featured: true,
  },
  {
    id: '4',
    slug: 'mazhai',
    title: 'MAZHAI',
    year: '2020',
    language: 'Tamil',
    genre: ['Short Film', 'Drama', 'Minimalist'],
    role: 'Director & Writer',
    type: 'short',
    runtime: '24 mins',
    tagline: 'In the thirst of the earth, a child measures eternity.',
    synopsis:
      'In a drought-parched hamlet of Ramanathapuram, seven-year-old Kayal believes that her paper boats hold the power to summon monsoons. Over three scorching days, as her family faces agrarian foreclosure, her unshakeable faith in the sky becomes an unexpected testament to human resilience.',
    directorNote:
      'Mazhai was filmed with a minimalist crew of eight individuals on natural daylight and reflectors. With virtually zero artificial embellishments, we learned that emotional amplitude expands when cinematic distraction is eliminated.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    stills: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    ],
    cast: [
      { actor: 'Baby Monica', character: 'Kayal' },
      { actor: 'Kalaiyarasan', character: 'Father Marimuthu' },
      { actor: 'Anjali', character: 'Mother Chellamma' },
    ],
    credits: {
      director: 'S Vijay Krishnan',
      producer: 'VK Films',
      cinematography: 'Arun Babu',
      music: 'Original Score by Sean Roldan',
      editing: 'S Vijay Krishnan',
      artDirection: 'S Vijay Krishnan',
      soundDesign: 'Sync Sound Studio',
      production: 'VK Films Independent Collective',
    },
    awards: [
      'Winner — Best Short Film, BIFFES Bangalore 2021',
      'Grand Jury Prize — Dharamshala International Film Festival (DIFF)',
      'Official Selection — Clermont-Ferrand International Short Film Festival',
    ],
    accentColor: '#3478F6',
    status: 'released',
    featured: true,
  },
  {
    id: '5',
    slug: 'vaanam-thiranthu',
    title: 'VAANAM THIRANTHU',
    year: '2024',
    language: 'Tamil',
    genre: ['Historical Drama', 'Epic', 'Family Chronicle'],
    role: 'Producer',
    type: 'feature',
    runtime: '162 mins',
    tagline: 'Three generations. One soil. Unbroken bloodlines.',
    synopsis:
      'A sweeping multi-generational chronicle tracing sixty years in the lives of three matriarchs against the sociopolitical metamorphosis of southern Tamil Nadu — from post-colonial land reforms through the industrialization epoch to the digital dawn.',
    directorNote:
      'As creative producer, my mandate was to give our directorial voice absolute artistic sovereignty while mounting an ambitious period canvas across seven historic locations. Great production does not constrain vision; it amplifies it.',
    poster: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    stills: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1000&q=80',
    ],
    cast: [
      { actor: 'Revathi', character: 'Parvathi Ammal' },
      { actor: 'Suhasini Maniratnam', character: 'Sundari' },
      { actor: 'Sai Pallavi', character: 'Kavitha' },
      { actor: 'Pasupathy', character: 'Paramasivam' },
    ],
    credits: {
      director: 'S. K. Ramanathan',
      producer: 'S Vijay Krishnan (VK Productions)',
      cinematography: 'Santosh Sivan (ASC, ISC)',
      music: 'A.R. Rahman',
      editing: 'A. Sreekar Prasad',
      artDirection: 'Thotta Tharani',
      soundDesign: 'Resul Pookutty',
      production: 'VK Productions in association with Lyca Productions',
    },
    awards: [
      'Winner — National Film Award for Best Feature in Tamil (Proposed Selection)',
      'Official Selection — Busan International Film Festival (A Window on Asian Cinema)',
      'Winner — Best Production Design, Filmfare Awards South',
    ],
    accentColor: '#E9B96E',
    status: 'released',
    featured: false,
  },
  {
    id: '6',
    slug: 'nila-kavithai',
    title: 'NILA KAVITHAI',
    year: '2025',
    language: 'Tamil',
    genre: ['Romantic Drama', 'Modern Urban Tale'],
    role: 'Director & Producer',
    type: 'feature',
    runtime: 'In Post-Production',
    tagline: 'Some encounters are written long before we arrive.',
    synopsis:
      'An intimate urban study set in the rain-washed corridors and sea-breezes of modern Chennai. Two strangers whose lives cross paths through an uncollected postal package embark on an unspoken voyage across memory, loss, and the rediscovery of wonder.',
    directorNote:
      'Currently in final sound mix and DI color grading. Nila Kavithai marks a return to deeply intimate human scale — exploring how digital disconnection can paradoxically nurture a profound hunger for genuine human grace.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    stills: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80',
    ],
    cast: [
      { actor: 'Dulquer Salmaan', character: 'Varun' },
      { actor: 'Nazriya Nazim', character: 'Tara' },
      { actor: 'Sathyaraj', character: 'Dr. Krishnan' },
    ],
    credits: {
      director: 'S Vijay Krishnan',
      producer: 'S Vijay Krishnan (VK Productions)',
      cinematography: 'Kavitha Mani',
      music: 'Govind Vasantha',
      editing: 'Philomin Raj',
      artDirection: 'Jacki',
      soundDesign: 'Sachin Sudhakaran (Sync Cinema)',
      production: 'VK Productions',
    },
    awards: [
      'Expected Release: Q4 2025',
      'Pre-Festival Premiere Scheduled',
    ],
    accentColor: '#F542A7',
    status: 'post-production',
    featured: false,
  },
];
