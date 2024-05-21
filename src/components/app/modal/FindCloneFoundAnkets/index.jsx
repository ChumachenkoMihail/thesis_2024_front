import AccordionList from "components/app/base/AccordionList";
import AccordionListItem from "components/app/base/AccordionList/AccordionListItem";
import "./index.scss";
import { v4 as uuid } from "uuid";
import Button from "components/app/use/Button";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import { ReactComponent as VK } from "assets/images/vk_ico.svg";

const FindCloneFoundAnkets = ({ ankets }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const handleOpenLinkInNewTab = (link) => {
    window.open(link, "_blank");
  };
  return (
    <div
      className={`find_clone_ankets ${
        isDarkTheme ? "" : "find_clone_ankets-light"
      }`}
    >
      <AccordionList>
        {ankets?.map((item) => {
          return (
            <AccordionListItem key={uuid()}>
              <div className="find_clone_preview">
                <img
                  className="find_clone_image"
                  src={item?.thumbnail}
                  alt=""
                />
                <div className="find_clone_head_title">
                  <p>Имя</p>
                  <span>{item?.firstname}</span>
                </div>
                <div className="find_clone_head_title">
                  <p>Процент совпадения</p>
                  <span>{item?.score}</span>
                </div>

                <div className="find_clone_url">
                  {/* Todo: change to Button in new design */}
                  <Button
                    mode="tretiary"
                    Icon={VK}
                    func={() =>
                      handleOpenLinkInNewTab(
                        `https://vk.com/id${item?.details[0]?.userid}`,
                      )
                    }
                  />
                </div>
              </div>
              <>
                {item.details.length ? (
                  <div className="ankets_images">
                    {item?.details?.map(({ url }) => {
                      return (
                        <figure key={uuid()}>
                          <img src={url} alt="" />
                        </figure>
                      );
                    })}
                  </div>
                ) : (
                  <>0</>
                )}
              </>
            </AccordionListItem>
          );
        })}
      </AccordionList>
    </div>
  );
};

export default FindCloneFoundAnkets;
