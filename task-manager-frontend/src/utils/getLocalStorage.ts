export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }
  return item;
};
