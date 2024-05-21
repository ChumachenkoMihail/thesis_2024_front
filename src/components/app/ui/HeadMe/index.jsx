import Button from "components/app/use/Button";
import "./index.scss";

const HeadMe = ({ headText }) => {
    return (
        <div className="head_search">
             <div className="head_action">
                <Button text={headText} />
             </div>
         </div>
    );
};

export default HeadMe;