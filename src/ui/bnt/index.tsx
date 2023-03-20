import { FC, ReactNode } from 'react';
import './index.css';

type RoundButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

const RoundButton: FC<RoundButtonProps> = ({
  children,
  className,
  onClick,
  isLoading,
  disabled
}) => {
  return (
    <button
      className={`hover:bg-light min-w-[102px] cursor-pointer items-center justify-center border px-2 py-1 text-sm transition duration-200 ease-in-out ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default RoundButton;
