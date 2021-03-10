<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ChatEvents;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function sendChatMessage(Request $request)
    {
        $user    = auth()->user()->name;
        $message = [
            "user"    => $user,
            "message" => $request->message];

        broadcast(new ChatEvents($message))->toOthers();
    }
}
