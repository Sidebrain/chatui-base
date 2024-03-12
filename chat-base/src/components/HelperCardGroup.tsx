import { ReactNode } from "react";

type HelperCardGroupProps = {
  children: ReactNode[];
};

const HelperCardGroup = ({ children }: HelperCardGroupProps) => {
  return (
    <div className="flex flex-nowrap content-start items-start gap-4 overflow-auto pb-4 md:flex-wrap">
      {children}
    </div>
  );
};

export default HelperCardGroup;
