import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import UploadDataTable from '@/pages/upload/uploadDataTable'
import Pagination from '@/components/ui/pagination'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Upload', href: '/upload' },
  { title: 'Listagem', href: '/upload/list' },
]

export default function UploadListPage({ uploads, filters }: any) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Listagem de Uploads" />
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Arquivos Enviados</h1>
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