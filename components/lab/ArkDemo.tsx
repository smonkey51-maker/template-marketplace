"use client";

import { Accordion } from "@ark-ui/react/accordion";
import { Switch } from "@ark-ui/react/switch";
import { Tabs } from "@ark-ui/react/tabs";

const tab =
  "-mb-px border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-muted data-selected:border-brand data-selected:text-ink dark:data-selected:border-accent";

/** Ark UI primitives on a single page: Tabs, Accordion, Switch. */
export default function ArkDemo() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
          Tabs
        </h2>
        <Tabs.Root defaultValue="a" className="mt-4">
          <Tabs.List className="flex gap-6 border-b border-line">
            {[
              ["a", "Strategia"],
              ["b", "Persone"],
              ["c", "Processi"],
            ].map(([v, l]) => (
              <Tabs.Trigger key={v} value={v} className={tab}>
                {l}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Tabs.Content value="a" className="pt-4 text-[15px] text-muted">
            Contenuto della prima scheda.
          </Tabs.Content>
          <Tabs.Content value="b" className="pt-4 text-[15px] text-muted">
            Contenuto della seconda scheda.
          </Tabs.Content>
          <Tabs.Content value="c" className="pt-4 text-[15px] text-muted">
            Contenuto della terza scheda.
          </Tabs.Content>
        </Tabs.Root>
      </section>

      <section>
        <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
          Accordion
        </h2>
        <Accordion.Root collapsible defaultValue={["1"]} className="mt-4">
          {[
            ["1", "Che cos'è questo ambiente?"],
            ["2", "I contenuti sono reali?"],
          ].map(([v, l]) => (
            <Accordion.Item key={v} value={v} className="border-b border-line first:border-t">
              <Accordion.ItemTrigger className="flex w-full justify-between py-4 text-left text-[15px] font-medium">
                {l}
                <Accordion.ItemIndicator className="font-mono text-muted">
                  ▾
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent className="pb-4 text-[15px] text-muted">
                Primitive senza stile di Ark UI: logica e accessibilità incluse, aspetto definito
                dal sito.
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>

      <section>
        <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
          Switch
        </h2>
        <Switch.Root className="mt-4 inline-flex items-center gap-3">
          <Switch.Control className="h-5 w-9 rounded-sm border border-line-strong bg-bg p-0.5 data-[state=checked]:border-brand data-[state=checked]:bg-brand">
            <Switch.Thumb className="block h-3.5 w-3.5 rounded-sm bg-line-strong transition-transform data-[state=checked]:translate-x-4 data-[state=checked]:bg-brand-fg" />
          </Switch.Control>
          <Switch.Label className="text-sm">Notifiche di prova</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Root>
      </section>
    </div>
  );
}
