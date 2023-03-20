import {
  FC,
  InputHTMLAttributes,
  memo,
  ReactNode,
  useRef,
  useState
} from 'react';

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  className?: string;
}

const InputBase: FC<InputBaseProps> = memo(
  ({
    className,
    children,
    required,
    onChange,
    value,
    ...rest
  }: InputBaseProps) => {
    const ref: any = useRef();
    const [isChange, setIsChange] = useState(false);
    return (
      <input
        className={`focus:box-shadow-[inset_0_1px_1px_rgba(0,0,0,.075),_0_0_8px_rgba(102,175,233,.6)]	rounded-[10px] border border-[#b7b7b7] bg-white py-[8px] px-[14px] text-left text-[14px] leading-[20px] outline-none placeholder:text-[#b7b7b7] focus:border-[#F3FF61] focus:bg-[#F5FFFE] focus:outline-[0] ${
          isChange && required && !value
            ? 'border-[#ff4040]'
            : 'border-[#b7b7b7]'
        } ${className}`}
        ref={ref}
        value={value}
        onChange={(e) => {
          setIsChange(true);
          onChange ? onChange(e) : null;
        }}
        {...rest}
      >
        {children}
      </input>
    );
  }
);

InputBase.displayName = 'InputBase';

export default InputBase;
