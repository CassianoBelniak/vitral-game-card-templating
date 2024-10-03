export interface Card {
    name: string
    frontsideTemplates: string[]
    backsideTemplates: string[]
    tags: string[]
    variables: Record<string, string>
}
