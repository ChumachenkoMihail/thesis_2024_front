import Button from "../../../components/app/use/Button";
import Title from "../../../components/app/use/Title";
import { useNavigate } from "react-router-dom";
import "./index.scss";
const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="kermit_404">
      <Title Tag="h1">404</Title>
      <Title Tag="h2">Not Found 🙈</Title>
      <Button func={() => navigate("/organizations")}>На главную</Button>
    </div>
  );
};

export default Page404;
