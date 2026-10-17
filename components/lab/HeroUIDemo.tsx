"use client";

import { Button, Card, Chip, Tabs } from "@heroui/react";

export default function HeroUIDemo() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Chip>Dossier</Chip>
        <Chip color="accent">Guida</Chip>
      </div>
      <Card>
        <Card.Header>
          <Card.Title>Card HeroUI</Card.Title>
          <Card.Description>Componenti React Aria + Tailwind v4.</Card.Description>
        </Card.Header>
        <Card.Content>Accessibilità da tastiera e screen reader inclusa di serie.</Card.Content>
      </Card>
      <Tabs>
        <Tabs.ListContainer>
          <Tabs.List aria-label="HeroUI tabs">
            <Tabs.Tab id="a">
              Corpo
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="b">
              Persuasione
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="c">
              Mentalismo
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel id="a">Linguaggio del corpo.</Tabs.Panel>
        <Tabs.Panel id="b">Principi di persuasione.</Tabs.Panel>
        <Tabs.Panel id="c">Cold reading e osservazione.</Tabs.Panel>
      </Tabs>
    </div>
  );
}
