import { useState } from "react";

export const handleModalForgot = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const onClickModal = () => setOpen((prev) => !prev);
  console.log("toggle" + isOpen);
  return {
    isOpen,
    onClickModal,
  };
};
