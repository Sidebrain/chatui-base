import type { Meta, StoryObj } from "@storybook/react";
import InputBox from "./InputBox";

const meta: Meta<typeof InputBox> = {
    component: InputBox,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof InputBox>;

export const TextButton: Story = {
    args: {
        // children: "ButtonText",
        // variant: "default",
        // size: "default",
    },
};
