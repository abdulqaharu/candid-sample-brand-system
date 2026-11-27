/**
 * Where the three stacks stand in plant-refinery-9252122.jpg, in the image's own
 * pixels. Measured from the photo. Everything drawn over it derives from these.
 */
export const PHOTO = { width: 2400, height: 1200 };

/** Each stack's axis, and the top of its cap. */
export const STACKS = [
  { x: 1401.8, top: 189 },
  { x: 1480.2, top: 210 },
  { x: 1554.2, top: 232.5 },
];

/** Where the centrelines end, down the shafts. */
export const CENTERLINE_FOOT = 732;
/** How far a centreline runs past the top of its cap. */
export const CENTERLINE_OVER = 4;
/** The height of the one dimension across the stacks. */
export const DIMENSION_Y = 157;
/** Where the witness lines begin, just past the dimension. */
export const WITNESS_Y = 142;
/** The gap between a witness line and the centreline below it. */
export const WITNESS_GAP = 8;
/** Half the width and height of a 45 degree slash. */
export const SLASH = 8;
/** From the last stack to the label. */
export const LABEL_GAP = 29;
/** The label's size, so that it is 12 units on the 560 × 440 still. */
export const LABEL_SIZE = 24;
export const LABEL = "Three stacks, one pitch";
/** The part of the photo the drawing must keep in view on narrow screens. */
export const STACK_SPAN = { left: STACKS[0].x - 24, right: STACKS[2].x + 24 };
