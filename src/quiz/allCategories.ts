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
};

export const allCategories: Category[] = [
  { id: "family", label: "家族物", signs: family },
  { id: "foodAndDrink", label: "飲食", signs: foodAndDrink },
  { id: "geography", label: "地理", signs: geography },
  { id: "hobbies", label: "趣味", signs: hobbies },
  { id: "weather", label: "天気", signs: weather },
  { id: "misc", label: "その他", signs: misc },
];

export const allVideos: QuizItem[] = allCategories.flatMap((cat) => cat.signs);
