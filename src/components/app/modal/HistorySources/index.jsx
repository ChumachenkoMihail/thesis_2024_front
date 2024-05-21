import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import { v4 as uuid } from "uuid";
import { sourceEnum } from "libs/Enums";
import { ReactComponent as DataBase } from "assets/images/database.svg";
import Title from "components/app/use/Title";
import { historyActions } from "../../../../store/historySlice";
import { useDispatch } from "react-redux";

const HistorySources = ({
  allSource,
  getResults,
  getInsightResult,
  paramsId,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const handleGetResult = (sourceId, historyId, sourceNameId, paramsId) => {
    getResults(sourceId, historyId, sourceNameId, paramsId);
    dispatch(historyActions.setHistorySources(allSource.sources));
  };
  return (
    <div className="history_sources">
      <Title Tag="h4" titleType="title_secondary">
        Выберите базу для отображения результатов
      </Title>
      <ul
        className={`sources_column ${
          isDarkTheme ? "" : "sources_column_light"
        }`}
      >
        {allSource?.sources?.map(
          ({ sourceName, totalAnkets, sourceId, sourceNameId }) => {
            return (
              <li
                key={uuid()}
                onClick={() =>
                  sourceNameId === "insight"
                    ? getInsightResult(
                        sourceNameId,
                        allSource.name.split("|")[0],
                        allSource.id,
                      )
                    : handleGetResult(
                        sourceId,
                        allSource.id,
                        sourceNameId,
                        paramsId,
                      )
                }
              >
                {sourceEnum[sourceNameId] ? (
                  sourceEnum[sourceNameId]
                ) : (
                  <DataBase />
                )}
                <div className="source_description">
                  <div>{sourceName}</div>
                  <p>
                    {totalAnkets}{" "}
                    {totalAnkets === 1 ? "результат" : "результата"}{" "}
                  </p>
                </div>
              </li>
            );
          },
        )}
      </ul>
    </div>
  );
};

export default HistorySources;
