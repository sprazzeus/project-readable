import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getPostRequest,
  getCommentsRequest,
  votePostRequest
} from '../../actions/index.js'
import PostContent from './components/PostContent.js'
import CommentCard from '../comment/components/CommentCard.js'
import AddComment from '../comment/AddComment.js'
import { Box } from 'rebass'
import { WHITE } from '../../styles/colors'

class PostDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getPostRequest(id)
    this.props.getCommentsRequest(id)
  }

  handleVote = (id, voteOption) => {
    this.props.votePostRequest(id, voteOption)
  }

  compareRecency = (a, b) => b.timestamp - a.timestamp

  render() {
    const { post, comments } = this.props
    const sortedComments = [].concat(comments.sort(this.compareRecency))
    return (
      <Box>
        <Box p={3} bg={WHITE}>
          <PostContent post={post} handleVote={this.handleVote} isDetail />
        </Box>
        <Box mt={2}>
          {sortedComments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
          <AddComment parentId={post.id} />
        </Box>
      </Box>
    )
  }
}
const mapStateToProps = ({ post, comments }) => {
  const commentsArr = Object.keys(comments).map(key => comments[key])
  return {
    post,
    comments: commentsArr
  }
}

export default connect(mapStateToProps, {
  getPostRequest,
  getCommentsRequest,
  votePostRequest
})(PostDetail)
