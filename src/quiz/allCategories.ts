import { quizData as foodAndDrink } from "./foodAndDrink";
import { quizData as family } from "./family";
import { quizData as hobbies } from "./hobbies";
import { quizData as misc } from "./misc";
import type { QuizItem } from "./quizItem";

const allVideos: QuizItem[] = [...foodAndDrink, ...family, ...hobbies, ...misc];

export default allVideos;
