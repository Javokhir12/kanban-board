import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  children: ReactNode;
  opened: boolean;
  target?: HTMLElement | string;
  handleClose: () => void;
}

function Modal({
  children,
  opened,
  target = document.body,
  handleClose,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    setMounted(true);

    ref.current =
      typeof target === 'string'
        ? (document.querySelector(target) as HTMLElement)
        : target;
  }, [target]);

  if (!opened || !mounted || !ref.current) return null;

  return createPortal(
    <div
      onClick={handleClose}
      className="absolute bg-gray-800/70 flex items-center justify-center w-full h-full top-0 left-0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '500px' }}
        className="w-fit h-fit bg-slate-600"
      >
        {children}
      </div>
    </div>,
    ref.current
  );
}

export default Modal;
