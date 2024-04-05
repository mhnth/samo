import { cx } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onOutSideClick: () => void;
  variant?: 'center' | 'left' | 'right';
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onOutSideClick,
  // variant = 'left',
  ...props
}) => {
  // const classNames = variant === 'center' ? `mx-auto my-auto max-w-xl` : '';

  return (
    <div
      className="fixed inset-0 flex bg-black/30 backdrop-blur-3xl"
      onClick={() => onOutSideClick()}
      {...props}
    >
      <div className={cx('contents')} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
