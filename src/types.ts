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

export type ObjectKeyType = string | Record<string, unknown> | number;

export interface CacheParamsType {
  key: ObjectKeyType;
  value: ValueType | ObjectType;
  expire?: number;
}

export interface HashCacheParamsType {
  key: ObjectKeyType;
  hash: ObjectKeyType;
  value: ValueType | ObjectType;
  expire?: number;
}

export type ByType = "hash" | "key";

export interface QueryHashCacheParamsType {
  key: ObjectKeyType;
  hash: ObjectKeyType;
  by?: ByType;
}

export interface CacheValueType {
  value?: ValueType;
  expire?: number;
}

export interface CacheResponseType {
  ok: boolean;
  message: string;
  value: ValueType;
}

export type HashCacheValueType = Map<string, CacheValueType>;
