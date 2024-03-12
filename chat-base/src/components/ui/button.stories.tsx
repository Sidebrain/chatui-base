import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { FiArrowUpCircle } from "react-icons/fi";

const meta: Meta<typeof Button> = {
    component: Button,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const TextButton: Story = {
    args: {
        children: "ButtonText",
        variant: "default",
        size: "default",
    },
};

export const IconButton: Story = {
    args: {
        children: <FiArrowUpCircle size={24} />,
        variant: "icon",
        size: "icon",
    },
};

export const TextIconButton: Story = {
    args: {
        children: (
            <>
                ButtonText
                <FiArrowUpCircle />
            </>
        ),
        variant: "default",
        size: "icon",
    },
};
