import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const SidebarFilled: Story = {
  render: () => <Sidebar />,
  //   args: {
  //     variant: "default",
  //     placeholder: "Enter text here",
  //   },
};
