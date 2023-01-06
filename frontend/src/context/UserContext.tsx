import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

interface IUserContext {
  handleLogin: (username: string, password: string, remember: boolean) => void;
  signOut: () => void;
  showModalAdd: boolean;
  loading: boolean;

  setShowModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as IUserContext);

const UserProvider = ({ children }: IUserProviderProps) => {
  const navigate = useNavigate();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    username: string,
    password: string,
    remember: boolean
  ) => {
    try {
      const { data } = await api.post("/session", {
        username,
        password,
      });

      if (remember) {
        localStorage.setItem("@sharenergy:remember", "true");
        localStorage.setItem("@sharenergy:username", username);
        localStorage.setItem("@sharenergy:password", password);
      } else {
        localStorage.removeItem("@sharenergy:remember");
        localStorage.removeItem("@sharenergy:username");
        localStorage.removeItem("@sharenergy:password");
      }

      localStorage.setItem("@sharenergy:token", data.token);

      toast.success(`Login realizado com sucesso! Seja bem vindo ${username}`, {
        draggable: true,
        draggablePercent: 60,
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });

      navigate("/api-user");
    } catch (error: any) {
      console.log(error as any);
      toast.error(error.response.data.message);
    }
  };

  function signOut() {
    localStorage.removeItem("@sharenergy:token");
    navigate("/");
  }

  return (
    <UserContext.Provider
      value={{
        handleLogin,
        signOut,
        showModalAdd,
        setShowModalAdd,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
