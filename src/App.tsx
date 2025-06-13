import { Button } from "./components/ui/button";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import { ConfettiBurst } from "./ConfettiBurst";
import CategoriesCard from "./CategoriesCard";
import { useCategories } from "./useCategories";
import { useQuiz } from "./quiz/useQuiz";
import { keys, pickBy, sample, shuffle } from "lodash";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { CheckCircle } from "lucide-react";
import { allVideos } from "./quiz/allCategories";

function App() {
  const [showConfetti, setShowConfetti] = useState(false);

  const { categories, selected, toggle, totalSelectedSigns } = useCategories([
    "weather",
  ]);

  const { startQuiz, currentVideo, next, index, total, status } = useQuiz();

  const success = () => {
    next();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 500);
  };
  const failure = () => {};

  // Moved from VideoPlayer.tsx - ideally, this logic would live in useQuiz
  function findWrongAnswer(correctAnswer: string): string {
    const maybe = sample(allVideos)?.vocab;
    if (maybe && correctAnswer !== maybe) {
      return maybe;
    }
    // Ensure a value is always returned, recurse if undefined or same as correct
    return findWrongAnswer(correctAnswer);
  }

  if (status === "idle") {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-4 space-y-6">
        <CategoriesCard
          categories={categories}
          selected={selected}
          onToggle={toggle}
        />
        <Button
          className="w-full max-w-md py-3 text-base font-semibold rounded-xl shadow-sm hover:bg-primary/90 transition"
          onClick={() => startQuiz(keys(pickBy(selected, Boolean)))}
        >
          スタート （{totalSelectedSigns}個）
        </Button>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="min-h-svh flex items-center justify-center px-4">
        <Alert className="w-full max-w-md border-green-500 bg-green-50 text-green-800 flex flex-col items-center justify-center space-y-4 p-6 rounded-xl shadow-md">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <AlertTitle className="text-xl font-semibold">
            おめでとうございます！
          </AlertTitle>
          <AlertDescription className="text-center">
            クイズに全問正解しました！手話の力、見事です。
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // This block will render when status is 'active' and currentVideo is available
  if (currentVideo) {
    const buttonCommonProps = {
      className: "flex-1 text-base md:text-lg h-12 md:h-14",
    };

    const correctAnswer = <Button onClick={success} {...buttonCommonProps}>{currentVideo.vocab}</Button>;
    // Ensure findWrongAnswer is called correctly and provides unique distractors if needed
    const wrongAnswer1 = (
      <Button onClick={failure} {...buttonCommonProps}>{findWrongAnswer(currentVideo.vocab)}</Button>
    );
    const wrongAnswer2 = (
      <Button onClick={failure} {...buttonCommonProps}>{findWrongAnswer(currentVideo.vocab)}</Button>
    );
    const wrongAnswer3 = (
      <Button onClick={failure} {...buttonCommonProps}>{findWrongAnswer(currentVideo.vocab)}</Button>
    );
    const shuffledAnswers = shuffle([
      correctAnswer,
      wrongAnswer1,
      wrongAnswer2,
      wrongAnswer3,
    ]);

    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-4 py-6 space-y-4 md:space-y-6">
        <p className="text-lg">
          {index + 1} / {total}
        </p>
        <VideoPlayer quizItem={currentVideo} />
        <div className="w-full max-w-3xl flex gap-2 sm:gap-3 px-4 sm:px-0">
          {shuffledAnswers}
        </div>
        <ConfettiBurst trigger={showConfetti} />
      </div>
    );
  }
  
  return <div className="flex items-center justify-center min-h-svh">Loading...</div>;
}

export default App;
