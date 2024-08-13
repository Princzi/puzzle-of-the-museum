export const keyActions = [
  {
    key: "ArrowLeft",
    onX: (x) => x + 1,
    onY: (y) => y,
  },
  {
    key: "ArrowRight",
    onX: (x) => x - 1,
    onY: (y) => y,
  },
  {
    key: "ArrowDown",
    onX: (x) => x,
    onY: (y) => y - 1,
  },
  {
    key: "ArrowUp",
    onX: (x) => x,
    onY: (y) => y + 1,
  },
];
