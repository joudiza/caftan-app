import Fix from "../components/Fix";
import Header from "../components/Header";

const UserLayout = ({ children }) => {
  return (
    <div className=" ">
      <Fix />
      <div className="">
        <Header />
        <main className="">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
