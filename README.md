# @mconnect/mccache | github.com/abbeymart/@mconnect/mccache-deno

- In-Memory data/information cache for CRUD and other operations
- Simple Cache: key-value pair storage
- Hash Cache: key-hash-value storage
- See the test folder for different test cases / scenarios and usage

## API - Simple Cache

- Simple Cache is key-value caching for number, string and object values
- It exposes the following functions: setCache(), getCache, deleteCache and clearCache

## API - Hash Cache

- Hash Cache: key-hash-value storage for caching number, string and object values
- It exposes the following functions: setHashCache(), getHashCache, deleteHashCache and clearHashCache

## Usage

```ts
// simple-cache
import { assertEquals, assertNotEquals, postTestResult } from "https://deno.land/x/mccache/mod.ts";

// hash-cache
import { assertEquals, assertNotEquals, postTestResult } from "https://deno.land/x/mccache/mod.ts";



```
