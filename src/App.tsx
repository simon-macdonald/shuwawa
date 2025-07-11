import { Button } from "./components/ui/button";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import { ConfettiBurst } from "./ConfettiBurst";
import { useCategories } from "./useCategories";
import { useQuiz } from "./quiz/useQuiz";
import { keys, pickBy } from "lodash";
import { CompletedScreen } from "./screens/CompletedScreen";
import { CategorySelectionScreen } from "./screens/CategorySelectionScreen";

function App() {
  const [showConfetti, setShowConfetti] = useState(false);

  const { categories, selected, toggle, totalSelectedSigns } = useCategories([
    "sports",
  ]);

  const {
    startQuiz,
    currentVideo,
    next,
    index,
    total,
    status,
    answerOptions,
  } = useQuiz();

  const success = () => {
    next();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 500);
  };
  const failure = () => {};

  if (status === "idle") {
    return (
      <CategorySelectionScreen
        categories={categories}
        selected={selected}
        onToggle={toggle}
        totalSelectedSigns={totalSelectedSigns}
        onStartQuiz={() => startQuiz(keys(pickBy(selected, Boolean)))}
      />
    );
  }

  if (status === "completed") {
    return <CompletedScreen />;
  }

  if (currentVideo) {
    const buttonCommonProps = {
      className: "flex-1 text-base md:text-lg h-12 md:h-14",
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-4 py-6 space-y-4 md:space-y-6">
        <p className="text-lg">
          {index + 1} / {total}
        </p>
        <VideoPlayer quizItem={currentVideo} />
        <div className="w-full max-w-3xl flex gap-2 sm:gap-3 px-4 sm:px-0">
          {answerOptions.map((option) => (
            <Button
              key={option}
              onClick={option === currentVideo.vocab ? success : failure}
              {...buttonCommonProps}
            >
              {option}
            </Button>
          ))}
        </div>
        <ConfettiBurst trigger={showConfetti} />
      </div>
    );
  }
  
  return <div className="flex items-center justify-center min-h-svh">Loading...</div>;
}

export default App;
