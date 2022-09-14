import { useEffect, useRef } from 'react';

export function useFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return inputRef;
}
