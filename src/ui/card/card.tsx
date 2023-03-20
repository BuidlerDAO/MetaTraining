import { FC, HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Card: FC<CardProps> = ({ className, children, ...rest }) => {
  return (
    <div
      className={`card rounded-[20px] bg-white ${className}`}
      style={{
        boxShadow: '0px 4px 40px 0 #eff1f1'
        // filter: 'drop-shadow(0px 2px 30px #eff1f1)'
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
