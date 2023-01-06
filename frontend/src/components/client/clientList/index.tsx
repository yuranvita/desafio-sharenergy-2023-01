import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { LottieAnimation } from "../../lottieAnimation";

import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import listPurple from "../../../assets/lottieJSON/list-purple.json";
import { UserContext } from "../../../context/UserContext";
import { client } from "../../../interface/clients";
import api from "../../../services/api";
import ClientModalAdd from "../clientModalAdd";

function ClientList() {
  const [clients, setClients] = useState([]);

  const { showModalAdd, setShowModalAdd, signOut } = useContext(UserContext);

  const navigate = useNavigate();

  function handleNavigate(id: string) {
    navigate(`/client/${id}`);
  }

  useEffect(() => {
    const getClients = () => {
      api
        .get("/client", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "@sharenergy:token"
            )}`,
          },
        })
        .then((res) => setClients(res.data))
        .catch((err: AxiosError) => {
          toast.error(err.message);
          if (err.status === 401) {
            signOut();
          }
        });
    };
    getClients();
  }, [showModalAdd, handleDelete]);

  function handleDelete(id: string) {
    api
      .delete(`/client/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@sharenergy:token")}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          toast.success("client deleted");
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  return (
    <>
      <button
        onClick={() => setShowModalAdd(!showModalAdd)}
        className="rounded-full border-2 border-black absolute bottom-20 right-20 max-md:right-10"
      >
        <FiPlus size={32} />
      </button>
      <div className="flex flex-col justify-center items-center">
        {clients.length < 1 ? (
          <>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Não há clientes cadastrados
            </h1>
            <LottieAnimation animation={listPurple} width={500} height={350} />
          </>
        ) : (
          <div className="flex flex-col  min-h-full mt-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Clientes Cadastrados
            </h1>
            <table className="mt-10 border-collapse ">
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">CPF</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Rua</th>
                  <th scope="col">Bairro</th>
                  <th scope="col">N°</th>
                  <th scope="col">editar</th>
                  <th scope="col">deletar</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c: client) => (
                  <tr key={c.id} className="border-gray-300 border-b-2">
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {c.name}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {c.cpf}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {c.email}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {c.phone}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {c.address}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {c.district}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {c.houseNumber}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleNavigate(c.id)}
                        className=" flex justify-center items-center"
                      >
                        <FaEdit size={20} />
                      </button>
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className=" flex justify-center items-center"
                      >
                        <FiPlus size={20} color="red" className="rotate-45" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ClientModalAdd />
    </>
  );
}

export default ClientList;
