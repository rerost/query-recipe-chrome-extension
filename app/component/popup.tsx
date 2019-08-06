import * as React from 'react'

import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

import Snippets from "./snippets"
import Config from "./config"
import SnippetDescription from "./snippet_description"
import SearchRPC from "../rpc/search"

interface Props {
}

enum Mode {
  Search = 1,
  Config = 2
}

interface State {
  snippets: Array<pb.type.ISnippet>
  selected: null | number // TODO(@rerost) Only integer
  keyword: string
  mode: Mode
  githubMetadata: null | pb.type.GithubMetadata
  hostURL: string
}

const GithubMetaDataKey = "GithubMetaDataKey"
const HostURLKey = "HostURLKey"

export default class Popup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mode: Mode.Search,
      snippets: [],
      selected: null,
      keyword: "",
      githubMetadata: null,
      hostURL: "",
    }
  }

  componentDidMount() {
    chrome.storage.local.get(GithubMetaDataKey, (result) => {
      const m = pb.type.GithubMetadata.fromObject(JSON.parse(result[GithubMetaDataKey]))

      this.setState({
        githubMetadata: m,
      })
    })
    chrome.storage.onChanged.addListener((changes: any) => {
      const storageChange = changes[GithubMetaDataKey]
      if (!storageChange || (storageChange.oldValue === storageChange.newValue)) {
        return
      }

      const m = pb.type.GithubMetadata.fromObject(JSON.parse(storageChange.newValue))
      this.setState({
        githubMetadata: m,
      })
    })

    chrome.storage.local.get(HostURLKey, (result) => {
      this.setState({
        hostURL: result[HostURLKey],
      })
    })
    chrome.storage.onChanged.addListener((changes: any) => {
      const storageChange = changes[HostURLKey]
      if (!storageChange || (storageChange.oldValue === storageChange.newValue)) {
        return
      }

      this.setState({
        hostURL: storageChange.newValue,
      })
    })
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
    let request = new pb.SearchRequest
  
    request.keyword = keyword
    request.metadata = this.state.githubMetadata

    let client = new SearchRPC(this.state.hostURL)
    client.search(request).then((result: pb.SearchResult) => {
      this.setState({
        snippets: result.hits,
      })
    })
  }

  onChangeText(e:any) {
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

  onClickConfig() {
    const { mode } = this.state;
    if (mode === Mode.Config) {
      this.setState({
        mode: Mode.Search,
      })
      return
    }

    this.setState({
      mode: Mode.Config,
    })
  }

  render() {
    const { mode } = this.state
    return (
      <div>
        <h3>QueryRecipe</h3>
        <div style={{position: "absolute", right: '5px', top: '5px'}} onClick={this.onClickConfig.bind(this)}>
          config
        </div>
        {(mode === Mode.Search) ? this.renderSearch() : null}
        {(mode === Mode.Config) ? this.renderConfig() : null }
      </div>
    )
  }

  onSubmitConfig(hostURL:string, githubAccessToken:string, owner:string, repository:string) {
    let m = new pb.type.GithubMetadata
    m.access_token = githubAccessToken
    m.owner = owner
    m.repository = repository

    chrome.storage.local.set({GithubMetaDataKey: JSON.stringify(m.toJSON())})
    chrome.storage.local.set({HostURLKey: hostURL})
  }

  renderConfig() {
    const { githubMetadata, hostURL } = this.state
    return (
      <Config 
        onSubmit={this.onSubmitConfig.bind(this)}
        hostURL={hostURL}
        githubAccessToken={githubMetadata === null ? "" : githubMetadata.access_token}
        owner={githubMetadata === null ? "" : githubMetadata.owner}
        repository={githubMetadata === null ? "" : githubMetadata.repository}
      />
    )
  }

  renderSearch() {
    const { selected, snippets } = this.state;

    return (
      <div>
        <div>
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
