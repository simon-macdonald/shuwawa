import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import type { Category } from "./quiz/allCategories";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Props = {
  categories: Category[];
  selected: Record<string, boolean>;
  onToggle: (id: string) => void;
};

function CategoriesCard({ categories, selected, onToggle }: Props) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>カテゴリー</CardTitle>
        <CardDescription>
          <p>クイズで使われる手話のカテゴリーを選んでください。</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between py-1 group"
          >
            <div className="flex items-center space-x-2">
              <Switch
                id={cat.id}
                checked={selected[cat.id]}
                onCheckedChange={() => onToggle(cat.id)}
              />
              <div className="flex items-center gap-2">
                <Label
                  htmlFor={cat.id}
                  className="cursor-pointer text-lg"
                >
                  {cat.label}
                </Label>
                <Link
                  to={`/${cat.slug}`}
                  className="text-muted-foreground opacity-0 transition hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
                  aria-label={`${cat.label} を見る`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            {typeof cat.count === "number" && (
              <Badge variant="secondary">{cat.count}</Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default CategoriesCard;
