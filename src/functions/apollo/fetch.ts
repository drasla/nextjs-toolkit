import {
    ApolloClient,
    InMemoryCache,
    registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { ApolloLink, HttpLink } from "@apollo/client";
import { fnEnv } from "../env";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";
import { ConfigConstants } from "../../constants/env/configConstants";

export const { getClient } = registerApolloClient(async () => {
    const { string: fnString } = await fnEnv.server();

    const httpLink = new HttpLink({
        uri: await fnString(ConfigConstants.GRAPHQL_API_URL, ""),
        fetchOptions: {
            cache: "no-store",
            credentials: "include",
        },
    });

    const authLink = setContext(async (_, { headers }) => {
        const token = (await cookies()).get(ConfigConstants.API_TOKEN_NAME);

        return {
            headers: {
                ...headers,
                authorization: token ? token.value : "",
            },
        };
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([authLink, httpLink]),
    });
});

export type GraphQLActionResult<T> = {
    data?: T;
    error?: any;
};
