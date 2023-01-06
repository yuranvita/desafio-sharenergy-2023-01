import { FaCat, FaDog } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GrUserManager } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="flex  fixed bottom-0 justify-center w-full ">
      <nav className="max-w-4xl">
        <ul className="w-full flex gap-2 bg-white bg-opacity-50 rounded-lg ">
          <li className="flex items-center justify-center">
            <button
              onClick={() => {
                navigate("/client");
              }}
              className="flex flex-col items-center  p-2"
            >
              <GrUserManager size={25} />
              <span>Clientes</span>
            </button>
          </li>
          <li className="flex items-center justify-center">
            <button
              onClick={() => {
                navigate("/api-user");
              }}
              className="flex flex-col items-center p-2"
            >
              <FiUsers size={25} />
              <span>API-User</span>
            </button>
          </li>
          <li className="flex items-center justify-center">
            <button
              onClick={() => {
                navigate("/api-cat");
              }}
              className="flex flex-col items-center p-2"
            >
              <FaCat size={25} />
              <span>API-Cats</span>
            </button>
          </li>
          <li className="flex items-center justify-center">
            <button
              onClick={() => {
                navigate("/api-dog");
              }}
              className="flex flex-col items-center p-2"
            >
              <FaDog size={25} />
              <span>API-Dogs</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Footer;
