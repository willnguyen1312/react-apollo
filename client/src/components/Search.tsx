import { useState } from "react";
import { useFeedSearchLazyQuery } from "../../graphql/generated/schema";
import Link from "./Link";

const Search = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [executeSearch, { data }] = useFeedSearchLazyQuery();

  return (
    <>
      <div>
        Search
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
        <button
          onClick={() => executeSearch({ variables: { filter: searchFilter } })}
        >
          OK
        </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default Search;
