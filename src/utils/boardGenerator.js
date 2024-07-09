const generateInitialBoard = () => {
  const template = `
      P H H H H H P H H H H H P
      V B B B B B V B B B B B V
      V B P H H H P H H H P B V
      V B V B B B V B B B V B V
      V B V B P H P H P B V B V
      V B V B V B B B V B V B V
      P H P H P B B B P H P H P
      V B V B V B B B V B V B V
      V B V B P H P H P B V B V
      V B V B B B V B B B V B V
      V B P H H H P H H H P B V
      V B B B B B V B B B B B V
      P H H H H H P H H H H H P
    `;

  const rows = template
    .trim()
    .split("\n")
    .map((row) => row.trim().split(" "));
  return rows;
};

export default generateInitialBoard;
