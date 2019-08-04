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
  keyword: string
}

export default class Popup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { snippets: [], selected: null, keyword: ""}
  }

  onEnter(e: any) {
    if (e.keyCode !== 13) {
      return
    }

    e.preventDefault();

    this.search()
  }

  search() {
    this.setState({
      snippets: [],
    })

    let keyword = this.state.keyword
    console.log(keyword)
    let request = new pb.SearchRequest
    request.keyword = keyword
    let client = new SearchRPC("http://localhost:3001")
    client.search(request).then((result: pb.SearchResult) => {
      this.setState({
        snippets: result.hits,
      })
    })
  }

  onChangeText(e:any) {
    console.log(e.target)
    this.setState({
      keyword: e.target.value,
    })
    return true
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
        <div style={{display: 'flex'}}>
          <input onKeyUp={(e) => {this.onChangeText(e) && this.onEnter(e)}} />
          <button onClick={this.search.bind(this)}>Search</button>
        </div>
        <div style={{display: 'flex'}}>
          <Snippets setDescription={this.setDescription.bind(this)} data={snippets} />
          {selected != null ?
            <SnippetDescription selected={snippets[selected]} /> :
            null
          }
        </div>
      </div>
    )
  }
}
