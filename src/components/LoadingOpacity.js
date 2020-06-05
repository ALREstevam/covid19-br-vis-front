import React from 'react'
import Spinner from './Spinner'

export default function LoadingOpacity({ loading, text, style }) {
    return (
        <div style={{...style}} className={loading ? 'loadingVisible' : 'loadingInvisible'}>
            {
                loading && (
                    <div className='opacityLoaderText'>
                        <Spinner/>
                        {text && <span>{text}</span>}
                    </div>
                )
            }
        </div>
    )
}