import React, {Component} from 'react'
import {getAllSuggestions} from '../../graphql'
import {flowRight as compose} from 'lodash'
import {graphql} from 'react-apollo'
import NewSuggestion from './NewSuggestion'

class Suggestions extends Component {
  render() {
    const {getAllSuggestions} = this.props

    if (getAllSuggestions.loading) {
      return null
    } else if (getAllSuggestions.error) {
      return (
        <p>Error: {getAllSuggestions.error.message}</p>
      )
    } else {
      const {getAllSuggestions: suggestions} = getAllSuggestions
      return (
        <div>
          <ul>
            {
              suggestions.map((suggestion) => {
                return (
                  <li key={suggestion.id}>{suggestion.message}</li>
                )
              })
            }
          </ul>
          <NewSuggestion/>
        </div>
      )
    }
  }
}

export default compose(
  graphql(getAllSuggestions, {name: 'getAllSuggestions'})
)(Suggestions)