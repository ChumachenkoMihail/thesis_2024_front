import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useUserCredits = () => {
  const { userCredits, userRole, userAccess } = useSelector(
    (state) => state.users,
  );
  const [shouldCallFunctions, setShouldCallFunctions] = useState({});
  const calculateShouldCallFunctions = () => {
    const updatedShouldCallFunctions = {};
    Object?.entries(
      userCredits || {
        api: "",
        merge: "",
        export: "",
        search: "",
        anketDetail: "",
      },
    )?.forEach(([creditName, creditCount]) => {
      if (userRole === "admin" || userRole === "superAdmin") {
        updatedShouldCallFunctions[creditName] = true;
      } else if (userRole === "user") {
        // Check specific condition for each function and role
        if (creditName === "api" && creditCount === 0) {
          updatedShouldCallFunctions[creditName] = false;
        } else if (creditName === "merge" && creditCount === 0) {
          updatedShouldCallFunctions[creditName] = false;
        } else if (creditName === "export" && creditCount === 0) {
          updatedShouldCallFunctions[creditName] = false;
        } else if (creditName === "search" && creditCount === 0) {
          updatedShouldCallFunctions[creditName] = false;
        } else if (creditName === "anketDetail" && creditCount === 0) {
          updatedShouldCallFunctions[creditName] = false;
        } else {
          updatedShouldCallFunctions[creditName] = true;
        }
      }
    });

    setShouldCallFunctions(updatedShouldCallFunctions);
  };

  useEffect(() => {
    calculateShouldCallFunctions();
  }, [userRole, userCredits]);
  return {
    shouldCallFunctions,
    userCredits:
      userRole === "admin" || userRole === "superAdmin"
        ? {
            api: -1,
            merge: -1,
            export: -1,
            search: -1,
            anketDetail: -1,
          }
        : userCredits,
    canDeleteHistory: userAccess?.canDeleteHistory,
    canSearchByAccess: userAccess?.searchByAccess,
    canSearchByPhoto: userAccess?.searchByPhoto,
    calculateShouldCallFunctions,
  };
};
