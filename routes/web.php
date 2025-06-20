<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard',[DashboardController::class, 'index'])->name('dashboard');

    Route::get('/upload', [UploadController::class, 'form'])->name('upload.index');
    Route::post('/upload', [UploadController::class, 'store'])->name('upload.store');
    Route::get('/upload/list', [UploadController::class, 'index'])->name('upload.list');
    Route::delete('/upload/{uploadSpreadsheetFile}', [UploadController::class, 'destroy'])->name('upload.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
