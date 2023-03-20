import { FC, HTMLAttributes, useEffect, useState } from 'react';
import Typography from '../typography';

interface TagInputProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  tag?: string[];
  placeholder?: string;
  reg?: RegExp;
  showReg?: boolean;
  onDelete?: (e: any) => void;
  onEnter?: (e: any, cb: any) => void;
  onWacth?: (e: any, cb: any) => void;
  onClear?: () => void;
  onRemove?: () => void;
}

const TagInput: FC<TagInputProps> = ({
  className,
  onDelete = () => null,
  onEnter = () => null,
  onWacth = () => null,
  onClear = () => null,
  onRemove = () => null,
  showReg = false,
  reg = /\S+/g,
  tag = [''],
  placeholder,
  ...rest
}: TagInputProps) => {
  const [state, setState] = useState(tag);
  const handleKeyup = (e: any) => {
    // 13 enter
    e.preventDefault();
    if (e.keyCode === 13 || e.code === 'Enter') {
      onEnter(e.target.value, (code: boolean) => {
        if (code) {
          e.target.value = '';
        }
      });
    }
  };

  const handleChange = (e: any) => {
    onWacth(e.target.value, (code: boolean) => {
      if (code) {
        e.target.value = '';
      }
    });
  };

  useEffect(() => {
    const res = tag.toString().match(reg) || [];
    setState(res);
  }, [tag]);

  return (
    <>
      <div
        className={`focus:box-shadow-[inset_0_1px_1px_rgba(0,0,0,.075),_0_0_8px_rgba(102,175,233,.6)] rounded-[10px] border border-[#b7b7b7] bg-white py-[20px] px-[24px] text-left text-[14px] leading-[20px] outline-none ring-[0] placeholder:text-[#b7b7b7] focus:border-[#aeffd9] focus:bg-[#F5FFFE] focus:outline-[0] focus:ring-[1px] focus:ring-[#aeffd9] ${className}`}
        {...rest}
      >
        {tag.map((e, index) => (
          <div
            key={index}
            className={`my-[5px] flex h-[35px] w-[390px] animate-[opacityappear_1s_ease-in-out] items-center justify-evenly rounded-[10px] bg-[#ebebeb] text-black ${
              showReg && !e.match(reg) ? 'bg-[#fe3b3b] text-[white]' : ''
            }`}
          >
            <p className="text-left text-[14px] leading-[20px]">{e}</p>
            <Typography
              onClick={() => onDelete(e)}
              className="flex h-[14px] w-[14px] cursor-pointer items-center justify-center leading-[14px] hover:rounded-[50%] hover:bg-[#787878] hover:text-[white]"
            >
              X
            </Typography>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <input
            className={`w-[100%] border-[none] py-[15px] px-[5px] text-left text-[14px] leading-[20px] outline-none placeholder:text-[#b7b7b7]`}
            placeholder={placeholder}
            onKeyUp={handleKeyup}
            onChange={handleChange}
          />
          <span
            className="w-[60px] cursor-pointer text-[#b7b7b7] hover:text-[#4E4E4E]"
            onClick={onClear}
          >
            Clear all
          </span>
        </div>
      </div>
      {state.length &&
      state.length !== tag.length &&
      tag.length - state.length > 0 ? (
        <div className="mt-[5px] mb-[0] flex items-center">
          <Typography className="text-[red]">
            {tag.length - state.length} invalid data
          </Typography>
          <Typography
            onClick={onRemove}
            className="ml-[14px] cursor-pointer font-[600] text-[#47c647]"
          >
            Remove all
          </Typography>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default TagInput;
