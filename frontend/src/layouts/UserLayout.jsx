import Fix from "../components/Fix";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserLayout = ({ children }) => {
  return (
    <div className=" ">
      <Fix />
      <div className="">
        <Header />
        <main className="">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
