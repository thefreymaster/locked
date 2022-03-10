import React from "react";
import { useDisclosure } from "@chakra-ui/react";

const Context = React.createContext({
  isOpenNewUser: false,
  onOpenNewUser: () => {},
  onCloseNewUser: () => {},
  isOpenAddToMap: false,
  onOpenAddToMap: () => {},
  onOpenCloseToMap: () => {},
});

export const useModalControlState = () => React.useContext(Context);

export const Provider = (props: { children: React.ReactNode }) => {
  const {
    isOpen: isOpenNewUser,
    onOpen: onOpenNewUser,
    onClose: onCloseNewUser,
  } = useDisclosure();
  const {
    isOpen: isOpenAddToMap,
    onOpen: onOpenAddToMap,
    onClose: onOpenCloseToMap,
  } = useDisclosure();

  return (
    <Context.Provider
      value={{
        isOpenNewUser,
        onOpenNewUser,
        onCloseNewUser,
        isOpenAddToMap,
        onOpenAddToMap,
        onOpenCloseToMap,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
