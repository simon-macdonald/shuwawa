import { Button } from "@/components/ui/button";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import { ConfettiBurst } from "./ConfettiBurst";
import CategoriesCard from "./CategoriesCard";
import { useCategories } from "./useCategories";
import { useQuiz } from "./quiz/useQuiz";
import { keys, pickBy } from "lodash";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { CheckCircle } from "lucide-react";

function App() {
  const [showConfetti, setShowConfetti] = useState(false);

  const { categories, selected, toggle, totalSelectedSigns } = useCategories();

  const { startQuiz, currentVideo, next, index, total, status } = useQuiz();

  const success = () => {
    next();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 500);
  };
  const failure = () => {};

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

  return (
    <div className="flex flex-col items-center justify-center min-h-svh px-4 space-y-6">
      <p>
        {index + 1} / {total}
      </p>
      <VideoPlayer
        quizItem={currentVideo}
        success={success}
        failure={failure}
      />
      <ConfettiBurst trigger={showConfetti} />
    </div>
  );
}

export default App;
