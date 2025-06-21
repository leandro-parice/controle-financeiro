<?php

namespace App\Http\Controllers;

use App\Models\UploadSpreadsheetFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class OpenAIController extends Controller
{
    public function index()
    {
        $pdfFiles = UploadSpreadsheetFile::where('path', 'like', '%.pdf')
            ->get(['id', 'name']);

        return Inertia::render('openai/index', [
            'pdfFiles' => $pdfFiles,
        ]);
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'messages' => 'required|array',
            'messages.*.role' => 'required|in:user,assistant,system',
            'messages.*.content' => 'required|string',
            'pdf_id' => 'nullable|integer|exists:upload_spreadsheet_files,id',
        ]);

        if (!empty($validated['pdf_id'])) {
            $pdf = UploadSpreadsheetFile::find($validated['pdf_id']);
            if ($pdf) {
                $validated['messages'][] = [
                    'role' => 'user',
                    'content' => 'Arquivo selecionado: ' . $pdf->name,
                ];
            }
        }

        $response = Http::withToken(config('services.openai.key'))
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo',
                'messages' => $validated['messages'],
            ]);

        return response()->json($response->json());
    }
}
