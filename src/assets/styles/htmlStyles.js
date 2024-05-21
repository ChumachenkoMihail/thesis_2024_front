export const htmlExportStyles = `
  body{
    font-family: 'Raleway', sans-serif !important;
    font-variant-numeric: lining-nums;
    -moz-font-feature-settings: "lnum" 1;
    -moz-font-feature-settings: "lnum=1";
    -ms-font-feature-settings: "lnum" 1;
    -o-font-feature-settings: "lnum" 1;
    -webkit-font-feature-settings: "lnum" 1;
    font-feature-settings: "lnum" 1;
  }
  .kermit_html {
    margin: 24px 0;
  }
  .main_title {
    font-size: 18px;
    margin-bottom: 0;
  }
  .info_card_conainer {
    display: grid;
  }
  .html_header {
    padding: 0 0 12px 0;
    border-bottom: 2px solid #006eff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 24px 0;
    gap: 16px;
  }
  .html_content {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .content-accordion[open] summary::after {
    transform: rotate(180deg);
    top: 12px;
  }
  .content-accordion[open] accordion_body {
    display: block;
  }
  .accordion-head {
    padding: 12px 16px;
    background: #e6f1ff;
    color: #002e6b;
    font-size: 18px;
    font-weight: 700;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    outline: none;
    position: relative;
  }
  .accordion-head:after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 36 36' fill='none' %3E%3Cpath d='M31.425 13.0867L18.825 25.7242C18.675 25.8742 18.5125 25.9807 18.3375 26.0437C18.1625 26.1067 17.975 26.1377 17.775 26.1367C17.575 26.1367 17.3875 26.1057 17.2125 26.0437C17.0375 25.9817 16.875 25.8752 16.725 25.7242L4.0875 13.0867C3.7375 12.7367 3.5625 12.2992 3.5625 11.7742C3.5625 11.2492 3.75 10.7992 4.125 10.4242C4.5 10.0492 4.9375 9.8617 5.4375 9.8617C5.9375 9.8617 6.375 10.0492 6.75 10.4242L17.775 21.4492L28.8 10.4242C29.15 10.0742 29.5815 9.8992 30.0945 9.8992C30.6075 9.8992 31.051 10.0867 31.425 10.4617C31.8 10.8367 31.9875 11.2742 31.9875 11.7742C31.9875 12.2742 31.8 12.7117 31.425 13.0867Z' fill='%23006EFF' /%3E%3C/svg%3E");
    transform: rotate(0deg);
    position: absolute;
    right: 16px;
    top: 12px;
  }
   .accordion_body{
     margin-top: 18px;
     margin-bottom: 18px;
   }
  .content_head_info {
    padding: 12px 16px;
    background: #e6f1ff;
    color: #002e6b;
    font-size: 18px;
    font-weight: 700;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    outline: none;
  }
  .personal_info_row {
    display: flex;
    flex-direction: row;
    gap: 48px;
  }
  .personal_info_row.personal_info_main {
    padding-top: 24px;
  }
  .profile_avatar {
    width: 200px;
    height: 200px;
    margin: 0 0 24px 0;
  }
  .job-item-row {
    grid-template-columns: 50% 20%;
    display: grid;
    column-gap: 48px;
    padding: 16px 16px 0;
    border-radius: 16px;
  }
  .job-item-row:not(:last-of-type) {
    border-bottom: none;
  }
  .auto_section {
    padding: 24px;
    border-radius: 16px;
    border: 4px solid #b0d2ff;
  }
  .hr24 {
    height: 1px;
    background: #e6f1ff;
    width: 100%;
    margin: 24px 0;
    display: block;
  }
  .logo {
    fontSize: 24px;
  }
  .bordered {
    border: 2px solid #e6f1ff;
    padding: 16px;
    flex-direction: column;
    display: flex;
    border-radius: 12px;
    gap: 8px;
  }
  .details_expand {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .photos_row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }
  p {
    margin-bottom: 0;
  }
  .title_light_gray_700 {
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    line-height: 30px;
    color: #69788c;
  }
  .title_bold_800_column {
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    line-height: 24px;
    color: #006eff;
    width: auto;
  }
  .title_black_700 {
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    line-height: 30px;
    color: #2c323b;
    display: flex;
    gap: 8px;
  }
  .title_gray_500 {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: #2c323b;
    word-break: break-all;
    margin-bottom: 0;
  }
  .title_fs_18 {
    font-size: 18px;
  }
  .title_blue_600 {
    font-size: 16px;
    font-weight: 600;
    line-height: 27px;
    text-align: left;
    color: #006eff;
  }
  .auto_title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    line-height: 30px;
    color: #2c323b;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .auto_title br {
    dispaly: none;
  }
  .title_bold_700 {
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    line-height: 28px;
    color: #006eff;
  }
  details.details_more_accordion[open] summary.details_more::after {
    transform: rotate(180deg) scale(0.6) translate(-4px, -4px) !important;
  }
  details.details_more_accordion[open] summary.details_more::before {
    content: "Скрыть подробности";
  }
  summary.details_more {
    background: #e6f1ff;
    width: 100%;
    border-radius: 8px;
    padding: 4px;
    color: #006eff;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    outline: none;
    position: relative;
    height: 32px;
  }
  summary.details_more::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 36 36' fill='none' %3E%3Cpath d='M31.425 13.0867L18.825 25.7242C18.675 25.8742 18.5125 25.9807 18.3375 26.0437C18.1625 26.1067 17.975 26.1377 17.775 26.1367C17.575 26.1367 17.3875 26.1057 17.2125 26.0437C17.0375 25.9817 16.875 25.8752 16.725 25.7242L4.0875 13.0867C3.7375 12.7367 3.5625 12.2992 3.5625 11.7742C3.5625 11.2492 3.75 10.7992 4.125 10.4242C4.5 10.0492 4.9375 9.8617 5.4375 9.8617C5.9375 9.8617 6.375 10.0492 6.75 10.4242L17.775 21.4492L28.8 10.4242C29.15 10.0742 29.5815 9.8992 30.0945 9.8992C30.6075 9.8992 31.051 10.0867 31.425 10.4617C31.8 10.8367 31.9875 11.2742 31.9875 11.7742C31.9875 12.2742 31.8 12.7117 31.425 13.0867Z' fill='%23006EFF' /%3E%3C/svg%3E");
    transform: rotate(0deg) scale(0.6) translate(0, -1px) !important;
    width: 15px;
    height: 18px;
  }
  summary.details_more::before {
    content: "Показать подробности";
  }
  details.details_more_accordion_docs[open] summary.details_more_docs::after {
    transform: rotate(180deg) scale(0.6) translate(-4px, -4px) !important;
  }
  details.details_more_accordion_docs[open] summary.details_more_docs::before {
    content: "Скрыть документы";
  }
  summary.details_more_docs {
    background: #e6f1ff;
    width: 100%;
    border-radius: 8px;
    padding: 4px;
    color: #006eff;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    outline: none;
    position: relative;
    height: 32px;
  }
  summary.details_more_docs::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 36 36' fill='none' %3E%3Cpath d='M31.425 13.0867L18.825 25.7242C18.675 25.8742 18.5125 25.9807 18.3375 26.0437C18.1625 26.1067 17.975 26.1377 17.775 26.1367C17.575 26.1367 17.3875 26.1057 17.2125 26.0437C17.0375 25.9817 16.875 25.8752 16.725 25.7242L4.0875 13.0867C3.7375 12.7367 3.5625 12.2992 3.5625 11.7742C3.5625 11.2492 3.75 10.7992 4.125 10.4242C4.5 10.0492 4.9375 9.8617 5.4375 9.8617C5.9375 9.8617 6.375 10.0492 6.75 10.4242L17.775 21.4492L28.8 10.4242C29.15 10.0742 29.5815 9.8992 30.0945 9.8992C30.6075 9.8992 31.051 10.0867 31.425 10.4617C31.8 10.8367 31.9875 11.2742 31.9875 11.7742C31.9875 12.2742 31.8 12.7117 31.425 13.0867Z' fill='%23006EFF' /%3E%3C/svg%3E");
    transform: rotate(0deg) scale(0.6) translate(0, -1px) !important;
    width: 15px;
    height: 18px;
  }
  summary.details_more_docs::before {
    content: "Показать документы";
  }
  .info_container {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
  }
  .info_card {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  .info_sources {
    margin: 12px 0 0 0;
  }
  .accordion_grid {
    grid-template-columns: repeat(2, minmax(200px, 50%));
    grid-auto-rows: 1fr;
    display: grid;
    flex-direction: column;
    column-gap: 24px;
    row-gap: 24px;
  }

  .auto_grid {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  //grid-template-columns: repeat(3, 1fr);
  //display: grid;
  //column-gap: 24px;
  //row-gap: 24px;
}
.auto_grid > div {
  width: calc(33% - 24px);
}
  .address_grid {
    grid-template-rows: auto 2fr 0px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    display: grid;
    column-gap: 48px;
  }
  .passports_grid {
    grid-template-rows: auto 1fr 0px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 250px));
    grid-auto-rows: 1fr;
    display: grid;
    flex-direction: column;
    column-gap: 48px;
    row-gap: 24px;
  }
  .alfa_grid, .cdek_grid, .pochta_grid {
    grid-template-columns: repeat(3, 1fr);
    display: grid;
    gap: 16px;
    align-items: start;
  }
  .passport_number {
    font-size: 16px;
  }
  .social_grid {
    grid-template-columns: repeat(4, minmax(200px, 300px));
    display: grid;
    flex-direction: column;
    column-gap: 24px;
    word-break: break-all;
    row-gap: 16px;
  }
  .work_info {
    color: #69788c;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }
  .title_blue_600.work_title {
    margin-top: 0;
  }
  .parking_grid {
    flex: 0 1 calc((100% - 24px) / 4);
    height: fit-content;
  }
  .spektr_top {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 2px solid #e6f1ff;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
  }
  .bordered.spektr_grid {
    flex: 0 1 calc((100% - 24px) / 2);
    height: fit-content;
    gap: 8px;
  }
  .spektr_title {
    padding-bottom: 16px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #2c323b;
  }
  .spektr_list {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  .address_list {
    margin-top: 0;
  }
  .address_col {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .avtoins_grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
  margin: 15px 0 0 0;
    
  }
  .bordered.newauto_grid {
    flex: 0 1 calc((100% - 24px) / 2);
    height: fit-content;
  }
  .documents_grid {
    padding: 16px 24px;
    background: #f6f8fa;
    border-radius: 8px;
  }
  .details_expand.documents_expand {
    gap: 16px;
  }
  .cdek_container {
    display: grid;
    column-gap: 24px;
    row-gap: 24px;
  }
  .secret_grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .address_div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .table_box {
    background: linear-gradient(180deg, #f6f8fa 0%, rgba(246, 248, 250, 0.5) 100%);
    padding: 16px;
    border-radius: 12px;
  }
  .table_box .wrap {
    overflow-x: hidden;
    max-width: 100%;
  }
  .table_wrapper {
    overflow-x: scroll;
  }
  .table_sub {
    margin-top: 36px;
    background: white;
    border-radius: 16px;
    padding: 10px;
  }
  .table_title {
    font-size: 18px;
    line-height: 1.2;
    font-weight: 600;
    color: #2c323b;
    margin-bottom: 16px;
  }
  table thead tr th {
    padding: 8px 0;
    white-space: nowrap;
    text-align: start;
    background: #fff;
  }
  table thead tr th:first-of-type {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }
  table thead tr th:last-of-type {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
  table thead tr th .head-row {
    padding: 0 15px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    color: #4b5563;
    border-right: 1px solid #f0f2f4;
  }
  table tbody tr td {
    padding: 12px 16px;
    color: #2c323b;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.15s;
  }
  table tbody tr td:first-of-type {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }
  table tbody tr td:last-of-type {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
  table tbody tr:nth-of-type(even) td {
    background: #f0f2f4;
  }
  table tbody tr:hover td {
    background: #b0d2ff;
  }



  @media screen and (max-width: 768px) {
    .kermit_html {
      margin: 24px 0;
    }
    .main_title {
      font-size: 20px;
    }
    .secret_grid {
      gap: 4px;
    }
    .address_div {
      gap: 4px;
    }
    .avtoins_grid {
      display: flex;
      gap: 16px;
    }
    .cdek_container {
      column-gap: 16px;
      row-gap: 16px;
    }
    .bordered.newauto_grid {
      flex: 0 1 100%;
    }
    .spektr_title {
      padding-bottom: 8px;
    }
    .personal_info_row.personal_info_main {
      padding-top: 16px;
    }
    .spektr_list {
      gap: 16px;
    }
    .documents_grid {
      padding: 8px 16px;
    }
    .details_expand.documents_expand {
      gap: 8px;
    }
    .bordered.spektr_grid {
      flex: 0 1 100%;
    }
    .spektr_top {
      padding: 16px;
      margin-bottom: 16px;
    }
    .address_list {
      margin-top: 4px;
    }
    .address_grid {
      grid-template-columns: 1fr;
      column-gap: 16px;
    }
    .address_col {
      gap: 16px;
    }
    .accordion_grid {
      display: flex;
      row-gap: 8px;
    }
    .auto_grid  {
     gap: 18px;
    }
    .auto_grid > div {
      width: 100%;
    }
    .passports_grid {
      display: flex;
      column-gap: 16px;
      row-gap: 4px;
    }
    .alfa_grid, .cdek_grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .social_grid {
      display: flex;
      column-gap: 4px;
      row-gap: 4px;
    }
    .work_info {
      font-size: 14px;
      line-height: 20px;
    }
    .title_blue_600.work_title {
      margin-top: 4px;
    }
    .parking_grid {
      flex: 0 1 100%;
    }
    .info_sources {
      margin: 8px 0 0 0;
    }
    .title_blue_600 {
      font-size: 16px;
      line-height: 24px;
    }
    .auto_title {
      font-size: 14px;
      font-weight: 600;
      line-height: 27px;
      margin-bottom: 16px;
    }
    .auto_title br {
      dispaly: block;
    }
    .info_card_conainer {
      display: block;
    }
    .html_header {
      padding: 0 0 16px 0;
      flex-direction: column-reverse;
      align-items: flex-start;
      margin: 0 0 24px 0;
    }
    .html_content {
      gap: 16px;
    }
    .content-accordion[open] summary::after {
      top: 8px;
    }
    .personal_info_row {
      gap: 16px;
      flex-direction: column;
    }
    .job-item-row {
      grid-template-columns: 100%;
      border-radius: 0;
      padding: 16px 0;
    }
    .job-item-row:not(:last-of-type) {
      border-bottom: 2px solid #e6f1ff;
    }
    .auto_section {
      padding: 16px;
    }
    .hr24 {
      display: none;
    
    .title_light_gray_700 {
      font-size: 20px;
      font-weight: 600;
      line-height: 26px;
    }
    .title_bold_800_column {
      width: 50%;
    }
    .title_black_700 {
      font-size: 20px;
      font-weight: 600;
      text-align: left;
      line-height: 26px;
    }
    .logo {
      fontSize: 20px;
    }
    .info_container {
      display: block;
    }
    .info_card {
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e6f1ff;
    }
    .html_container {
      padding: 0 15px;
    }
  }
`;
