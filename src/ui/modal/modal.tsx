import { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';

interface ModalProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  overlay?: string;
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  return (
    <div
      className={`modal fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-[rgba(0,0,0,0.4)] outline-none focus:outline-none ${props.className}`}
    >
      <div
        className={`relative my-6 mx-auto ${
          props.width ? props.width : 'w-[726px]'
        }`}
      >
        <div
          className={`modal-content flex w-full flex-col overflow-hidden rounded-2xl border border-black/[0.04] bg-white outline-none focus:outline-none ${
            props.height ? props.height : 'h-[442px]'
          }`}
          style={{
            boxShadow:
              '0px 8px 16px 0 rgba(0,0,0,0.06), 0px 16px 32px 1px rgba(0,0,0,0.12)'
          }}
          {...props}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
