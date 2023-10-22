export type Novel = {
    data: {
        type: string
        id: string
        title: string
        author: string
        cover: string
        description: string
    }[]
    links: {
        first: string
        last: string
        prev: string | null
        next: string | null
    }
    meta: {
        current_page: number
        from: number
        last_page: number
        links: PageLink[]
        path: string
        per_page: number
        to: number
        total: number
    }
}

export type TNovelItemArray = {
    type: string
    id: string
    title: string
    author: string
    cover: string
    description: string
}

export type NovelItem = {
    data: {
        type: string
        id: string
        title: string
        author: string
        cover: string
        description: string
    }
}

export type PageLink = {
    url: string | null
    label: string
    active: boolean
}
