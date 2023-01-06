import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

function LoginPage() {
  const rememberItem = localStorage.getItem("@sharenergy:remember") || false;
  const rememberUser = localStorage.getItem("@sharenergy:username") || "";
  const rememberPassword = localStorage.getItem("@sharenergy:password") || "";

  const [username, setUserName] = useState(rememberUser);
  const [password, setPassword] = useState(rememberPassword);
  const [remember, setRemember] = useState(
    rememberItem === "true" ? true : false
  );

  const { handleLogin } = useContext(UserContext);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-solar-energy bg-cover p-10">
      <div className="flex text-white text-3xl max-md:flex-col w-full h-5/6 justify-center gap-24 items-center">
        <div className="p-1 bg-gradient-dark-to-transparent">
          <h1 className="font-bold text-2xl">Bem-Vindo a Sharenegy</h1>
          <p className="text-lg max-w-xs text-justify">faça seu login</p>
          <form className="flex flex-col gap-1 mt-14">
            <label
              htmlFor="username"
              className="bg-text-fill-gradient  bg-clip-text text-transparent"
            >
              Login
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="rounded-md text-black text-lg w-[300px] p-1 "
            />
            <label
              htmlFor="password"
              className="bg-text-fill-gradient  bg-clip-text text-transparent"
            >
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md text-black text-lg w-[300px] p-1"
            />
            <div className="flex flex-col mt-10">
              <span className="text-sm">Lembrar-me</span>
              <label className="inline-flex relative items-center  cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-1 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
              </label>
            </div>

            <div className="mt-5 w-full">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin(username, password, remember);
                }}
                className="bg-green-600 p-1 text-lg rounded-md w-full"
              >
                Logar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { LoginPage };
