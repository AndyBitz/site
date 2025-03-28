import type { AddQuery, CountQuery, GetQuery, RemoveQuery, SetQuery } from "@ronin/compiler";
import type { DeepCallable, ResultRecord } from "@ronin/syntax/queries";
import type { QueryHandlerOptions } from "ronin/types";
type ResolveSchema<TSchema, TUsing extends Array<string> | "all", TKey extends string> = TUsing extends "all" ? TSchema : TKey extends TUsing[number] ? TSchema : TSchema extends Array<any> ? Array<string> : string;
declare module "ronin" {
    export type Thought = ResultRecord & {
        externalLink: string;
        hidden: boolean;
        postedAt: Date;
        slug: string;
        text: object;
        title: string;
    };
    export type Thoughts = Array<Thought> & {
        moreBefore?: string;
        moreAfter?: string;
    };
    export type User = ResultRecord & {
        publicKey: object;
        publicUserId: string;
        username: string;
    };
    export type Users = Array<User> & {
        moreBefore?: string;
        moreAfter?: string;
    };
    export type Comment<TUsing extends Array<"thought" | "user"> | "all" = [
    ]> = ResultRecord & {
        text: string;
        thought: ResolveSchema<Thought, TUsing, "thought">;
        user: ResolveSchema<User, TUsing, "user">;
    };
    export type Comments<TUsing extends Array<"thought" | "user"> | "all" = [
    ]> = Array<Comment<TUsing>> & {
        moreBefore?: string;
        moreAfter?: string;
    };
    declare const add: {
        /* Add a single Thought record */
        thought: DeepCallable<AddQuery[keyof AddQuery], Thought | null>;
        /* Add a single User record */
        user: DeepCallable<AddQuery[keyof AddQuery], User | null>;
        /* Add a single Comment record */
        comment: DeepCallable<AddQuery[keyof AddQuery], Comment | null>;
    };
    declare const count: {
        /* Count a single Thought record */
        thought: DeepCallable<CountQuery[keyof CountQuery], Thought | null>;
        /* Count multiple Thought records */
        thoughts: DeepCallable<CountQuery[keyof CountQuery], Thoughts>;
        /* Count a single User record */
        user: DeepCallable<CountQuery[keyof CountQuery], User | null>;
        /* Count multiple User records */
        users: DeepCallable<CountQuery[keyof CountQuery], Users>;
        /* Count a single Comment record */
        comment: DeepCallable<CountQuery[keyof CountQuery], Comment | null>;
        /* Count multiple Comment records */
        comments: DeepCallable<CountQuery[keyof CountQuery], Comments>;
    };
    declare const get: {
        /* Get a single Thought record */
        thought: DeepCallable<GetQuery[keyof GetQuery], Thought | null>;
        /* Get multiple Thought records */
        thoughts: DeepCallable<GetQuery[keyof GetQuery], Thoughts>;
        /* Get a single User record */
        user: DeepCallable<GetQuery[keyof GetQuery], User | null>;
        /* Get multiple User records */
        users: DeepCallable<GetQuery[keyof GetQuery], Users>;
        /* Get a single Comment record */
        comment: DeepCallable<GetQuery[keyof GetQuery], Comment | null>;
        /* Get multiple Comment records */
        comments: DeepCallable<GetQuery[keyof GetQuery], Comments>;
    };
    declare const remove: {
        /* Remove a single Thought record */
        thought: DeepCallable<RemoveQuery[keyof RemoveQuery], Thought | null>;
        /* Remove multiple Thought records */
        thoughts: DeepCallable<RemoveQuery[keyof RemoveQuery], Thoughts>;
        /* Remove a single User record */
        user: DeepCallable<RemoveQuery[keyof RemoveQuery], User | null>;
        /* Remove multiple User records */
        users: DeepCallable<RemoveQuery[keyof RemoveQuery], Users>;
        /* Remove a single Comment record */
        comment: DeepCallable<RemoveQuery[keyof RemoveQuery], Comment | null>;
        /* Remove multiple Comment records */
        comments: DeepCallable<RemoveQuery[keyof RemoveQuery], Comments>;
    };
    declare const set: {
        /* Set a single Thought record */
        thought: DeepCallable<SetQuery[keyof SetQuery], Thought | null>;
        /* Set multiple Thought records */
        thoughts: DeepCallable<SetQuery[keyof SetQuery], Thoughts>;
        /* Set a single User record */
        user: DeepCallable<SetQuery[keyof SetQuery], User | null>;
        /* Set multiple User records */
        users: DeepCallable<SetQuery[keyof SetQuery], Users>;
        /* Set a single Comment record */
        comment: DeepCallable<SetQuery[keyof SetQuery], Comment | null>;
        /* Set multiple Comment records */
        comments: DeepCallable<SetQuery[keyof SetQuery], Comments>;
    };
    declare const createSyntaxFactory: (options: QueryHandlerOptions | (() => QueryHandlerOptions)) => {
        add: typeof add;
        count: typeof count;
        get: typeof get;
        remove: typeof remove;
        set: typeof set;
    };
    export default function (options: QueryHandlerOptions | (() => QueryHandlerOptions)): {
        add: typeof add;
        count: typeof count;
        get: typeof get;
        remove: typeof remove;
        set: typeof set;
    };
}
