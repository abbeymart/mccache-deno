// Copyright 2022 mConnect.biz. All rights reserved. MIT license.

/**
 * Simple and Hash In-Memory Information Cache.
 *
 * ### Example Usage:
 *
 * Test case composition - see the test folder
 *
 * ```ts
 *  // simple-cache
 * import {
 *   deleteCache,
 *   getCache,
 *   setCache,
 * } from "https://deno.land/x/mccache@v0.3.1/mod.ts";
 *
 * // hash-cache
 * import {
 *   deleteHashCache,
 *   getHashCache,
 *   setHashCache,
 * } from "https://deno.land/x/mccache@v0.3.1/mod.ts";
 *
 * // See the test folder for different test cases / scenarios and usage
 *
 * ```
 *
 * To test the module run:
 * ```sh
 * deno run test.ts
 * ```
 *
 * @module
 */

// export module functions
export * from "./src/index.ts";
