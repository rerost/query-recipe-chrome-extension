import * as React from 'react'

import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

interface Props {
  data: pb.type.ISnippet
}

export default class Snippet extends React.Component<Props> {
}
