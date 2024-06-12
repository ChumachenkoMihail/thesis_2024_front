import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import Navigation from "components/app/base/Navigation";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import ThemeSwitcher from "components/app/use/ThemeSwitcher";
import { ThemeContext } from "store/context/themeContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/thunks/authThunks";
import { ReactComponent as Logout } from "assets/images/logout_icon.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Check } from "assets/images/check_button.svg";
import { ReactComponent as ClearInput } from "assets/images/clear_input.svg";
import LogoWrapper from "components/app/base/LogoWrapper";
import {
  acceptInvite,
  declineInvite,
  markNotifAsRead,
  me,
  setNotifAsRead,
  userNotifications, userOrgsWithProjects
} from "store/thunks/searchThunks";
import Loader from "../../components/app/use/Loader";
import DropDown from "../../components/app/use/DropDown";
import Button from "../../components/app/use/Button";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const path = location.pathname;
  // const { openModal } = useCreateOrgModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext);
  const { meData, loading, userNotificationsData } = useSelector((state) => state.search);



  useEffect( () => {
    if (token && token !== "undefined" && token !== "") {
      dispatch(me())
      dispatch(userNotifications())
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      location.pathname !== "/" && window.location.replace("/");
    }
  }, []);

  const handleCreateOrganization = (e, value) => {
    e.stopPropagation();
    e.preventDefault();
    // openModal()
  };
  if (token !== "" && !token && path !== "/") {
    return <Navigate to="/" />;
  }

  const markNotifAsRead = async (notifId) => {
    await dispatch(setNotifAsRead(notifId))
    dispatch(userNotifications())

  };
  const handleAcceptInvite = (orgId) => {
    dispatch(acceptInvite(orgId))
    dispatch(userNotifications())
  };

  const handleDeclineInvite = (orgId) => {
    dispatch(declineInvite(orgId))
    dispatch(userNotifications())
  };

  console.log('userNotificationsData');
  console.log(userNotificationsData);
  return (
      <>
        {loading && <Loader/>}
            <AuthContext.Provider value>
              {/*<div>*/}
                <div className="header_wrapper" >
                  <header style={{height: '100%'}}>
                    <div
                        className={`container head_container ${
                            isDarkTheme ? "" : "light_head"
                        }`}

                        style={{height: '100%'}}
                    >
                      <div className="nav_container">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: '100%' }}>
                          <LogoWrapper/>
                          <div className='head_actions_item'>
                            {meData?.firstName}
                          </div>
                          <ThemeSwitcher/>
                          <DropDown angleDown={false} Icon={Mail}>
                            { userNotificationsData?.length <= 0 ? (
                                <div className="head_actions_item">
                                  <span> Немає повідомлень </span>
                                </div>

                            ): (
                                <>
                                  {userNotificationsData?.map(notification => {
                                    if(notification?.bugId){
                                      return (
                                          <>
                                            <Link to={`/bug-details/${notification?.bugId}`}>
                                            {notification.status === "READ" &&
                                                <div className={`head_actions_item ${isDarkTheme ? "" : "notif_read_light"}`} style={{display: 'flex', justifyContent: 'space-between'}} onClick={async ()=> {
                                                  await markNotifAsRead(notification.id)
                                                }}>
                                                  {notification.text}
                                                  {notification.content === "TEXT" &&
                                                      <div style={{display: "flex", gap: '8px'}}>
                                                      </div>
                                                  }
                                                </div>
                                            }
                                            {notification.status === "UNREAD" &&
                                                <div className={`head_actions_item ${isDarkTheme ? "notif_read" : ""}`} style={{display: 'flex', justifyContent: 'space-between'}} onClick={()=> {
                                                  markNotifAsRead(notification.id)
                                                }}>
                                                  {notification.text}
                                                  {notification.content === "TEXT" &&
                                                      <div style={{display: "flex", gap: '8px'}}>
                                                      </div>
                                                  }
                                                </div>
                                            }
                                            </Link>
                                          </>
                                      )
                                    }
                                    if(notification?.organizationId && notification?.valid === true){
                                      return (
                                          <>
                                              {notification.status === "READ" &&
                                                  <div className={`head_actions_item ${isDarkTheme ? "" : "notif_read_light"}`} style={{display: 'flex', justifyContent: 'space-between'}} onClick={async ()=> {
                                                    await markNotifAsRead(notification.id)
                                                  }}>
                                                    {notification.text}
                                                    {notification.content === "INVITE" &&
                                                        <div style={{display: "flex", gap: '8px'}}>
                                                          <Button style={{padding: "0"}} mode="secondary"  Icon={Check} func={()=>handleAcceptInvite(notification?.organizationId)}/>
                                                          <Button style={{padding: "0"}} mode="secondary"  Icon={ClearInput} func={()=>handleDeclineInvite(notification?.organizationId)}/>

                                                        </div>
                                                    }
                                                  </div>
                                              }
                                              {notification.status === "UNREAD" &&
                                                  <div className={`head_actions_item ${isDarkTheme ? "notif_read" : ""}`} style={{display: 'flex', justifyContent: 'space-between'}} onClick={()=> {
                                                    markNotifAsRead(notification.id)
                                                  }}>
                                                    {notification.text}
                                                    {notification.content === "INVITE" &&
                                                        <div style={{display: "flex", gap: '8px'}}>
                                                          <Button style={{padding: "0"}} mode="secondary"  Icon={Check} func={()=>handleAcceptInvite(notification?.organizationId)}/>
                                                          <Button style={{padding: "0"}} mode="secondary"  Icon={ClearInput} func={()=>handleDeclineInvite(notification?.organizationId)}/>
                                                        </div>
                                                    }
                                                  </div>
                                              }
                                          </>
                                      )
                                    }
                                  })}
                                  </>
                            )}

                          </DropDown>
                          <div
                              className="action action_logout"
                              onClick={() => dispatch(logout(navigate))}
                          >
                            <Logout/>
                          </div>
                        </div>
                        <div className="kermit_app_row">
                          <Navigation isDarkTheme={isDarkTheme}/>
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
              {/*</div>*/}
              {children}
            </AuthContext.Provider>
      </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
