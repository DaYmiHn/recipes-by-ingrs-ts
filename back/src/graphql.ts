
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface NewsInput {
    title?: string;
    body?: string;
    userId?: string;
}

export interface IQuery {
    newses(): News[] | Promise<News[]>;
    news(id: string): News | Promise<News>;
}

export interface IMutation {
    createNews(input?: NewsInput): News | Promise<News>;
}

export interface News {
    id: string;
    title?: string;
    body?: string;
    userId: string;
}
