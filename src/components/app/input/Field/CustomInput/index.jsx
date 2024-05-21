import {forwardRef} from "react";
import Calendar from "assets/images/calendar.svg";
import CalendarDark from "assets/images/calendar_dark.svg";


const ExampleCustomInput = forwardRef((props, ref) => {
    return(
        <div className='date_input'>
            {props.label &&
                <div className="label">{props.label}</div>
            }
            <div className="field input_field_range">
                <img onClick={props.onClick} src={props.isdarktheme ? Calendar  : CalendarDark} alt=""/>
                <input type="text" {...props} ref={ref}/>
            </div>
        </div>
    )
});

export default ExampleCustomInput