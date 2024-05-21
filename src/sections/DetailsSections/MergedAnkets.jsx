import React, { memo } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "components/app/base/Accordion";
import { removeEmptyValues } from "libs/parseApi";
import { ReactComponent as Sources } from "assets/images/sources.svg";
import TableCdek from "components/MergedAnkets/TableCdek";
import TableSirenaTickets from "components/MergedAnkets/TableSirenaTickets";
import TablePochtaBank from "components/MergedAnkets/TablePochtaBank";
import TableSirenaPassenger from "components/MergedAnkets/TableSirenaPassenger";
import TableAnket from "components/MergedAnkets/TableAnket";
import TableMedical from "components/MergedAnkets/TableMedical";
import TableNewAuto from "components/MergedAnkets/TableNewAuto";
import TablePhones from "components/MergedAnkets/TablePhones";
import TableSpektr from "components/MergedAnkets/TableSpektr";
import TableGos from "components/MergedAnkets/TableGos";
import TableAuto from "components/MergedAnkets/TableAuto";
import TableDelivery from "components/MergedAnkets/TableDelivery";
import TableAlfa from "components/MergedAnkets/TableAlfa";
import TableVk from "components/MergedAnkets/TableVk";
import TableFssp from "components/MergedAnkets/TableFssp";
import TableRelativies from "components/MergedAnkets/TableRelativies";
import TableMvd from "components/MergedAnkets/TableMvd";
import TableMailRu from "components/MergedAnkets/TableMailRu";
import TableRostelecom from "components/MergedAnkets/TableRostelecom";
import TableNewGos from "components/MergedAnkets/TableNewGos";
import TableNewGosUsers from "components/MergedAnkets/TableNewGosUsers";
import TableBeeline from "components/MergedAnkets/TableBeeline";
import TableTutuUsers from "components/MergedAnkets/TableTutuUsers";
import TableTutuPassengers from "components/MergedAnkets/TableTutuPassengers";
import TableYoula from "components/MergedAnkets/TableYoula";
import TableAvito from "components/MergedAnkets/TableAvito";
import TableMicroCredits from "components/MergedAnkets/TableMicroCredits";
import TableSirenaInsurance from "components/MergedAnkets/TableSirenaInsurance";
import TableSirenaTrains from "components/MergedAnkets/TableSirenaTrains";
import TableDeliveryClub from "components/MergedAnkets/TableDeliveryClub";
import TablePromed from "components/MergedAnkets/TablePromed";
import TableMts from "../../components/MergedAnkets/TableMts";
import TableEgron from "../../components/MergedAnkets/TableEgron";
import TableMtsBank from "../../components/MergedAnkets/TableMtsBank";
import TablePochtaRfClients from "../../components/MergedAnkets/TablePochtaRfClients";
import TablePochtaRfEmployees from "../../components/MergedAnkets/TablePochtaRfEmployees";
import TableDnsShop from "../../components/MergedAnkets/TableDnsShop";

