import { Query } from '@aw-labs/appwrite-console';
import { sdk } from '$lib/stores/sdk';
import { pageToOffset } from '$lib/helpers/load';
import { Dependencies, PAGE_LIMIT } from '$lib/constants';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, depends, url }) => {
    depends(Dependencies.EXECUTIONS);
    const page = Number(url.searchParams.get('page'));
    const limit = Number(url.searchParams.get('limit') ?? PAGE_LIMIT);
    const offset = pageToOffset(page, limit);

    return {
        offset,
        limit,
        executions: await sdk.forProject.functions.listExecutions(params.function, [
            Query.limit(limit),
            Query.offset(offset),
            Query.orderDesc('$createdAt')
        ])
    };
};
