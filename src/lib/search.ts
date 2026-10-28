import { articles } from "@/content/articles";
import { exercises } from "@/content/exercises";
import { programs } from "@/content/programs";

const expansions: [RegExp, string][] = [
  [/stiff shoulders?/, "shoulder mobility circles"],
  [/without floor|no[- ]floor|exercises without floor/, "standing chair wall"],
  [/seniors?|older adults?|60\+|70\+/, "balance chair gentle ageing"],
  [/beginner baithak/, "baithak beginner squat"],
  [/10[- ]?minute morning|morning routine/, "morning mobility"],
  [/indian bodyweight/, "dand baithak surya"],
  [/desk|office/, "shoulder spine wrist hip"],
];

function haystack(parts: string[]) {
  return parts.join(" ").toLowerCase();
}

export function normalizeQuery(query: string) {
  let text = query.toLowerCase().trim();
  for (const [pattern, extra] of expansions) {
    if (pattern.test(text)) text = `${text} ${extra}`;
  }
  return text;
}

function score(query: string, text: string) {
  const tokens = query.split(/\s+/).filter((token) => token.length > 1);
  if (!tokens.length) return 0;
  return tokens.reduce((total, token) => total + (text.includes(token) ? 1 : 0), 0);
}

export function searchContent(raw: string) {
  const query = normalizeQuery(raw);
  const exerciseHits = exercises
    .map((exercise) => ({
      exercise,
      score: score(
        query,
        haystack([
          exercise.name,
          exercise.traditionalName ?? "",
          exercise.summary,
          exercise.category,
          exercise.pillars.join(" "),
          exercise.bodyAreas.join(" "),
          exercise.positions.join(" "),
          exercise.searchTerms.join(" "),
          exercise.variations.map((item) => `${item.name} ${item.level}`).join(" "),
        ]),
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const programHits = programs
    .map((program) => ({
      program,
      score: score(query, haystack([program.name, program.summary, program.focus.join(" "), program.ageNote])),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const articleHits = articles
    .map((article) => ({
      article,
      score: score(
        query,
        haystack([article.title, article.summary, article.category, ...article.sections.map((section) => section.heading)]),
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return { exerciseHits, programHits, articleHits };
}
