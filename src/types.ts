import { ValueType } from "../deps.ts";

export interface ObjectType {
    [key: string]: ValueType;
}

export type CacheKeyType = string | Record<string, unknown> | number | ObjectType

export interface CacheParamsType<T extends ValueType> {
    key: CacheKeyType;
    value: T;
    expire?: number;
}

export interface HashCacheParamsType<T extends ValueType> {
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

export interface CacheValueType<T extends ValueType> {
    value: T;
    expire: number;
}

export interface CacheResponseType<T extends ValueType> {
    ok: boolean;
    message: string;
    value?: T;
}

export type HashCacheValueType<T extends ValueType> = Map<string, CacheValueType<T>>;
