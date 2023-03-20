import {
  FC,
  HTMLAttributes,
  JSXElementConstructor,
  memo,
  ReactElement
} from 'react';
import ReactTooltip from 'rc-tooltip';
import './index.css';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';

interface Props extends TooltipProps, HTMLAttributes<HTMLElement> {
  children?: // | ReactNode
  ReactElement<any, string | JSXElementConstructor<any>> | undefined;
}

const Tooltip: FC<Props> = memo((props: Props) => {
  return (
    <ReactTooltip
      placement="right"
      arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
      trigger={['hover']}
      {...props}
    >
      {props.children}
    </ReactTooltip>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
