<?php

use App\Models\UploadSpreadsheetFile;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('deletes the file and the record', function () {
    Storage::fake('local');

    Storage::disk('local')->put('uploads/test.txt', 'dummy');

    $upload = UploadSpreadsheetFile::create([
        'name' => 'test.txt',
        'path' => 'uploads/test.txt',
    ]);

    $user = User::factory()->create();

    $this->actingAs($user)
        ->delete(route('uploads.destroy', $upload))
        ->assertRedirect(route('uploads.index', absolute: false));

    $this->assertDatabaseMissing('upload_spreadsheet_files', [
        'id' => $upload->id,
    ]);

    Storage::disk('local')->assertMissing('uploads/test.txt');
});
