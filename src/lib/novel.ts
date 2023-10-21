import axios from '@/lib/axios'
import { NovelItem, Novel, PageLink } from '@/models/Novel'

export async function getNovel (id: string) {
    const res = await axios.get<NovelItem>(`/api/novels/${id}`)
    return res.data.data
}

export async function getNovels (per_page: number, page: number) {
    const limit = per_page || 10
    const pageNumber = page || 1

    const res = await axios.get<Novel[]>(
        `/api/novels?limit=${limit}&page=${pageNumber}`
    )
    return res.data
}
