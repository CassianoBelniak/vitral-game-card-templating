export interface Card {
    name: string
    ammount: number
    frontsideTemplates: string[]
    backsideTemplates: string[]
    tags: string[]
    variables: Record<string, string>
}
