import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import IOSwitch from "components/app/use/IOSwitch";
import Loader from "components/app/use/Loader";
import { updateSourcesFilters } from "store/thunks/filterSourcesThunk";
import "./index.scss";
import Accordion from "components/app/base/Accordion";
import { sourceEnum } from "libs/Enums";
import { ReactComponent as DataBase } from "assets/images/database.svg";

const FilterSources = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { filterSourcesData, loading } = useSelector(
    (state) => state.filterSources,
  );
  const { userRole } = useSelector((state) => state.users);

  const handleSwitchChange = (sourceId, isNeedFilter) => {
    dispatch(
      updateSourcesFilters({
        sources: [{ source_id: sourceId, isNeedFilter: !isNeedFilter }],
      }),
    );
  };
  const isSuperAdmin = userRole === "superAdmin";
  return (
    <>
      {loading && <Loader />}
      {filterSourcesData ? (
        <Accordion title="Источники">
          <div className="accordion_content">
            <div
              className={`filter_sources_list ${
                isDarkTheme ? "" : "sources_list_light"
              }`}
              style={{
                gridTemplateColumns: `repeat(${isSuperAdmin ? "4" : "5"}, 1fr)`,
              }}
            >
              {filterSourcesData.map(({ source, source_id, isNeedFilter }) => {
                return (
                  <div className="source_item" key={uuid()}>
                    <div className="source_description">
                      {sourceEnum[source_id] ? (
                        sourceEnum[source_id]
                      ) : (
                        <DataBase />
                      )}
                      <div>{source}</div>
                    </div>
                    {isSuperAdmin ? (
                      <IOSwitch
                        onChange={() =>
                          handleSwitchChange(source_id, isNeedFilter)
                        }
                        id={source_id}
                        isChecked={isNeedFilter}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </Accordion>
      ) : null}
    </>
  );
};

export default FilterSources;
