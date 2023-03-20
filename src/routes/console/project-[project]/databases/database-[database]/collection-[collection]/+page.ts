import { Dependencies, PAGE_LIMIT } from '$lib/constants';
import { pageToOffset } from '$lib/helpers/load';
import { sdk } from '$lib/stores/sdk';
import { Query } from '@aw-labs/appwrite-console';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, depends, url }) => {
    depends(Dependencies.DOCUMENTS);
    const page = Number(url.searchParams.get('page'));
    const limit = Number(url.searchParams.get('limit') ?? PAGE_LIMIT);
    const offset = pageToOffset(page, limit);

    return {
        offset,
        limit,
        documents: await sdk.forProject.databases.listDocuments(
            params.database,
            params.collection,
            [Query.limit(limit), Query.offset(offset), Query.orderDesc('$createdAt')]
        )
    };
};
