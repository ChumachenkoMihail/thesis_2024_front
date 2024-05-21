import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const [deleteFunction, setDeleteFunction] = useState(null);
  const [shouldAskConfirmation, setShouldAskConfirmation] = useState(true);
  const [modalText, setModalText] = useState({
    title: "Удаление записи",
    message: "Вы действительно хотите удалить запись?",
    type: "delete",
  });
  // Load the 'shouldAskConfirmation' value from session storage on mount
  useEffect(() => {
    const storedValue = sessionStorage.getItem("shouldAskConfirmation");
    if (storedValue !== null) {
      setShouldAskConfirmation(JSON.parse(storedValue));
    }
  }, []);
  // Save the 'shouldAskConfirmation' value to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem(
      "shouldAskConfirmation",
      JSON.stringify(shouldAskConfirmation),
    );
  }, [shouldAskConfirmation]);

  const openModal = (deleteFn, id, text) => {
    setModalText(text);
    if (text.type === "cancelEdit" || text.type === "saveEdit") {
      /// if is cancelDelete we not have a dispatch, used for custom anket edit page
      setDeleteFunction([() => deleteFn(id)]);
    } else {
      if (Array.isArray(id)) {
        // If it's an array, accumulate delete functions for each ID
        const accumulatedFunctions = id.map((i) => () => dispatch(deleteFn(i)));
        setDeleteFunction(accumulatedFunctions);
      } else {
        // If it's a single ID, dispatch the delete action
        setDeleteFunction([() => dispatch(deleteFn(id))]);
      }
    }
    // If shouldAskConfirmation is false, trigger delete without modal
    if (!shouldAskConfirmation) {
      if (Array.isArray(id)) {
        Promise.all(id.map((i) => dispatch(deleteFn(i)))).then(() =>
          closeModal(),
        );
      } else {
        dispatch(deleteFn(id));
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteFunction.length > 0) {
      // Execute accumulated delete functions
      deleteFunction.forEach((fn) => fn());
    } else {
      dispatch(deleteFunction());
    }

    if (!dontAskAgain) {
      setIsModalOpen(false);
    } else {
      setShouldAskConfirmation(false);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        dontAskAgain,
        openModal,
        closeModal,
        setDontAskAgain,
        shouldAskConfirmation,
        handleDelete,
        modalText,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
