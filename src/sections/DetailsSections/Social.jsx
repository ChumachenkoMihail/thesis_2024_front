import React, { memo } from "react";
import Accordion from "components/app/base/Accordion";
import { v4 as uuid } from "uuid";
import TagLink from "components/app/use/TagLink";
import { ReactComponent as SocialLogo } from "assets/images/social.svg";

const Social = ({ data }) => {
  const hasSocial =
    data?.ip ||
    data?.login ||
    data?.password ||
    data?.sourceName ||
    data?.facebookId ||
    data?.mailruProfile ||
    data?.webLink ||
    data?.getContactTags ||
    data?.imsi ||
    data?.serialSim ||
    data?.numBusterTags ||
    data?.insuranceCompany ||
    data?.insuranceNumber ||
    data?.vkId ||
    data?.credit_amount ||
    data?.family_status ||
    data?.post ||
    data?.linkedinLink;
  return (
    <>
      {hasSocial && (
        <Accordion title="Соц. данные" Icon={SocialLogo}>
          <div className="accordion_content accordion_row">
            {data?.ip && (
              <div className="details_div">
                <div className="details_label">IP aдрес</div>

                {Array.isArray(data?.ip) ? (
                  <>
                    {data?.ip.map((item) => {
                      return (
                        <p key={uuid()}>
                          {item}
                          {", "}
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <p>{data?.ip}</p>
                )}
              </div>
            )}
            {data?.insuranceNumber && (
              <div className="details_div">
                <div className="details_label">Номер страховки</div>

                {Array.isArray(data?.insuranceNumber) ? (
                  <>
                    {data?.insuranceNumber.map((item) => {
                      return (
                        <p key={uuid()}>
                          {item}
                          {", "}
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <p>{data?.insuranceNumber}</p>
                )}
              </div>
            )}
            {data?.insuranceCompany && (
              <div className="details_div">
                <div className="details_label">Компания страховщик</div>

                {Array.isArray(data?.insuranceCompany) ? (
                  <>
                    {data?.insuranceCompany.map((item) => {
                      return (
                        <p key={uuid()}>
                          {item}
                          {", "}
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <p>{data?.insuranceCompany}</p>
                )}
              </div>
            )}
            {data?.login && (
              <div className="details_div social_details_div">
                <div className="details_label">Логин</div>

                {Array.isArray(data?.login) ? (
                  <p>
                    {data?.login.map((item) => {
                      return (
                        <React.Fragment key={uuid()}>
                          {item}
                          {", "}
                        </React.Fragment>
                      );
                    })}
                  </p>
                ) : (
                  <p>{data?.login}</p>
                )}
              </div>
            )}
            {data?.password && (
              <div className="details_div social_details_div">
                <div className="details_label">Пароли</div>

                {Array.isArray(data?.password) ? (
                  <>
                    {data?.password?.map((item) => {
                      return <p key={uuid()}>{item}</p>;
                    })}
                  </>
                ) : (
                  <p>{data?.password}</p>
                )}
              </div>
            )}
            {data?.sourceName && (
              <div className="details_div social_details_div">
                <div className="details_label">Имя источника</div>
                {Array.isArray(data?.sourceName) ? (
                  <p>
                    {data?.sourceName.map((item) => {
                      return (
                        <React.Fragment key={uuid()}>
                          {item}
                          {", "}
                        </React.Fragment>
                      );
                    })}
                  </p>
                ) : (
                  <p>{data?.sourceName}</p>
                )}
              </div>
            )}
            {data?.getContactTags && (
              <div className="details_div social_details_div">
                <div className="details_label">GetContact Теги</div>
                {data?.getContactTags.map((item) => {
                  return <p key={uuid()}>{item}</p>;
                })}
              </div>
            )}
            {data?.numBusterTags && (
              <div className="details_div social_details_div">
                <div className="details_label">NumBuster Теги</div>
                {data?.numBusterTags.map((item) => {
                  return <p key={uuid()}>{item}</p>;
                })}
              </div>
            )}
            {data?.facebookId && (
              <div className="details_div social_details_div">
                <div className="details_label">Профиль Facebook </div>
                {Array.isArray(data?.facebookId) ? (
                  <>
                    {data?.facebookId.map((item) => {
                      return (
                        <p key={uuid()}>
                          <TagLink
                            href={`https://www.facebook.com/${item}`}
                            target="_blank"
                          >
                            {item}
                          </TagLink>
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <p>
                    <TagLink
                      href={`https://www.facebook.com/${data?.facebookId}`}
                      target="_blank"
                    >
                      {data?.facebookId}
                    </TagLink>
                  </p>
                )}
              </div>
            )}
            {data?.vkId && (
              <div className="details_div social_details_div">
                <div className="details_label">Профиль Vkontakte </div>
                {Array.isArray(data?.vkId) ? (
                  <>
                    {data?.vkId.map((item) => {
                      return (
                        <p key={uuid()}>
                          <TagLink
                            href={`https://vk.com/id${item}`}
                            target="_blank"
                          >
                            https://vk.com/id{item}
                          </TagLink>
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <p>
                    <TagLink
                      href={`https://vk.com/id${data?.vkId}`}
                      target="_blank"
                    >
                      https://vk.com/id{data?.vkId}
                    </TagLink>
                  </p>
                )}
              </div>
            )}
            {data?.mailruProfile && (
              <div className="details_div social_details_div">
                <div className="details_label">Профиль Mail.ru </div>
                {Array.isArray(data?.mailruProfile) ? (
                  <>
                    {data?.mailruProfile.map((item) => {
                      return (
                        <p key={uuid()}>
                          <TagLink href={item} target="_blank">
                            {item}
                          </TagLink>
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <p>
                    <TagLink href={data?.mailruProfile} target="_blank">
                      {data?.mailruProfile}
                    </TagLink>
                  </p>
                )}
              </div>
            )}
            {data?.webLink && (
              <div className="details_div social_details_div">
                <div className="details_label">Веб ссылка</div>
                {Array.isArray(data?.webLink) ? (
                  <>
                    {data?.webLink.map((item) => {
                      return (
                        <p key={uuid()}>
                          <TagLink href={item} target="_blank">
                            {item}
                          </TagLink>
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <p>
                    <TagLink href={data?.webLink} target="_blank">
                      {data?.webLink}
                    </TagLink>
                  </p>
                )}
              </div>
            )}
            {data?.linkedinLink && (
              <div className="details_div social_details_div">
                <div className="details_label">Профиль LinkedIn</div>
                {Array.isArray(data?.linkedinLink) ? (
                  <>
                    {data?.linkedinLink.map((item) => {
                      return (
                        <p key={uuid()}>
                          <TagLink
                            href={`https://www.linkedin.com/${item}`}
                            target="_blank"
                          >
                            {item}
                          </TagLink>
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <p>
                    <TagLink
                      href={`https://www.linkedin.com/${data?.linkedinLink}`}
                      target="_blank"
                    >
                      {data?.linkedinLink}
                    </TagLink>
                  </p>
                )}
              </div>
            )}
            {data?.imsi && (
              <div className="details_div social_details_div">
                <div className="details_label">
                  Идентификационный номер SIM-карты
                </div>
                {Array.isArray(data?.imsi) ? (
                  <>
                    {data?.imsi.map((item) => {
                      return <p key={uuid()}>{item}</p>;
                    })}
                  </>
                ) : (
                  <p>{data?.imsi}</p>
                )}
              </div>
            )}
            {data?.serialSim && (
              <div className="details_div social_details_div">
                <div className="details_label">Серия SIM-карты</div>
                {Array.isArray(data?.serialSim) ? (
                  <>
                    {data?.serialSim.map((item) => {
                      return <p key={uuid()}>{item}</p>;
                    })}
                  </>
                ) : (
                  <p>{data?.serialSim}</p>
                )}
              </div>
            )}
            {data?.credit_amount && (
              <div className="details_div social_details_div">
                <div className="details_label">Сумма кредита</div>
                {Array.isArray(data?.credit_amount) ? (
                  <>
                    {data?.credit_amount.map((item) => {
                      return <p key={uuid()}>{item}</p>;
                    })}
                  </>
                ) : (
                  <p>{data?.credit_amount}</p>
                )}
              </div>
            )}
            {data?.family_status && (
              <div className="details_div social_details_div">
                <div className="details_label">Семейное положение</div>
                {Array.isArray(data?.family_status) ? (
                  <>
                    {data?.family_status.map((item) => {
                      return <p key={uuid()}>{item}</p>;
                    })}
                  </>
                ) : (
                  <p>{data?.family_status}</p>
                )}
              </div>
            )}
            {data?.post && (
              <div className="details_div social_details_div">
                <div className="details_label">Должность(почта россии)</div>
                {Array.isArray(data?.post) ? (
                  <>
                    {data?.post.map((item) => {
                      return <p key={uuid()}>{item}</p>;
                    })}
                  </>
                ) : (
                  <p>{data?.post}</p>
                )}
              </div>
            )}
          </div>
        </Accordion>
      )}
    </>
  );
};

export default memo(Social);
