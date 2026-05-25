const API_URL = import.meta.env.VITE_API_URL;

export const api = (path) => {
  return `${API_URL}${path}`;
};