"use client";

import { useListData } from "@react-stately/data";
import { Tag, TagGroup } from "@/components/TagGroup";

export default function Home() {
  const list = useListData({
    initialItems: [
      {
        id: 1,
        name: "react",
      },
      {
        id: 2,
        name: "react-aria-components",
      },
      {
        id: 3,
        name: "tailwind-css",
      },
    ],
  });

  return (
    <main className="grid min-h-dvh place-content-center p-4">
      <TagGroup
        items={list.items}
        label="Tag group example"
        onRemove={(keys) => list.remove(...keys)}
      >
        {(item) => <Tag color="sky">{item.name}</Tag>}
      </TagGroup>
    </main>
  );
}
