import {
  FC,
  InputHTMLAttributes,
  memo,
  ReactNode,
  useRef,
  useState
} from 'react';

interface LeftTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  className?: string;
  placeholder?: string | undefined;
  text?: ReactNode;
  onBlur?: any;
  onFocus?: any;
}

const LeftTextInput: FC<LeftTextInputProps> = memo(
  ({
    className,
    children,
    placeholder,
    text,
    onBlur,
    onFocus,
    ...rest
  }: LeftTextInputProps) => {
    const ref: any = useRef();
    const [isFocus, setIsFocus] = useState(false);
    return (
      <div
        className={`flex items-center rounded-[10px] border bg-white py-[8px] px-[14px] text-left text-[14px] leading-[20px] outline-none ${
          isFocus ? 'border-[#F3FF61]' : 'border-[#b7b7b7]'
        } ${className} `}
        ref={ref}
      >
        {text}
        <input
          className="outline-none placeholder:text-[#b7b7b7]"
          placeholder={placeholder}
          {...rest}
          onBlur={(e) => {
            setIsFocus(false);
            onBlur ? onBlur(e) : null;
          }}
          onFocus={(e) => {
            setIsFocus(true);
            onFocus ? onFocus(e) : null;
          }}
        >
          {children}
        </input>
      </div>
    );
  }
);

LeftTextInput.displayName = 'LeftTextInput';

export default LeftTextInput;
