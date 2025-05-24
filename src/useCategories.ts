import { useState } from "react";

export function useCategories(initial?: string[]) {
  const categories = [
    { id: "foodAndDrink", label: "飲食" },
    { id: "family", label: "家族物" },
    { id: "hobbies", label: "趣味" },
  ];

  const [selected, setSelected] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    for (const cat of categories) {
      defaults[cat.id] = initial?.includes(cat.id) ?? true;
    }
    return defaults;
  });

  const toggle = (id: string) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  return { categories, selected, toggle };
}
