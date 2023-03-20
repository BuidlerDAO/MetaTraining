import { FC, ReactNode, TextareaHTMLAttributes } from 'react';

interface TextfieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: ReactNode;
  className?: string;
  boxStyle?: any;
  maxLength?: number;
  showLimit?: boolean;
  canMore?: boolean;
}

const Textfield: FC<TextfieldProps> = ({
  className,
  children,
  maxLength,
  showLimit = false,
  canMore = false,
  boxStyle = {},
  ...rest
}: TextfieldProps) => {
  return (
    <div className="relative" style={boxStyle}>
      <textarea
        className={`focus:box-shadow-[inset_0_1px_1px_rgba(0,0,0,.075),_0_0_8px_rgba(102,175,233,.6)] rounded-[10px] border border-[#b7b7b7] bg-white py-[10px] px-[14px] text-left text-[14px] leading-[20px] outline-none ring-[0] placeholder:text-[#b7b7b7] focus:border-[#F3FF61] focus:bg-[#F5FFFE] focus:outline-[0] focus:ring-[2px] focus:ring-[#F3FF61] ${className}`}
        {...rest}
        maxLength={canMore ? -1 : maxLength}
      >
        {children}
      </textarea>
      {showLimit ? (
        <span
          className={`absolute bottom-[7px] right-[10px] text-[10px] ${
            +(rest.value?.toString().length || 0) > +(maxLength || 0)
              ? 'text-[red]'
              : ''
          }`}
        >
          {rest.value?.toString().length}/{maxLength}
        </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default Textfield;
