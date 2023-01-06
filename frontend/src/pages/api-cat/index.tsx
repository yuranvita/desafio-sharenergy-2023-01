import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import Footer from "../../components/footer";
import Header from "../../components/header";

function ApiCat({ props }: { props: string }) {
  const [statusCode, setStatusCode] = useState(props);

  const regex = /^[0-9]+$/;

  return (
    <div className="flex flex-col  min-w-full overflow-auto">
      <Header />
      <div className="flex flex-col w-full items-center mt-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {props === "404" ? "PAGE NOT FOUND" : "NYAN CAT?"}
        </h1>
      </div>

      <div className="flex flex-col w-full  mt-10 mb-20 h-full justify-center items-center bg-black">
        {props === "404" ? (
          <></>
        ) : (
          <h1 className="text-white mt-5">
            Digite um número de status code HTTP.
          </h1>
        )}
        {props === "404" ? (
          <></>
        ) : (
          <div className="bg-white my-5 flex rounded-lg  justify-around items-center h-8 w-64 z-20">
            <input
              type="text"
              name="statusCode"
              value={statusCode}
              onChange={(e) => {
                if (!regex.test(e.target.value)) {
                  setStatusCode("");
                  return toast.error("digite apenas números");
                }
                setStatusCode(e.target.value);
              }}
              className="bg-black bg-opacity-30 text-black placeholder:text-gray-900 pl-5 w-full focus:outline-none h-full"
              placeholder="procurar"
            />
            <FiSearch size={20} className="w-12 focus:ring-0 " />
          </div>
        )}

        <img src={`https://http.cat/${statusCode}`} alt="" />
      </div>

      <Footer />
    </div>
  );
}

export default ApiCat;
