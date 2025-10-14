export interface Repository {
    id: number
    name: string
    full_name: string
    description: string
    stargazers_count: number
    updated_at: string
    html_url: string
    language: string
  }
  
export interface SearchResponse {
    items: Repository[]
    total_count: number
  }