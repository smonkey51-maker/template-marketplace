"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Card, ConfigProvider, List, Tag, Typography } from "antd";

export type GuideItem = {
  slug: string;
  href: string;
  category: string;
  title: string;
  description: string;
  cta: string;
};

/** Guide Pratiche list — built entirely with Ant Design (List + Card + Tag). */
export default function GuideListAntd({ items }: { items: GuideItem[] }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#8A625E",
            colorText: "#26348C",
            colorTextSecondary: "#5B64A6",
            colorBgContainer: "#FCF9F8",
            colorBorderSecondary: "rgba(38, 52, 140, 0.14)",
            borderRadius: 4,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          },
        }}
      >
        <List
          grid={{ gutter: 24, xs: 1, sm: 1, md: 2 }}
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <Card hoverable variant="outlined" styles={{ body: { padding: 24 } }}>
                <a href={item.href} className="block">
                  <Tag color="#8A625E" variant="filled">
                    {item.category}
                  </Tag>
                  <Typography.Title
                    level={4}
                    style={{ marginTop: 12, fontFamily: "var(--font-display), Georgia, serif" }}
                  >
                    {item.title}
                  </Typography.Title>
                  <Typography.Paragraph type="secondary">{item.description}</Typography.Paragraph>
                  <Typography.Text strong style={{ color: "#8A625E" }}>
                    {item.cta}
                  </Typography.Text>
                </a>
              </Card>
            </List.Item>
          )}
        />
      </ConfigProvider>
    </AntdRegistry>
  );
}
