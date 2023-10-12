import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowingEdit, setIsShowingEdit] = useState(false);
  const [isShowingAlertSucess, setIsShowingAlertSucess] = useState(false);
  const [isShowingAlertSucessEdit, setIsShowingAlertSucessEdit] =
    useState(false);
  const [isShowingAlertSucessDelete, setIsShowingAlertSucessDelete] =
    useState(false);
  const [isShowingAlertWarning, setIsShowingAlertWarning] = useState(false);
  const [isShowingAlertError, setIsShowingAlertError] = useState(false);
  const [isShowingLoading, setIsShowinLoading] = useState(false);

  const toggle = () => setIsShowing(!isShowing);
  const toggleEdit = () => setIsShowingEdit(!isShowingEdit);
  const toggleAlertSucess = () =>
    setIsShowingAlertSucess(!isShowingAlertSucess);
  const toggleAlertSucessEdit = () =>
    setIsShowingAlertSucessEdit(!isShowingAlertSucessEdit);
  const toggleAlertSucessDelete = () =>
    setIsShowingAlertSucessDelete(!isShowingAlertSucessDelete);
  const toggleAlertWarning = () =>
    setIsShowingAlertWarning(!isShowingAlertWarning);
  const toggleAlertError = () => setIsShowingAlertError(!isShowingAlertError);
  const toggleLoading = () => setIsShowinLoading(!isShowingLoading);

  return (
    <ModalContext.Provider
      value={{
        isShowing,
        toggle,
        isShowingAlertSucess,
        toggleAlertSucess,
        isShowingAlertError,
        toggleAlertError,
        isShowingAlertWarning,
        toggleAlertWarning,
        isShowingEdit,
        toggleEdit,
        isShowingLoading,
        toggleLoading,
        isShowingAlertSucessEdit,
        setIsShowingAlertSucessEdit,
        toggleAlertSucessEdit,
        isShowingAlertSucessDelete,
        setIsShowingAlertSucessDelete,
        toggleAlertSucessDelete,
        setIsShowinLoading,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

export { ModalProvider, useModal };
