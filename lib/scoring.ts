export function scoreStory(title: string, content: string = ''): number {
  const text = (title + ' ' + content).toLowerCase();
  let score = 1;

  const keywords = [
    { word: 'design system', weight: 2 },
    { word: 'typography', weight: 1 },
    { word: 'figma', weight: 1 },
    { word: 'accessibility', weight: 2 },
    { word: 'release', weight: 1 },
    { word: 'major', weight: 1 },
    { word: 'report', weight: 1 }
  ];

  for (const { word, weight } of keywords) {
    if (text.includes(word)) {
      score += weight;
    }
  }

  // Cap at 5
  return Math.min(Math.max(score, 1), 5);
}
