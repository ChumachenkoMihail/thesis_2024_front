import {useContext} from "react";
import './index.scss'
import {ThemeContext} from "store/context/themeContextProvider";


const ButtonLoader = () => {
    const {isDarkTheme} = useContext(ThemeContext);

    return(
        <div className={`lds_load ${isDarkTheme ? '' : 'lds_load_light'}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default ButtonLoader