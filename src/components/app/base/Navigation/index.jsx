import React, { useEffect } from "react";
import {Link, NavLink} from "react-router-dom";
import "./index.scss";
import { v4 as uuid } from "uuid";
import {useDispatch, useSelector} from "react-redux";
import Loader from "components/app/use/Loader";
import {userNotifications, userOrgsWithProjects} from "../../../../store/thunks/searchThunks";
import Accordion from "../Accordion";
import { ReactComponent as Plus } from "assets/images/plus.svg";
import { ReactComponent as Custom } from "assets/images/custom-ankets-list.svg";




const Navigation = ({ isDarkTheme }) => {
  const { loading } = useSelector((state) => state.auth);
  const { userOrgsWithProjectsData, loadingOrg } = useSelector((state) => state.search);
  const { userNotificationsDar, loadingNotif } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const handleClickNavItem = (e) => {
    e.preventDefault();
  };

  useEffect( () => {
    dispatch(userOrgsWithProjects())
    dispatch(userNotifications())

  }, []);
  return (
      <>
        {loading || loadingOrg && <Loader/>}
        <nav className={`kermit_nav ${isDarkTheme ? "" : "nav_light"}`}>
          <ul>
            {
              <React.Fragment key={uuid()}>
                <Accordion title="Орагнізації" >
                  <div style={{gap: "8px", display: "flex", flexDirection: "column"}}>
                    {userOrgsWithProjectsData?.length <= 0 ?
                        <>
                          <div>Немає організацій</div>
                        </>:
                    <>
                    {userOrgsWithProjectsData?.map((org) => {
                  return (
                      <Accordion title={org.name} >
                        <div style={{gap: "15px", display: "flex", flexDirection: "column"}}>
                          {org?.Projects?.length <= 0 ?
                              <>
                                <div>Проектів немає</div>
                              </>: <>
                                {org?.Projects?.map((project) => {
                                  return (
                                      <div className='accordion_title'>
                                          <Link to={`/bugs/${project.id}/${org.id}`}>
                                            {project.name}
                                          </Link>
                                      </div>
                                  )
                                })}
                              </>}
                        </div>
                      </Accordion>
                  )
                })}
                    </>
                    }
                  </div>
                </Accordion>
              </React.Fragment>
            }
            <li>
              <NavLink
                  to='/organizations'
                  className={({ isActive }) =>
                      isActive ? "active" : ""
                  }
              >
                <Custom/>
                  Мої огранізації
              </NavLink>
            </li>
          </ul>
        </nav>
      </>
  );
};

export default Navigation;
