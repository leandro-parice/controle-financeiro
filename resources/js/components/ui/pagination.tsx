import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  lastPage: number
  total: number
  perPage: number
  sort?: string
  direction?: string
}

export default function Pagination({
  currentPage,
  lastPage,
  total,
  perPage,
  sort,
  direction,
}: PaginationProps) {
  const getQuery = (page: number) => {
    const params = new URLSearchParams()
    if (sort) params.set('sort', sort)
    if (direction) params.set('direction', direction)
    params.set('page', page.toString())
    return '?' + params.toString()
  }

  if (lastPage <= 1) return null

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm">
      <div>
        Mostrando {Math.min((currentPage - 1) * perPage + 1, total)} a{' '}
        {Math.min(currentPage * perPage, total)} de {total} registros
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: lastPage }).map((_, i) => {
          const page = i + 1
          return (
            <Link key={page} href={getQuery(page)} preserveScroll preserveState>
              <Button
                size="sm"
                variant={page === currentPage ? 'default' : 'outline'}
              >
                {page}
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}