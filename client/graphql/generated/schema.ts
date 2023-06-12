import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
};

export enum CacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type Feed = {
  __typename?: "Feed";
  count: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  links: Array<Link>;
};

export type Link = {
  __typename?: "Link";
  createdAt: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  postedBy?: Maybe<User>;
  url: Scalars["String"]["output"];
  votes: Array<Vote>;
};

export type LinkOrderByInput = {
  createdAt?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  url?: InputMaybe<Sort>;
};

export type Mutation = {
  __typename?: "Mutation";
  login?: Maybe<AuthPayload>;
  post: Link;
  signup?: Maybe<AuthPayload>;
  vote?: Maybe<Vote>;
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationPostArgs = {
  description: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
};

export type MutationSignupArgs = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationVoteArgs = {
  linkId: Scalars["ID"]["input"];
};

export type Query = {
  __typename?: "Query";
  feed: Feed;
  info: Scalars["String"]["output"];
};

export type QueryFeedArgs = {
  filter?: InputMaybe<Scalars["String"]["input"]>;
  orderBy?: InputMaybe<LinkOrderByInput>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum Sort {
  Asc = "asc",
  Desc = "desc",
}

export type Subscription = {
  __typename?: "Subscription";
  newLink?: Maybe<Link>;
  newVote?: Maybe<Vote>;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  links: Array<Link>;
  name: Scalars["String"]["output"];
};

export type Vote = {
  __typename?: "Vote";
  id: Scalars["ID"]["output"];
  link: Link;
  user: User;
};

export type CreateLinkMutationVariables = Exact<{
  description: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
}>;

export type CreateLinkMutation = {
  __typename?: "Mutation";
  post: {
    __typename?: "Link";
    id: string;
    createdAt: any;
    url: string;
    description: string;
  };
};

export type FeedQueryVariables = Exact<{
  take?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<LinkOrderByInput>;
}>;

export type FeedQuery = {
  __typename?: "Query";
  feed: {
    __typename?: "Feed";
    id: string;
    count: number;
    links: Array<{
      __typename?: "Link";
      id: string;
      createdAt: any;
      url: string;
      description: string;
      postedBy?: { __typename?: "User"; id: string; name: string } | null;
      votes: Array<{
        __typename?: "Vote";
        id: string;
        user: { __typename?: "User"; id: string };
      }>;
    }>;
  };
};

export type FeedSearchQueryVariables = Exact<{
  filter: Scalars["String"]["input"];
}>;

export type FeedSearchQuery = {
  __typename?: "Query";
  feed: {
    __typename?: "Feed";
    id: string;
    links: Array<{
      __typename?: "Link";
      id: string;
      url: string;
      description: string;
      createdAt: any;
      postedBy?: { __typename?: "User"; id: string; name: string } | null;
      votes: Array<{
        __typename?: "Vote";
        id: string;
        user: { __typename?: "User"; id: string };
      }>;
    }>;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login?: { __typename?: "AuthPayload"; token?: string | null } | null;
};

export type NewLinkSubscriptionVariables = Exact<{ [key: string]: never }>;

export type NewLinkSubscription = {
  __typename?: "Subscription";
  newLink?: {
    __typename?: "Link";
    id: string;
    url: string;
    description: string;
    createdAt: any;
    postedBy?: { __typename?: "User"; id: string; name: string } | null;
    votes: Array<{
      __typename?: "Vote";
      id: string;
      user: { __typename?: "User"; id: string };
    }>;
  } | null;
};

export type NewVotesSubscriptionVariables = Exact<{ [key: string]: never }>;

export type NewVotesSubscription = {
  __typename?: "Subscription";
  newVote?: {
    __typename?: "Vote";
    id: string;
    link: {
      __typename?: "Link";
      id: string;
      url: string;
      description: string;
      createdAt: any;
      postedBy?: { __typename?: "User"; id: string; name: string } | null;
      votes: Array<{
        __typename?: "Vote";
        id: string;
        user: { __typename?: "User"; id: string };
      }>;
    };
    user: { __typename?: "User"; id: string };
  } | null;
};

export type SignupMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup?: { __typename?: "AuthPayload"; token?: string | null } | null;
};

export type VoteMutationVariables = Exact<{
  linkId: Scalars["ID"]["input"];
}>;

export type VoteMutation = {
  __typename?: "Mutation";
  vote?: {
    __typename?: "Vote";
    id: string;
    link: {
      __typename?: "Link";
      id: string;
      votes: Array<{
        __typename?: "Vote";
        id: string;
        user: { __typename?: "User"; id: string };
      }>;
    };
    user: { __typename?: "User"; id: string };
  } | null;
};

export const CreateLinkDocument = gql`
  mutation CreateLink($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
export type CreateLinkMutationFn = Apollo.MutationFunction<
  CreateLinkMutation,
  CreateLinkMutationVariables
>;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      description: // value for 'description'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateLinkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLinkMutation,
    CreateLinkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(
    CreateLinkDocument,
    options
  );
}
export type CreateLinkMutationHookResult = ReturnType<
  typeof useCreateLinkMutation
>;
export type CreateLinkMutationResult =
  Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<
  CreateLinkMutation,
  CreateLinkMutationVariables
>;
export const FeedDocument = gql`
  query Feed($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      count
    }
  }
`;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFeedQuery(
  baseOptions?: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
}
export function useFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(
    FeedDocument,
    options
  );
}
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const FeedSearchDocument = gql`
  query FeedSearch($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

/**
 * __useFeedSearchQuery__
 *
 * To run a query within a React component, call `useFeedSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedSearchQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFeedSearchQuery(
  baseOptions: Apollo.QueryHookOptions<
    FeedSearchQuery,
    FeedSearchQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FeedSearchQuery, FeedSearchQueryVariables>(
    FeedSearchDocument,
    options
  );
}
export function useFeedSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FeedSearchQuery,
    FeedSearchQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FeedSearchQuery, FeedSearchQueryVariables>(
    FeedSearchDocument,
    options
  );
}
export type FeedSearchQueryHookResult = ReturnType<typeof useFeedSearchQuery>;
export type FeedSearchLazyQueryHookResult = ReturnType<
  typeof useFeedSearchLazyQuery
>;
export type FeedSearchQueryResult = Apollo.QueryResult<
  FeedSearchQuery,
  FeedSearchQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const NewLinkDocument = gql`
  subscription NewLink {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

/**
 * __useNewLinkSubscription__
 *
 * To run a query within a React component, call `useNewLinkSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewLinkSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewLinkSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewLinkSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    NewLinkSubscription,
    NewLinkSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    NewLinkSubscription,
    NewLinkSubscriptionVariables
  >(NewLinkDocument, options);
}
export type NewLinkSubscriptionHookResult = ReturnType<
  typeof useNewLinkSubscription
>;
export type NewLinkSubscriptionResult =
  Apollo.SubscriptionResult<NewLinkSubscription>;
export const NewVotesDocument = gql`
  subscription NewVotes {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

/**
 * __useNewVotesSubscription__
 *
 * To run a query within a React component, call `useNewVotesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewVotesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewVotesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewVotesSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    NewVotesSubscription,
    NewVotesSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    NewVotesSubscription,
    NewVotesSubscriptionVariables
  >(NewVotesDocument, options);
}
export type NewVotesSubscriptionHookResult = ReturnType<
  typeof useNewVotesSubscription
>;
export type NewVotesSubscriptionResult =
  Apollo.SubscriptionResult<NewVotesSubscription>;
export const SignupDocument = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const VoteDocument = gql`
  mutation Vote($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;
export type VoteMutationFn = Apollo.MutationFunction<
  VoteMutation,
  VoteMutationVariables
>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VoteMutation, VoteMutationVariables>(
    VoteDocument,
    options
  );
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<
  VoteMutation,
  VoteMutationVariables
>;
