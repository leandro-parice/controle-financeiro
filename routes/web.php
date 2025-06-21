<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OpenAIController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard',[DashboardController::class, 'index'])->name('dashboard');

    Route::get('/uploads', [UploadController::class, 'index'])->name('uploads.index');
    Route::get('/uploads/create', [UploadController::class, 'create'])->name('uploads.create');
    Route::post('/uploads', [UploadController::class, 'store'])->name('uploads.store');
    Route::delete('/uploads/{uploadSpreadsheetFile}', [UploadController::class, 'destroy'])->name('uploads.destroy');

    Route::get('/openai', [OpenAIController::class, 'index'])->name('openai.index');
    Route::post('/openai/send-message', [OpenAIController::class, 'send'])->name('openai.send');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
