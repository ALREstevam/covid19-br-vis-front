# COVID-19 Brazil - data visualization

Using data from [github.com/wcota/covid19br](https://github.com/wcota/covid19br) this project intends to visually show data about the **COVID-19**  in Brazil.

**🌐 Website**: https://alrestevam.github.io/covid19-br-vis-front/

**Note:** this is a personal project  and I'm not a specialist either in data visualization or in disease spreading, **so please take it with a grain of salt**.

![br1](README.assets/br1.gif)



![br2](README.assets/br2.gif)



![sp](README.assets/sp.gif)



This front-end was developed using *React.js* and *MapBox*.

## Running it

1. Clone this repository.
2. Be sure to have [Node.js](https://nodejs.org/en/) installed and [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) (I'm using yarn for the examples).
3. Enter the cloned repo.

```sh
cd covid19-br-vis-front
```

4. Change the file name `.env.sample` to `.env`, then open the file and complete the variables
   1. `REACT_APP_MAPBOX_ACCESS_TOKEN` is a token for using the map, you can get one at [mapbox](https://www.mapbox.com/).
   2. `REACT_APP_BACKEND_URL` is the backend's url without the forward slash "`/`" at the end
5. Run:

```sh
yarn # to install the repositories
yarn start # to start the development server
# the development server will be available at`localhost:3000`
```





## Deploy

Currently this project's front-end is being hosted with gh-pages.

For making a new build and deploying it to github pages, run:

```sh
yarn deploy
```





## Default README from  `create-react-app` (more about commands and React.JS)

[README-REACT.md](README-REACT.md)





# Back-end

[github.com/ALREstevam/covid19-br-vis-back](https://github.com/ALREstevam/covid19-br-vis-back)







