import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <>
      <form className="relative z-10 w-full">
        <div className="max-w-2xl mx-auto flex gap-4 border border-(--color-border) px-3 py-2 items-center rounded-lg">
          <Search className="text-(--color-text-secondary) hidden md:block" size={17} />
          <input
            type="text"
            placeholder="Search For Courses ...."
            className="placeholder-gray-400/60 focus:outline-0 flex-1"
          />
          <button className="cursor-pointer bg-(--color-primary) text-white rounded px-4 py-1 ">
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
