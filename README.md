# ✨Next Js Boilerplate with Authentication✨
## _Material Ui, Redux-Toolkit, Strapi, HttpOnly Cookie_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This is a starter Next Js Boilerplate with Authentication included. 
- ✨Next JS
- ✨Redux Toolkit
- ✨Material UI
- ✨Authentication
- ✨Http only Cookie

## ✨Getting Started✨

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api](http://localhost:3000/api). This endpoint can be edited in `pages/api`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## ✨Highlights✨

- Next JS Starter Project which contains Easy Authentication with Redux Toolkit
- Fully secure Authentication - Uses httponly cookie
- Used material-UI CSS frameworks
- You can use any backend framework you want but it can be attached with Strapi without any code changes in UI.

## ✨How to use Strapi as  backend✨

- You can start a Strapi server using docker. 
-- Create a file `docker-compose.yaml` inside an outside folder like ***backend***.  And paste the below content.
-- Navigate your terminal path in this location and use command - `docker-compose up`
-- Once done your backend server will start at port 1337. So open in browser - `http://localhost:1337/admin` and do the initial signup stuff.
-- Well done!!! Your backend server is up and running. Now you can play around with your next Js Project.
- By default this project uses strapi, which means if you use it you do not need to modify any frontend code to communicate with backend.

```docker
version: '3'
services:
  strapi:
    image: strapi/strapi
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_NAME: strapi
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: strapi
    volumes:
      - ./app:/srv/app
    ports:
      - '1337:1337'
    depends_on:
      - postgres

  postgres:
    image: postgres
    environment:
      POSTGRES_DB: strapi
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: strapi
    volumes:
      - ./data:/var/lib/postgresql/data

```


#### ✨References✨
- **[Material UI](https://mui.com/getting-started/usage/ "Material UI")**
- **[Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started "Redux Toolkit")**
- **[Strapi](https://strapi.io/documentation/developer-docs/latest/getting-started/introduction.html "Strapi")**
- **[NextJS](https://nextjs.org/docs/getting-started "NextJS")**
