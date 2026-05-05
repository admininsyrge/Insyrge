import { IMAGE_URL } from "../API";
import blankAvatar from "../Assets/Images/blank.png";

/**
 * Standardized image URL resolver for the Admin panel.
 *
 * Handles every format the backend may return:
 *   - null / undefined / ""        → fallback placeholder
 *   - Full URL (http/https/data:)  → returned as-is
 *   - Object with `.url` property  → extracts and resolves `.url`
 *   - Relative path string         → prepends IMAGE_URL
 *
 * @param {string|object|null} imagePath - The image path from the API
 * @param {string} [fallback]            - Custom fallback image (defaults to blank avatar)
 * @returns {string} A valid image URL
 */
export const getImageUrl = (imagePath, fallback = blankAvatar) => {
  if (!imagePath) return fallback;

  // If it's an object with a `.url` property (blogs format)
  if (typeof imagePath === "object" && imagePath !== null) {
    if (imagePath.url) return getImageUrl(imagePath.url, fallback);
    if (imagePath.image) return getImageUrl(imagePath.image, fallback);
    return fallback;
  }

  // If it's already a full URL
  if (
    typeof imagePath === "string" &&
    (imagePath.startsWith("http://") ||
      imagePath.startsWith("https://") ||
      imagePath.startsWith("data:"))
  ) {
    return imagePath;
  }

  // Relative path — join with IMAGE_URL, handling double-slash
  const base = IMAGE_URL.endsWith("/") ? IMAGE_URL.slice(0, -1) : IMAGE_URL;
  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${base}${path}`;
};

/**
 * onError handler for <img> tags — sets a fallback on broken images.
 *
 * Usage: <img onError={handleImageError} ... />
 */
export const handleImageError = (e) => {
  e.target.onerror = null; // prevent infinite loop
  e.target.src = blankAvatar;
  e.target.style.objectFit = "contain";
  e.target.style.opacity = "0.5";
};
