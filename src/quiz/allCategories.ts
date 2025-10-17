import { quizData as colors } from "./colors";
import { quizData as time } from "./time";
import { quizData as family } from "./family";
import { quizData as weather } from "./weather";
import { quizData as transportation } from "./transportation";
import { quizData as sports } from "./sports";
import { quizData as pain } from "./pain";
import { quizData as shopping } from "./shopping";
import { quizData as foodAndDrink } from "./foodAndDrink";
import { quizData as geography } from "./geography";
import { quizData as areas } from "./areas";
import { quizData as cooking } from "./cooking";
import { quizData as hobbies } from "./hobbies";
import { quizData as misc } from "./misc";
import { quizData as osakaExpo } from "./osakaExpo";
import type { QuizItem } from "./quizItem";

type CategoryDefinition = {
  id: string;
  slug?: string;
  label: string;
  signs: QuizItem[];
  count: number;
};

export type Category = CategoryDefinition & {
  slug: string;
};

const categoryDefinitions: CategoryDefinition[] = [
  { id: "colors", label: "３。色", signs: colors, count: colors.length },
  { id: "time", label: "１１。時間", signs: time, count: time.length },
  { id: "family", label: "１３。家族", signs: family, count: family.length },
  { id: "weather", label: "１４。天気", signs: weather, count: weather.length },
  {
    id: "transportation",
    label: "１５。交通手段",
    signs: transportation,
    count: transportation.length,
  },
  {
    id: "sports",
    label: "１６。スポーツ",
    signs: sports,
    count: sports.length,
  },
  {
    id: "pain",
    label: "１７。痛み",
    signs: pain,
    count: pain.length,
  },
  {
    id: "shopping",
    label: "１８。購買",
    signs: shopping,
    count: shopping.length,
  },
  {
    id: "foodAndDrink",
    label: "飲食",
    signs: foodAndDrink,
    count: foodAndDrink.length,
  },
  { id: "geography", label: "地理", signs: geography, count: geography.length },
  { id: "areas", label: "地域", signs: areas, count: areas.length },
  { id: "cooking", label: "料理", signs: cooking, count: cooking.length },
  { id: "hobbies", label: "趣味", signs: hobbies, count: hobbies.length },
  { id: "osakaExpo", slug: "osaka-expo", label: "万博", signs: osakaExpo, count: osakaExpo.length },
  { id: "misc", label: "その他", signs: misc, count: misc.length },
];

const slugFromId = (id: string) =>
  id.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

export const allCategories: Category[] = categoryDefinitions.map(
  (category) => ({
    ...category,
    slug: category.slug ?? slugFromId(category.id),
  })
);

export const allVideos: QuizItem[] = allCategories.flatMap((cat) => cat.signs);
