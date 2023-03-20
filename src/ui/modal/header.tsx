import { FC, HTMLAttributes, ReactNode } from 'react';
import { ArrowBackIosNew, CloseLine } from '../icon/icons';
import Typography from '../typography';

interface Props extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  title?: string;
  onClose?: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

const ModalHeader: FC<Props> = (props: Props) => {
  return (
    <div className="modal-header flex h-[56px] items-center justify-between rounded-t-2xl p-4">
      {props.children ? (
        props.children
      ) : (
        <div className="flex items-center text-left">
          {props.showBack ? (
            <ArrowBackIosNew
              fill="rgba(0, 0, 0, 0.6)"
              size={24}
              fontSize={18}
            />
          ) : null}
          <Typography variant="subTitle" className="text-[#787878]">
            {props.title}
          </Typography>
        </div>
      )}
      <div className="float-right cursor-pointer p-1" onClick={props.onClose}>
        <CloseLine fill="rgba(0, 0, 0, 0.6)" size={24} fontSize={18} />
      </div>
    </div>
  );
};

export default ModalHeader;
