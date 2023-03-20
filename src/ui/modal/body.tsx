import { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  height?: string;
  title?: string;
}

const ModalBody: FC<Props> = (props: Props) => {
  return (
    <div
      className={`modal-body flex overflow-y-auto ${
        props.height ? props.height : 'h-[385px]'
      } ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default ModalBody;
