import env from '../env/envVars'

function choose(lst){
    return lst[Math.floor(Math.random() * lst.length)];
}

function selectRandomlyOrDefault(lst, def){
    if(lst && lst.length > 0){
        return choose(lst)
    }
    return def

}

/**
 * A MapBox account allows 50000 map loads on free tier, as this project doesn't make any
 * money and shows critical information for the current moment (COVID-19 pandemic) if the
 * limit is reached, multiple MapBox accounts and tokens can be created and used randomly 
 * (i hope).
 */
export function randomMapBoxAccessToken(){
    return selectRandomlyOrDefault(env.MAPBOX_ACCESS_TOKEN_LIST, env.MAPBOX_ACCESS_TOKEN_LIST.length)
}