import React, { Component } from 'react';
import PropType from 'prop-types'

class Title extends Component {
    static contextTypes = {
        themeColor: PropType.string
    }
    render () {
        return (
            <div>
                <h1 style={{color: this.context.themeColor}} >React.js 标题</h1>
            </div>
        )
    }
}

export default Title;