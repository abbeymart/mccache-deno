import {
    CacheKeyType,
    CacheParamsType,
    CacheResponseType,
    CacheValueType, ValueType,
} from "./types.ts";

// Initialise cache object/dictionary (map)
// deno-lint-ignore no-explicit-any
const mcCache = new Map<string, CacheValueType<any>>();

// secret keyCode for added security
const keyCode = "mcconnect_20200320";

export function setCache<T extends ValueType>(cacheParams: CacheParamsType<T>): CacheResponseType<T | ValueType> {
    // key and value: key:string, value:ValueType, expire:time(seconds)
    const key = cacheParams.key || null;
    const value = cacheParams.value;
    const expire = cacheParams.expire || 300;
    try {
        if (!key || !value) {
            return {
                ok     : false,
                message: "cache key and value are required",
            }
        }
        const cacheKey = JSON.stringify(key) + keyCode;
        mcCache.set(cacheKey, {value: value, expire: Date.now() + expire * 1000});
        return {
            ok     : true,
            message: "task completed successfully",
            value  : mcCache.get(cacheKey)?.value,
        }
    } catch (e) {
        return {
            ok     : false,
            message: e.message ? e.message : "error creating/setting cache information",
        }
    }
}

export function getCache<T>(key: CacheKeyType): CacheResponseType<T> {
    try {
        if (!key) {
            return {
                ok     : false,
                message: "cache key is required",
            }
        }
        const cacheKey = JSON.stringify(key) + keyCode;
        if (mcCache.has(cacheKey)) {
            const cValue = mcCache.get(cacheKey);
            if (cValue && cValue.expire && cValue.expire > Date.now()) {
                return {
                    ok     : true,
                    message: "task completed successfully",
                    value  : cValue.value,
                }
            } else {
                // delete expired cache
                mcCache.delete(cacheKey);
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

export function deleteCache<T>(key: CacheKeyType): CacheResponseType<T> {
    try {
        if (!key) {
            return {
                ok     : false,
                message: "cache key is required",
            }
        }
        const cacheKey = JSON.stringify(key) + keyCode;
        if (mcCache.has(cacheKey)) {
            mcCache.delete(cacheKey);
            return {
                ok     : true,
                message: "task completed successfully",
            }
        } else {
            return {
                ok     : false,
                message: "task not completed, cache-key not found",
            }
        }
    } catch (e) {
        return {
            ok     : false,
            message: e.message ? e.message : "error deleting cache information",
        }
    }
}

export function clearCache<T>(): CacheResponseType<T> {
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
            message: e.message ? e.message : "error clearing cache",
        }
    }
}

