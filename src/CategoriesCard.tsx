import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

type Category = {
  id: string;
  label: string;
};

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
          <div className="flex items-center space-x-2">
            <Switch
              id={cat.id}
              checked={selected[cat.id]}
              onCheckedChange={() => onToggle(cat.id)}
            />
            <Label htmlFor={cat.id}>{cat.label}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default CategoriesCard;
