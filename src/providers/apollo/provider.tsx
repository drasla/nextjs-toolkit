"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import { fnEnv } from "../../functions/env";
import {
    ApolloClient,
    ApolloNextAppProvider,
    InMemoryCache,
    SSRMultipartLink,
} from "@apollo/client-integration-nextjs";
import { PropsWithChildren, useEffect, useState } from "react";

export function ApolloProvider({ children }: PropsWithChildren) {
    const [client, setClient] = useState<ApolloClient<any> | null>(null);

    useEffect(() => {
        async function initializeApollo() {
            const { string: fnString } = await fnEnv.client();
            const httpLink = new HttpLink({
                uri: fnString("GRAPHQL_API_URL", ""),
            });

            const newClient = new ApolloClient({
                cache: new InMemoryCache(),
                link: ApolloLink.from([
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    httpLink,
                ]),
            });
            setClient(newClient);
        }

        initializeApollo().then(() => {});
    }, []);

    if (!client) return children;
    return <ApolloNextAppProvider makeClient={() => client}>{children}</ApolloNextAppProvider>;
}
