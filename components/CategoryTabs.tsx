"use client";

import { useRouter } from "next/navigation";
import { Tabs } from "@heroui/react";

type Item = { key: string; label: string };

/** Archive category filter — HeroUI Tabs, navigating via the ?categoria= param
 * so the server page keeps doing the actual filtering. */
export default function CategoryTabs({
  lang,
  active,
  items,
}: {
  lang: string;
  active: string;
  items: Item[];
}) {
  const router = useRouter();
  return (
    <Tabs
      selectedKey={active}
      onSelectionChange={(key) =>
        router.push(key === "all" ? `/${lang}/articoli` : `/${lang}/articoli?categoria=${key}`)
      }
    >
      <Tabs.ListContainer className="overflow-x-auto">
        <Tabs.List aria-label="Categorie">
          {items.map((item) => (
            <Tabs.Tab key={item.key} id={item.key}>
              {item.label}
              <Tabs.Indicator />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
