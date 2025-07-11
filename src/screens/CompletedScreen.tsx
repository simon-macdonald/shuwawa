import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { CheckCircle, RotateCcw } from "lucide-react";

interface CompletedScreenProps {
  onReset: () => void;
}

export function CompletedScreen({ onReset }: CompletedScreenProps) {
  return (
    <div className="relative min-h-svh flex items-center justify-center px-4">
      <Alert className="w-full max-w-md border-green-500 bg-green-50 text-green-800 flex flex-col items-center justify-center space-y-4 p-6 rounded-xl shadow-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
          aria-label="もう一度プレイ"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>

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
