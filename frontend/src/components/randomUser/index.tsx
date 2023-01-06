import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { IRandomUser } from "../../interface/randomUser";
import randomUserApi from "../../services/api-random-user";

import female from "./../../assets/female.png";
import male from "./../../assets/male.png";

function RandomUser() {
  const [users, setUsers] = useState<IRandomUser[]>([]);
  const [page, setPage] = useState(1);

  const { signOut } = useContext(UserContext);

  useEffect(() => {
    async function usersData() {
      await randomUserApi
        .get(`?page=${page}&results=10`)
        .then((res) => {
          setUsers(res.data.results);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          if (err.status === 401) {
            signOut();
          }
        });
    }
    usersData();
  }, [page]);

  return (
    <div className="flex flex-col items-center mt-10 w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Random User API
        </h1>
        <div className="flex gap-10 items-center mt-10">
          <button
            onClick={() => {
              if (page === 1) {
                return toast.error("você está na primeira página");
              }
              setPage(page - 1);
            }}
          >
            <FiArrowLeft size={30} />
          </button>
          <span>página {page}</span>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <FiArrowRight size={30} />
          </button>
        </div>
      </div>
      <ul
        id="ul-main"
        className="flex flex-col gap-4 mb-20 w-full p-10 items-center justify-center"
      >
        {users.map((u: IRandomUser) => {
          return u.gender === "male" ? (
            <li
              key={u.login.uuid}
              className="group max-md:flex-col flex min-h-[100px] bg-blue-900 bg-opacity-90 w-full max-w-xl justify-between items-center 
             text-white rounded-md hover:cursor-pointer hover:border-green-500"
            >
              <img
                src={u.picture.medium}
                alt="thumbnail"
                className="h-[110px] rounded-full relative left-[-50px] max-md:right-0  max-md:left-0 group-hover:scale-125"
              />
              <p>
                {u.name.first} {u.name.last}
              </p>
              <div>
                <p>nacionalidade: {u.nat}</p>
                <p>cidade: {u.location.city}</p>
                <p>Idade: {u.dob.age}</p>
              </div>
              <img
                src={male}
                alt="sex"
                id="sex"
                className="h-[100px] relative right-[-50px] max-md:right-0  group-hover:animate-spin "
              />
            </li>
          ) : (
            <li
              key={u.login.uuid}
              className="group max-md:flex-col flex min-h-[100px] bg-pink-900 bg-opacity-90 w-full max-w-xl justify-between items-center 
           text-white rounded-md hover:cursor-pointer hover:border-green-500 "
            >
              <img
                src={u.picture.medium}
                alt="thumbnail"
                className="h-[110px] rounded-full relative left-[-50px]  max-md:right-0  max-md:left-0 group-hover:scale-125"
              />
              <p>
                {u.name.first} {u.name.last}
              </p>
              <div>
                <p>nacionalidade: {u.nat}</p>
                <p>cidade: {u.location.city}</p>
                <p>Idade: {u.dob.age}</p>
              </div>
              <img
                src={female}
                alt="sex"
                id="sex"
                className="h-[80px] relative right-[-30px] max-md:right-0  group-hover:animate-spin"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RandomUser;
