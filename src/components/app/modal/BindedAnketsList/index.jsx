import React, { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import "./index.scss";
import Table from "components/app/base/Table";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { generateColumnsBindedAnkets } from "libs/generatedСolumns/generateColumnsBindedAnkets";
import { deleteBindedAnket } from "store/thunks/searchThunks";
import Title from "components/app/use/Title";

const BindedAnketsList = ({ ankets, initialState }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const firstAnketId = ankets?.id; // get first id from table anket DATABASE
  const withoutStartedAnket = ankets?.sources?.map((item) => ({
    ...item,
    ankets: item?.ankets?.filter(
      (anket) => +anket?.id !== +initialState?.anketId,
    ),
  }));
  const handleDeleteBindedAnket = (e, sourceId, anketIdToDelete) => {
    e.stopPropagation();
    e.preventDefault();
    const data = {
      id: firstAnketId, // всегда id анкеты
      sourceIdToDelete: sourceId, /// лежит на уровне с масивом ankets
      anketIdToDelete: anketIdToDelete, // с обьекта анкеты
    };
    dispatch(deleteBindedAnket({ data: data, init: initialState }));
  };
  const handleDetailsUser = (e, id, sourceId, sourceNameId) => {
    window.open(`/search/details/${id}/${sourceId}/${sourceNameId}`, "_blank");
  };

  return (
    <div
      className={`binded_ankets ${isDarkTheme ? "" : "binded_ankets-light"}`}
    >
      <ul className="binded_ankets-column">
        {withoutStartedAnket?.map(
          ({ ankets, sourceId, sourceName, sourceNameId }) => {
            const columns = ankets?.length
              ? generateColumnsBindedAnkets(
                  ankets,
                  handleDeleteBindedAnket,
                  handleDetailsUser,
                  sourceId,
                  sourceNameId,
                )
              : [];
            const updatedArray = columns
              ?.filter((item) => !item?.className?.includes("table_action"))
              .concat(
                columns.filter((item) =>
                  item?.className?.includes("table_action"),
                ),
              );
            return (
              <React.Fragment key={uuid()}>
                {columns?.length && updatedArray?.length ? (
                  <li>
                    <Title Tag="h2">{sourceName}</Title>
                    <Table
                      data={ankets}
                      withPagination={false}
                      columns={updatedArray}
                      trFunction={(e) => console.log("e")}
                      columnVisibility={[]}
                    />
                  </li>
                ) : null}
              </React.Fragment>
            );
          },
        )}
      </ul>
    </div>
  );
};

export default BindedAnketsList;
