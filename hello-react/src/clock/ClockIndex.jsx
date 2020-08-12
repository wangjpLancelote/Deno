import React, { Component } from 'react';
import Clock from './Clock'

class ClockIndex extends Component {
    constructor () {
        super()
        this.state = { isShowClock: true }
    }

    handleShowOrHide () {
        this.setState({
            isShowClock: !this.state.isShowClock
        })
    }
    render () {
        return (
            <div>
                { this.state.isShowClock ? <Clock/> : null }
                <button onClick={this.handleShowOrHide.bind(this)}>
                    切换
                </button>
            </div>
        )
    }
}

export default ClockIndex;