let lastId = 0;

export const getUniqueId = () => {
  lastId++;
  return `id-${lastId}`;
};
