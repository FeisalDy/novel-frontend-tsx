import useSWR from 'swr'
import * as NovelApi from '@/lib/novel'
import { AxiosError } from 'axios'

export function useNovel (id: string) {
    const { data, isLoading } = useSWR(id, async () => {
        try {
            return await NovelApi.getNovel(id)
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                return null
            } else {
                throw error
            }
        }
    })

    return {
        novel: data,
        novelLoading: isLoading
    }
}

export function useNovels (search: string, limit: number, page: number) {
    const key = [search, limit, page]

    const { data, isLoading } = useSWR([key], async () => {
        try {
            return await NovelApi.getNovels(search, limit, page)
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                return null
            } else {
                throw error
            }
        }
    })

    return {
        novels: data,
        novelsLoading: isLoading,
        meta: data?.meta,
        links: data?.links
    }
}
