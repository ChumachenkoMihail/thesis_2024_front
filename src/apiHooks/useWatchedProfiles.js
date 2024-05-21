import { useEffect, useState } from "react";

const useWatchedProfiles = () => {
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem("watchedProfiles")) || [],
  );

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("watchedProfiles"));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  const addProfiles = (sourceId, anketId) => {
    const storedData = JSON.parse(sessionStorage.getItem("watchedProfiles"));
    const newData = [...(storedData || []), { sourceId, anketId }];
    setData(newData);
    sessionStorage.setItem("watchedProfiles", JSON.stringify(newData));
  };

  const checkProfiles = (sourceId, anketId) => {
    return data.some(
      (item) =>
        item.sourceId?.toString() === sourceId?.toString() &&
        item.anketId?.toString() === anketId?.toString(),
    );
  };

  return { addProfiles, checkProfiles };
};

export default useWatchedProfiles;
