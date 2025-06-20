import { Head, Link, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import UploadDataTable from '@/pages/upload/uploadDataTable'
import Pagination from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Upload', href: '/uploads' },
  { title: 'Listagem', href: '/uploads' },
]

interface FlashData {
  flash?: {
    success?: string
    error?: string
  }
}

export default function UploadListPage({ uploads, filters }: any) {
  const { flash = {} } = usePage().props as FlashData
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Listagem de Uploads" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Arquivos Enviados</h1>
          <Button asChild>
            <Link href={route('uploads.create')}>Fazer upload de arquivo</Link>
          </Button>
        </div>
        {flash.success && (
          <div className="mb-4 text-green-600 font-medium">{flash.success}</div>
        )}
        <UploadDataTable uploads={uploads} filters={filters} />
        <Pagination
            currentPage={uploads.current_page}
            lastPage={uploads.last_page}
            total={uploads.total}
            perPage={uploads.per_page}
            sort={filters.sort}
            direction={filters.direction}
        />
      </div>
    </AppLayout>
  )
}