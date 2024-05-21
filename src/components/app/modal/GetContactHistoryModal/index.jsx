import "./index.scss";
import List from "components/app/use/List";
import { v4 as uuid } from "uuid";
import { ReactComponent as Copy } from "assets/images/copy.svg";
import Button from "components/app/use/Button";
import { divideArray } from "libs/helpers";
import { copyToTextClipboard } from "libs/clipboardCopy";

const GetContactHistoryModal = ({ data }) => {
  const [part1, part2] = divideArray(data.output);
  return (
    <div className="get_contact_view">
      {part1 && (
        <List>
          <ul className="column_list">
            {part1?.map((item) => {
              return (
                <li key={uuid()}>
                  <div className="list_item_name">
                    {item}
                    <Button
                      Icon={Copy}
                      func={() => copyToTextClipboard(item)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </List>
      )}
      {part2 && (
        <List>
          <ul className="column_list">
            {part2?.map((item) => {
              return (
                <li key={uuid()}>
                  <div className="list_item_name">
                    {item}
                    <Button
                      Icon={Copy}
                      func={() => copyToTextClipboard(item)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </List>
      )}
    </div>
  );
};

export default GetContactHistoryModal;
