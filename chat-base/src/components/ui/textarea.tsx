import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import ReactTextareaAutosize, {
    TextareaAutosizeProps,
} from "react-textarea-autosize";

const textareaVariants = cva(
    "flex w-full placeholder:text-gray-400 text-gray-600 whitespace-pre-line p-2",
    {
        variants: {
            variant: {
                default: "",
                grow: "grow",
                border: "border border-black",
                no_border: "focus:outline-none",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface TextAreaProps
    extends TextareaAutosizeProps,
        VariantProps<typeof textareaVariants> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, variant, ...props }, ref) => {
        const Comp = ReactTextareaAutosize;
        return (
            <Comp
                className={cn(textareaVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);

TextArea.displayName = "TextArea";

export { TextArea, textareaVariants };
