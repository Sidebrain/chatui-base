type PresentationAreaProps = {
  children: React.ReactNode;
};
const PresentationArea = ({ children }: PresentationAreaProps) => {
  return (
    <div className="flex grow flex-col items-start gap-2 self-stretch pb-4">
      {children}
    </div>
  );
};

export default PresentationArea;
