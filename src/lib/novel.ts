import axios from '@/lib/axios'
import { NovelItem, Novel, PageLink } from '@/models/Novel'

export async function getNovel (id: string) {
    const res = await axios.get<NovelItem>(`/api/novels/${id}`)
    return res.data
}

export async function getNovels (
    search: string,
    per_page: number,
    page: number
) {
    const searchValue = search || ''
    const limit = per_page || 10
    const pageNumber = page || 1

    const res = await axios.get<Novel>(
        `/api/novels?search=${searchValue}&limit=${limit}&page=${pageNumber}`
    )
    return res.data
}
