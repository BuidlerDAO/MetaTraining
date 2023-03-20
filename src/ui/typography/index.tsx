import { FC, HTMLAttributes, memo, ReactNode } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  variant?: 'body' | 'title' | 'subTitle' | 'caption' | 'largeBody' | 'error';
  disable?: boolean;
  showLoading?: boolean;
  tag?: 'span' | 'p';
}

const Typography: FC<TypographyProps> = memo(
  ({ className, children, variant, tag = 'p', ...rest }: TypographyProps) => {
    const titleText = () =>
      tag === 'span' ? (
        <span
          className={`text-[24px] font-bold leading-[24px] text-[#4e4e4e] ${className}`}
          {...rest}
        >
          {children}
        </span>
      ) : (
        <p
          className={`text-[24px] font-bold leading-[24px] text-[#4e4e4e] ${className}`}
          {...rest}
        >
          {children}
        </p>
      );

    const bodyText = () =>
      tag === 'span' ? (
        <span
          className={`text-[14px] leading-[20px] text-[#4e4e4e] ${className}`}
          {...rest}
        >
          {children}
        </span>
      ) : (
        <p
          className={`text-[14px] leading-[20px] text-[#4e4e4e] ${className}`}
          {...rest}
        >
          {children}
        </p>
      );

    const largeBodyText = () =>
      tag === 'span' ? (
        <span
          className={`text-[16px] leading-[20px] text-[#4e4e4e] ${className}`}
          {...rest}
        >
          {children}
        </span>
      ) : (
        <p
          className={`text-[16px] leading-[20px] text-[#4e4e4e] ${className}`}
          {...rest}
        >
          {children}
        </p>
      );

    const subtitleText = () =>
      tag === 'span' ? (
        <span
          className={`text-[16px] font-bold leading-[20px] text-[#4e4e4e] ${className}`}
          {...rest}
        >
          {children}
        </span>
      ) : (
        <p
          className={`text-[16px] font-bold leading-[20px] text-[#4e4e4e] ${className}`}
          {...rest}
        >
          {children}
        </p>
      );

    const captionText = () =>
      tag === 'span' ? (
        <span
          className={`text-[14px] leading-[20px] text-[#4e4e4e] ${className}`}
          {...rest}
        >
          {children}
        </span>
      ) : (
        <p
          className={`text-[14px] leading-[20px] text-[#4e4e4e] ${className}`}
          {...rest}
        >
          {children}
        </p>
      );

    const errorTipText = () =>
      tag === 'span' ? (
        <span
          className={`text-[12px] leading-[20px] text-[#EA4141] ${className}`}
          {...rest}
        >
          {children}
        </span>
      ) : (
        <p
          className={`text-[12px] leading-[20px] text-[#EA4141] ${className}`}
          {...rest}
        >
          {children}
        </p>
      );

    const renderBtn = () => {
      switch (variant) {
        case 'title':
          return titleText();
        case 'body':
          return bodyText();
        case 'subTitle':
          return subtitleText();
        case 'caption':
          return captionText();
        case 'largeBody':
          return largeBodyText();
        case 'error':
          return errorTipText();
        default:
          return bodyText();
      }
    };

    return <>{renderBtn()}</>;
  }
);

Typography.displayName = 'Typography';

export default Typography;
