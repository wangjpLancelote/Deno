import React, {Component} from 'react';
import PropTypes from 'prop-types'

class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func, //参数校验 func
    }
    constructor () {
        super()
        this.state = {
            username: '',
            content: ''
        }
    }

    handleUsername (event) {
        this.setState({
            username: event.target.value
        })
    }
    /**失去焦点事件 */
    handleuserNameBlur (event) {
        this.__saveInLocalStorage(event.target.value);
    }

    __saveInLocalStorage (username) {
        localStorage.setItem("username", username);
    }
    handleContent (event) {
        this.setState({
            content: event.target.value
        })
    }

    submit () {
        if (this.props.onSubmit) {
            const { username, content } = this.state;
            this.props.onSubmit({username, content, created: new Date()})
        }
        //重置输入框
        this.setState({content: '', username: ''})
    }

    componentWillMount () {
        this.__loadUsernameInLocalStorage();
    }

    __loadUsernameInLocalStorage () {
        const username = localStorage.getItem("username");
        if (username) {
            this.setState({username});
        }
    }

    componentDidMount () {
        this.textarea.focus();
    }
    render () {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名: </span>
                    <div className="comment-field-input">
                        <input onBlur={this.handleuserNameBlur.bind(this)} value={this.state.username} onChange={this.handleUsername.bind(this)}/>
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容: </span>
                    <div className="comment-field-input">
                        <textarea ref={(textarea) => this.textarea = textarea} value={this.state.content} onChange={this.handleContent.bind(this)}></textarea>
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.submit.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}

export default CommentInput;
