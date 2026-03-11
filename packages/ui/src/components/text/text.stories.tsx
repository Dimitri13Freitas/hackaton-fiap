import type { Meta, StoryObj } from "@storybook/react";
import { MindEaseText } from "./text";

const meta: Meta<typeof MindEaseText> = {
  title: "Typography/MindEaseText",
  component: MindEaseText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "h1", "h2", "h3", "h4", "xxl"],
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MindEaseText>;

export const Default: Story = {
  args: {
    variant: "md",
    children: "This is MindEase text",
  },
};

export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "Heading 2",
  },
};

export const Heading3: Story = {
  args: {
    variant: "h3",
    children: "Heading 3",
  },
};

export const Heading4: Story = {
  args: {
    variant: "h4",
    children: "Heading 4",
  },
};

export const SmallText: Story = {
  args: {
    variant: "sm",
    children: "Small text example",
  },
};

export const ExtraLarge: Story = {
  args: {
    variant: "xxl",
    children: "Extra Large Hero Text",
  },
};
