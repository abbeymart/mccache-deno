/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14 | Refactored to deno-module: 2022-11-19
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: hashCache testing
 */

import {
  assertEquals,
  delay,
  mcTest,
  ObjectType,
  postTestResult,
} from "../test_deps.ts";

import {
  clearHashCache,
  deleteHashCache,
  getHashCache,
  HashCacheParamsType,
  QueryHashCacheParamsType,
  setHashCache,
} from "../src/index.ts";

// test data
const cacheValue: ObjectType = {
    firstName: "Abi",
    lastName: "Akindele",
    location: "Toronto-Canada",
  },
  cacheKey = JSON.stringify({ name: "Tab1", location: "Toronto" }),
  expiryTime = 5, // in seconds
  hashKey = JSON.stringify({ hash1: "Hash1", hash2: "Hash2" });

(async () => {
  console.log("\nHASH-CACHE-TESTING-START\n");
  await mcTest({
    name: "should set and return valid cacheValue",
    testFunc: () => {
      const cacheParams: HashCacheParamsType<ObjectType> = {
        key: cacheKey,
        hash: hashKey,
        value: cacheValue,
        expire: expiryTime,
      };
      const cacheRes = setHashCache(cacheParams);
      if (cacheRes.ok) {
        assertEquals(cacheRes.ok, true);
        assertEquals(cacheRes.value as ObjectType, cacheValue);
        assertEquals(cacheRes.message, "task completed successfully");
        // get cache info
        const getCacheParams: QueryHashCacheParamsType = {
          key: cacheKey,
          hash: hashKey,
        };
        const res = getHashCache(getCacheParams);
        assertEquals(res.ok, true);
        assertEquals(res.value as ObjectType, cacheValue);
        assertEquals(res.message, "task completed successfully");
      } else {
        assertEquals(cacheRes.ok, false);
      }
    },
  });

  await mcTest({
    name: "should clear the cache and return nil/empty value",
    testFunc: () => {
      const cacheRes = clearHashCache();
      if (cacheRes.ok) {
        assertEquals(cacheRes.ok, true);
        assertEquals(cacheRes.message, "task completed successfully");
        // get cache info
        const getCacheParams: QueryHashCacheParamsType = {
          key: cacheKey,
          hash: hashKey,
        };
        const res = getHashCache(getCacheParams);
        assertEquals(res.ok, false);
        assertEquals(res.message, "cache info does not exist");
      } else {
        assertEquals(cacheRes.ok, false);
      }
    },
  });

  await mcTest({
    name:
      "should set and return valid cacheValue -> before timeout/expiration)",
    testFunc: () => {
      // change the expiry time to 2 seconds
      const cacheParams: HashCacheParamsType<ObjectType> = {
        key: cacheKey,
        hash: hashKey,
        value: cacheValue,
        expire: 2,
      };
      const cacheRes = setHashCache(cacheParams);
      if (cacheRes.ok) {
        assertEquals(cacheRes.ok, true);
        assertEquals(cacheRes.value as ObjectType, cacheValue);
        assertEquals(cacheRes.message, "task completed successfully");
        const getCacheParams: QueryHashCacheParamsType = {
          key: cacheKey,
          hash: hashKey,
        };
        const res = getHashCache(getCacheParams);
        assertEquals(res.ok, true);
        assertEquals(res.value as ObjectType, cacheValue);
        assertEquals(res.message, "task completed successfully");
      } else {
        assertEquals(cacheRes.ok, false);
      }
    },
  });

  await mcTest({
    name: "should return nil/undefined value after timeout/expiration",
    testFunc: async () => {
      await delay(3000);
      const getCacheParams: QueryHashCacheParamsType = {
        key: cacheKey,
        hash: hashKey,
      };
      const res = getHashCache(getCacheParams);
      assertEquals(res.ok, false);
      assertEquals(!res.value, true );
      assertEquals(res.message, "cache expired and deleted");
    },
  });

  await mcTest({
    name:
      "should set and return valid cacheValue (repeat prior to deleteCache testing",
    testFunc: () => {
      // change the expiry time to 10 seconds
      const cacheParams: HashCacheParamsType<ObjectType> = {
        key: cacheKey,
        hash: hashKey,
        value: cacheValue,
        expire: 10,
      };
      const cacheRes = setHashCache(cacheParams);
      if (cacheRes.ok) {
        assertEquals(cacheRes.ok, true);
        assertEquals(cacheRes.value as ObjectType, cacheValue);
        assertEquals(cacheRes.message, "task completed successfully");
        const getCacheParams: QueryHashCacheParamsType = {
          key: cacheKey,
          hash: hashKey,
        };
        const res = getHashCache(getCacheParams);
        assertEquals(res.ok, true);
        assertEquals(res.value as ObjectType, cacheValue);
        assertEquals(res.message, "task completed successfully");
      } else {
        assertEquals(cacheRes.ok, false);
      }
    },
  });

  await mcTest({
    name: "should delete the cache and return nil/undefined value",
    testFunc: () => {
      const delCacheParams: QueryHashCacheParamsType = {
        key: cacheKey,
        hash: hashKey,
      };
      const cacheRes = deleteHashCache(delCacheParams);
      if (cacheRes.ok) {
        assertEquals(cacheRes.ok, true);
        assertEquals(cacheRes.message, "task completed successfully");
        const getCacheParams: QueryHashCacheParamsType = {
          key: cacheKey,
          hash: hashKey,
        };
        const res = getHashCache(getCacheParams);
        assertEquals(res.ok, false);
        assertEquals(!res.value, true );
        assertEquals(res.message, "cache info does not exist");
      } else {
        assertEquals(cacheRes.ok, false);
      }
    },
  });

  postTestResult();
  console.log("\nHASH-CACHE-TESTING-END\n");
})();
