export interface Novel {
    // data: NovelItem[]
    data: {
        type: string
        id: string
        title: string
        author: string
        cover: string
        description: string
        links: {
            self: string
            related: string
        }
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
    status: string
}

export interface NovelItem {
    data: {
        type: string
        id: string
        title: string
        author: string
        cover: string
        description: string
        links: {
            self: string
            related: string
        }
    }
}

export interface PageLink {
    url: string | null
    label: string
    active: boolean
}
