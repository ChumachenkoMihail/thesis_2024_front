import AccessLevels from "components/admin/AccessLevels";
import Users from "components/app/ui/Users";
import SettingsApiList from "components/admin/SettingsApiList";
import "./index.scss";
import Accordion from "components/app/base/Accordion";
import React, { useEffect } from "react";
import { getSettings } from "store/thunks/settingsApiThunks";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/app/use/Loader";
import FilterSources from "components/app/ui/FilterSources";
import { getSourcesFilters } from "../../../store/thunks/filterSourcesThunk";
import { getAllLevelsWithFields } from "../../../store/thunks/levelsThunks";
import { getAllSearchFields } from "../../../store/thunks/searchThunks";

const UsersManage = () => {
  const dispatch = useDispatch();
  const { settingsApi, loading } = useSelector((state) => state.settingsApi);

  useEffect(() => {
    dispatch(getSettings());
    dispatch(getSourcesFilters());
    dispatch(getAllLevelsWithFields());
    dispatch(getAllSearchFields());
    dispatch(getAllLevelsWithFields());
  }, []);
  return (
    <>
      {loading && <Loader />}
      <div className="settings_content">
        <Accordion title="Управление пользователями">
          <div className="users_manage_row">
            <AccessLevels />
            <Users />
          </div>
        </Accordion>
        <SettingsApiList settingsApi={settingsApi} />
        <FilterSources />
      </div>
    </>
  );
};

export default UsersManage;
