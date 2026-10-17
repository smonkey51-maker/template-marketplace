"use client";

import { Accordion } from "@ark-ui/react/accordion";
import { Switch } from "@ark-ui/react/switch";
import { Tabs } from "@ark-ui/react/tabs";

const item = "border-b border-[var(--border)]";

export default function ArkDemo() {
  return (
    <div className="space-y-6">
      <Tabs.Root defaultValue="a">
        <Tabs.List className="flex gap-4 border-b border-[var(--border)]">
          {[
            ["a", "Corpo"],
            ["b", "Persuasione"],
            ["c", "Mentalismo"],
          ].map(([v, l]) => (
            <Tabs.Trigger
              key={v}
              value={v}
              className="py-2 text-sm text-[var(--muted)] data-[selected]:border-b-2 data-[selected]:border-[var(--accent)] data-[selected]:text-[var(--text)]"
            >
              {l}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="a" className="py-3 text-sm">
          Linguaggio del corpo.
        </Tabs.Content>
        <Tabs.Content value="b" className="py-3 text-sm">
          Principi di persuasione.
        </Tabs.Content>
        <Tabs.Content value="c" className="py-3 text-sm">
          Cold reading e osservazione.
        </Tabs.Content>
      </Tabs.Root>

      <Accordion.Root collapsible defaultValue={["1"]}>
        {[
          ["1", "Cos'è il cold reading?"],
          ["2", "Come difendersi?"],
        ].map(([v, l]) => (
          <Accordion.Item key={v} value={v} className={item}>
            <Accordion.ItemTrigger className="flex w-full justify-between py-3 text-left">
              {l}
              <Accordion.ItemIndicator>▾</Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent className="pb-3 text-sm text-[var(--muted)]">
              Componente headless: logica e accessibilità di Ark, stile tutto nostro.
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <Switch.Root className="inline-flex items-center gap-3">
        <Switch.Control className="h-5 w-9 rounded-full border border-[var(--border)] p-0.5 data-[state=checked]:bg-[var(--accent)]">
          <Switch.Thumb className="block h-3.5 w-3.5 rounded-full bg-[var(--text)] transition-transform data-[state=checked]:translate-x-4 data-[state=checked]:bg-white" />
        </Switch.Control>
        <Switch.Label className="text-sm">Modalità lettura</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
    </div>
  );
}
