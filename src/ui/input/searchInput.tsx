import {
  FC,
  InputHTMLAttributes,
  memo,
  ReactNode,
  useRef,
  useState
} from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  className?: string;
  placeholder?: string | undefined;
  onBlur?: any;
  onFocus?: any;
  onEnter?: any;
}

const SearchInput: FC<SearchInputProps> = memo(
  ({
    className,
    children,
    placeholder,
    onBlur,
    onFocus,
    onEnter,
    ...rest
  }: SearchInputProps) => {
    const ref: any = useRef();
    const [isFocus, setIsFocus] = useState(false);
    return (
      <div
        className={`flex items-center rounded-[10px] border bg-white py-[8px] px-[14px] text-left text-[14px] leading-[20px] outline-none ${
          isFocus ? 'border-[#93F0D9]' : 'border-[#b7b7b7]'
        } ${className} `}
        ref={ref}
      >
        <input
          className="w-[100%] outline-none placeholder:text-[#b7b7b7]"
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
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-[5px] cursor-pointer"
          onClick={(e) => (onEnter ? onEnter(e) : null)}
        >
          <path
            d="M12.8816 12.3062L8.94732 8.3334C9.6806 7.45196 10.1226 6.31796 10.1226 5.07973C10.1226 2.2743 7.85652 0 5.06128 0C2.26603 0 0 2.2743 0 5.07973C0 7.88516 2.26603 10.1595 5.06128 10.1595C6.33125 10.1595 7.4913 9.68887 8.38006 8.91309L12.3088 12.881C12.4669 13.0397 12.7235 13.0397 12.8816 12.881C13.0395 12.7223 13.0395 12.465 12.8816 12.3062H12.8816ZM5.06128 9.3534C2.7096 9.3534 0.803123 7.43997 0.803123 5.07973C0.803123 2.71948 2.7096 0.806051 5.06128 0.806051C7.41295 0.806051 9.31943 2.71948 9.31943 5.07973C9.31943 7.43997 7.41295 9.3534 5.06128 9.3534Z"
            fill="#B7B7B7"
          />
        </svg>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
