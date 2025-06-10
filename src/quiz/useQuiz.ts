import { useState } from "react";
import { shuffle } from "lodash";
import type { QuizItem } from "./quizItem";
import { allCategories } from "./allCategories";

type QuizStatus = "idle" | "in-progress" | "completed";

export type UseQuiz = {
  startQuiz: (selectedCategories: string[]) => void;
  currentVideo: QuizItem;
  next: () => void;
  index: number;
  total: number;
  status: QuizStatus;
};

export function useQuiz(): UseQuiz {
  const [quizList, setQuizList] = useState<QuizItem[]>([]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<QuizStatus>("idle");

  const startQuiz = (selectedCategories: string[]) => {
    const videos = allCategories
      .filter((cat) => selectedCategories.includes(cat.id))
      .flatMap((cat) => cat.signs);

    const randomized = shuffle(videos);
    setQuizList(randomized);
    setIndex(0);
    setStatus("in-progress");
  };

  const next = () => {
    if (index + 1 < quizList.length) {
      setIndex((i) => i + 1);
    } else {
      setStatus("completed");
    }
  };

  const currentVideo = quizList[index] || null;

  return {
    startQuiz,
    currentVideo,
    next,
    index,
    total: quizList.length,
    status,
  };
}
