import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import "./index.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { getInsightResult, insightSearch } from "store/thunks/outsideApiThunks";
import {
  searchAnkets,
  getAnketById,
  getBindedAnkets,
  getBindedPhotos,
} from "store/thunks/searchThunks";
import { alterEgo } from "store/thunks/alterEgoThunk";
import { getAllFolders } from "store/thunks/foldersThunks";
import { getCallCampaigns } from "store/thunks/apiCallThunk";
import { ReactComponent as SearchLoop } from "assets/images/Select/search.svg";
import { ReactComponent as Folder } from "assets/images/add_folder.svg";
import { ReactComponent as Gender } from "assets/images/gender.svg";
import { ReactComponent as Export } from "assets/images/export_ico.svg";
import { ReactComponent as ArrowCurved } from "assets/images/arrow_back_curved.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import { ReactComponent as FindClone } from "assets/images/findclone.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as FindCloneSearch } from "assets/images/FindCloneSearch.svg";
import { ReactComponent as LeakCheckSearch } from "assets/images/leakcheck_search.svg";
import { ReactComponent as LeakCheckLogo } from "assets/images/leakcheck_logo.svg";
import { ReactComponent as UserPhoto } from "assets/images/user_photo.svg";
import { ReactComponent as Actions } from "assets/images/actions.svg";
import { ReactComponent as Plus } from "assets/images/plus.svg";
import { ReactComponent as SearchFile } from "assets/images/search_file.svg";
import { ReactComponent as AddAnket } from "assets/images/add_anket.svg";
import { ReactComponent as AddFolder } from "assets/images/add_folder.svg";
import { ReactComponent as PdfFile } from "assets/images/pdf_file.svg";
import { ReactComponent as XmlFile } from "assets/images/xml_file.svg";
import { ReactComponent as HtmlFile } from "assets/images/html_file.svg";
import { ReactComponent as NoPhoto } from "assets/images/no_photo.svg";
import { ReactComponent as People } from "assets/images/people.svg";
import { ReactComponent as Telegram } from "assets/images/telegram.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import Wrapper from "layouts/Wrapper";
import { ThemeContext } from "store/context/themeContextProvider";
import CustomProfileCreate from "components/app/ui/CustomProfileCreate";
import Loader from "components/app/use/Loader";
import ExportPdf from "components/app/modal/ExportPdf";
import { searchActions } from "store/searchSlice";
import IconTitle from "components/app/use/Title/IconTitle";
import FindCloneList from "components/app/modal/FindCloneList";
import TineyeList from "components/app/modal/TineyeList";
import FindCloneFoundAnkets from "components/app/modal/FindCloneFoundAnkets";
import TineyeFoundResults from "components/app/modal/TineyeFoundResults";
import BindedAnketsList from "components/app/modal/BindedAnketsList";
import AlterEgoList from "components/app/modal/AlterEgoList";
import ResultCounter from "components/app/use/ResultCounter";
import LeakCheckList from "components/app/modal/LeakCheckList";
import Button from "components/app/use/Button";
import Card from "components/app/base/Card";
import Title from "components/app/use/Title";
import DropDown from "components/app/use/DropDown";
import Modal from "components/app/base/Modal";
import ModalSlider from "components/app/base/ModalSlider";
import AddToFolder from "components/app/modal/AddToFolder";
import TelegramModal from "components/app/modal/TelegramModal";
import ApiCallModal from "components/app/modal/ApiCallModal";
import LeakCheckFoundData from "components/app/modal/LeakCheckFoundData";
import customSort from "libs/customSort";
import { foldersSortEnums } from "libs/Enums";
import Sirena from "sections/DetailsSections/Sirena";
import Spektr from "sections/DetailsSections/SpektrSection/Spektr";
import Parkings from "sections/DetailsSections/Parkings";
import Cdek from "sections/DetailsSections/Cdek";
import Alfa from "sections/DetailsSections/Alfa";
import Auto from "sections/DetailsSections/Auto";
import Analysis from "sections/DetailsSections/Analysis";
import Access from "sections/DetailsSections/Access";
import Passports from "sections/DetailsSections/Passports";
import Social from "sections/DetailsSections/Social";
import Addresses from "sections/DetailsSections/Addresses";
import Jobs from "sections/DetailsSections/Jobs";
import MilitaryInfo from "sections/DetailsSections/MilitaryInfo";
import WorkPlace from "sections/DetailsSections/WorkPlace";
import Relativies from "sections/DetailsSections/Relativies";
import TelegramInfo from "sections/DetailsSections/TelegramInfo";
import PochtaBank from "sections/DetailsSections/PochtaBank";
import Kids from "sections/DetailsSections/Kids";
import TutuPassengers from "sections/DetailsSections/TutuPassengers";
import TutuReserveUsers from "sections/DetailsSections/TutuReserveUsers";
import MergedAnkets from "sections/DetailsSections/MergedAnkets";
import MtsBank from "sections/DetailsSections/MtsBank";
import Fssp from "sections/DetailsSections/Fssp";
import { useDetailsFunctions } from "apiHooks/detailsHooks/useDetailsFunctions";
import ExportHtml from "components/app/ui/ExportHtml";
import { useUserCredits } from "apiHooks/useUserCredits";
import { subtractUserCredits } from "store/thunks/usersThunks";
import useWatchedProfiles from "apiHooks/useWatchedProfiles";
import ScrollToTopButton from "../../../components/app/base/ScrollTopButton";
import { useSimilarityModal } from "store/context/FaceVerifyContext";
import ReactDOMServer from "react-dom/server";
import Egron from "../../../sections/DetailsSections/EgronSection/Egron";
import {
  normalizeSpaces,
  replaceWithNullIfOnlySpaces,
} from "../../../libs/parseApi";

