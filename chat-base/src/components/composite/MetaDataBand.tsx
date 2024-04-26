import { FiHexagon } from "react-icons/fi";
import { LuIndianRupee } from "react-icons/lu";

import { MessageBackendType } from "@/types/BackendDatabaseModelTypes";
import { useState } from "react";
type MetaDataBandProps = Pick<
  MessageBackendType,
  "completion_tokens" | "prompt_tokens" | "llm"
>;

type PillProps = {
  text: string | number;
  textColor?: string;
  bgColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Pill = ({ text, textColor, bgColor, leftIcon }: PillProps) => {
  const bgColorRendered = bgColor ? `bg-${bgColor}` : "bg-gray-800";
  const textColorRendered = textColor ? `text-${textColor}` : "text-gray-50";
  console.log("Pill", bgColorRendered, textColorRendered);
  return (
    <div
      // className={`flex items-center gap-1 rounded-sm ${bgColorRendered} px-2 py-1 text-xs ${textColorRendered} `}
      className={`flex items-center gap-1 rounded-sm bg-gray-700 px-2 py-1 text-xs text-gray-100 `}
    >
      {leftIcon}
      {text}
    </div>
  );
};

const TokenMetaData = ({
  prompt_tokens,
  completion_tokens,
  llm,
}: MetaDataBandProps) => {
  const [showCost, setShowCost] = useState<boolean>(false);
  const [iconToShow, setIconToShow] = useState<React.ReactNode>(<FiHexagon />);
  const handleSwitchView = () => {
    setShowCost(() => !showCost);
    setIconToShow(() => (showCost ? <FiHexagon /> : <LuIndianRupee />));
  };
  return (
    <div className="flex items-start gap-1" onClick={handleSwitchView}>
      <Pill
        leftIcon={iconToShow}
        text={
          showCost
            ? (prompt_tokens * llm.prompt_tokens_cost * 83).toPrecision(3)
            : prompt_tokens
        }
        bgColor="gray-200"
        textColor="gray-900"
      />
      <Pill
        leftIcon={iconToShow}
        text={
          showCost
            ? (completion_tokens * llm.completion_tokens_cost * 83).toPrecision(
                3,
              )
            : completion_tokens
        }
        bgColor="gray-600"
        textColor="gray-900"
      />
      <Pill
        leftIcon={iconToShow}
        text={
          showCost
            ? (
                prompt_tokens * llm.prompt_tokens_cost * 83 +
                completion_tokens * llm.completion_tokens_cost * 83
              ).toPrecision(3)
            : prompt_tokens + completion_tokens
        }
        bgColor="gray-600"
        textColor="gray-900"
      />
    </div>
  );
};

const MetaDataBand = (props: MetaDataBandProps) => {
  return (
    <div className="flex justify-between hover:cursor-pointer">
      <div className="flex items-start gap-1">
        <Pill
          text={props.llm.provider}
          bgColor="gray-800"
          textColor="gray-50"
        />
        <Pill text={props.llm.model} bgColor="gray-600" textColor="gray-900" />
      </div>
      <TokenMetaData {...props} />
    </div>
  );
};

export default MetaDataBand;
