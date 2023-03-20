import { FC, HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  src?: string;
  className?: string;
  content?: ReactNode;
  text?: ReactNode;
  badgeStyle?: string;
}

const Badge: FC<Props> = ({
  text,
  className,
  content,
  badgeStyle,
  ...rest
}: Props) => {
  return (
    <div
      className={`relative inline-flex cursor-pointer items-center rounded-lg pt-[6px] pr-[12px] text-center text-sm font-medium text-white ${className}`}
      {...rest}
    >
      {content}
      {text ? (
        <div
          className={`absolute top-[0px] right-[0px] inline-flex min-h-[15px] min-w-[15px] items-center justify-center rounded-[50%] bg-[#FF165C] text-[10px] font-[700] leading-[10px] text-white ${badgeStyle}`}
        >
          {text}
        </div>
      ) : null}
    </div>
  );
};

export default Badge;
