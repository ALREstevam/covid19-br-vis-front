import React from 'react'

const SimpleLink = ({ children, url, text, style, target='_blank'}) => {

    if(children){
        return (
            <a href={url} style={style} target={target}>
                {children}
            </a>
        )
    }
    if(text){
        return (<a href={url} style={style} target={target}>{text}</a>)
    }
    return <a href={url} style={style} target={target}>{url}</a>
}
export default SimpleLink