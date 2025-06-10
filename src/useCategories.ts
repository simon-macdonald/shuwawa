import { useMemo, useState } from "react";
import { allCategories } from "./quiz/allCategories";

export function useCategories(initial?: string[]) {
  const [selected, setSelected] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    for (const cat of allCategories) {
      defaults[cat.id] = initial?.includes(cat.id) ?? true;
    }
    return defaults;
  });

  const toggle = (id: string) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalSelectedSigns = useMemo(() => {
    return allCategories
      .filter((cat) => selected[cat.id])
      .reduce((sum, cat) => sum + cat.signs.length, 0);
  }, [allCategories, selected]);

  return { categories: allCategories, selected, toggle, totalSelectedSigns };
}
