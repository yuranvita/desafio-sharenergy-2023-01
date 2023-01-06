import ClientList from "../../components/client/clientList";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Client() {
  return (
    <div className="flex flex-col  min-w-full overflow-auto">
      <Header />
      <ClientList />
      <Footer />
    </div>
  );
}

export default Client;
