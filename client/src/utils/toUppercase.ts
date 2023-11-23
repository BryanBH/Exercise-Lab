export const toUppercaseWord = (word: string): string => {
  const firstLetterCap = word.charAt(0).toUpperCase();

  const restOfWord = word.slice(1);

  const capitilzedWord = firstLetterCap + restOfWord;

  return capitilzedWord;
};
