interface ColumnsProps {
  isStackedOnMobile: boolean;
  children: React.ReactNode;
  textColor: string;
  backgroundColor: string;
}

export const Columns = ({
  isStackedOnMobile,
  children,
  textColor,
  backgroundColor,
}: ColumnsProps) => {
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};
  return (
    <div
      className="my-10"
      style={{ ...textColorStyle, ...backgroundColorStyle }}
    >
      <div
        className={`max-w-5xl mx-auto ${
          isStackedOnMobile ? 'block md:flex' : 'flex'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
