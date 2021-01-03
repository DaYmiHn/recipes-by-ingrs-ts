<h1 align="center">Domchanki</h1>

Aggregator site for the selection of recipes by ingredients.

---

Stack:
- Back - Nest.JS (TypeScript) + MongoDB + GraphQL + RxJS
- Front - ReactJS (TypeScript) + Redux + ApolloGraphQL


## [View a demo](http://savin-denis.herokuapp.com/)


<p align="center">
<img src="https://i.imgur.com/wAjxFYl.gif">
</p>

# Installation

`cd back && npm i && npm run dev`

`cd front && npm i && npm start`

## Configurate

### Backend configurate

To configure the backend, you just need to change the strings for connecting to the database.

```js
// back/src/app.module.ts
. . .
    MongooseModule.forRoot(process.env.NODE_ENV == 'production' ? process.env.MONGO_DB_URL: 'mongodb://localhost:27017/domchanski' ), <-- edit this line 
. . . 
```


```js
// for deploy rename "back/.env.sample" to "back/.env"
MONGO_DB_URL=mongodb://.................................  <-- and edit this line 
```

### Frontend configurate

To configure the frontend, you need to change the url backend server.

```js
// front/src/index.tsx
. . .
      uri: process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL+'graphql' :'http://localhost:5000/graphql',<-- edit this line 
. . . 
```


```js
//  front/src/components/axios.tsx
  baseURL: process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:5000/',<-- and edit this line 
```
```js
// for deploy rename "front/.env.sample" to "front/.env"
REACT_APP_API_URL=https://api-localhost.ru/  <-- and edit this line 
```
# Project functionality 

| Name       | Stage   | Description                             | 
| ---------- | ------ | ---------------------------------- | 
| Новости | `work` | Receives an array of Lorem news through GraphQL |
| Поиск | `in dev` |       Will search everything throughout the site                     | 
| Рецепты | `work` | Selects and filters recipes based on added ingredients                          | 
| Ингредиенты | `work` |  Search and add ingredients                          | 
| Профиль | `in dev` | So far, nothing but a cat and a little information about the user                          | 
| Выход| `work` | Log out of profile                          | 
| Ещё | `in dev` | . . .                          | 


## Todo-list

### Column Name
- ✅ Main site functionality
- ⬜️ Site search

