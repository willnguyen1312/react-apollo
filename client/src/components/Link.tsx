import {
  FeedDocument,
  FeedQueryResult,
  FeedSearchQuery,
  useVoteMutation,
} from "../../graphql/generated/schema";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../constants";
import { timeDifferenceForDate } from "../utils";

const LinkComponent = (props: {
  link: FeedSearchQuery["feed"]["links"][0];
  index: number;
}) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: "desc" };

  const [vote] = useVoteMutation({
    variables: {
      linkId: link.id,
    },
    update: (cache, { data }) => {
      if (!data) return;

      const { vote } = data;
      const result = cache.readQuery({
        query: FeedDocument,
        variables: {
          take,
          skip,
          orderBy,
        },
      }) as FeedQueryResult["data"];

      if (!result) {
        return;
      }

      const { feed } = result;

      // console.log(cache.identify(feed.links[0]));

      const updatedLinks = feed.links.map((feedLink) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.modify({
        fields: {
          feed() {
            return {
              links: updatedLinks,
            };
          },
        },
      });
    },
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => {
              vote();
            }}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  );
};

export default LinkComponent;
