import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FaceVerify from "components/app/modal/FaceVerify";
import { useDetailsFunctions } from "apiHooks/detailsHooks/useDetailsFunctions";

const CreateOrgContext = createContext();

export const CreateOrgProvider = ({ children }) => {
  const { anketData } = useSelector((state) => state.search);
  const { checkSimilarityImages, handleCheckSimilarity } = useDetailsFunctions(
    "",
    "",
    "",
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    handleCheckSimilarity(anketData?.anket);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CreateOrgContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        checkSimilarityImages,
      }}
    >
      {children}
      {isModalOpen && <FaceVerify cancel={closeModal} />}
    </CreateOrgContext.Provider>
  );
};

export const useCreateOrgModal = () => {
  return useContext(CreateOrgContext);
};
