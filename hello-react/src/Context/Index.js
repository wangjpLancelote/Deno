import React, { Component } from 'react';
import Main from './Main'
import Header from './Header'
import PropType from 'prop-types'

class Index extends Component {
    /**如果要使用context对象，就必须添加 childContextTypes */
    static childContextTypes = {
        themeColor: PropType.string
    }
    constructor () {
        super()
        this.state = {
            themeColor: "red"
        }
    }

    componentWillMount () {
        this.setState({themeColor: 'green'})
    }

    getChildContext () {
        return { themeColor: this.state.themeColor }
    }
    render () {
        return(
            <div>
                <Header/>
                <Main/>
            </div>
        )
    }
}
export default Index;
