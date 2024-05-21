import { createContext, useContext, useEffect, useState } from "react";
import Modal from "../../components/app/base/Modal";
import SearchParams from "../../components/app/modal/SearchParams";
import { ReactComponent as Params } from "assets/images/search_params.svg";
import { useDispatch, useSelector } from "react-redux";
import { historyActions } from "../historySlice";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const { historyParams, historyResults } = useSelector(
    (state) => state.history,
  );
  const dispatch = useDispatch();
  const [showSearchParams, setShowSearchParams] = useState(false);
  const showSearch = () => {
    setShowSearchParams(!showSearchParams);
    showSearchParams && dispatch(historyActions.clearHistoryParams(null)); /// clear selected params if user open new search modal
  };
  useEffect(() => {}, [showSearchParams]);
  return (
    <SearchContext.Provider
      value={{
        showSearch,
        showSearchParams,
      }}
    >
      <>
        {showSearchParams && (
          <Modal
            width="1800"
            Icon={Params}
            title="Параметры поиска"
            closeModal={showSearch}
            subTitle={`${
              historyResults?.totalAnkets
                ? `Результатов поиска: ${historyResults?.totalAnkets} анкета`
                : ""
            }   `}
          >
            <SearchParams
              selectedParams={historyParams?.searchParams?.input?.searchFields}
              cancel={showSearch}
            />
          </Modal>
        )}
      </>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};
