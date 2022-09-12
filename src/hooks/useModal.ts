import { useState } from 'react';

export function useModal(initialState = false) {
  const [modalOpen, setModalOpen] = useState(initialState);

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  return { modalOpen, openModal, closeModal };
}
