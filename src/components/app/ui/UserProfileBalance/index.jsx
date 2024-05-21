import { memo, useContext, useState } from "react";
import "./index.scss";
import Button from "components/app/use/Button";
import { ReactComponent as Plus } from "assets/images/plus.svg";
import { creditsEditEnum, creditsNameEnum } from "libs/Enums";
import Modal from "components/app/base/Modal";
import EditUserCredits from "components/admin/EditUserCredits/EditUserCredits";
import { ThemeContext } from "store/context/themeContextProvider";

const UserProfileBalance = ({ credits, userId }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [selectedCredit, setSelectedCredit] = useState();
  const creditArray = Object?.entries(credits || {})?.map(
    ([creditName, creditCount]) => {
      return {
        creditName,
        creditCount,
      };
    },
  );
  return (
    <>
      {selectedCredit && (
        <Modal
          width="800"
          Icon={Plus}
          title={creditsEditEnum[selectedCredit?.creditName]}
          closeModal={() => setSelectedCredit(null)}
        >
          <EditUserCredits
            userId={userId}
            selectedCredit={selectedCredit}
            cancel={() => setSelectedCredit(null)}
          />
        </Modal>
      )}
      <ul className={`user_balance ${isDarkTheme ? "user_balance_dark" : ""}`}>
        {creditArray?.map(({ creditName, creditCount }) => {
          return (
            <li>
              <div className="credit_name">{creditsNameEnum[creditName]}</div>
              <div className="credit_count">
                {creditCount?.toString() === "-1"
                  ? "∞"
                  : creditCount?.toString()}
              </div>
              <div className="credit_action">
                <Button
                  mode="tretiary"
                  Icon={Plus}
                  func={() =>
                    setSelectedCredit({
                      creditName,
                      creditCount,
                    })
                  }
                />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default memo(UserProfileBalance);
