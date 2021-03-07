interface ButtonProps {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const CalcButton = (props: ButtonProps) => {
  const { children, onClick } = props;

  return (
    <button onClick={onClick} type="button" className={`calc-button-${children}`}>{children}</button>
  );
};
export default CalcButton;

CalcButton.defaultProps = {
  onClick: () => null,
};
