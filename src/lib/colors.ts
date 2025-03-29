function hashCode(inputString: string) {
  let hash = 0;

  if (!inputString.length) {
    return hash;
  }

  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

export function stringToRgbColor(inputString: string) {
  const hash = hashCode(inputString);

  const rgb = [0, 0, 0];

  for (let i = 0; i < rgb.length; i++) {
    rgb[i] = (hash >> (i * 8)) & 255;
  }

  return `rgb(${rgb.join(", ")})`;
}

/**
 * Converts any string to hsl color
 * @param inputString
 * @param scale factor of lightness
 * @returns hsl(x, 100%, scale)
 */
export function stringToHslColor(inputString: string, scale: number = 85) {
  return `hsl(${hashCode(inputString) % 360}, 100%, ${scale}%)`;
}
