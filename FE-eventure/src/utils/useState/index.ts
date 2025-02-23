import { useState } from "react";

export const handleModalForgot = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const onClickModal = () => setOpen((prev) => !prev);

  return {
    isOpen,
    onClickModal,
  };
};
