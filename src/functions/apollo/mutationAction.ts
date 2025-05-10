"use server";

import { DocumentNode, OperationVariables } from "@apollo/client";
import { cookies } from "next/headers";
import { getClient } from "./fetch";
import { QueryServerActionResult } from "./queryAction";

export async function MutationSA<InputType, OutputType, Variables extends OperationVariables | undefined = Record<string, unknown>>(
    mutationDocument: DocumentNode,
    options?: {
        requireAuth?: boolean;
        mapInput?: (input: InputType) => Variables;
        tokenName?: string;
    },
    variables?: Variables,
) {
    const {
        requireAuth = true,
        mapInput = (input: InputType) => input as unknown as Variables,
        tokenName = "Authorization",
    } = options || {};

    return async (input: InputType): Promise<QueryServerActionResult<OutputType>> => {
        try {
            const apiToken = (await cookies()).get(tokenName);

            if (requireAuth && !apiToken) {
                return {
                    pending: false,
                    error: new Error("Unauthorized"),
                };
            }

            const variables = mapInput(input);

            const client = await getClient();
            const response = await client.mutate({
                mutation: mutationDocument,
                variables,
            });

            return {
                data: response.data,
                pending: false,
            };
        } catch (error) {
            return {
                pending: false,
                error: error instanceof Error ? error : new Error("알 수 없는 오류"),
            };
        }
    };
}