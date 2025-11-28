import Hero from "../../components/Student/Hero";
import SearchBar from "../../components/Student/SearchBar";
import mainImg from "../../assets/onlienn.jpeg";

const Home = () => {
  return (
    <div
      className="flex flex-col space-y-7 w-full pt-32   px-7 md:px-0   items-center text-center h-[90vh] bg-cover bg-no-repeat bg-center relative"
      style={{ backgroundImage: `url(${mainImg})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0 h-full"></div>
      <Hero />
      <SearchBar className="" />
    </div>
  );
};

export default Home;
