import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { slugify } from "../helpers";
import commentsService from "../services/commentsService";
import loginService from "../services/loginService";

class CommentsBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formComment: "",
      comments: []
    };
  }

  updateComments = () => {
    const { recipe } = this.props;
    const comments = commentsService.get(slugify(recipe.title));
    this.setState({
      comments
    });
  };

  componentDidMount = () => {
    this.updateComments();
  };

  renderComment = comment => (
    <div key={comment.date} className="Comment media text-muted pt-3">
      <FontAwesomeIcon className="mr-2" size="3x" icon="user-circle" />
      <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong className="d-block text-gray-dark">@{comment.author}</strong>
        {comment.text}
      </p>
      {/* Icone deve aparecer somente quando o comentario for do usuario logado */}
      {loginService.isLogged() &&
        loginService.getUser().username === comment.author && (
          <FontAwesomeIcon
            icon="trash"
            onClick={() => {
              commentsService.delete(slugify(this.props.recipe.title), comment);
              this.updateComments();
            }}
          />
        )}
    </div>
  );

  handleFormSubmit = e => {
    e.preventDefault();
    const { recipe } = this.props;
    const recipeSlug = slugify(recipe.title);
    commentsService.insert(recipeSlug, { text: this.state.formComment });
    this.setState({
      formComment: ""
    });
    this.updateComments();
  };

  render() {
    return (
      <div className="text-left">
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">Comments</h6>
          {this.state.comments.map(comment => this.renderComment(comment))}
        </div>

        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Comment</label>
            <textarea
              disabled={!loginService.isLogged()}
              value={this.state.formComment}
              onChange={e => this.setState({ formComment: e.target.value })}
              required="required"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Insert your comment here"
            />
          </div>
          <button
            disabled={!loginService.isLogged()}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CommentsBlock;
