import { quizData as colors } from "./colors";
import { quizData as time } from "./time";
import { quizData as family } from "./family";
import { quizData as weather } from "./weather";
import { quizData as transportation } from "./transportation";
import { quizData as sports } from "./sports";
import { quizData as foodAndDrink } from "./foodAndDrink";
import { quizData as geography } from "./geography";
import { quizData as areas } from "./areas";
import { quizData as hobbies } from "./hobbies";
import { quizData as misc } from "./misc";
import type { QuizItem } from "./quizItem";

export type Category = {
  id: string;
  label: string;
  signs: QuizItem[];
  count: number;
};

export const allCategories: Category[] = [
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
    id: "foodAndDrink",
    label: "飲食",
    signs: foodAndDrink,
    count: foodAndDrink.length,
  },
  { id: "geography", label: "地理", signs: geography, count: geography.length },
  { id: "areas", label: "地域", signs: areas, count: areas.length },
  { id: "hobbies", label: "趣味", signs: hobbies, count: hobbies.length },
  { id: "misc", label: "その他", signs: misc, count: misc.length },
];

export const allVideos: QuizItem[] = allCategories.flatMap((cat) => cat.signs);
