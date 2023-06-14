import {
  FeedQuery,
  Sort,
  useFeedQuery,
  useNewLinkSubscription,
  useNewVotesSubscription,
} from "../../graphql/generated/schema";
import { LINKS_PER_PAGE } from "../constants";
import Link from "./Link";

import { useLocation, useNavigate } from "react-router-dom";

const getQueryVariables = (isNewPage: boolean, page: number) => {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const take = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = { createdAt: Sort.Desc };
  return { take, skip, orderBy };
};

const getLinksToRender = (isNewPage: boolean, data: FeedQuery) => {
  if (isNewPage) {
    return data.feed.links;
  }
  const rankedLinks = data.feed.links.slice();
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
  return rankedLinks;
};

const LinkList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNewPage = location.pathname.includes("new");
  const pageIndexParams = location.pathname.split("/");
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  const {
    data,
    loading,
    error,
    // subscribeToMore
  } = useFeedQuery({
    variables: getQueryVariables(isNewPage, page),
  });

  useNewVotesSubscription();

  useNewLinkSubscription({
    onData: (result) => {
      console.log("onData", result.data.data);

      // const {
      //   data: { data },
      //   client,
      // } = result;

      // if (!data) {
      //   return;
      // }

      // const { newLink } = data;

      // if (!newLink) {
      //   return;
      // }

      // const take = LINKS_PER_PAGE;
      // const skip = 0;
      // const orderBy = { createdAt: "desc" };

      // const prev = client.cache.readQuery({
      //   query: FeedDocument,
      //   variables: {
      //     take,
      //     skip,
      //     orderBy,
      //   },
      // }) as FeedQueryResult["data"];

      // client.cache.modify({
      //   fields: {
      //     feed() {
      //       return {
      //         links: [newLink, ...(prev?.feed.links || [])],
      //       };
      //     },
      //   },
      // });
    },
  });

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          {getLinksToRender(isNewPage, data).map((link, index: number) => (
            <Link key={link.id} link={link} index={index + pageIndex} />
          ))}
          {isNewPage && (
            <div className="flex ml4 mv3 gray">
              <div
                className="pointer mr2"
                onClick={() => {
                  if (page > 1) {
                    navigate(`/new/${page - 1}`);
                  }
                }}
              >
                Previous
              </div>
              <div
                className="pointer"
                onClick={() => {
                  if (page <= data.feed.count / LINKS_PER_PAGE) {
                    const nextPage = page + 1;
                    navigate(`/new/${nextPage}`);
                  }
                }}
              >
                Next
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LinkList;
