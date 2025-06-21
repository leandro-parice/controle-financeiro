<?php

namespace App\Http\Controllers;

use App\Models\UploadSpreadsheetFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UploadController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->get('sort', 'id');
        $direction = $request->get('direction', 'desc');

        $uploads = UploadSpreadsheetFile::orderBy($sort, $direction)
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('upload/index', [
            'uploads' => $uploads,
            'filters' => [
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('upload/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,csv,txt',
        ]);

        $file = $request->file('file');
        $path = $file->store('uploads');

        UploadSpreadsheetFile::create([
            'name' => $file->getClientOriginalName(),
            'path' => $path,
        ]);

        return redirect()->route('uploads.index')->with('success', 'Arquivo enviado com sucesso!');
    }

    public function destroy(UploadSpreadsheetFile $uploadSpreadsheetFile)
    {
        Storage::delete($uploadSpreadsheetFile->path);
        $uploadSpreadsheetFile->delete();

        return redirect()->route('uploads.index')
            ->with('success', 'Arquivo excluído com sucesso!');
    }
}
