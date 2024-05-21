import Accordion from "components/app/base/Accordion";
import HistorySources from "components/app/modal/HistorySources";

const CsvSourcesList = ({ allSource, getResults }) => {
  return (
    <div
      style={{
        display: "grid",
        gap: "15px",
      }}
    >
      {allSource?.sources?.map(({ searchName, result, paramsId }) => {
        return (
          <>
            {result.length ? (
              <Accordion titleTag="h5" title={searchName}>
                <HistorySources
                  paramsId={paramsId}
                  getResults={getResults}
                  allSource={{ sources: result, id: allSource.id }}
                />
              </Accordion>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default CsvSourcesList;
