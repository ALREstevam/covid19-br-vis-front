import env from '../env/envVars'

export async function get(url, onSuccess, onFail, parser){
    fetch(url, {mode: 'cors'})
        .then(res => res.json())
        .then((data) => onSuccess(parser(data)))
        .catch((data)=>{
            console.error(data)
            onFail && onFail(data)
        })
}


export async function getCitiesBrJson(onSuccess, onFail, parser=(data)=>data){
    const url = `${env.BACKEND_URL}/api/v1/br/cities?response_type=json`
    return get(url, onSuccess, onFail, parser)
}

export async function getCitiesBrGeoJson(onSuccess, onFail, parser=(data)=>data){
    const url = `${env.BACKEND_URL}/api/v1/br/cities?response_type=geojson`
    return get(url, onSuccess, onFail, parser)
} 

