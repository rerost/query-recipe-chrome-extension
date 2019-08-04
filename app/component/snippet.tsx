import * as React from 'react'

import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

interface Props {
  data: pb.type.ISnippet
  onClick: () => void
}

export default class Snippet extends React.Component<Props> {
  render() {
    const { data, onClick } = this.props;

    return (
      <div onClick={onClick}>
        <h4>{data.id}</h4>
      </div>
    )
  }
}
