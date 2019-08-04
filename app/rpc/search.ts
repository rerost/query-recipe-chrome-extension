import * as bundle from "../../api/bundle"
import pb = bundle.rerost.query_recipe_api

export default class SearchRPC {
  private host: string;

  constructor(host:String) {
    this.host = `${host}`
  }

  public async search(request: pb.SearchRequest): Promise<pb.SearchResult> {
    let res = await fetch(`${this.host}/search`, {
      method: "POST",
      body: JSON.stringify(request.toJSON()),
    })
    let result = await res.json()
    return pb.SearchResult.fromObject(result)
  }
}
