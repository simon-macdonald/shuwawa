import { Button } from "@/components/ui/button";
import { allCategories } from "@/quiz/allCategories";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CategorySignCard } from "./CategorySignCard";

export function CategoryShowcase() {
  const { slug } = useParams<{ slug: string }>();
  const category = allCategories.find((item) => item.slug === slug);

  if (!category) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div>
          <h1 className="text-3xl font-semibold mb-2">カテゴリーが見つかりません</h1>
          <p className="text-muted-foreground">
            リンクが無効か、ページが移動した可能性があります。
          </p>
        </div>
        <Button asChild>
          <Link to="/">カテゴリー一覧に戻る</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 md:py-16 max-w-6xl mx-auto">
      <header className="sticky top-0 z-10 -mx-4 mb-10 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-4xl font-semibold">{category.label}</h1>
        <Button asChild variant="ghost" size="icon" className="h-10 w-10">
          <Link to="/" aria-label="カテゴリー一覧に戻る">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.signs.map((sign) => (
          <CategorySignCard
            key={`${category.id}-${sign.youtubeId}`}
            sign={sign}
          />
        ))}
      </div>
    </div>
  );
}
