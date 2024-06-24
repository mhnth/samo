import { cx } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

interface ProcessRangeProps extends HTMLAttributes<HTMLDivElement> {
  current: number;
  total: number;
  type: 'red' | 'green';
}

export const ProcessRange: React.FC<ProcessRangeProps> = ({
  current,
  total,
  type = 'red',
  ...props
}) => {
  const percent = ((current / total) * 100).toFixed(0);

  return (
    <div
      className={cx(
        'relative z-0 h-3 w-full bg-pink-200',
        type === 'red' ? 'bg-pink-100' : 'bg-teal-200',
        props.className,
      )}
    >
      <div
        style={{ width: percent + '%' }}
        className={cx(
          `absolute top-0 h-3 max-w-full`,
          type === 'red' ? 'bg-pink-400' : 'bg-teal-500',
        )}
      ></div>
    </div>
  );
};
