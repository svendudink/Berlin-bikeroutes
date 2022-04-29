import { createContext, useState, useEffect } from "react";

export const NavBarContext = createContext();

export const NavBarContextProvider = (props) => {
  const [menuClickedItemContext, setMenuClickedItemContext] = useState("");

  console.log(menuClickedItemContext);

  return (
    <NavBarContext.Provider
      value={{ menuClickedItemContext, setMenuClickedItemContext }}
    >
      {props.children}
    </NavBarContext.Provider>
  );
};
