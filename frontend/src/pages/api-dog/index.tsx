import { useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";

import Footer from "../../components/footer";
import Header from "../../components/header";

function ApiDog() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  function handleRefresh() {
    iframeRef.current!.src = "http://random.dog";
  }

  return (
    <div className="flex flex-col  min-w-full overflow-auto">
      <Header />
      <div className="flex flex-col w-full items-center mt-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Boltz?</h1>
        <button
          onClick={() => handleRefresh()}
          className="text-black font-bold mt-5"
        >
          <FiRefreshCw size={32} />
        </button>
      </div>
      <div className="flex flex-col w-full  mt-5 h-screen justify-center items-center  bg-black">
        <iframe
          title="randomDog"
          ref={iframeRef}
          height="100%"
          width={"100%"}
          src="https://random.dog"
        ></iframe>
      </div>

      <Footer />
    </div>
  );
}

export default ApiDog;
