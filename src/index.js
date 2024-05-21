import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import reportWebVitals from "./reportWebVitals";
import "./assets/styles/_clear.css";
import { Provider } from "react-redux";
import store from "./store/index";
import PopupNotification from "./components/app/use/PopupNotification";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "./store/context/themeContextProvider";
import "react-tooltip/dist/react-tooltip.css";
import { ModalProvider } from "./store/context/ModalContext";
import { FaceVerifyProvider } from "./store/context/FaceVerifyContext";
import ConfirmationDeleteModal from "./components/app/base/ConfirmationDeleteModal";
import App from "./App";
import GlobalDropZone from "./components/app/ui/GlobalDropZone";
import { SearchProvider } from "./store/context/globalSearchContext";

const root = ReactDOM.createRoot(document.getElementById("kermit"));
root.render(
  <Provider store={store}>
    <>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider>
          <FaceVerifyProvider>
            <ModalProvider>
              <SearchProvider>
                <PopupNotification />
                <ConfirmationDeleteModal />
                <GlobalDropZone>
                  <App />
                </GlobalDropZone>
              </SearchProvider>
            </ModalProvider>
          </FaceVerifyProvider>
        </ThemeProvider>
      </DndProvider>
    </>
  </Provider>,
);

reportWebVitals();
