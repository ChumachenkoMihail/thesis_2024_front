import { v4 as uuid } from "uuid";
import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as Arrow } from "assets/images/angle_down.svg";
import gsap from "gsap";

export default function Dropdown({ title, list, Icon }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const arrowRef = useRef();

  gsap.config({
    force3D: false,
    nullTargetWarn: false,
    z: 0.1,
    rotationZ: 0.01,
    transformPerspective: 1000,
  });

  const animation = (ref, open, arrowRef) => {
    const tl = gsap.timeline();
    !open
      ? tl
          .to(ref, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            autoAlpha: 1,
            duration: 0.2,
          })
          .to(arrowRef, { scaleY: -1, duration: 0.2 }, "<")
      : tl
          .to(ref, {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            autoAlpha: 0,
            duration: 0.2,
          })
          .to(arrowRef, { scaleY: 1, duration: 0.2 }, "<");

    return tl;
  };

  const handleOpen = () => {
    if (!open) {
      setOpen(true);
      animation(ref.current, open, arrowRef.current);
    }
  };
  const handleClose = useCallback(() => {
    if (open) {
      setOpen(false);
      animation(ref.current, open, arrowRef.current);
    }
  }, [open]);

  useEffect(() => {
    gsap.set(ref.current, {
      autoAlpha: 0,
    });
  }, [ref]);
  return (
    <li
      // className={classes.dropdown}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      <a className="nav_drop_btn">
        <Icon />
        {title}
        <Arrow ref={arrowRef} />
      </a>
      <ul className="drop_nav_list" ref={ref}>
        {list.map(({ title, route, Icon }) => (
          <li key={uuid()}>
            <NavLink to={route}>
              <Icon />
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
