<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function votes(){
    	return $this->hasMany(Vote::class);
    }

	public function users(){
    	return $this->belongsToMany(User::class);
    }

}
