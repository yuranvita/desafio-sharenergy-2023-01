import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { FiArrowLeft, FiDivideCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/UserContext";
import api from "../../../services/api";

function ClientModalEdit() {
  const { id } = useParams();
  const token = localStorage.getItem("@sharenergy:token");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState<number>();

  const { loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getData() {
      await api
        .get(`/client/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setCpf(res.data.cpf);
          setDistrict(res.data.district);
          setAddress(res.data.address);
          setHouseNumber(res.data.houseNumber);

          setLoading(false);
        })
        .catch((err: AxiosError) => {
          console.log(err);
          toast.error(err.message);
          setLoading(false);
        });
    }

    getData();
  }, []);

  async function handleUpdatedClient() {
    const data = {
      name: name,
      email: email,
      phone: phone,
      cpf: cpf,
      district: district,
      address: address,
      houseNumber: houseNumber,
    };

    await api
      .patch(`/client/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        setCpf("");
        setDistrict("");
        setAddress("");
        setHouseNumber(0);

        navigate("/client");

        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          return toast.error(error.response?.data.message);
        }
      });
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full bg-black bg-opacity-40 ">
          <FiDivideCircle
            size={100}
            className="flex h-full w-full justify-center items-center animate-spin"
            color="white"
          />
        </div>
      ) : (
        <div className="w-full min-h-full bg-black bg-opacity-60  absolute backdrop-blur-sm flex flex-col items-center">
          <button
            onClick={() => navigate("/client")}
            className="absolute right-2  rounded-full"
          >
            <FiArrowLeft size={32} color={"red"} />
          </button>
          <form className="bg-white bg-opacity-50 w-1/2  p-10 items-center max-md:w-full flex flex-col ">
            <fieldset className="border p-5 w-5/6">
              <legend className="">Edite seus dados</legend>
              <div className="mt-2 flex flex-col gap-3">
                <div className="gap-1 flex flex-col w-full">
                  <label>Nome:</label>
                  <input
                    className="bg-gray-400 text-white placeholder:text-black placeholder:text-opacity-40 pl-5 w-full  rounded-tl-full"
                    type="text"
                    placeholder="João araujo junior"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="gap-1 flex flex-col w-full">
                  <label>Email:</label>
                  <input
                    className="bg-gray-400 text-white placeholder:text-black placeholder:text-opacity-40 pl-5 w-full  rounded-tl-full"
                    type="email"
                    placeholder="exemplo@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="gap-1 flex flex-col w-full">
                  <label>Telefone:</label>
                  <input
                    className="bg-gray-400 text-white placeholder:text-black placeholder:text-opacity-40 pl-5 w-full  rounded-tl-full"
                    type="text"
                    placeholder="digite somente os números: 912345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="gap-1 flex flex-col w-full">
                  <label>CPF:</label>
                  <input
                    className="bg-gray-400 text-white placeholder:text-black placeholder:text-opacity-40 pl-5 w-full  rounded-tl-full"
                    type="text"
                    placeholder="somente os números: 12345678910"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    maxLength={11}
                  />
                </div>
                <div className="gap-1 flex flex-col w-full">
                  <label>Bairro:</label>
                  <input
                    className="bg-gray-400 text-white placeholder:text-black placeholder:text-opacity-40 pl-5 w-full  rounded-tl-full"
                    type="text"
                    placeholder="nome do seu bairro"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
                <div className="gap-1 flex flex-col w-full">
                  <label>Rua:</label>
                  <input
                    className="bg-gray-400 text-white placeholder:text-black placeholder:text-opacity-40 pl-5 w-full  rounded-tl-full"
                    type="text"
                    placeholder="Nome da AV ou Rua"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="gap-1 flex flex-col w-full">
                  <label>N°:</label>
                  <input
                    className="bg-gray-400 text-white placeholder:text-black placeholder:text-opacity-40 pl-5 w-full  rounded-tl-full"
                    type="number"
                    placeholder="Número da sua casa"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(Number(e.target.value))}
                  />
                </div>
              </div>
            </fieldset>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleUpdatedClient();
              }}
              className="flex gap-3 justify-center items-center p-2 bg-green-500 mt-2 font-bold text-gray-300"
            >
              Salvar
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ClientModalEdit;
