/** Portrait slideshow shown in the "The Filmmaker" section on the home page. Files live in public/images/vijay/. */
export interface Portrait {
  src: string;
  pngSrc: string;
  jpgSrc: string;
  alt: string;
}

const COUNT = 20;

export const portraits: Portrait[] = Array.from({ length: COUNT }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    src: `/images/vijay/vijay-${num}.png`,
    pngSrc: `/images/vijay/vijay-${num}.png`,
    jpgSrc: `/images/vijay/vijay-${num}.jpg`,
    alt: `S Vijay Krishnan, Tamil film director and producer, on set — photo ${i + 1} of ${COUNT}`,
  };
});
