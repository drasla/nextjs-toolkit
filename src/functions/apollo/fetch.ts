import {
    ApolloClient,
    InMemoryCache,
    registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { ApolloLink, HttpLink } from "@apollo/client";
import { fnEnv } from "../env";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";
import { ConfigConstants } from "../../constants/env";

let contextToken: string | undefined;

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
        let token: string | undefined;
        if (contextToken) {
            token = contextToken;
        } else {
            const tokenCookie = (await cookies()).get(ConfigConstants.API_TOKEN_NAME);
            token = tokenCookie?.value;
        }

        return {
            headers: {
                ...headers,
                authorization: token || "",
            },
        };
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([authLink, httpLink]),
    });
});

export function setAuthToken(token: string | undefined) {
    contextToken = token;
}

export function clearAuthToken() {
    contextToken = undefined;
}

export type GraphQLActionResult<T> = {
    data?: T;
    error?: any;
};