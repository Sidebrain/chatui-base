export type HelperCardProps = {
  heading?: string;
  secondaryText?: string;
};

const HelperCard = ({
  heading = "Compare Design Principles",
  secondaryText = "for mobile apps and desktop software products",
}: HelperCardProps) => {
  return (
    <div className="md:min-w-1/2 flex min-w-80 flex-col items-start justify-center gap-2 self-stretch rounded-[8px] border border-gray-300 px-4 py-3">
      <div className="text-left text-sm font-normal text-gray-900 md:text-base">
        {heading}
      </div>
      <div className="flex text-left text-xs font-normal text-gray-500 ">
        {secondaryText}
      </div>
    </div>
  );
};

export default HelperCard;
