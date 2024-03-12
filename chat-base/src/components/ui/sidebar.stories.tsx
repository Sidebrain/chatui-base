import type { Meta, StoryObj } from "@storybook/react";
import { ReactNode } from "react";
import Sidebartext, { SidebarSecondaryText } from "./sidebartext";
import StartNewChatButton from "../StartNewChatButton";
import SidebarProfile from "../SidebarProfile";
import { FiEdit, FiGlobe } from "react-icons/fi";

const TextList = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

const meta: Meta<typeof TextList> = {
  component: TextList,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TextList>;

export const TextListBase: Story = {
  render: (args) => (
    <TextList {...args}>
      <Sidebartext />
    </TextList>
  ),
  //   args: {
  //     variant: "default",
  //     placeholder: "Enter text here",
  //   },
};

export const TextListWithSecondaryText: Story = {
  render: () => <SidebarSecondaryText />,
  //   args: {
  //     variant: "default",
  //     placeholder: "Enter text here",
  //   },
};

export const NewChatButtonClick: Story = {
  render: (args) => (
    <StartNewChatButton
      rightIcon={<FiEdit />}
      leftIcon={<FiGlobe />}
      text="ChatGpt"
      {...args}
    />
  ),
  args: {
    // rightIcon: <FiEdit />,
    // leftIcon: <FiGlobe />,
    // text: "ChatGpt",
  },
};

export const Profile: Story = {
  render: () => <SidebarProfile />,
};
