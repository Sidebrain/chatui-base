import type { Meta, StoryObj } from "@storybook/react";
import helpercard from "./helpercard";

const meta: Meta<typeof helpercard> = {
  component: helpercard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof helpercard>;

export const HelperCard: Story = {
  args: {
    title: "Compare design principles",
    description: `
        for mobile apps and desktop software products for mobile apps and
        deskt op and software products for mobile apps and deskt op and
        software products Anudeep
        `,
    // variant: "default",
    // placeholder: "Enter text here",
  },
};
