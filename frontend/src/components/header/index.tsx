import { useContext } from "react";
import { FaSolarPanel } from "react-icons/fa";
import { GiSolarPower } from "react-icons/gi";
import { VscSignOut } from "react-icons/vsc";
import { UserContext } from "../../context/UserContext";

function Header() {
  const user = localStorage.getItem("@sharenergy:username");

  const { signOut } = useContext(UserContext);
  return (
    <div className="w-full h-12 justify-center flex flex-col pl-4 pr-4 border-b-2">
      <header className="flex justify-between h-full items-center">
        <div className="h-full flex justify-center items-center gap-10">
          <FaSolarPanel size={32} color={"red"} />
          <p>{user}</p>
          <GiSolarPower size={32} color={"red"} className="animate-pulse" />
        </div>

        <nav>
          <ul>
            <li>
              <button
                onClick={() => signOut()}
                className="bg-opacity-10 bg-black rounded-md h-8 p-2 gap-2 items-center justify-center flex font-medium "
              >
                <p>sign out</p>
                <VscSignOut size={20} />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
