import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./textarea";

const meta: Meta<typeof TextArea> = {
    component: TextArea,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const TextAreaBase: Story = {
    args: {
        variant: "default",
        placeholder: "Enter text here",
    },
};
