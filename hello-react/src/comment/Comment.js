import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Comment extends Component {

    static propTypes = {
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number
    }

    constructor () {
        super()
        this.state = {
            timeString: ''
        }
    }

    componentWillMount () {
        this.__updateTimeString();
        this._timer = setInterval(this.__updateTimeString.bind(this), 5000);
    }

    componentWillUnmount () {
        clearInterval(this._timer);
    }

    __updateTimeString () {
        const comment = this.props.comment;
        const duration = (+Date.now() - Number(comment.created)) / 1000
        this.setState({
            timeString: duration > 60 ?
                `${Math.round(duration/ 60)} 分钟前` :
                `${Math.round(Math.max(duration, 1))} 秒前`
        })
    }

    handleDeleteComment () {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index)
        }
    }
    render () {
        return (
            <div className="comment">
                <div className="comment-user">
                    <span>{this.props.comment.username}: </span>
                </div>
                <p>{this.props.comment.content}</p>
                <div>
                    <span>{this.state.timeString}</span>
                </div>
                <div onClick={this.handleDeleteComment.bind(this)} style={{"color": "red", "cursor": 'pointer'}}>删除</div>
            </div>
        )
    }
}

export default Comment;