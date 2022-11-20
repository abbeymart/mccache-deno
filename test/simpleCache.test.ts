/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14 | Refactored to deno-module: 2022-11-19
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: simpleCache testing
 */

import { assertEquals, delay, mcTest, postTestResult } from "../test_deps.ts";

import {
  CacheParamsType,
  clearCache,
  deleteCache,
  getCache,
  ObjectType,
  setCache,
} from "../src/index.ts";

// test data
const cacheValue: ObjectType = {
    firstName: "Abi",
    lastName: "Akindele",
    location: "Toronto-Canada",
  },
  cacheKey = JSON.stringify({ name: "Tab1", location: "Toronto" }),
  expiryTime = 5; // in seconds

// delay testing (async)

(async () => {
  console.log("\nSIMPLE-CACHE-TESTING-START\n");
  await mcTest({
    name: "should set and return valid cacheValue",
    testFunc: () => {
      const cacheParams: CacheParamsType = {
        key: cacheKey,
        value: cacheValue,
        expire: expiryTime,
      };
      const cacheRes = setCache(cacheParams);
      if (cacheRes.ok) {
        assertEquals(cacheRes.ok, true);
        assertEquals(cacheRes.value, cacheValue);
        assertEquals(cacheRes.message, "task completed successfully");
        // get cache info
        const res = getCache(cacheKey);
        assertEquals(res.ok, true);
        assertEquals(res.value, cacheValue);
        assertEquals(res.message, "task completed successfully");
      } else {
        assertEquals(cacheRes.ok, false);
      }
    },
  });

  await mcTest({
    name: "should clear the cache and return nil/empty value",
    testFunc: () => {
      const cacheRes = clearCache();
      if (cacheRes.ok) {
        assertEquals(cacheRes.ok, true);
        assertEquals(cacheRes.message, "task completed successfully");
        // get cache info
        const res = getCache(cacheKey);
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
      const cacheParams: CacheParamsType = {
        key: cacheKey,
        value: cacheValue,
        expire: 2,
      };
      const cacheRes = setCache(cacheParams);
      if (cacheRes.ok) {
        assertEquals(cacheRes.ok, true);
        assertEquals(cacheRes.value, cacheValue);
        assertEquals(cacheRes.message, "task completed successfully");
        const res = getCache(cacheKey);
        assertEquals(res.ok, true);
        assertEquals(res.value, cacheValue);
        assertEquals(res.message, "task completed successfully");
      } else {
        assertEquals(cacheRes.ok, false);
      }
    },
  });

  await mcTest({
    name: "should return nil value after timeout/expiration",
    testFunc: async () => {
      await delay(3000);
      const res = getCache(cacheKey);
      assertEquals(res.ok, false);
      assertEquals(res.value, "");
      assertEquals(res.message, "cache expired and deleted");
    },
  });

  await mcTest({
    name:
      "should set and return valid cacheValue (repeat prior to deleteCache testing",
    testFunc: () => {
      // change the expiry time to 10 seconds
      const cacheParams: CacheParamsType = {
        key: cacheKey,
        value: cacheValue,
        expire: 10,
      };
      const cacheRes = setCache(cacheParams);
      if (cacheRes.ok) {
        assertEquals(cacheRes.ok, true);
        assertEquals(cacheRes.value, cacheValue);
        assertEquals(cacheRes.message, "task completed successfully");
        const res = getCache(cacheKey);
        assertEquals(res.ok, true);
        assertEquals(res.value, cacheValue);
        assertEquals(res.message, "task completed successfully");
      } else {
        assertEquals(cacheRes.ok, false);
      }
    },
  });

  await mcTest({
    name: "should delete the cache and return nil/empty value",
    testFunc: () => {
      const cacheRes = deleteCache(cacheKey);
      if (cacheRes.ok) {
        assertEquals(cacheRes.ok, true);
        assertEquals(cacheRes.message, "task completed successfully");
        const res = getCache(cacheKey);
        assertEquals(res.ok, false);
        assertEquals(res.value, "");
        assertEquals(res.message, "cache info does not exist");
      } else {
        assertEquals(cacheRes.ok, false);
      }
    },
  });

  postTestResult();
  console.log("\nSIMPLE-CACHE-TESTING-END\n");
})();
