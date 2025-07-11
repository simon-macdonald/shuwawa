import { useState } from "react";
import { sampleSize, shuffle, without } from "lodash";
import type { QuizItem } from "./quizItem";
import { allCategories, allVideos } from "./allCategories";

type QuizStatus = "idle" | "active" | "completed";

const generateOptions = (correctAnswer: string): string[] => {
  const allVocab = allVideos.map((v) => v.vocab);
  const wrongAnswerPool = without(allVocab, correctAnswer);
  const wrongAnswers = sampleSize(wrongAnswerPool, 3);
  const allOptions = [correctAnswer, ...wrongAnswers];
  return shuffle(allOptions);
};

export function useQuiz() {
  const [quizList, setQuizList] = useState<QuizItem[]>([]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<QuizStatus>("idle");
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);

  const currentVideo = quizList[index];
  const total = quizList.length;

  const startQuiz = (selectedCategories: string[]) => {
    const videos = allCategories
      .filter((cat) => selectedCategories.includes(cat.id))
      .flatMap((cat) => cat.signs);
    const shuffled = shuffle(videos);
    setQuizList(shuffled);
    setIndex(0);
    setStatus("active");

    setAnswerOptions(generateOptions(shuffled[0].vocab));
  };

  const next = () => {
    const nextIndex = index + 1;
    if (nextIndex < quizList.length) {
      setIndex(nextIndex);
      setAnswerOptions(generateOptions(quizList[nextIndex].vocab));
    } else {
      setStatus("completed");
      setQuizList([]);
      setIndex(0);
      setAnswerOptions([]);
    }
  };

  return {
    startQuiz,
    currentVideo,
    next,
    index,
    total,
    status,
    answerOptions,
  };
}