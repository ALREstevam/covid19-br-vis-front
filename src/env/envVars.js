require('dotenv/config');

const env = {
    MAPBOX_ACCESS_TOKEN : process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'
}

export default env