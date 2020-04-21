require('dotenv/config');

export function read_list(str, sep=','){
    if(str){
        return str.split(sep)
    }
}


const env = {
    MAPBOX_ACCESS_TOKEN : process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000',
    MAPBOX_ACCESS_TOKEN_LIST: read_list(process.env.MAPBOX_ACCESS_TOKEN_LIST),
}




export default env