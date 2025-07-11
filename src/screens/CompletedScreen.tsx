import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { CheckCircle } from "lucide-react";

export function CompletedScreen() {
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
