import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FaceVerify from "components/app/modal/FaceVerify";
import { useDetailsFunctions } from "apiHooks/detailsHooks/useDetailsFunctions";

const FaceVerifyContext = createContext();

export const FaceVerifyProvider = ({ children }) => {
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
    <FaceVerifyContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        checkSimilarityImages,
      }}
    >
      {children}
      {isModalOpen && <FaceVerify cancel={closeModal} />}
    </FaceVerifyContext.Provider>
  );
};

export const useSimilarityModal = () => {
  return useContext(FaceVerifyContext);
};
