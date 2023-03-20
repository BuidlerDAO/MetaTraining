import { CSSProperties, FC, HTMLAttributes, useState } from 'react';
import { ArrowDropDown, CloseLine } from '@/ui/icon/icons';
import Tooltip from '../tooltip';
import { Card } from '../card';
import Typography from '../typography';

interface TagSearchInputProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  selectList?: {
    key: string | number;
    value: string;
  }[];
  tag?: string[]; // 选中的tag列表
  keyword?: string; // 输入的关键词内容
  placeholder?: string;
  overlayStyle?: CSSProperties | undefined;
  onChoose?: (value: any) => void; // 选中
  onDelete?: (e: any) => void; // 删除某一个
  onEnter?: (e: any) => void; // 输入回车
  onWacth?: (e: any) => void; // 监听输入
  onClear?: () => void; // 全清
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
}

// focus状态下拉显示，blur状态下拉消失，下拉的东西选择就显示选择状态，这里需要维护一个下拉列表数据
// 输入的时候key会自动检索对应的内容，还是点选才能选中，或者回车直接选中匹配
// 这里可以选择是否输入自定义内容，可以输入自定义内容就是回车作为结算
// 总结：两个事件，点击/回车
// 数据：三个--下拉列表数据，和选中数据，原始数据
// 数据：正在输入的内容关键词keyword

const TagSearchInput: FC<TagSearchInputProps> = ({
  className,
  onDelete = () => null,
  onEnter,
  onWacth = () => null,
  onChoose = () => null,
  tag = [],
  selectList = [],
  keyword = '',
  placeholder,
  overlayStyle,
  onFocus,
  onBlur,
  ...rest
}: TagSearchInputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleKeyup = (e: any) => {
    // 13 enter
    e.preventDefault();
    if (e.keyCode === 13 || e.code === 'Enter') {
      onEnter ? onEnter(e.target.value) : (e.target.value = '');
    }
  };

  const handleVisibleChange = (visible: any) => {
    if (!visible && isFocus) return;
    setVisible(visible);
  };

  const handleDelete = (e: any, ele: string) => {
    e.preventDefault();
    onDelete(ele);
    setTimeout(() => {
      setVisible(true);
    }, 300);
  };

  return (
    <>
      <Tooltip
        visible={visible}
        onVisibleChange={handleVisibleChange}
        showArrow={false}
        placement="bottomLeft"
        trigger={['click']}
        overlayInnerStyle={{
          marginTop: '-5px',
          backgroundColor: '#fff',
          padding: 0
        }}
        overlay={
          <Card className="w-[100%]">
            <div className="px-6 py-4">
              {selectList.map((ele: any) => (
                <Typography
                  className="py-1"
                  onClick={() => onChoose(ele)}
                  key={ele.key}
                >
                  {ele.value}
                </Typography>
              ))}
            </div>
          </Card>
        }
        overlayStyle={{
          opacity: 1,
          ...overlayStyle
        }}
        {...rest}
      >
        <div
          className={`flex h-[36px] w-[100%] items-center rounded-[10px] border border-[#b7b7b7] bg-white py-2 px-3 text-left text-[14px] leading-[20px] outline-none placeholder:text-[#b7b7b7] ${
            isFocus ? 'border-[#F3FF61]' : 'border-[#b7b7b7]'
          } ${className}`}
        >
          <div className="flex h-[36px] w-[60vw] flex-1 items-center overflow-x-auto overflow-y-hidden lg:w-[100%]">
            {tag.map((e, index) => (
              <div
                key={index}
                className={`mx-[5px] flex h-[20px] animate-[opacityappear_1s_ease-in-out] items-center justify-evenly rounded-[10px] bg-[#ebebeb] px-4 text-black`}
              >
                <Typography className="whitespace-nowrap break-keep text-left text-[14px] leading-[20px]">
                  {e}
                </Typography>
                <CloseLine
                  className="flex h-[14px] w-[14px] cursor-pointer items-center justify-center leading-[14px] hover:rounded-[50%] hover:bg-[#787878] hover:text-[white]"
                  onClick={(ele: any) => handleDelete(ele, e)}
                />
              </div>
            ))}
            <input
              className={`min-w-[100px] border-[none] py-1 px-2 text-left text-[14px] leading-[20px] outline-none placeholder:text-[#b7b7b7]`}
              value={keyword}
              placeholder={placeholder}
              onKeyUp={handleKeyup}
              onChange={(e) => onWacth(e.target.value)}
              onBlur={(e) => {
                setIsFocus(false);
                onBlur ? onBlur(e) : null;
              }}
              onFocus={(e) => {
                setIsFocus(true);
                onFocus ? onFocus(e) : null;
              }}
            />
          </div>
          <ArrowDropDown />
        </div>
      </Tooltip>
    </>
  );
};

export default TagSearchInput;
