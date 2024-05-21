import React from "react";
import { useDispatch } from "react-redux";
import { tineyeSearch } from "store/thunks/outsideApiThunks";
import PhotoList from "components/app/ui/PhotoList";

const TineyeList = ({ photos, id, source, slug }) => {
  const dispatch = useDispatch();

  const handleTineye = (img) => {
    dispatch(
      tineyeSearch({
        photo: `data:image/png;base64,${img}`,
        anketId: +id,
        sourceName: source,
        sourceId: +slug,
      }),
    );
  };

  return (
    <PhotoList
      photos={photos}
      handleButtonClick={handleTineye}
      buttonText="Выбрать"
    />
  );
};

export default TineyeList;
