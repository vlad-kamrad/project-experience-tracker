function hashCode(inputString: string) {
  let hash = 0;

  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

/**
 * Converts any string to hsl color
 * @param inputString
 * @param scale factor of lightness
 * @returns hsl(x, 100%, scale)
 */
export function stringToColor(inputString: string, scale: number = 85) {
  return `hsl(${hashCode(inputString) % 360}, 100%, ${scale}%)`;
}
