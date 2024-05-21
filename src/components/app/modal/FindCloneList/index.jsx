import React from "react";
import { useDispatch } from "react-redux";
import { findClone } from "store/thunks/outsideApiThunks";
import PhotoList from "components/app/ui/PhotoList";

const FindCloneList = ({ photos }) => {
  const dispatch = useDispatch();

  const handleFindClone = (img) => {
    dispatch(
      findClone({
        base64photo: img,
      }),
    );
  };

  return (
    <PhotoList
      photos={photos}
      handleButtonClick={handleFindClone}
      buttonText="Искать совпадения"
    />
  );
};

export default FindCloneList;
