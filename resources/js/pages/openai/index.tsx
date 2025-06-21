import { useState } from 'react'
import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type BreadcrumbItem } from '@/types'
import axios from 'axios'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'OpenAI', href: '/openai' },
]

interface PdfFile {
  id: number
  name: string
}

interface PageProps {
  pdfFiles: PdfFile[]
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export default function OpenAIChatPage({ pdfFiles }: PageProps) {
  const [context, setContext] = useState('')
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedPdf, setSelectedPdf] = useState('')

  const handleSend = async () => {
    if (!message.trim()) return

    const newHistory = [...history]

    // Adiciona contexto se for a primeira mensagem
    if (newHistory.length === 0 && context.trim()) {
      newHistory.push({ role: 'system', content: context.trim() })
    }

    newHistory.push({ role: 'user', content: message.trim() })
    setHistory(newHistory)
    setMessage('')
    setLoading(true)

    try {
        const res = await axios.post(route('openai.send'), {
            messages: newHistory,
            pdf_id: selectedPdf || null,
        })

        const assistantReply = res.data.choices?.[0]?.message
        if (assistantReply) {
            setHistory((prev) => [...prev, assistantReply])
        }
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Chat com OpenAI" />

      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <label className="font-medium">Contexto (opcional)</label>
          <Textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Descreva o contexto da conversa..."
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Arquivo PDF (opcional)</label>
          <Select value={selectedPdf} onValueChange={setSelectedPdf}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um PDF" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Nenhum</SelectItem>
              {pdfFiles.map((file) => (
                <SelectItem key={file.id} value={String(file.id)}>
                  {file.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border-t pt-4 space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          {history.map((msg, index) => (
            <div key={index} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
              <div
                className={`inline-block rounded-xl px-4 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-end gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          />
          <Button onClick={handleSend} disabled={loading || !message.trim()}>
            Enviar
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}