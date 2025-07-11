import { Button } from "../components/ui/button";
import CategoriesCard from "../CategoriesCard";
import type { Category } from "@/quiz/allCategories";

interface CategorySelectionScreenProps {
  categories: Category[];
  selected: Record<string, boolean>;
  onToggle: (category: string) => void;
  totalSelectedSigns: number;
  onStartQuiz: () => void;
}

export function CategorySelectionScreen({
  categories,
  selected,
  onToggle,
  totalSelectedSigns,
  onStartQuiz,
}: CategorySelectionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh px-4 space-y-6">
      <CategoriesCard
        categories={categories}
        selected={selected}
        onToggle={onToggle}
      />
      <Button
        className="w-full max-w-md py-3 text-base font-semibold rounded-xl shadow-sm hover:bg-primary/90 transition"
        onClick={onStartQuiz}
        disabled={totalSelectedSigns === 0}
      >
        スタート （{totalSelectedSigns}個）
      </Button>
    </div>
  );
}
