import * as React from 'react'

import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

import Snippets from "./snippets"
import SnippetDescription from "./snippet_description"
import SearchRPC from "../rpc/search"

interface Props {
  githubAccessToken:string
  owner:string
  repository:string
  onSubmit: (githubAccessToken:string, owner:string, repository:string) => void
}

interface State {
  githubAccessToken:string
  owner:string
  repository:string
}

export default class Config extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      githubAccessToken: props.githubAccessToken,
      owner: props.owner,
      repository: props.repository
    }
  }

  onChangeGithubAccessToken(e:any) {
    const v = e.target.value
    this.setState({ githubAccessToken: v})
  }

  onChangeOwner(e:any) {
    const v = e.target.value
    this.setState({ owner: v})
  }

  onChangeRepository(e:any) {
    const v = e.target.value
    this.setState({ repository: v})
  }

  render() {
    const { onSubmit } = this.props 
    const { githubAccessToken, owner, repository } = this.state

    return (
      <div>
        GithubAccessToken:
        <input type="text" name="githubAccessToken" value={githubAccessToken} onChange={this.onChangeGithubAccessToken.bind(this)}/>
        Owner:
        <input type="text" name="owner" value={owner} onChange={this.onChangeOwner.bind(this)}/>
        Repository:
        <input type="text" name="repository" value={repository} onChange={this.onChangeRepository.bind(this)}/>
        <input type="submit" value="Submit" onClick={() => onSubmit(githubAccessToken, owner, repository)} />
      </div>
    )
  }
}
