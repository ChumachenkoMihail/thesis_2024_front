import React, { memo } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "components/app/base/Accordion";
import { ReactComponent as Key } from "assets/images/key.svg";

const Access = ({ data }) => {
  const hasSecretData =
    data?.departureRestrictions ||
    data?.diplCountry ||
    data?.diplSecretAccess ||
    data?.diplTopSecretDescription ||
    data?.diplTopSecretInfo ||
    data?.topSecretAccessInfo ||
    data?.secretAccess ||
    data?.diplWorkPlace;

  return (
    <>
      {hasSecretData && (
        <Accordion title="Ограничения / Привелегии" Icon={Key}>
          <div className="accordion_content accordion_column">
            {Array.isArray(data?.departureRestrictions) ? (
              <div className="details_div">
                <div className="details_label">Ограничение на выезд</div>
                {data?.departureRestrictions?.map((item) => {
                  return <p key={uuid()}>{item}</p>;
                })}
              </div>
            ) : (
              <>
                {data?.departureRestrictions &&
                  data?.departureRestrictions !== " " && (
                    <div className="details_div">
                      <div className="details_label">Ограничение на выезд</div>
                      <p>{data?.departureRestrictions}</p>
                    </div>
                  )}
              </>
            )}
            {Array.isArray(data?.diplCountry) ? (
              <div className="details_div">
                <div className="details_label">Страна дип. пребывания</div>
                <p>
                  {data?.diplCountry?.map((item) => {
                    return <p key={uuid()}>{item}</p>;
                  })}
                </p>
              </div>
            ) : (
              <>
                {data?.diplCountry && data?.diplCountry !== " " && (
                  <div className="details_div">
                    <div className="details_label">Страна дип. пребывания</div>
                    <p>{data?.diplCountry}</p>
                  </div>
                )}
              </>
            )}
            {Array.isArray(data?.diplSecretAccess) ? (
              <div className="details_div">
                <div className="details_label">Доступ к дип. тайне</div>
                {data?.diplSecretAccess.map((item) => {
                  return <p key={uuid()}>{item}</p>;
                })}
              </div>
            ) : (
              <>
                {data?.diplSecretAccess && data?.diplSecretAccess !== " " && (
                  <div className="details_div">
                    <div className="details_label">Доступ к дип. тайне</div>
                    <p>{data?.diplSecretAccess}</p>
                  </div>
                )}
              </>
            )}
            {Array.isArray(data?.diplTopSecretDescription) ? (
              <div className="details_div">
                <div className="details_label">Детали секретного доступа</div>
                <p>
                  {data?.diplTopSecretDescription.map((item) => {
                    return <p key={uuid()}>{item}</p>;
                  })}
                </p>
              </div>
            ) : (
              <>
                {data?.diplTopSecretDescription &&
                  data?.diplTopSecretDescription !== " " && (
                    <div className="details_div">
                      <div className="details_label">
                        Детали секретного доступа
                      </div>
                      <p>{data?.diplTopSecretDescription}</p>
                    </div>
                  )}
              </>
            )}
            {Array.isArray(data?.diplTopSecretInfo) ? (
              <>
                <div className="details_div">
                  <div className="details_label">
                    Доступ к совершенно секретной информации
                  </div>
                  {data?.diplTopSecretInfo.map((item) => {
                    return <p key={uuid()}>{item}</p>;
                  })}
                </div>
              </>
            ) : (
              <>
                {data?.diplTopSecretInfo && data?.diplTopSecretInfo !== " " && (
                  <div className="details_div">
                    <div className="details_label">
                      Доступ к совершенно секретной информации
                    </div>
                    <p>{data?.diplTopSecretInfo}</p>
                  </div>
                )}
              </>
            )}

            {Array.isArray(data?.topSecretAccessInfo) ? (
              <>
                <div className="details_div">
                  <div className="details_label">Доступ к гос.тайне</div>
                  {data?.topSecretAccessInfo.map((item) => {
                    return <p key={uuid()}>{item}</p>;
                  })}
                </div>
              </>
            ) : (
              <>
                {data?.topSecretAccessInfo &&
                  data?.topSecretAccessInfo !== " " && (
                    <div className="details_div">
                      <div className="details_label">Доступ к гос.тайне</div>
                      <p>{data?.topSecretAccessInfo}</p>
                    </div>
                  )}
              </>
            )}
            {Array.isArray(data?.secretAccess) ? (
              <>
                <div className="details_div">
                  <div className="details_label">Секретный доступ</div>
                  {data?.secretAccess?.map((item) => {
                    return <p key={uuid()}>{item}</p>;
                  })}
                </div>
              </>
            ) : (
              <>
                {data?.secretAccess && data?.secretAccess !== " " && (
                  <div className="details_div">
                    <div className="details_label">Секретный доступ</div>
                    <p>{data?.secretAccess}</p>
                  </div>
                )}
              </>
            )}
            {Array.isArray(data?.diplWorkPlace) ? (
              <>
                <div className="details_div">
                  <div className="details_label">Доп. место работы</div>
                  {data?.diplWorkPlace?.map((item) => {
                    return <p key={uuid()}>{item}</p>;
                  })}
                </div>
              </>
            ) : (
              <>
                {data?.diplWorkPlace && data?.diplWorkPlace !== " " && (
                  <div className="details_div">
                    <div className="details_label">Дип. место работы</div>
                    <p>{data?.diplWorkPlace}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </Accordion>
      )}
    </>
  );
};

export default memo(Access);
