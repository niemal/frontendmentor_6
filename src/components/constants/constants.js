export const COLORS = {
  gray_blue: "hsl(237, 18%, 59%)",
  soft_red: "hsl(345, 95%, 68%)",
  white: "hsl(0, 0%, 100%)",
  dark_blue: "hsl(236, 21%, 26%)",
  very_dark_blue: "hsl(235, 16%, 14%)",
  very_dark_black_blue: "hsl(234, 17%, 12%)",
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 1080,
  exclusiveWidth: 1285,
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  exclusiveWidth: `(max-width: ${BREAKPOINTS.exclusiveWidth / 16}rem)`,
};
