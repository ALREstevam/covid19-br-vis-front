import React, { Component } from 'react'

export default class Lock extends Component {
    constructor(props){
        super(props)
        this.state = {
            locked: this.props.locked,
        }
    }

    lock(){
        this.setState({
            locked: true
        })
        this.props.onLocked && this.props.onLocked()
    }

    unlock(){
        this.setState({
            locked: false
        })
        this.props.onUnlocked && this.props.onUnlocked()
    }

    toggle(){
        this.state.locked ? this.unlock() : this.lock()
    }
    
    render() {
        return (
            <div className='lock'>
                <span>{this.props.title}</span><br/>
                <span>{this.state.locked ? "🔒" : "🔓"}</span><br/>
                <span>{this.state.locked ? this.props.textOnLocked : this.props.textOnUnlocked}</span>
            </div>
        )
    }
}
