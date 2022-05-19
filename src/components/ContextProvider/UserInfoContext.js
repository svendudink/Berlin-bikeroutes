import { createContext, useState } from "react";

export const UserInfoContext = createContext();

export const UserInfoContextProvider = (props) => {
  const [LoginNameContext, setLoginNameContext] = useState("none");
  const [LoginPasswordContext, setLoginPasswordContext] = useState("none");
  const [dream, setDream] = useState("this is a dreamstate");
  const [user, setUser] = useState(false);

  console.log(LoginNameContext, LoginPasswordContext);

  //Most simple trial login
  const FetchingLogin = async (username, password) => {
    try {
      const response = await fetch(
        `http://localhost:8080/${username}/${password}`
      );
      console.log(response);
      const dataAsync = await response.json();

      console.log(dataAsync);
    } catch (err) {
      console.log(err);
    }
  };

  //receive data from host

  return (
    <UserInfoContext.Provider
      value={{
        setLoginPasswordContext,
        setLoginNameContext,
        FetchingLogin,
        dream,
        setDream,
        user,
        setUser,
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};
