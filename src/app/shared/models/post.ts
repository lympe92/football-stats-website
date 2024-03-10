export interface Post{
    title: string,
    text: any,
    tags: string[],
    status: 'visible'|'draft',
    categories: string[],
}