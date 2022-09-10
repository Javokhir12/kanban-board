import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  children: ReactNode;
  opened: boolean;
  target?: HTMLElement | string;
}

function Modal({ children, opened, target = document.body }: ModalProps) {
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
    <div className="absolute bg-gray-800/70 flex items-center justify-center w-full h-full top-0 left-0">
      <div className="w-1/3 h-fit bg-slate-600">{children}</div>
    </div>,
    ref.current
  );
}

export default Modal;
