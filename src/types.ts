export type ValueType =
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | string
  | number
  | Array<string>
  | Array<number>
  | boolean
  | Array<boolean>;

export interface ObjectType {
  [key: string]: ValueType;
}

export type CacheKeyType = string | Record<string, unknown> | number | ObjectType

export interface CacheParamsType<T> {
  key: CacheKeyType;
  value: T;
  expire?: number;
}

export interface HashCacheParamsType<T> {
  key: CacheKeyType;
  hash: CacheKeyType;
  value: T;
  expire?: number;
}

export type ByType = "hash" | "key"

export interface QueryHashCacheParamsType {
  key: CacheKeyType;
  hash: CacheKeyType;
  by?: ByType;
}

export interface CacheValueType<T> {
  value: T;
  expire: number;
}

export interface CacheResponseType<T> {
  ok: boolean;
  message: string;
  value?: T;
}

export type HashCacheValueType<T> = Map<string, CacheValueType<T>>;
