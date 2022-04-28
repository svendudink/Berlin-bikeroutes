import { createContext, useState } from "react";


export const NavBarContext = createContext();


export const NavBarContextProvider = (props) => {

    const [menuClickedItemContext, setMenuClickedItemContext] = useState('nurrdfll')

    console.log(menuClickedItemContext);


    return (<NavBarContext.Provider value={{menuClickedItemContext, setMenuClickedItemContext}}></NavBarContext.Provider>)
}