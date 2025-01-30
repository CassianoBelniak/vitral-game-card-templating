export interface Card {
    id: string
    index: number
    name: string
    source: string
    ammount: number
    frontsideTemplates: string[]
    backsideTemplates: string[]
    tags: string[]
    variables: Record<string, string>
}
