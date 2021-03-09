@extends('layouts.app')

@section('content')
    <div class="container">
        <main-view :user="{{ auth()->user() }}"></main-view>
        {{-- <main-view :user="{{ auth()->user() }}"></main-view> --}}

    </div>
@endsection
