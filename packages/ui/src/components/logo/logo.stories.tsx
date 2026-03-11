import { MindEaseLogo } from "./logo";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MindEaseLogo> = {
  title: "Brand/MindEaseLogo",
  component: MindEaseLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: {
        type: "number",
        min: 16,
        max: 80,
        step: 2,
      },
      description: "Tamanho do ícone Brain do logo",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MindEaseLogo>;

export const Default: Story = {
  args: {
    size: 32,
  },
};

export const Small: Story = {
  args: {
    size: 20,
  },
};

export const Large: Story = {
  args: {
    size: 48,
  },
};
