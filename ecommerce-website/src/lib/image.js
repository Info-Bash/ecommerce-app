const BASE_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (path) => {
  return `${BASE_URL}${path}`;
};