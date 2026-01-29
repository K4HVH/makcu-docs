/**
 * Get a CSS variable value from the document root
 * @param name CSS variable name (e.g., '--color-primary')
 * @returns The value of the CSS variable, trimmed
 */
export const getCSSVariable = (name: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

/**
 * Set a CSS variable value on the document root
 * @param name CSS variable name (e.g., '--color-primary')
 * @param value The value to set
 */
export const setCSSVariable = (name: string, value: string): void => {
  document.documentElement.style.setProperty(name, value);
};
