import type { Meta, StoryObj } from "@storybook/react";
import MainNavbar from "./MainNavbar";
const meta: Meta<typeof MainNavbar> = {
  component: MainNavbar,
  // play: {},
  title: "MainNavbar",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
