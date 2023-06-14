import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FeedDocument,
  FeedQueryResult,
  useCreateLinkMutation,
} from "../../graphql/generated/schema";
import { LINKS_PER_PAGE } from "../constants";

const CreateLink = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const [createLink] = useCreateLinkMutation({
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      const { post } = data;

      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: "desc" };

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

      cache.modify({
        fields: {
          feed() {
            return {
              links: [post, ...result.feed.links],
            };
          },
        },
      });
    },
    onCompleted: () => {
      navigate("/");
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
