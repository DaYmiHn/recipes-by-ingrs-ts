
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    newses(): News[] | Promise<News[]>;
    news(id: string): News | Promise<News>;
}

export interface News {
    id: string;
    article?: Article;
    user?: User;
    isModer: boolean;
}

export interface User {
    id: string;
    email: string;
}

export interface Article {
    id: string;
    title?: string;
    text?: string;
}
