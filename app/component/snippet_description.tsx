import * as React from 'react'

import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

interface Props {
  selected: pb.type.ISnippet
}

export default class SnippetDescription extends React.Component<Props> {
}
