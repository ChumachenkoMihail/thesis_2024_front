import Button from "components/app/use/Button";
import { ReactComponent as SearchLoop } from "assets/images/Select/search.svg";
import { useSearchContext } from "../../../../store/context/globalSearchContext";
import "./index.scss";
const HeadSearch = () => {
  const { showSearch } = useSearchContext();
  return (
    <div className="head_search">
      <div className="head_action">
        <Button func={showSearch} Icon={SearchLoop} />
      </div>
    </div>
  );
};

export default HeadSearch;


