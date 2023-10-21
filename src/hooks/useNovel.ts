import useSWR from 'swr'
import * as NovelApi from '@/lib/novel'
import { AxiosError } from 'axios'

export default function useNovel (id: string) {
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
