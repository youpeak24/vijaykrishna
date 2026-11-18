/** Portrait slideshow shown in the "The Filmmaker" section on the home page. Files live in public/images/vijay/. */
export interface Portrait {
  src: string;
  alt: string;
}

const COUNT = 20;

export const portraits: Portrait[] = Array.from({ length: COUNT }, (_, i) => ({
  src: `/images/vijay/vijay-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Vijay Krishnan, Tamil film director and producer, on set — photo ${i + 1} of ${COUNT}`,
}));
