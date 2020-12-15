import React, { Component } from 'react';
import './lottery.css'


class LotteryApp extends Component {
    constructor (props) {
        super(props)
        this.state = {
            awards: []
        }
    }

    render () {
        return (
            <div className="awards">
                <div className="first box">1</div>
                <div className="second box">2</div>
                <div className="third box">3</div>
                <div className="eight box">8</div>
                <div className="middle box">9</div>
                <div className="four box">4</div>
                <div className="seven box">7</div>
                <div className="six box">6</div>
                <div className="five box">5</div>
            </div>
        )
    }
}

export default LotteryApp;