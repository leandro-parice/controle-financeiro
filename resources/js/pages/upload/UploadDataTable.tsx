import * as React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { usePage, router } from '@inertiajs/react'

interface Upload {
  id: number
  name: string
  path: string
  created_at: string
}

interface PageProps {
  uploads: {
    data: Upload[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  filters: {
    sort: string
    direction: 'asc' | 'desc'
  }
}

export default function UploadDataTable({ uploads, filters }: PageProps) {
  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este arquivo?')) {
      router.delete(route('upload.destroy', id), {
        preserveScroll: true,
      })
    }
  }

  const handleSort = (column: string) => {
    const isAsc = filters.sort === column && filters.direction === 'asc'
    router.get(route('upload.list'), {
      sort: column,
      direction: isAsc ? 'desc' : 'asc',
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const columns: ColumnDef<Upload>[] = [
    {
      accessorKey: 'id',
      header: () => (
        <button onClick={() => handleSort('id')} className="font-bold hover:underline">
          ID {filters.sort === 'id' && (filters.direction === 'asc' ? '↑' : '↓')}
        </button>
      ),
      cell: ({ row }) => row.getValue('id'),
    },
    {
      accessorKey: 'name',
      header: () => (
        <button onClick={() => handleSort('name')} className="font-bold hover:underline">
          Nome {filters.sort === 'name' && (filters.direction === 'asc' ? '↑' : '↓')}
        </button>
      ),
      cell: ({ row }) => row.getValue('name'),
    },
    {
      accessorKey: 'created_at',
      header: () => (
        <button onClick={() => handleSort('created_at')} className="font-bold hover:underline">
          Enviado em {filters.sort === 'created_at' && (filters.direction === 'asc' ? '↑' : '↓')}
        </button>
      ),
      cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleString(),
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
          Remover
        </Button>
      ),
    },
  ]

  return (
    <div className="rounded-xl border border-border p-2 md:p-4">
      <DataTable columns={columns} data={uploads.data} />
    </div>
  )
}