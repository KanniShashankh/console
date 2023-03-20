import { Query } from '@aw-labs/appwrite-console';
import { sdk } from '$lib/stores/sdk';
import { pageToOffset } from '$lib/helpers/load';
import { PAGE_LIMIT } from '$lib/constants';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page'));
    const limit = Number(url.searchParams.get('limit') ?? PAGE_LIMIT);
    const offset = pageToOffset(page, limit);
    const search = url.searchParams.get('search') ?? undefined;

    return {
        offset,
        limit,
        search,
        page,
        teams: await sdk.forProject.teams.list(
            [Query.limit(limit), Query.offset(offset), Query.orderDesc('$createdAt')],
            search
        )
    };
};
