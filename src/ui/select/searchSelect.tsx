'use client';

import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import Tooltip from '../tooltip';

interface SearchSelectProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  value?: string | ReactNode;
  visible?: boolean;
  setVisible?: (value: boolean) => void;
}

const SearchSelect: FC<SearchSelectProps> = memo(
  ({
    className,
    value,
    children,
    visible,
    setVisible = () => null,
    ...rest
  }: SearchSelectProps) => {
    return (
      <Tooltip
        showArrow={false}
        placement="bottom"
        trigger={['click']}
        overlay={children}
        overlayStyle={{
          opacity: 1
        }}
        visible={visible}
      >
        <div
          className={`flex h-[36px] items-center justify-between rounded-[10px] border border-[#b7b7b7] bg-white px-[14px] text-lg text-[#4e4e4e] ${className}`}
          onClick={() => setVisible(!visible)}
          {...rest}
        >
          {value}
          <svg
            width={12}
            height={8}
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="cursor-pointer"
          >
            <path
              d="M1 1L9 9L17 1"
              stroke="#B7B7B7"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Tooltip>
    );
  }
);

SearchSelect.displayName = 'SearchSelect';

export default SearchSelect;
