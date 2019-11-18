import React, {Component} from 'react'
import {createSuggestion, getAllSuggestions} from '../../graphql'
import {flowRight as compose} from 'lodash'
import {graphql} from 'react-apollo'

class NewSuggestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      createSuggestionError: null
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const {message} = this.state

    this.props.createSuggestion({
      variables: {message},
      refetchQueries: [{query: getAllSuggestions}]
    }).then(() => {
      this.setState({
        createSuggestionError: null,
        message: ''
      })
    }).catch(({message}) => {
      this.setState({
        createSuggestionError: {message}
      })
    })
  }

  render() {
    const {createSuggestionError} = this.state
    return (
      <div>
        {
          createSuggestionError ? (
            <p>{createSuggestionError.message}</p>
          ) : (null)
        }
        <form onSubmit={this.onSubmit}>
          <input type='text' id='message' onChange={this.onChange} value={this.state.message}/>
          <button>Add Suggestion</button>
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(createSuggestion, {name: 'createSuggestion'})
)(NewSuggestion)