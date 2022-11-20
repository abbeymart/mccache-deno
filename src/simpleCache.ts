import {
  CacheParamsType,
  CacheResponseType,
  CacheValueType,
  ObjectKeyType,
} from "./types.ts";

// Initialise cache object/dictionary (map)
const mcCache = new Map<string, CacheValueType>();

// secret keyCode for added security
const keyCode = "mcconnect_20200320";

export function setCache(cacheParams: CacheParamsType): CacheResponseType {
  // key and value: key:string, value:ValueType, expire:time(seconds)
  const key = cacheParams.key || null;
  const value = cacheParams.value;
  const expire = cacheParams.expire || 300;
  try {
    if (!key || !value) {
      return {
        ok: false,
        message: "cache key and value are required",
        value: "",
      };
    }
    const cacheKey = JSON.stringify(key) + keyCode;
    mcCache.set(cacheKey, { value: value, expire: Date.now() + expire * 1000 });
    return {
      ok: true,
      message: "task completed successfully",
      value: mcCache.get(cacheKey)?.value || "",
    };
  } catch (e) {
    return {
      ok: false,
      message: e.message
        ? e.message
        : "error creating/setting cache information",
      value: "",
    };
  }
}

export function getCache(key: ObjectKeyType): CacheResponseType {
  try {
    if (!key) {
      return {
        ok: false,
        message: "cache key is required",
        value: "",
      };
    }
    const cacheKey = JSON.stringify(key) + keyCode;
    if (mcCache.has(cacheKey)) {
      const cValue = mcCache.get(cacheKey);
      if (cValue && cValue.expire && cValue.expire > Date.now()) {
        return {
          ok: true,
          message: "task completed successfully",
          value: cValue.value || "",
        };
      } else {
        // delete expired cache
        mcCache.delete(cacheKey);
        return {
          ok: false,
          message: "cache expired and deleted",
          value: "",
        };
      }
    } else {
      return {
        ok: false,
        message: "cache info does not exist",
        value: "",
      };
    }
  } catch (e) {
    return {
      ok: false,
      message: e.message ? e.message : "error fetching cache information",
      value: "",
    };
  }
}

export function deleteCache(key: ObjectKeyType): CacheResponseType {
  try {
    if (!key) {
      return {
        ok: false,
        message: "cache key is required",
        value: "",
      };
    }
    const cacheKey = JSON.stringify(key) + keyCode;
    if (mcCache.has(cacheKey)) {
      mcCache.delete(cacheKey);
      return {
        ok: true,
        message: "task completed successfully",
        value: "",
      };
    } else {
      return {
        ok: false,
        message: "task not completed, cache-key not found",
        value: "",
      };
    }
  } catch (e) {
    return {
      ok: false,
      message: e.message ? e.message : "error deleting cache information",
      value: "",
    };
  }
}

export function clearCache(): CacheResponseType {
  try {
    // clear the cache object/dictionary (map)
    mcCache.clear();
    return {
      ok: true,
      message: "task completed successfully",
      value: "",
    };
  } catch (e) {
    return {
      ok: false,
      message: e.message ? e.message : "error clearing cache",
      value: "",
    };
  }
}
