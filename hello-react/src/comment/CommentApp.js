import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList'
import wrapWithLoadData from './HOC/wrapWithLoadData'
import './comment.css'
class CommentApp extends Component {

    constructor (props) {
        super(props)
        this.state = {
            comments: []
        }
    }

    handleSubmitComment (comment) {
        if (!comment) return;
        if (!comment.username) return alert("请输入用户名");
        if (!comment.content) return alert("请输入评论内容");
        this.state.comments.push(comment);
        this.setState({
            comments: this.state.comments
        })
        this.__saveComments(this.state.comments);
    }

    /**组件挂载时加载数据 */
    componentWillMount () {
        this.__loadComments()
    }

    __loadComments () {
        let comments = localStorage.getItem("comments");
        if (comments) {
            comments = JSON.parse(comments);
            this.setState({comments: comments})
        }
    }

    __saveComments (comments) {
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    handleDeleteComment (index) {
        const comments = this.state.comments;
        comments.splice(index, 1);
        this.setState({comments});
        // this.__saveComments(comments);
        this.props.saveData(comments);
    }
    render () {
        return (
            <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
                <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)}/>
            </div>
        )
    }
}

CommentApp = wrapWithLoadData(CommentApp, 'comments');
export default CommentApp;