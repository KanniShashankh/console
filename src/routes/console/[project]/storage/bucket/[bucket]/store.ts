import { sdkForProject } from '$lib/stores/sdk';
import type { Models } from '@aw-labs/appwrite-console';
import { writable } from 'svelte/store';

function createBucketStore() {
    const { subscribe, set } = writable<Models.Bucket>();

    return {
        subscribe,
        set,
        load: async (bucketId: string) => {
            set(await sdkForProject.storage.getBucket(bucketId));
        }
    };
}

export const bucket = createBucketStore();
