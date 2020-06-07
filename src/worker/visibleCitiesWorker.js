export default () => {
    this.addEventListener("message", e => {
        if(!e) return 

        console.log('MESSAGE FROM WORKER!!!')
        console.log(e.data)
        
        postMessage({
            'message': 'result'
        });
    })
}