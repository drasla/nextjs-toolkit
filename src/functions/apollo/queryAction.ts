"use server";

import { DocumentNode, OperationVariables } from "@apollo/client";
import { cookies } from "next/headers";
import { getClient } from "./fetch";

export type QueryServerActionResult<T> = {
    data?: T;
    pending: boolean;
    error?: any;
};

export async function QuerySA<
    InputType,
    OutputType,
    Variables extends OperationVariables | undefined = Record<string, unknown>,
>(
    queryDocument: DocumentNode,
    options?: {
        requireAuth?: boolean;
        mapInput?: (input: InputType) => Variables;
        tokenName?: string;
    },
) {
    const {
        requireAuth = true,
        mapInput = (input: InputType) => input as unknown as Variables,
        tokenName = "Authorization",
    } = options || {};

    return async (
        input: InputType,
        previousState?: QueryServerActionResult<OutputType>,
    ): Promise<QueryServerActionResult<OutputType>> => {
        if (previousState?.pending) {
            return previousState;
        }

        const initialState: QueryServerActionResult<OutputType> = {
            pending: true,
            data: previousState?.data,
        };

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
            const response = await client.query({
                query: queryDocument,
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
