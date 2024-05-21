import { useOutlet, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const outlet = useOutlet();
  return <div className="app_layout">{outlet}</div>;
};

export default AdminLayout;
