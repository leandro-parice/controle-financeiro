<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UploadSpreadsheetFile extends Model
{
    protected $dates = ['created_at', 'updated_at'];
    protected $fillable = ['name', 'path'];
}
