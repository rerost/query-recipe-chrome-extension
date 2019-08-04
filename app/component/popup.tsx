import * as React from 'react'

import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

import Snippets from "./Snippets"
import SnippetDescription from "./snippet_description"
import SearchRPC from "../rpc/search"

interface Props {
}

interface State {
  snippets: Array<pb.type.ISnippet>
  selected: null | number // TODO(@rerost) Only integer
}

export default class Popup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { snippets: [], selected: null }
  }

  changeText(e: any) {
    if (e.keyCode !== 13) {
      return
    }

    e.preventDefault();

    let keyword = e.target.value
    let request = new pb.SearchRequest
    request.keyword = keyword
    let client = new SearchRPC("http://localhost:3001")
    client.search(request).then((result: pb.SearchResult) => {
      console.log(result)
      this.setState({
        snippets: result.hits,
      })
    })
  }

  setDescription(index: number) {
    this.setState({
      selected: index,
    })
  }

  render() {
    const { selected, snippets } = this.state;
    return (
      <div>
        <h3>QueryRecipe</h3>
        <input onKeyDown={this.changeText.bind(this)} />
        <Snippets setDescription={this.setDescription.bind(this)} data={snippets} />
        {selected != null ?
          <SnippetDescription selected={snippets[selected]} /> :
          null
        }
      </div>
    )
  }
}
