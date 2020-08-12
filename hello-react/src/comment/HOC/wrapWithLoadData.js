import React, { Component } from "react";

export default (WrappedComponent, name) => {
    class LocalStorageActions extends Component {
        constructor () {
            super()
            this.state = {data: null}
        }

        componentWillMount () {
            let data = localStorage.getItem(name);
            try {
                this.setState({data: JSON.parse(data)})
            } catch (e) {
                //解析出错
                this.setState({data})
            }
        }

        saveData (data) {
            try {
                localStorage.setItem(name, JSON.stringify(data));
            } catch (e) {
                localStorage.setItem(name, `${data}`)
            }
        }

        render () {
            //返回传入的组件，并且添加一些组件参数 {...this.props}指的是将组件原本的参数继续传递给被包装的组件
            return (
                <WrappedComponent data={this.state.data} saveData={this.saveData.bind(this)} {...this.props}/>
            )
        }
    }
}