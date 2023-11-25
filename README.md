# mccache | github.com/abbeymart/mccache-deno

- Simple and Hash In-Memory Information Cache
- Simple Cache: key-value pair storage
- Hash Cache: hash-hash-value storage
- See the test folder for test cases / scenarios and usage

## API - Simple Cache

- Simple Cache is key-value caching for number, string and object values
- It exposes the following functions: setCache, getCache, deleteCache and
  clearCache

## API - Hash Cache

- Hash Cache: hash-key-value storage for caching number, string and object
  values
- It exposes the following functions: setHashCache, getHashCache,
  deleteHashCache and clearHashCache

## Usage

```ts
// simple-cache
import {
  deleteCache,
  getCache,
  setCache,
} from "https://deno.land/x/mccache@v0.3.0/mod.ts";

// hash-cache
import {
  deleteHashCache,
  getHashCache,
  setHashCache,
} from "https://deno.land/x/mccache@v0.3.0/mod.ts";

// See the test folder for different test cases / scenarios and usage
```
