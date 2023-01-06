import Footer from "../../components/footer";
import Header from "../../components/header";
import RandomUser from "../../components/randomUser";

function HomePage() {
  return (
    <div className="flex flex-col  min-w-full overflow-auto">
      <Header />
      <RandomUser />
      <Footer />
    </div>
  );
}

export default HomePage;
