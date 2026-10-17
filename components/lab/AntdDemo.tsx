"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, Collapse, ConfigProvider, Segmented, Steps, Tag } from "antd";

export default function AntdDemo() {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#8A625E",
            colorText: "#26348C",
            borderRadius: 2,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          },
        }}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Tag color="#8A625E">Dossier</Tag>
            <Tag>Guida</Tag>
          </div>
          <Segmented options={["Archivio", "Dossier", "Guide"]} />
          <Steps
            size="small"
            current={1}
            items={[{ title: "Osserva" }, { title: "Deduci" }, { title: "Verifica" }]}
          />
          <Collapse
            items={[
              {
                key: "1",
                label: "Cos'è il cold reading?",
                children: "Una tecnica di lettura per inferenze.",
              },
              { key: "2", label: "Come difendersi?", children: "Chiedi riscontri verificabili." },
            ]}
          />
        </div>
      </ConfigProvider>
    </AntdRegistry>
  );
}
