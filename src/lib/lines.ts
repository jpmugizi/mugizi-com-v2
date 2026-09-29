export type Category = 'engineering' | 'career' | 'life';

// Each category is a subway line. Letters are the author's initials: J P M.
export const lines: Record<Category, { letter: string; name: string; lane: number }> = {
  engineering: { letter: 'J', name: 'Engineering', lane: 0 },
  career: { letter: 'P', name: 'Career', lane: 1 },
  life: { letter: 'M', name: 'Life', lane: 2 },
};

const WORDS_PER_MINUTE = 230;

export const readingMinutes = (text: string): number =>
  Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE));

export const monthsBetween = (a: Date, b: Date): number =>
  Math.abs(a.getUTCFullYear() - b.getUTCFullYear()) * 12 + Math.abs(a.getUTCMonth() - b.getUTCMonth());

// Splits a title so tokens like "COVID-19" can be kept on one line (odd indexes are the tokens).
export const titleParts = (title: string): string[] => title.split(/(\S*-\d\S*)/);
