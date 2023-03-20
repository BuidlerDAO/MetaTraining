'use client';

import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { ArrowDropDown } from '../icon/icons';
import Tooltip from '../tooltip';

interface SelectBaseProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  value?: string | ReactNode;
  visible?: boolean;
  placement?: string;
  setVisible?: (value: boolean) => void;
}

const SelectBase: FC<SelectBaseProps> = memo(
  ({
    className,
    value,
    children,
    visible,
    placement = 'bottom',
    setVisible = () => null,
    ...rest
  }: SelectBaseProps) => {
    return (
      <Tooltip
        showArrow={false}
        placement={placement}
        trigger={['click']}
        overlay={children}
        overlayStyle={{
          opacity: 1
        }}
        visible={visible}
      >
        <div
          className={`relative flex h-[36px] items-center justify-between rounded-[10px] border border-[#b7b7b7] bg-white px-[14px] text-lg text-[#4e4e4e] ${className}`}
          onClick={() => setVisible(!visible)}
          {...rest}
        >
          {value}
          <ArrowDropDown className="absolute right-2" />
        </div>
      </Tooltip>
    );
  }
);

SelectBase.displayName = 'SelectBase';

export default SelectBase;