const SearchDetails = () => {
  const { id, slug, source } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);
  const { shouldCallFunctions } = useUserCredits();
  const { addProfiles, checkProfiles } = useWatchedProfiles();
  const { openModal, isModalOpen } = useSimilarityModal();

  const {
    anketData,
    loading,
    mergedAnkets,
    notRelatedAnketsFromMerge,
    findCloneData,
    tineyeSearchData,
    bindedAnkets,
    sirenaTicketsIds,
  } = useSelector((state) => state.search);
  const { alterEgoData } = useSelector((state) => state.alterEgo);
  const { allFolders } = useSelector((state) => state.folders);
  const {
    handleMergeAnkets,
    handleGetAllPassengers,
    handleExportXML,
    handleExportHtml,
    handleFindClone,
    handleTineye,
    handleLeakCheck,
    handleDeleteAnketFromFolder,
    handleOpenCustomModal,
    setFindCloneImages,
    findCloneImages,
    setTineyeImages,
    tineyeImages,
    setCheckSimilarityImages,
    checkSimilarityImages,
    leakCheckValues,
    setLeakCheckValues,
    customModalData,
    setCustomModalData,
    fullAnketData,
    setFullAnketData,
    getAllPhonesFromAnket,
    handleCheckSimilarity,
  } = useDetailsFunctions(id, source, slug);
  const [visibleAll, setVisibleAll] = useState(false);
  const [allPhotos, setAllPhotos] = useState(null);
  const [openFolder, setOpenFolder] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [openFindCloneAnkets, setOpenFindCloneAnkets] = useState(false);
  const [openTineyeAnkets, setOpenTineyeAnkets] = useState(false);
  const [openBindedAnkets, setOpenBindedAnkets] = useState(false);
  const [openAlterEgo, setOpenAlterEgo] = useState(false);
  const [showLeakData, setShowLeakData] = useState(false);
  const [telegramModal, setTelegramModal] = useState(null);
  const [apiCallModal, setApiCallModal] = useState(false);
  // const handleGetcontact = (phone) => { Todo: wait getContactApi
  //   dispatch(getContact({ phoneNumbers: [phone] }));
  // };
  useEffect(() => {
    if (shouldCallFunctions?.anketDetail) {
      source !== "insight" &&
        dispatch(getBindedAnkets({ anketId: id, sourceId: slug }));

      source === "ankets" &&
        dispatch(
          alterEgo({
            data: {
              searchFields: {
                id: +id,
              },
              page: 1,
              limit: 10,
            },
            showNotification: true,
          }),
        );
    }
  }, [shouldCallFunctions.anketDetail]);

  useEffect(() => {
    if (source !== "insight") {
      dispatch(getAllFolders({ sortBy: foldersSortEnums[0]?.value }));
      dispatch(getAnketById({ id, sourceID: slug, sourceName: source })).then(
        (data) => {
          source === "ankets" &&
            dispatch(getBindedPhotos({ anketId: id, sourceId: slug }));
          const exist = checkProfiles(slug, id);
          data.payload &&
            dispatch(
              subtractUserCredits({
                subtract: !exist,
                creditsPayload: {
                  data: [
                    {
                      type: "anketDetail",
                      count: 1,
                    },
                  ],
                },
                logsPayload: {
                  type: "anketDetail",
                  name: "Просмотр анкеты",
                  data: [
                    {
                      anketId: Number(id),
                      sourceId: Number(slug),
                      sourceNameId: source,
                    },
                  ],
                },
              }),
            );
          addProfiles(slug, id);
        },
      );
    } else {
      dispatch(getInsightResult(id));
      // dispatch(
      //   insightSearch({
      //     insightInput: id,
      //     // updateData: false,
      //     inputType: slug,
      //     createHistoryRecord: false,
      //   }),
      // );
    }
    dispatch(searchActions.setMerged(null));
  }, []);

  const handleToggleFolder = () => {
    mergedAnkets &&
      !openFolder &&
      toast.warning("В папку можно будет добавить только основную анкету");
    setOpenFolder(!openFolder);
  };
  const handleShowFindCloneAnkets = () => {
    setOpenFindCloneAnkets(!openFindCloneAnkets);
  };
  const handleShowTineyeAnkets = () => {
    setOpenTineyeAnkets(!openTineyeAnkets);
  };
  const handleShowBindedAnkets = () => {
    setOpenBindedAnkets(!openBindedAnkets);
  };
  const handleShowAlterEgo = () => {
    setOpenAlterEgo(!openAlterEgo);
  };

  const openSearchTelegramModal = () => {
    const allPhones = getAllPhonesFromAnket(anketData?.anket);
    if (!shouldCallFunctions?.api) {
      return toast.error("Недостаточно кредитов для использования Insight", {
        description: "Обратитесь к администратору",
      });
    }
    setTelegramModal({
      show: true,
      phones: allPhones,
    });
  };
  const handleToggleExport = () => {
    setShowExportModal(!showExportModal);
  };
  const openApiCallModal = async () => {
    const allPhones = getAllPhonesFromAnket(anketData?.anket);
    const allNames = ["Безликое обращение"];
    if (
      anketData.anket?.lastname ||
      anketData.anket?.firstname ||
      anketData.anket?.patronymic
    ) {
      const fio = [
        anketData.anket?.lastname,
        anketData.anket?.firstname,
        anketData.anket?.patronymic,
      ]
        .join(" ")
        .trim();
      allNames.push(fio);
    }
    if (anketData.anket?.potentialNames) {
      allNames.push(
        ...anketData.anket?.potentialNames.map((item) => item.value),
      );
    }
    if (anketData.anket?.name) {
      allNames.push(anketData.anket?.name);
    }
    if (!shouldCallFunctions?.api) {
      return toast.error("Недостаточно кредитов", {
        description: "Обратитесь к администратору",
      });
    }
    const result = await dispatch(getCallCampaigns());
    if (result.payload) {
      setApiCallModal({
        show: true,
        phones: allPhones,
        names: allNames,
      });
    }
  };
  const handleCloseCustomModal = () => {
    setCustomModalData(null);
    setFullAnketData(null);
  };
  const handleVisibleALl = (photos) => {
    setAllPhotos(photos);
    setVisibleAll(!visibleAll);
  };
  const handleSearchByPhoneHome = async (value) => {
    await dispatch(
      searchAnkets({
        matchingPercentage: {
          from: 90,
          to: 100,
        },
        phone: value,
      }),
    );
  };
  const hasNames =
    anketData?.anket?.lastname ||
    anketData?.anket?.firstname ||
    anketData?.anket?.patronymic ||
    anketData?.anket?.fio;

  const hasSubNames =
    anketData?.anket?.name ||
    anketData?.anket?.contactPerson ||
    anketData?.anket?.contragentName ||
    anketData?.anket?.potentialNames;
  const hasPhotos =
    anketData?.anket?.deliveryAvatar || anketData?.anket?.photos;

  const hasPhones =
    anketData?.anket?.relatedPhones ||
    anketData?.anket?.phone ||
    anketData?.anket?.telegramPhones ||
    anketData?.anket?.phone_home ||
    anketData?.anket?.beelinePhones;
  const sortedData = anketData?.anket?.jobHistory?.slice(0); /// copy jobHistory
  const sortedJobs = customSort(sortedData) || [];

  return (
    <>
      {loading && <Loader />}
      {/*<ExportHtml data={anketData?.anket} />*/}
      {showLeakData && (
        <Modal
          closeModal={() => setShowLeakData(false)}
          width="1000"
          title="Результаты поиска LeakCheck"
          Icon={LeakCheckLogo}
          subChildren={
            <div className="head_count_bordered">
              {anketData.anket?.leakCheck?.length && (
                <ResultCounter
                  text="Pезультатов:"
                  count={
                    anketData.anket?.leakCheck?.flatMap((obj) => obj.result)
                      ?.length
                  }
                  bordered
                />
              )}
            </div>
          }
        >
          <LeakCheckFoundData data={anketData.anket?.leakCheck} />
        </Modal>
      )}

      {openFindCloneAnkets && (
        <Modal
          width="1200"
          title="FindClone"
          closeModal={handleShowFindCloneAnkets}
          Icon={FindClone}
          subChildren={
            <div className="head_count_bordered">
              {findCloneData?.length && (
                <ResultCounter
                  text="Pезультатов:"
                  count={findCloneData?.length}
                  bordered
                />
              )}
            </div>
          }
        >
          <FindCloneFoundAnkets ankets={findCloneData} />
        </Modal>
      )}
      {openTineyeAnkets && (
        <Modal
          width="1200"
          title="Tineye"
          closeModal={handleShowTineyeAnkets}
          Icon={UserPhoto}
          subChildren={
            <div className="head_count_bordered">
              {tineyeSearchData?.length && (
                <ResultCounter
                  text="Pезультатов:"
                  count={tineyeSearchData?.length}
                  bordered
                />
              )}
            </div>
          }
        >
          <TineyeFoundResults results={tineyeSearchData} />
        </Modal>
      )}
      {leakCheckValues && (
        <Modal
          title="Поиск LeakCheck"
          closeModal={() => setLeakCheckValues(null)}
          Icon={LeakCheckSearch}
        >
          <LeakCheckList
            loading={loading}
            cancel={() => setLeakCheckValues(null)}
            data={leakCheckValues}
          />
        </Modal>
      )}
      {openBindedAnkets && bindedAnkets?.sources?.length && (
        <Modal
          width="1200"
          title="Cписок связанных анкет"
          closeModal={handleShowBindedAnkets}
        >
          <BindedAnketsList
            initialState={{ anketId: id, sourceId: slug }} ///need for request when we delete anket from binded list
            ankets={bindedAnkets}
          />
        </Modal>
      )}
      {openAlterEgo && (
        <Modal
          width="1200"
          title="Cписок Alter ego"
          closeModal={handleShowAlterEgo}
        >
          <AlterEgoList ankets={alterEgoData} />
        </Modal>
      )}
      {findCloneImages?.length && (
        <Modal
          width="1200"
          title="Выберите фото для поиска по базе FindClone"
          closeModal={() => setFindCloneImages(null)}
        >
          <FindCloneList photos={findCloneImages} />
        </Modal>
      )}
      {tineyeImages?.length && (
        <Modal
          width="1200"
          title="Выберите фото для поиска в Tineye"
          closeModal={() => setTineyeImages(null)}
        >
          <TineyeList
            photos={tineyeImages}
            id={id}
            source={source}
            slug={slug}
          />
        </Modal>
      )}
      {customModalData && (
        <Modal
          Icon={Plus}
          title="Выберите поля для добавления"
          width="1200"
          closeModal={handleCloseCustomModal}
        >
          <CustomProfileCreate
            userAnket={fullAnketData}
            allAvailableFields={customModalData}
            cancel={handleCloseCustomModal}
          />
        </Modal>
      )}
      {openFolder && (
        <Modal
          Icon={Folder}
          closeModal={handleToggleFolder}
          title="Добавить в папку"
        >
          <AddToFolder
            userID={anketData?.anket?.id || id}
            folders={allFolders}
            userFolders={anketData?.folders}
            cancel={handleToggleFolder}
            anketSourceId={slug}
          />
        </Modal>
      )}

      {visibleAll && (
        <Modal width="1000" closeModal={handleVisibleALl} title="Все фото">
          <ModalSlider allPhotos={allPhotos} isDarkTheme={isDarkTheme} />
        </Modal>
      )}
      {showExportModal && anketData?.anket && (
        <Modal
          Icon={Export}
          width="1300"
          closeModal={handleToggleExport}
          title="Данные которые будут экспортированы"
        >
          <ExportPdf
            source={source}
            close={handleToggleExport}
            data={anketData?.anket}
            sourceId={slug}
          />
        </Modal>
      )}

      {telegramModal && (
        <Modal
          width="650"
          minWidth="650"
          closeModal={() => setTelegramModal(null)}
          title="Поиск в Telegram"
        >
          <TelegramModal
            cancel={() => setTelegramModal(null)}
            data={telegramModal?.phones}
          />
        </Modal>
      )}

      {apiCallModal && (
        <Modal
          width="650"
          minWidth="650"
          closeModal={() => setApiCallModal(null)}
          title="Сделать запись звонка"
        >
          <ApiCallModal
            cancel={() => setApiCallModal(null)}
            phones={apiCallModal?.phones}
            userNames={apiCallModal?.names}
          />
        </Modal>
      )}
      <Wrapper
        className={`kermit_details ${isDarkTheme ? "" : "details_light"}`}
      >
        <div className="details_container">
          <div className="wrapper_head">
            <div className="head_details">
              <Button text=" " Icon={ArrowCurved} func={() => navigate(-1)} />
              <div className="head_title">
                <Title Tag="h3">
                  {anketData?.anket?.lastname}
                  <span>
                    {anketData?.anket?.firstname} {anketData?.anket?.patronymic}
                  </span>
                </Title>
              </div>
            </div>
            <div className="head_actions">
              {bindedAnkets && (
                <Button
                  Icon={People}
                  func={handleShowBindedAnkets}
                  text={`Связанные анкеты`}
                />
              )}
              {alterEgoData && (
                <Button
                  Icon={People}
                  func={handleShowAlterEgo}
                  text={`Alter Ego Анкеты`}
                />
              )}
              {anketData?.anket?.leakCheck && (
                <Button
                  mode="tretiary"
                  func={() => setShowLeakData(true)}
                  Icon={LeakCheckLogo}
                  text={`Данные LeakCheck (${anketData?.anket?.leakCheck?.length})`}
                />
              )}
              {source !== "insight" && (
                <Button
                  mode="secondary"
                  func={() => handleMergeAnkets(anketData?.anket)}
                  text="Поиск в других базах"
                  Icon={SearchFile}
                />
              )}
              <DropDown title="Действия" Icon={Actions}>
                {source !== "insight" && (
                  <div
                    className="head_actions_item"
                    onClick={() => handleOpenCustomModal(anketData?.anket)}
                  >
                    <AddAnket />
                    <span>Добавить в кастомную анкету</span>
                  </div>
                )}

                {source !== "insight" && (
                  <div
                    className="head_actions_item"
                    onClick={handleToggleFolder}
                  >
                    <AddFolder />
                    <span>Добавить в папку</span>
                  </div>
                )}

                {hasPhotos && (
                  <div
                    className="head_actions_item"
                    onClick={() => handleFindClone(anketData?.anket)}
                  >
                    <FindCloneSearch />
                    <span>Поиск в FindClone</span>
                  </div>
                )}
                {hasPhotos && (
                  <div
                    className="head_actions_item"
                    onClick={() => handleTineye(anketData?.anket)}
                  >
                    <UserPhoto />
                    <span>Поиск в Tineye</span>
                  </div>
                )}
                {anketData?.anket?.phone ||
                anketData?.anket?.phone_home ||
                anketData?.anket?.beelinePhones ||
                anketData?.anket?.email ? (
                  <div
                    className="head_actions_item"
                    onClick={() => handleLeakCheck(anketData?.anket)}
                  >
                    <LeakCheckSearch />
                    <span>Поиск в LeakCheck</span>
                  </div>
                ) : (
                  <></>
                )}
                {anketData?.anket?.phone ||
                anketData?.anket?.phone_home ||
                anketData?.anket?.beelinePhones ? (
                  <div
                    className="head_actions_item"
                    onClick={openSearchTelegramModal}
                  >
                    <Telegram />
                    <span>Поиск в Telegram</span>
                  </div>
                ) : (
                  <></>
                )}

                {(anketData?.anket?.phone ||
                  anketData?.anket?.phone_home ||
                  anketData?.anket?.beelinePhones) && (
                  <div className="head_actions_item" onClick={openApiCallModal}>
                    <Phone />
                    <span>Сделать запись звонка</span>
                  </div>
                )}

                {source !== "insight" && (
                  <div
                    className="head_actions_item"
                    onClick={handleToggleExport}
                  >
                    <PdfFile />
                    <span>PDF</span>
                  </div>
                )}
                <div
                  className="head_actions_item"
                  onClick={() => handleExportXML(anketData?.anket, slug)}
                >
                  <XmlFile />
                  <span>XML</span>
                </div>
                <div
                  className="head_actions_item"
                  onClick={() =>
                    handleExportHtml(anketData?.anket, null, true, slug)
                  }
                >
                  <HtmlFile />
                  <span>HTML</span>
                </div>
              </DropDown>
            </div>
          </div>
          <div className="details_anket" id="anket">
            <div className="details_aside">
              {hasPhotos && (
                <div className="details_aside_content">
                  {anketData?.anket?.photos && (
                    <div className="details_aside_row">
                      <div className="photo_view">
                        {anketData?.anket?.photos?.avatars?.filter(Boolean)
                          ?.length ? (
                          <img
                            src={`data:image/png;base64, ${anketData?.anket?.photos?.avatars[0]} `}
                            alt=""
                          />
                        ) : (
                          <div className="no_photo_wrapper">
                            <NoPhoto />
                          </div>
                        )}
                      </div>
                      {anketData?.anket?.photos?.displayPhotos?.filter(Boolean)
                        ?.length ? (
                        <Button
                          mode="secondary"
                          text={`Все фото (${anketData?.anket?.photos?.displayPhotos?.length})`}
                          className="view_all_photo"
                          func={() =>
                            handleVisibleALl(
                              anketData?.anket?.photos?.displayPhotos,
                            )
                          }
                          Icon={UserPhoto}
                        />
                      ) : null}
                    </div>
                  )}
                  {anketData?.anket?.deliveryAvatar && (
                    <div className="details_aside_row">
                      <div className="photo_view">
                        {Array.isArray(anketData?.anket?.deliveryAvatar) ? (
                          <img
                            src={anketData?.anket.deliveryAvatar[0]}
                            alt=""
                          />
                        ) : (
                          <img src={anketData?.anket?.deliveryAvatar} alt="" />
                        )}
                      </div>
                      {Array.isArray(anketData?.anket?.deliveryAvatar) && (
                        <>
                          {anketData?.anket?.deliveryAvatar?.length ? (
                            <Button
                              mode="secondary"
                              text={`Доставка (${anketData?.anket?.deliveryAvatar?.length})`}
                              className="view_all_photo"
                              func={() =>
                                handleVisibleALl(
                                  anketData?.anket?.deliveryAvatar,
                                )
                              }
                              Icon={UserPhoto}
                            />
                          ) : null}
                        </>
                      )}
                    </div>
                  )}
                  {findCloneData && (
                    <Button
                      mode="secondary"
                      func={handleShowFindCloneAnkets}
                      text={"Фото из FindClone"}
                    />
                  )}
                  {tineyeSearchData?.length ? (
                    <Button
                      mode="secondary"
                      func={handleShowTineyeAnkets}
                      text={"Фото из Tineye"}
                    />
                  ) : null}
                  {anketData?.anket?.bindedPhotos && (
                    <Button
                      mode="secondary"
                      func={() =>
                        handleVisibleALl(anketData?.anket?.bindedPhotos)
                      }
                      text={`Связанные фото (${anketData?.anket?.bindedPhotos?.length})`}
                    />
                  )}
                </div>
              )}

              <div className="details_aside_content">
                <div className="details_aside_row">
                  {anketData?.anket?.gender && (
                    <div className="details_div">
                      <div className="details_label">Пол</div>
                      {Array.isArray(anketData?.anket?.gender) ? (
                        <>
                          <div className="details_div details_div-row">
                            <IconTitle
                              Icon={Gender}
                              IconWidth="20px"
                              IconHeight="20px"
                            />
                            <p className="details_desc">
                              {anketData?.anket?.gender.map((item) => {
                                return (
                                  <React.Fragment key={uuid()}>
                                    {item}
                                    {", "}
                                  </React.Fragment>
                                );
                              })}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="details_div details_div-row">
                            <IconTitle
                              Icon={Gender}
                              IconWidth="20px"
                              IconHeight="20px"
                            />
                            <p
                              className="details_desc"
                              style={{ fontWeight: 600 }}
                            >
                              {anketData?.anket?.gender}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {anketData?.anket?.photos?.signatures?.length ? (
                    <div className="details_div">
                      <div className="details_label">Подпись</div>
                      <p>
                        <img
                          style={{
                            width: "200px",
                            height: "65px",
                            border: "1px solid #D1D5DB",
                            borderRadius: "8px",
                          }}
                          src={`data:image/png;base64,${anketData?.anket?.photos?.signatures[0]}`}
                          alt=""
                        />
                      </p>
                    </div>
                  ) : null}
                </div>

                {anketData?.folders?.length ? (
                  <div className="details_aside_row">
                    <div className="details_div">
                      <div className="details_label">
                        {mergedAnkets
                          ? "Основная анкета добавлена в папки"
                          : "Добавлен в папки"}
                      </div>
                      {anketData?.folders?.map(({ name, folderId }) => {
                        return (
                          <p
                            key={uuid()}
                            className="details_desc folders_action"
                          >
                            <Link to={`/marked-profiles/${folderId}`}>
                              {name}
                            </Link>
                            <Button
                              Icon={Trash}
                              func={() => handleDeleteAnketFromFolder(folderId)}
                            />
                          </p>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="details_main">
              {(hasNames || hasSubNames || anketData?.anket?.dob) && (
                <div className="details_grid details_grid_big">
                  {(hasNames || hasSubNames) && (
                    <Card type="big">
                      <div className="details_card_content">
                        {hasNames ? (
                          <div className="details_card_header">
                            <Title
                              Tag="h3"
                              Icon={Profile}
                              IconWidth="20px"
                              IconHeight="20px"
                            >
                              ФИО
                            </Title>
                            <p>
                              {anketData?.anket?.lastname}{" "}
                              {anketData?.anket?.firstname}{" "}
                              {anketData?.anket?.patronymic}
                            </p>
                          </div>
                        ) : null}
                        {hasSubNames && (
                          <div className="details_card_body">
                            {anketData?.anket?.name && (
                              <>
                                <div className="details_card_label">
                                  Имя/Название
                                </div>
                                <p>{anketData?.anket?.name}</p>
                              </>
                            )}
                            {anketData?.anket?.contactPerson && (
                              <>
                                <div className="details_card_label">
                                  Контактное лицо
                                </div>
                                <p>{anketData?.anket?.contactPerson}</p>
                              </>
                            )}
                            {anketData?.anket?.contragentName && (
                              <>
                                <div className="details_card_label">
                                  Контрагент
                                </div>
                                <p>{anketData?.anket?.contragentName}</p>
                              </>
                            )}
                            {anketData?.anket?.potentialNames && (
                              <>
                                <div className="details_card_label">
                                  ФИО из других источников
                                </div>
                                <ReactTooltip
                                  id="potential_names"
                                  className={`kermit_tooltip ${
                                    isDarkTheme ? "" : "tooltip_light"
                                  }`}
                                />
                                {anketData?.anket?.potentialNames?.map(
                                  (item) => {
                                    return (
                                      <p
                                        key={uuid()}
                                        data-tooltip-id="potential_names"
                                        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                          <div>
                                            <p>Источник - {item?.source}</p>
                                            {item?.dob ? (
                                              <p>
                                                Дата рождения -
                                                {moment(item?.dob).format(
                                                  "YYYY-MM-DD",
                                                )}
                                              </p>
                                            ) : (
                                              ""
                                            )}
                                          </div>,
                                        )}
                                        data-tooltip-place="left-end"
                                      >
                                        {item.value}
                                      </p>
                                    );
                                  },
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  )}
                  {anketData?.anket?.dob ? (
                    <Card type="big">
                      <ReactTooltip
                        id="dob"
                        className={`kermit_tooltip ${
                          isDarkTheme ? "" : "tooltip_light"
                        }`}
                      />
                      <div className="details_card_content details_card_nobody">
                        {anketData?.anket?.dob &&
                          anketData?.anket?.dob !== " " && (
                            <>
                              <div className="details_card_header">
                                <Title
                                  Tag="h3"
                                  Icon={Calendar}
                                  IconWidth="20px"
                                  IconHeight="20px"
                                >
                                  Дата рождения
                                </Title>
                              </div>
                              {Array.isArray(anketData?.anket?.dob) ? (
                                <>
                                  {anketData?.anket?.dob.map((item) => {
                                    return (
                                      <p
                                        key={uuid()}
                                        data-tooltip-id="dob"
                                        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                          <div>
                                            <p>
                                              Источник -{" "}
                                              {item?.source || "Искомая анкета"}
                                            </p>
                                          </div>,
                                        )}
                                        data-tooltip-place="left-end"
                                      >
                                        {moment(item.value).format(
                                          "YYYY-MM-DD",
                                        )}{" "}
                                        -{" "}
                                        {moment().diff(
                                          `${item.value}`,
                                          "years",
                                        )}{" "}
                                        лет
                                      </p>
                                    );
                                  })}
                                </>
                              ) : (
                                <p>
                                  {moment(anketData?.anket?.dob).format(
                                    "YYYY-MM-DD",
                                  )}{" "}
                                  -{" "}
                                  {moment().diff(
                                    `${anketData?.anket?.dob}`,
                                    "years",
                                  )}{" "}
                                  лет
                                </p>
                              )}
                            </>
                          )}
                      </div>
                    </Card>
                  ) : null}
                </div>
              )}
              <div className="details_grid details_grid_big">
                {anketData?.anket?.email && (
                  <Card type="big">
                    <ReactTooltip
                      id="email"
                      className={`kermit_tooltip ${
                        isDarkTheme ? "" : "tooltip_light"
                      }`}
                    />
                    <div className="details_card_content details_card_nobody">
                      <>
                        <div className="details_card_header">
                          <Title
                            Tag="h3"
                            Icon={Mail}
                            IconWidth="20px"
                            IconHeight="20px"
                          >
                            Электронная почта
                          </Title>
                        </div>
                        {Array.isArray(anketData?.anket?.email) ? (
                          <>
                            {anketData?.anket?.email.map((item) => {
                              return (
                                <p
                                  key={uuid()}
                                  data-tooltip-id="email"
                                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                    <div>
                                      <p>
                                        Источник -{" "}
                                        {item?.source || "Искомая анкета"}
                                      </p>
                                    </div>,
                                  )}
                                  data-tooltip-place="left-end"
                                >
                                  {item.value}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p>
                            {anketData?.anket?.email &&
                            anketData?.anket?.email !== " "
                              ? anketData?.anket?.email
                              : "-"}
                          </p>
                        )}
                      </>
                    </div>
                  </Card>
                )}
                {hasPhones && (
                  <Card type="big">
                    <>
                      <div className="details_card_content details_card_nobody card_phone">
                        {anketData?.anket?.phone && (
                          <>
                            <div className="details_card_header">
                              <Title
                                Tag="h3"
                                Icon={Phone}
                                IconWidth="20px"
                                IconHeight="20px"
                              >
                                Номер телефона
                              </Title>
                            </div>
                            {Array.isArray(anketData?.anket?.phone) ? (
                              <>
                                <ReactTooltip
                                  id="phones"
                                  className={`kermit_tooltip ${
                                    isDarkTheme ? "" : "tooltip_light"
                                  }`}
                                  place="left-end"
                                />
                                {anketData?.anket?.phone.map((item) => {
                                  return (
                                    <p
                                      key={uuid()}
                                      // className="phone_action"
                                      style={{
                                        color:
                                          item?.type === "Неизвестный"
                                            ? "red"
                                            : "",
                                        width: "fit-content",
                                      }}
                                      data-tooltip-id="phones"
                                      data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                        <div>
                                          <p>
                                            Источник -{" "}
                                            {item?.source || "Искомая анкета"}
                                          </p>
                                          {item?.provider && (
                                            <p>
                                              Провайдер -{" "}
                                              {item?.provider || "-"}
                                            </p>
                                          )}
                                          {item?.region && (
                                            <p>
                                              Регион - {item?.region || "-"}
                                            </p>
                                          )}
                                          {item?.type && (
                                            <p>Тип - {item?.type || "-"}</p>
                                          )}
                                        </div>,
                                      )}
                                      data-tooltip-place="left-end"
                                    >
                                      {item.value}
                                      {/*<p*/}
                                      {/*  className="get_contact"*/}
                                      {/*  onClick={() => handleGetcontact(item)}*/}
                                      {/*>*/}
                                      {/*  <Getcontact />*/}
                                      {/*  Getcontact*/}
                                      {/*</p>*/}
                                    </p>
                                  );
                                })}
                              </>
                            ) : (
                              <>
                                {anketData?.anket?.phone && (
                                  <p className="phone_action">
                                    {anketData?.anket?.phone}
                                    {/*<p*/}
                                    {/*  className="get_contact"*/}
                                    {/*  onClick={() =>*/}
                                    {/*    handleGetcontact(*/}
                                    {/*      anketData?.anket?.phone*/}
                                    {/*    )*/}
                                    {/*  }*/}
                                    {/*>*/}
                                    {/*  <Getcontact />*/}
                                    {/*  Getcontact*/}
                                    {/*</p>*/}
                                  </p>
                                )}
                              </>
                            )}
                          </>
                        )}
                        {anketData?.anket?.beelinePhones?.length ? (
                          <>
                            <p className="details_card_label">
                              Телефоны Билайн
                            </p>
                            {anketData?.anket?.beelinePhones?.map(
                              ({ phone, finRole }) => {
                                return (
                                  <p>
                                    {phone} - {finRole}
                                  </p>
                                );
                              },
                            )}
                          </>
                        ) : null}
                        {anketData?.anket?.relatedPhones && (
                          <>
                            <p
                              className="details_card_label"
                              style={{
                                marginTop: "16px",
                                fontSize: "18px",
                                lineHeight: "27px",
                                fontWeight: 600,
                              }}
                            >
                              Похожие телефоны
                            </p>
                            {anketData?.anket?.relatedPhones.map((item) => {
                              return (
                                <p key={uuid()} className="phone_action">
                                  {item}
                                  {/*<p*/}
                                  {/*  className="get_contact"*/}
                                  {/*  onClick={() => handleGetcontact(item)}*/}
                                  {/*>*/}
                                  {/*  <Getcontact />*/}
                                  {/*  Getcontact*/}
                                  {/*</p>*/}
                                </p>
                              );
                            })}
                          </>
                        )}
                        {anketData?.anket?.phone_home && (
                          <>
                            <p
                              className="details_card_label"
                              style={{
                                marginTop: "16px",
                                fontSize: "18px",
                                lineHeight: "27px",
                                fontWeight: 600,
                              }}
                            >
                              Домашний телефон
                            </p>
                            <ReactTooltip
                              id="home_search_tooltip"
                              className={`kermit_tooltip ${
                                isDarkTheme ? "" : "tooltip_light"
                              }`}
                            />
                            {Array.isArray(anketData?.anket?.phone_home) ? (
                              <>
                                {anketData?.anket?.phone_home.map((item) => {
                                  return (
                                    <p key={uuid()} className="phone_action">
                                      {item}
                                      <div className="phone_home_actions">
                                        <div
                                          className="phone_home_item phone_home_search"
                                          onClick={() =>
                                            handleSearchByPhoneHome(item)
                                          }
                                          data-tooltip-id="home_search_tooltip"
                                          data-tooltip-content="Запустить основной поиск по этому телефону"
                                          data-tooltip-place="top"
                                        >
                                          <SearchLoop />
                                        </div>
                                      </div>
                                    </p>
                                  );
                                })}
                              </>
                            ) : (
                              <>
                                <p key={uuid()} className="phone_action">
                                  {anketData?.anket?.phone_home}
                                  <div className="phone_home_actions">
                                    <div
                                      className="phone_home_item phone_home_search"
                                      onClick={() =>
                                        handleSearchByPhoneHome(
                                          anketData?.anket?.phone_home,
                                        )
                                      }
                                      data-tooltip-id="home_search_tooltip"
                                      data-tooltip-content="Запустить основной поиск по этому телефону"
                                      data-tooltip-place="top"
                                    >
                                      <SearchLoop />
                                    </div>
                                  </div>
                                </p>
                              </>
                            )}
                          </>
                        )}
                        {anketData?.anket?.work_phone && (
                          <>
                            <p
                              className="details_card_label"
                              style={{
                                marginTop: "16px",
                                fontSize: "18px",
                                lineHeight: "27px",
                                fontWeight: 600,
                              }}
                            >
                              Рабочий телефон
                            </p>
                            <ReactTooltip
                              id="home_search_tooltip"
                              className={`kermit_tooltip ${
                                isDarkTheme ? "" : "tooltip_light"
                              }`}
                            />
                            {Array.isArray(anketData?.anket?.work_phone) ? (
                              <>
                                {anketData?.anket?.work_phone.map((item) => {
                                  return (
                                    <p key={uuid()} className="phone_action">
                                      {item}
                                      <div className="phone_home_actions">
                                        <div
                                          className="phone_home_item phone_home_search"
                                          onClick={() =>
                                            handleSearchByPhoneHome(item)
                                          }
                                          data-tooltip-id="home_search_tooltip"
                                          data-tooltip-content="Запустить основной поиск по этому телефону"
                                          data-tooltip-place="top"
                                        >
                                          <SearchLoop />
                                        </div>
                                      </div>
                                    </p>
                                  );
                                })}
                              </>
                            ) : (
                              <>
                                <p key={uuid()} className="phone_action">
                                  {anketData?.anket?.work_phone}
                                  <div className="phone_home_actions">
                                    <div
                                      className="phone_home_item phone_home_search"
                                      onClick={() =>
                                        handleSearchByPhoneHome(
                                          anketData?.anket?.work_phone,
                                        )
                                      }
                                      data-tooltip-id="home_search_tooltip"
                                      data-tooltip-content="Запустить основной поиск по этому телефону"
                                      data-tooltip-place="top"
                                    >
                                      <SearchLoop />
                                    </div>
                                  </div>
                                </p>
                              </>
                            )}
                          </>
                        )}
                        {anketData?.anket?.telegramPhones && (
                          <>
                            <p
                              className="details_card_label"
                              style={{
                                marginTop: "16px",
                                fontSize: "18px",
                                lineHeight: "27px",
                                fontWeight: 600,
                              }}
                            >
                              Telegram телефон
                            </p>
                            <ReactTooltip
                              id="home_search_tooltip"
                              className={`kermit_tooltip ${
                                isDarkTheme ? "" : "tooltip_light"
                              }`}
                            />
                            {Array.isArray(anketData?.anket?.telegramPhones) ? (
                              <>
                                {anketData?.anket?.telegramPhones.map(
                                  (item) => {
                                    return (
                                      <p key={uuid()} className="phone_action">
                                        {item}
                                        <div className="phone_home_actions">
                                          <div
                                            className="phone_home_item phone_home_search"
                                            onClick={() =>
                                              handleSearchByPhoneHome(item)
                                            }
                                            data-tooltip-id="home_search_tooltip"
                                            data-tooltip-content="Запустить основной поиск по этому телефону"
                                            data-tooltip-place="top"
                                          >
                                            <SearchLoop />
                                          </div>
                                        </div>
                                      </p>
                                    );
                                  },
                                )}
                              </>
                            ) : (
                              <>
                                <p className="phone_action">
                                  {anketData?.anket?.telegramPhones}
                                  <div className="phone_home_actions">
                                    <div
                                      className="phone_home_item phone_home_search"
                                      onClick={() =>
                                        handleSearchByPhoneHome(
                                          anketData?.anket?.telegramPhones,
                                        )
                                      }
                                      data-tooltip-id="home_search_tooltip"
                                      data-tooltip-content="Запустить основной поиск по этому телефону"
                                      data-tooltip-place="top"
                                    >
                                      <SearchLoop />
                                    </div>
                                  </div>
                                </p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="details_accordions">
          <Addresses data={anketData?.anket} />
          {anketData?.anket?.autoArray?.length ? (
            <Parkings data={anketData?.anket?.autoArray} />
          ) : null}
          {anketData?.anket?.accounts && (
            <PochtaBank data={anketData?.anket?.accounts} />
          )}

          {anketData?.anket?.estates && (
            <Egron data={anketData?.anket?.estates} />
          )}
          {(anketData?.anket?.sirenaPassenger ||
            anketData?.anket?.sirenaTicketInfo ||
            anketData?.anket?.sirenaInsuranceInfo ||
            anketData.anket?.sirenaTrainTicketInfo) && (
            <Sirena
              dataPassenger={anketData?.anket?.sirenaPassenger}
              dataTickets={anketData?.anket?.sirenaTicketInfo}
              dataTrainTickets={anketData?.anket?.sirenaTrainTicketInfo}
              dataInsurance={anketData?.anket?.sirenaInsuranceInfo}
              getAllPassengers={handleGetAllPassengers}
              allTicketsIds={sirenaTicketsIds}
            />
          )}

          <Spektr data={anketData?.anket} source={source} />
          {anketData?.anket?.cdekData && (
            <Cdek data={anketData?.anket?.cdekData} />
          )}
          {anketData?.anket?.fsspList?.length ? (
            <Fssp data={anketData?.anket?.fsspList} />
          ) : null}
          <Social data={anketData?.anket} />
          <Passports data={anketData?.anket} />

          {anketData?.anket?.relationships?.length ? (
            <Relativies data={anketData?.anket?.relationships} />
          ) : null}

          {sortedJobs?.length ? <Jobs data={sortedJobs} /> : null}

          {anketData?.anket?.alfa?.length ? (
            <Alfa data={anketData?.anket} />
          ) : null}
          {anketData?.anket?.mtsBank?.length ? (
            <MtsBank data={anketData?.anket} />
          ) : null}
          {anketData?.anket?.newAuto?.length ? (
            <Auto data={anketData?.anket?.newAuto} />
          ) : null}

          {anketData?.anket?.kids?.length ? (
            <Kids data={anketData?.anket?.kids} />
          ) : null}

          {anketData?.anket?.tutuPassengers?.length ? (
            <TutuPassengers data={anketData?.anket?.tutuPassengers} />
          ) : null}

          {anketData?.anket?.tutuReserveUsers?.length ? (
            <TutuReserveUsers data={anketData?.anket?.tutuReserveUsers} />
          ) : null}

          {anketData?.anket?.workPlace &&
            anketData?.anket?.workPlace !== " " && (
              <WorkPlace data={anketData?.anket?.workPlace} />
            )}
          <Access data={anketData?.anket} />
          {anketData?.anket?.militaryInfo?.militaryService && (
            <MilitaryInfo
              data={anketData?.anket?.militaryInfo?.militaryService}
            />
          )}
          {anketData?.anket?.gemotestOrders?.length ? (
            <Analysis data={anketData?.anket?.gemotestOrders} />
          ) : null}
          {anketData?.anket?.telegramData?.length ? (
            <TelegramInfo data={anketData?.anket?.telegramData} />
          ) : null}

          {mergedAnkets && (
            <MergedAnkets
              data={mergedAnkets}
              handleCustomModal={handleOpenCustomModal}
              handleVisibleALl={handleVisibleALl}
              handleExportXML={handleExportXML}
              title="Источники (все)"
            />
          )}
          {notRelatedAnketsFromMerge && (
            <MergedAnkets
              data={notRelatedAnketsFromMerge}
              handleCustomModal={handleOpenCustomModal}
              handleVisibleALl={handleVisibleALl}
              handleExportXML={handleExportXML}
              title="Источники (не релевантные)"
            />
          )}
        </div>
      </Wrapper>
      <ScrollToTopButton />
    </>
  );
};

export default SearchDetails;
