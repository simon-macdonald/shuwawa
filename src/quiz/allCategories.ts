import { quizData as areas } from "./areas";
import { quizData as cooking } from "./cooking";
import { quizData as colors } from "./colors";
import { quizData as family } from "./family";
import { quizData as foodAndDrink } from "./foodAndDrink";
import { quizData as geography } from "./geography";
import { quizData as hobbies } from "./hobbies";
import { quizData as misc } from "./misc";
import { quizData as osakaExpo } from "./osakaExpo";
import type { QuizItem } from "./quizItem";
import { quizData as pain } from "./pain";
import { quizData as shopping } from "./shopping";
import { quizData as sports } from "./sports";
import { quizData as time } from "./time";
import { quizData as transportation } from "./transportation";
import { quizData as weather } from "./weather";

type CategoryDefinition = {
  id: string;
  slug?: string;
  label: string;
  signs: QuizItem[];
};

export type Category = CategoryDefinition & {
  slug: string;
  count: number;
};

const categoryDefinitions: CategoryDefinition[] = [
  { id: "colors", label: "３。色", signs: colors },
  { id: "time", label: "１１。時間", signs: time },
  { id: "family", label: "１３。家族", signs: family },
  { id: "weather", label: "１４。天気", signs: weather },
  { id: "transportation", label: "１５。交通手段", signs: transportation },
  { id: "sports", label: "１６。スポーツ", signs: sports },
  { id: "pain", label: "１７。痛み", signs: pain },
  { id: "shopping", label: "１８。購買", signs: shopping },
  { id: "misc", label: "その他", signs: misc },
  { id: "foodAndDrink", slug: "food-and-drink", label: "飲食", signs: foodAndDrink },
  { id: "hobbies", label: "趣味", signs: hobbies },
  { id: "osakaExpo", slug: "osaka-expo", label: "大阪万博", signs: osakaExpo },
  { id: "areas", label: "地域", signs: areas },
  { id: "geography", label: "地理", signs: geography },
  { id: "cooking", label: "料理", signs: cooking },
];

const slugFromId = (id: string) =>
  id.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const labelCollator = new Intl.Collator("ja", { numeric: true });

const sortedDefinitions = [...categoryDefinitions].sort((a, b) =>
  labelCollator.compare(a.label, b.label)
);

export const allCategories: Category[] = sortedDefinitions.map(
  (category) => ({
    ...category,
    slug: category.slug ?? slugFromId(category.id),
    count: category.signs.length,
  })
);

export const allVideos: QuizItem[] = allCategories.flatMap((cat) => cat.signs);
