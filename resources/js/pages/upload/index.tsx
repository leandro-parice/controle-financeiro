import { useForm, usePage } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type BreadcrumbItem } from '@/types'
import { useRef } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Upload', href: '/upload' },
]

interface FlashData{
  flash?:{
    success?: string
    error?: string 

  }
}

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { flash = {} } = usePage().props as FlashData
    const { data, setData, post, processing, errors } = useForm({
        file: null as File | null,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('upload.store'), {
            forceFormData: true,
            onSuccess: () => {
                setData('file', null)
                if (fileInputRef.current) {
                  fileInputRef.current.value = ''
                }
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload de Arquivo" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[50vh] flex flex-col items-start justify-start gap-6 overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h1 className="text-xl font-semibold z-10">Upload de Extrato</h1>

                    {flash.success && (
                      <div className="text-green-600 font-medium">{flash.success}</div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 z-10 w-full">
                        <Input
                            type="file"
                            id="file"
                            name="file"
                            accept=".pdf,.csv"
                            onChange={(e) => setData('file', e.target.files?.[0] || null)}
                            ref={fileInputRef}
                        />
                        {errors.file && <span className="text-red-600 text-sm">{errors.file}</span>}

                        <Button type="submit" disabled={processing}>
                            Enviar Arquivo
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}