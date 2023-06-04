import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        toggleModal,
        toggleForm,
        setToggleModal,
        setToggleForm,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
