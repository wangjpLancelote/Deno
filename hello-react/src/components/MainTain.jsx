
import { Component } from 'react'

import {Header} from './Header';
import ReactDOM from 'react-dom';
class MainTain extends Component {
    render () {
        return (
            <div>
                <Header/>
            </div>
        )
    }
}

ReactDOM.render(
    <MainTain/>,
    document.getElementById('root')
)

export default MainTain;