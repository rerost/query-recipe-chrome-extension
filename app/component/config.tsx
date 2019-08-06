import * as React from 'react'

import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

interface Props {
  githubAccessToken:string
  owner: string
  repository: string
  hostURL: string
  onSubmit: (hostURL:string, githubAccessToken:string, owner:string, repository:string) => void
}

interface State {
  githubAccessToken: string
  owner: string
  repository: string
  hostURL: string
}

export default class Config extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      githubAccessToken: props.githubAccessToken,
      owner: props.owner,
      repository: props.repository,
      hostURL: props.hostURL,
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

  onChangeHostURL(e:any) {
    const v = e.target.value
    this.setState({ hostURL: v})
  }

  render() {
    const { onSubmit } = this.props 
    const { hostURL, githubAccessToken, owner, repository } = this.state

    return (
      <div>
        Host:
        <input type="text" name="githubAccessToken" value={hostURL} onChange={this.onChangeHostURL.bind(this)}/>
        GithubAccessToken:
        <input type="text" name="githubAccessToken" value={githubAccessToken} onChange={this.onChangeGithubAccessToken.bind(this)}/>
        Owner:
        <input type="text" name="owner" value={owner} onChange={this.onChangeOwner.bind(this)}/>
        Repository:
        <input type="text" name="repository" value={repository} onChange={this.onChangeRepository.bind(this)}/>
        <input type="submit" value="Submit" onClick={() => onSubmit(hostURL, githubAccessToken, owner, repository)} />
      </div>
    )
  }
}
