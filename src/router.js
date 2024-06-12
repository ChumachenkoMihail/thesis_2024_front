import {
  defer,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

import { AuthLayout } from "./layouts/AuthLayout";
import Login from "./pages/Admin/Login";
import Page404 from "./pages/Users/404";
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
          <Route path="/organizations" element={<Organization />} />
          <Route path="/bugs/:projectId?/:organizationId?" element={<Board />} />
          <Route path="/bug-details/:bugId" element={<BugDetails />} />
          <Route path="/statistic/:projectId?" element={<ProjectStats />} />
      </Route>
    </>,
  ),
);