const MergedAnkets = ({ data, handleCustomModal, handleVisibleALl, title }) => {
  return (
    <Accordion title={title} Icon={Sources}>
      <div className="accodrion_tables_wrapper">
        {data.cdek?.length ? (
          <Accordion title="CDEK" titleTag="h5">
            {data?.cdek?.map((item) => {
              const cdekArr = { ...item };
              const updateCDEKData = {
                addressString: item?.addressString,
                city: item?.city,
                contactPerson: item?.contactPerson,
                contragentName: item?.contragentName,
                email: item?.email,
                name: item?.name,
                phone: item?.phone,
                sourceName: item?.sourceName,
                payerContactPerson: item?.payerContactPerson,
                payerCity: item?.payerCity,
                payerAddress: item?.payerAddress,
                payerContragentName: item?.payerContragentName,
                payerEmail: item?.payerEmail,
                payerName: item?.payerName,
                payerPhone: item?.payerPhone,
                receiverAddress: item?.receiverAddress,
                receiverCity: item?.receiverCity,
                receiverContactPerson: item?.receiverContactPerson,
                receiverContragentName: item?.receiverContragentName,
                receiverEmail: item?.receiverEmail,
                receiverName: item?.receiverName,
                receiverPhone: item?.receiverPhone,
                senderAddress: item?.senderAddress,
                senderCity: item?.senderCity,
                senderContactPerson: item?.senderContactPerson,
                senderContragentName: item?.senderContragentName,
                senderEmail: item?.senderEmail,
                senderName: item?.senderName,
                senderPhone: item?.senderPhone,
              };
              cdekArr.cdekData = [updateCDEKData];

              return (
                <TableCdek
                  handleCustomModal={handleCustomModal}
                  data={cdekArr}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data.egron?.length ? (
          <Accordion title="ЕГРОН" titleTag="h5">
            {data.egron.map((item) => {
              return (
                <TableEgron
                  data={item}
                  key={uuid()}
                  handleCustomModal={handleCustomModal}
                />
              );
            })}
          </Accordion>
        ) : null}
        {data?.microcredit?.length ? (
          <Accordion title="MICROCREDITS" titleTag="h5">
            {data?.microcredit?.map((item) => {
              return (
                <TableMicroCredits
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.ankets?.length ? (
          <Accordion title="ANKETS" titleTag="h5">
            {data?.ankets?.map((item) => {
              return (
                <TableAnket
                  handleVisibleALl={handleVisibleALl}
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.medical?.medical?.length ? (
          <Accordion title="MEDICAL" titleTag="h5">
            {data?.medical?.medical?.map((item) => {
              return (
                <TableMedical
                  handleVisibleALl={handleVisibleALl}
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.newAuto?.length ? (
          <Accordion title="NEW AUTO" titleTag="h5">
            {data?.newAuto?.map((item) => {
              return (
                <TableNewAuto
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.phones?.length ? (
          <Accordion title="GetContact-Numbuster" titleTag="h5">
            {data?.phones?.map((item) => {
              return (
                <TablePhones
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data.spektr?.length ? (
          <Accordion title="SPEKTR" titleTag="h5">
            {data?.spektr?.map((item) => {
              return (
                <TableSpektr
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.gos?.length ? (
          <Accordion title="ЕСИА" titleTag="h5">
            {data?.gos?.map((item) => {
              return (
                <TableGos
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.new_gos?.length ? (
          <Accordion title="ГОС УСЛУГИ" titleTag="h5">
            {data?.new_gos?.map((item) => {
              return (
                <TableNewGos
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.new_gos_users?.length ? (
          <Accordion title="ГОС УСЛУГИ(пользователи)" titleTag="h5">
            {data?.new_gos_users?.map((item) => {
              return (
                <TableNewGosUsers
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.auto?.length ? (
          <Accordion title="ПАРКОВКИ" titleTag="h5">
            {data?.auto?.map((item) => {
              const anket = removeEmptyValues(item);
              return (
                <TableAuto
                  handleCustomModal={handleCustomModal}
                  data={anket}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data.delivery?.length ? (
          <Accordion title="ДОСТАВКА" titleTag="h5">
            {data.delivery?.map((item) => {
              return (
                <TableDelivery
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.mts_bank?.length ? (
          <Accordion title="MTC Банк" titleTag="h5">
            {data?.mts_bank?.map((item) => {
              return (
                <TableMtsBank
                  handleVisibleALl={handleVisibleALl}
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}
        {data?.alfa?.length ? (
          <Accordion title="ALFA BANK" titleTag="h5">
            {data?.alfa?.map((item) => {
              return (
                <TableAlfa
                  handleVisibleALl={handleVisibleALl}
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.vk?.length ? (
          <Accordion title="VKONTAKTE" titleTag="h5">
            {data?.vk?.map((item) => {
              return (
                <TableVk
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.avito?.length ? (
          <Accordion title="AVITO" titleTag="h5">
            {data?.avito?.map((item) => {
              return (
                <TableAvito
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.fssp?.length ? (
          <Accordion title="СУДЕБНЫE ПРИСТАВЫ" titleTag="h5">
            {data?.fssp?.map((item) => {
              return (
                <TableFssp
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.relativies?.length ? (
          <Accordion title="РОДСТВЕННИКИ" titleTag="h5">
            {data?.relativies?.map((item) => {
              return (
                <TableRelativies
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.mvd?.length ? (
          <Accordion title="МВД" titleTag="h5">
            {data?.mvd?.map((item) => {
              return (
                <TableMvd
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.mail_ru?.length ? (
          <Accordion title="MAIL.RU" titleTag="h5">
            {data?.mail_ru?.map((item) => {
              return (
                <TableMailRu
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.rostelecom?.length ? (
          <Accordion title="ROSTELECOM" titleTag="h5">
            {data?.rostelecom?.map((item) => {
              return (
                <TableRostelecom
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.beeline?.length ? (
          <Accordion title="BEELINE" titleTag="h5">
            {data?.beeline?.map((item) => {
              return (
                <TableBeeline
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.youla?.length ? (
          <Accordion title="YOULA" titleTag="h5">
            {data?.youla?.map((item) => {
              return (
                <TableYoula
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.tutu_users?.length ? (
          <Accordion title="TUTU ПОЛЬЗОВАТЕЛИ" titleTag="h5">
            {data?.tutu_users?.map((item) => {
              return (
                <TableTutuUsers
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.tutu_passengers?.length ? (
          <Accordion title="Tutu пользователи" titleTag="h5">
            {data?.tutu_passengers?.map((item) => {
              return (
                <TableTutuPassengers
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.delivery_club?.length ? (
          <Accordion title="DELIVERY CLUB" titleTag="h5">
            {data?.delivery_club?.map((item) => {
              return (
                <TableDeliveryClub
                  data={item}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.sirena_passenger?.length ? (
          <Accordion title="SIRENA Passengers" titleTag="h5">
            {data?.sirena_passenger?.map((item) => {
              const sirenaPassenger = { ...item };
              sirenaPassenger.dob = sirenaPassenger?.birthdate;
              sirenaPassenger.categoryFly = sirenaPassenger?.class;
              delete sirenaPassenger.class;
              delete sirenaPassenger.birthdate;
              const obj = {
                sirenaPassenger: [sirenaPassenger],
              };

              return (
                <TableSirenaPassenger
                  data={obj}
                  handleCustomModal={handleCustomModal}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data.sirena_ins?.length ? (
          <Accordion title="SIRENA СТРАХОВКИ" titleTag="h5">
            {data.sirena_ins?.map((ins) => {
              return <TableSirenaInsurance key={uuid()} data={ins} />;
            })}
          </Accordion>
        ) : null}

        {data?.sirena_ticket_info?.length ? (
          <Accordion title="SIRENA БИЛЕТЫ" titleTag="h5">
            {data?.sirena_ticket_info?.map((item) => {
              const sirenaTicketInfo = [item];
              return (
                <TableSirenaTickets data={sirenaTicketInfo} key={uuid()} />
              );
            })}
          </Accordion>
        ) : null}

        {data?.sirena_train?.length ? (
          <Accordion title="SIRENA ПОЕЗДА" titleTag="h5">
            {data?.sirena_train?.map((item) => {
              const sirenaTrain = item.sirenaTrainTicketInfo;
              return <TableSirenaTrains data={sirenaTrain} key={uuid()} />;
            })}
          </Accordion>
        ) : null}

        {data?.pcht?.length ? (
          <Accordion title="ПОЧТА БАНК" titleTag="h5">
            {data?.pcht?.map((item) => {
              return (
                <TablePochtaBank
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.promed?.length ? (
          <Accordion title="PROMED" titleTag="h5">
            {data?.promed?.map((item) => {
              return (
                <TablePromed
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.mts?.length ? (
          <Accordion title="MTS" titleTag="h5">
            {data?.mts?.map((item) => {
              return (
                <TableMts
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}

        {data?.pcht_rf_clients?.length ? (
          <Accordion title="Почта россии(клиенты)" titleTag="h5">
            {data?.pcht_rf_clients?.map((item) => {
              return (
                <TablePochtaRfClients
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}
        {data?.pcht_rf_empl?.length ? (
          <Accordion title="Почта россии(сотрудники)" titleTag="h5">
            {data?.pcht_rf_empl?.map((item) => {
              return (
                <TablePochtaRfEmployees
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}
        {data?.dns_shop?.length ? (
          <Accordion title="Dns Shop" titleTag="h5">
            {data?.dns_shop?.map((item) => {
              return (
                <TableDnsShop
                  handleCustomModal={handleCustomModal}
                  data={item}
                  key={uuid()}
                />
              );
            })}
          </Accordion>
        ) : null}
      </div>
    </Accordion>
  );
};

export default memo(MergedAnkets);
