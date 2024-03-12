import {
    FiGlobe,
    FiSearch,
    FiThumbsDown,
    FiThumbsUp,
    FiUser,
} from "react-icons/fi";
import { Button } from "./ui/button";
import { ReactNode } from "react";

type MessageCardProps = {
    senderName: string;
    action?: string;
    content: string | ReactNode;
    references?: string[];
    thumbsUpCallback?: () => void;
    thumbsDownCallback?: () => void;
};

const MessageCard = ({
    senderName,
    action,
    content,
    references,
    thumbsDownCallback,
    thumbsUpCallback,
}: MessageCardProps) => {
    return (
        <section
            id="message-card"
            className="flex flex-col w-full py-4 px-1 items-start gap-3 rounded-[8px] border border-gray-300"
        >
            <Button variant={"ghostNoHover"}>
                <FiUser />
                {senderName}
            </Button>
            <section
                id="message-body"
                className="flex flex-col px-5 py-0 items-start self-stretch"
            >
                {action && (
                    <Button size={"sm"} variant={"ghostNoHover"}>
                        <FiSearch />
                        {action}
                    </Button>
                )}
                <div className="flex self-stretch flex-col justify-center text-left">
                    {content}
                </div>
                <div className="flex items-start content-start gap-2 self-stretch flex-wrap">
                    {references?.map((reference, idx) => (
                        <Button variant={"outline"} key={idx}>
                            <FiGlobe />
                            {reference}
                        </Button>
                    ))}
                </div>
                {thumbsUpCallback && thumbsDownCallback && (
                    <div className="flex items-start ">
                        <Button variant={"ghost"} onClick={thumbsUpCallback}>
                            <FiThumbsUp />
                        </Button>
                        <Button variant={"ghost"} onClick={thumbsDownCallback}>
                            <FiThumbsDown />
                        </Button>
                    </div>
                )}
            </section>
        </section>
    );
};

export default MessageCard;
