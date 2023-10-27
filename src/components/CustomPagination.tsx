import React from 'react'
import { usePagination } from '@/hooks/usePagination'
import { DOTS } from '@/lib/utils'
import { TCPagination } from '@/models/Pagination'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Card, CardContent } from '@/components/ui/card'

const Pagination = (props: TCPagination) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const search = searchParams.get('search') ?? ''
    const limit = parseInt(searchParams.get('limit') ?? '10')

    const { onPageChange, totalCount, siblingCount, currentPage, pageSize } =
        props

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    })

    if (currentPage === 0 || paginationRange.length < 2) {
        return null
    }

    function changePage (page: number) {
        router.push(`/novel/list?page=${page}&limit=${limit}&search=${search}`)
    }

    const onNext = () => {
        changePage(currentPage + 1)
    }

    const onPrevious = () => {
        changePage(currentPage - 1)
    }

    let lastPage = paginationRange[paginationRange.length - 1]
    return (
        <div className='mt-2 border-0'>
            <div className='py-2'>
                <div className='flex list-none justify-center'>
                    <Button
                        variant='secondary'
                        className='text-center mx-0.5'
                        disabled={currentPage === 1}
                        onClick={onPrevious}
                    >
                        &larr;
                    </Button>
                    {paginationRange.map(pageNumber => {
                        if (pageNumber === DOTS) {
                            return (
                                <Button
                                    variant='secondary'
                                    disabled
                                    key='dots'
                                    className='mx-0.5'
                                >
                                    &#8230;
                                </Button>
                            )
                        }

                        return (
                            <Button
                                variant='secondary'
                                key={pageNumber}
                                className={`mx-0.5 ${
                                    pageNumber === currentPage
                                        ? 'bg-green-500 text-white'
                                        : ''
                                }`}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Button>
                        )
                    })}

                    <Button
                        variant='secondary'
                        disabled={currentPage === lastPage}
                        className='mx-0.5'
                        onClick={onNext}
                    >
                        &rarr;
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Pagination
