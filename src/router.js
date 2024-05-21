import {
  defer,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

import { AuthLayout } from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import Search from "./pages/Users/Search";
import Login from "./pages/Admin/Login";
import MarkedProfiles from "./pages/Users/MarkedProfiles";
import SearchHistory from "./pages/Users/SearchHistory";
import SearchDetails from "./pages/Users/SearchDetails";
import MarkedProfileView from "./pages/Users/MarkedProfileView";
import CustomProfiles from "./pages/Users/CustomProfiles";
import CustomProfileView from "./pages/Users/CustomProfileView";
import CustomProfileEdit from "./pages/Users/CustomProfileEdit";
import UsersManage from "./pages/Admin/UsersManage";
import SearchAccess from "./pages/Users/SearchAccess";
import ProtectedRoute from "./protectedRoute";
import CsvHistory from "./pages/Users/CsvHistory";
import CallHistory from "./pages/Users/CallHistory";
import UserDetails from "./pages/Admin/UserDetails";
import AlterEgo from "./pages/Users/AlterEgo";
import Page404 from "./pages/Users/404";
import InsightHistory from "./pages/Users/InsightHistory";
import Register from "./pages/Admin/Register";
import Organization from "./pages/Users/Organization";
import Board from "./pages/Users/Board";
import BugDetails from "./pages/Users/BugDetails";
import ProjectStats from "./components/ProjectStats";

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = localStorage.getItem("role");

      resolve(user);
    }, 2000),
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={<AuthLayout />}
        loader={() => defer({ userPromise: getUserData() })}
      >
        <Route path="*" element={<Page404 />} />
        <Route
          path="/search/:historyId?/:sourceId?/:sourceName?/:paramsCsvId?"
          element={<Search />}
        />
          <Route path="/organizations" element={<Organization />} />
          <Route path="/bugs/:projectId?/:organizationId?" element={<Board />} />
          <Route path="/bug-details/:bugId" element={<BugDetails />} />
          <Route path="/statistic/:projectId?" element={<ProjectStats />} />
s
          <Route
          path="/search/details/:id/:slug/:source"
          element={<SearchDetails />}
        />
        <Route path="/marked-profiles" element={<MarkedProfiles />} />
        <Route path="/marked-profiles/:id" element={<MarkedProfileView />} />
        <Route
          path="/marked-profiles/details/:id/:slug/:source"
          element={<SearchDetails />}
        />
        <Route path="/history" element={<SearchHistory />} />
        <Route path="/insight-history" element={<InsightHistory />} />
        <Route path="/history-csv" element={<CsvHistory />} />
        <Route path="/history-call" element={<CallHistory />} />
        <Route path="/custom-profiles" element={<CustomProfiles />} />
        <Route path="/custom-profile/:id" element={<CustomProfileView />} />
        <Route
          path="/custom-profile/:id/edit"
          element={<CustomProfileEdit />}
        />
        <Route path="/access-search" element={<SearchAccess />} />

        <Route path="/alter-ego" element={<AlterEgo />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="settings/manage"
            element={
              <ProtectedRoute requiredRoles={["superAdmin", "admin"]}>
                <UsersManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/manage/user/:id"
            element={
              <ProtectedRoute requiredRoles={["superAdmin", "admin"]}>
                <UserDetails />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </>,
  ),
);
