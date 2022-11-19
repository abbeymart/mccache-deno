import {
    CacheValueType, HashCacheValueType, CacheResponseType, HashCacheParamsType, QueryHashCacheParamsType
} from "./types.ts";

// Initialise cache object/dictionary (map)
const mcCache = new Map<string, HashCacheValueType>();

// secret keyCode for added security
const keyCode = "mcconnect_20200320";

export function setHashCache(cacheParams: HashCacheParamsType): CacheResponseType {
    // key and value: key:string, hash: string, value:Value, expire:time(seconds)
    const key = cacheParams.key || null;
    const hash = cacheParams.hash || null;
    const value = cacheParams.value;
    const expire = cacheParams.expire || 300;
    try {
        if (!key || !hash || !value) {
            return {
                ok     : false,
                message: "cache key, hash and value are required",
            }
        }
        const cacheKey = JSON.stringify(key) + keyCode;
        const hashKey = JSON.stringify(hash) + keyCode;

        if (!mcCache.has(hashKey)) {
            mcCache.set(hashKey, new Map<string, CacheValueType>());
        }
        if (mcCache.has(hashKey) && !mcCache.get(hashKey)?.has(cacheKey)) {
            mcCache.get(hashKey)?.set(cacheKey, {});
        }
        const hashValue = {value: value, expire: Date.now() + expire * 1000};
        mcCache.get(hashKey)?.set(cacheKey, hashValue);
        return {
            ok     : true,
            message: "task completed successfully",
            value  : mcCache.get(hashKey)?.get(cacheKey)?.value,
        }
    } catch (e) {
        return {
            ok     : false,
            message: e.message ? e.message : "error creating/setting cache information",
        }
    }
}

export function getHashCache(cacheParams: QueryHashCacheParamsType): CacheResponseType {
    const key = cacheParams.key;
    const hash = cacheParams.hash;
    try {
        if (!key || !hash) {
            return {
                ok     : false,
                message: "key and hash-key are required",
            }
        }
        const cacheKey = JSON.stringify(key) + keyCode;
        const hashKey = JSON.stringify(hash) + keyCode;
        // get active (non-expired) cache content
        if (mcCache.has(hashKey) && mcCache.get(hashKey)?.has(cacheKey)) {
            const cValue = mcCache.get(hashKey)?.get(cacheKey);
            if (cValue && cValue.expire && cValue.expire > Date.now()) {
                return {
                    ok     : true,
                    message: "task completed successfully",
                    value  : mcCache.get(hashKey)?.get(cacheKey)?.value,
                }
            } else {
                // delete expired cache
                mcCache.get(hashKey)?.delete((cacheKey));
                return {
                    ok     : false,
                    message: "cache expired and deleted",
                }
            }
        } else {
            return {
                ok     : false,
                message: "cache info does not exist",
            }
        }
    } catch (e) {
        return {
            ok     : false,
            message: e.message ? e.message : "error fetching cache information",
        }
    }
}

export function deleteHashCache(cacheParams: QueryHashCacheParamsType): CacheResponseType {
    const key = cacheParams.key;
    const hash = cacheParams.hash;
    const by = cacheParams.by || "key"
    try {
        if ((!key || !hash) && by === "key") {
            return {
                ok     : false,
                message: "key and hash-key are required",
            }
        }
        const cacheKey = JSON.stringify(key) + keyCode;
        const hashKey = JSON.stringify(hash) + keyCode;
        if (key && by === "hash" && mcCache.has(hashKey)) {
            mcCache.delete(hashKey);
            return {
                ok     : true,
                message: "task completed successfully",
            }
            // key != "" and hash != "" and by == "hash" and mcCache.hasKey(cacheKey) and mcCache[cacheKey].hasKey(hashKey)
        } else if (key && hash && by === "key" && mcCache.get(hashKey)?.has(cacheKey)) {
            mcCache.get(hashKey)?.delete(cacheKey);
            return {
                ok     : true,
                message: "task completed successfully",
            }
        } else {
            return {
                ok     : false,
                message: "task could not be completed due to incomplete inputs",
            }
        }
    } catch (e) {
        return {
            ok     : false,
            message: e.message ? e.message : "error deleting cache information",
        }
    }
}

export function clearHashCache(): CacheResponseType {
    try {
        // clear the cache object/dictionary (map)
        mcCache.clear();
        return {
            ok     : true,
            message: "task completed successfully",
        }
    } catch (e) {
        return {
            ok     : false,
            message: e.message ? e.message : "error clearing the cache",
        }
    }
}
