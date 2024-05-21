import AccordionList from "components/app/base/AccordionList";
import AccordionListItem from "components/app/base/AccordionList/AccordionListItem";
import "./index.scss";
import { v4 as uuid } from "uuid";
import TagLink from "components/app/use/TagLink";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const TineyeFoundResults = ({ results }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`tineye_results ${isDarkTheme ? "" : "tineye_results-light"}`}
    >
      <AccordionList>
        {results?.map((item) => {
          return (
            <>
              {item?.details?.length ? (
                <AccordionListItem
                  key={uuid()}
                  buttonText="Показать результаты"
                >
                  <div className="tineye_info">
                    <img
                      className="tineye_image"
                      src={item?.thumbnail}
                      alt=""
                    />
                  </div>
                  <>
                    {item?.details?.length ? (
                      <div className="tineye_details_inner">
                        {item?.details?.map((element) => {
                          return (
                            <>
                              <AccordionListItem
                                key={uuid()}
                                buttonText="Показать детали"
                              >
                                <div className="tineye_info">
                                  <img
                                    className="tineye_image"
                                    src={element?.image_url}
                                    alt=""
                                  />
                                  <div className="tineye_title">
                                    <p>Процент совпадения</p>
                                    <span>{element?.score || "-"}</span>
                                  </div>
                                  <div className="tineye_title">
                                    <p>Источник</p>
                                    <span>{element?.domain || "-"}</span>
                                  </div>
                                  <div className="tineye_title">
                                    <p>Источник доступен</p>
                                    <span>
                                      {element?.domain_unavailable
                                        ? "нет"
                                        : "да"}
                                    </span>
                                  </div>
                                </div>
                                <>
                                  {element.backlinks.length ? (
                                    <div className="tineye_details">
                                      {element?.backlinks?.map(
                                        ({ url, crawl_date, backlink }) => {
                                          return (
                                            <>
                                              <div className="tineye_info tineye_details_info">
                                                {url ? (
                                                  <a
                                                    href={url}
                                                    key={uuid()}
                                                    target="_blank"
                                                  >
                                                    <img src={url} alt="" />
                                                  </a>
                                                ) : (
                                                  "-"
                                                )}
                                                <div className="tineye_title">
                                                  <p>Дата сканирования</p>
                                                  <span>
                                                    {crawl_date || "-"}
                                                  </span>
                                                </div>
                                                <div className="tineye_title">
                                                  <p>Обратная ссылка</p>
                                                  <TagLink
                                                    href={backlink}
                                                    target="_blank"
                                                  >
                                                    {backlink || "-"}
                                                  </TagLink>
                                                </div>
                                              </div>
                                            </>
                                          );
                                        },
                                      )}
                                    </div>
                                  ) : (
                                    <>-</>
                                  )}
                                </>
                              </AccordionListItem>
                            </>
                          );
                        })}
                      </div>
                    ) : (
                      <>Нет данных</>
                    )}
                  </>
                </AccordionListItem>
              ) : null}
            </>
          );
        })}
      </AccordionList>
    </div>
  );
};

export default TineyeFoundResults;
