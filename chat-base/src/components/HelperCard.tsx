export type HelperCardProps = {
    heading?: string;
    secondaryText?: string;
};

const HelperCard = ({
    heading = "Compare Design Principles",
    secondaryText = "for mobile apps and desktop software products",
}: HelperCardProps) => {
    return (
        <div className="flex flex-col self-stretch justify-center items-start min-w-80 md:min-w-1/2 gap-2 py-3 px-4 border border-gray-300 rounded-[8px]">
            <div className="font-normal text-gray-900 text-sm md:text-base text-left">
                {heading}
            </div>
            <div className="flex font-normal text-gray-500 text-xs text-left ">
                {secondaryText}
            </div>
        </div>
    );
};

export default HelperCard;

// color: #000;

// /* Text md/Regular */
// font-family: Inter;
// font-size: 16px;
// font-style: normal;
// font-weight: 400;
// line-height: 18px; /* 112.5% */
