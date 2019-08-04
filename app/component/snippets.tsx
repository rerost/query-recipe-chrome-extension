import * as React from 'react'

import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

import Snippet from "./Snippet"

interface Props {
  data: Array<pb.type.ISnippet>
  setDescription: (index:number) => void
}

export default class Snippets extends React.Component<Props> {
  render() {
    return (
      this.props.data.map((s, index) => {
        if (s === null) {
          return
        }
        if (s.id === null) {
          return // Not reachable(Api return id)
        }
        return <Snippet key={s.id} data={s} onClick={() => this.props.setDescription(index)}/>
      })
    )
  }
}
