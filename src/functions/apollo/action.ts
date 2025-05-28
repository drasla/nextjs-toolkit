"use server";

import { DocumentNode, OperationVariables } from "@apollo/client";
import { cookies } from "next/headers";
import { getClient, GraphQLActionResult } from "./fetch";
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
    },
): Promise<GraphQLActionResult<OutputType>> {
    const { requireAuth = true } = options || {};

    try {
        const apiToken = (await cookies()).get(ConfigConstants.API_TOKEN_NAME);
        if (requireAuth && !apiToken) {
            return {
                error: new Error(ErrorConstants.UNAUTHORIZED),
            };
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
    }
}
