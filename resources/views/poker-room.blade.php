@extends('layouts.app')

@section('content')
    <div class="container">
        <poker-room :user="{{ auth()->user() }}" ></poker-room>
    </div>
@endsection
