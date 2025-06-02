"use server";

import { DocumentNode, OperationVariables } from "@apollo/client";
import { cookies } from "next/headers";
import { clearAuthToken, getClient, GraphQLActionResult, setAuthToken } from "./fetch";
import { ConfigConstants } from "../../constants/env";
import { ErrorConstants } from "../../constants/env";

type OperationType = "query" | "mutation";

export async function GraphQLSA<
    OutputType,
    Variables extends OperationVariables = Record<string, unknown>,
>(
    document: DocumentNode,
    variables: Variables,
    operationType: OperationType,
    options?: {
        requireAuth?: boolean;
        authorization?: string;
    },
): Promise<GraphQLActionResult<OutputType>> {
    const { requireAuth = true, authorization } = options || {};

    try {
        let apiToken: string | undefined;
        if (authorization) {
            apiToken = authorization;
        } else {
            const tokenCookie = (await cookies()).get(ConfigConstants.API_TOKEN_NAME);
            apiToken = tokenCookie?.value;
        }

        if (requireAuth && !apiToken) {
            return {
                error: new Error(ErrorConstants.UNAUTHORIZED),
            };
        }

        if (authorization) {
            setAuthToken(authorization);
        }

        const client = await getClient();

        let response;
        if (operationType === "query") {
            response = await client.query({
                query: document,
                variables,
            });
        } else {
            response = await client.mutate({
                mutation: document,
                variables,
            });
        }

        return {
            data: response.data,
        };
    } catch (error) {
        return {
            error: error instanceof Error ? error : new Error(ErrorConstants.UNKNOWN_ERROR),
        };
    } finally {
        if (authorization) {
            clearAuthToken();
        }
    }
}
