import * as React from 'react'

import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

import Snippet from "./Snippet"

interface Props {
  data: null | Array<pb.type.ISnippet>
}

export default class Snippets extends React.Component<Props> {
  render() {
    if (this.props.data == null) {
      return null
    }

    return (
      this.props.data.map((s) => {
        if (s == null) {
          return
        }
        return <Snippet data={s}/>
      })
    )
  }
}
