import { quizData as family } from "./family";
import { quizData as foodAndDrink } from "./foodAndDrink";
import { quizData as geography } from "./geography";
import { quizData as hobbies } from "./hobbies";
import { quizData as weather } from "./weather";
import { quizData as misc } from "./misc";
import type { QuizItem } from "./quizItem";

export type Category = {
  id: string;
  label: string;
  signs: QuizItem[];
  count: number;
};

export const allCategories: Category[] = [
  { id: "family", label: "家族物", signs: family, count: family.length },
  {
    id: "foodAndDrink",
    label: "飲食",
    signs: foodAndDrink,
    count: foodAndDrink.length,
  },
  { id: "geography", label: "地理", signs: geography, count: geography.length },
  { id: "hobbies", label: "趣味", signs: hobbies, count: hobbies.length },
  { id: "weather", label: "天気", signs: weather, count: weather.length },
  { id: "misc", label: "その他", signs: misc, count: misc.length },
];

export const allVideos: QuizItem[] = allCategories.flatMap((cat) => cat.signs);
