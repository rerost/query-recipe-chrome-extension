import * as React from 'react'
import { Converter } from 'showdown'

import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

interface Props {
  selected: pb.type.ISnippet
}

const converter:any = new Converter()
converter.setFlavor('github');

export default class SnippetDescription extends React.Component<Props> {
  render() {
    const { selected } = this.props

    const html:any = converter.makeHtml(selected.document)

    return (
      <div>
        <title>{selected.id}</title>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </div>
    )
  }
}
