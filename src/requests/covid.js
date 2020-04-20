export async function get(url, onSuccess, onFail, parser){
    fetch(url)
        .then(res => res.json())
        .then((data) => onSuccess(parser(data)))
        .catch((data)=>{
            console.error(data)
            onFail && onFail(data)
        })
}


export async function getCitiesBrJson(onSuccess, onFail, parser=(data)=>data){
    const url = 'http://127.0.0.1:5000/br/cities?response_type=json'
    return get(url, onSuccess, onFail, parser)
}

export async function getCitiesBrGeoJson(onSuccess, onFail, parser=(data)=>data){
    const url = 'http://localhost:5000/br/cities?response_type=geojson'
    return get(url, onSuccess, onFail, parser)
} 

