import './index.scss';
import {useContext} from "react";
import {ThemeContext} from "store/context/themeContextProvider";


const Loader = () => {
    const {isDarkTheme} = useContext(ThemeContext);

    return(
        <div className={`loader_wrapper ${isDarkTheme ? '' : 'wrapper_light'}`}>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader