<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('PokerRoomChannel', function ($user) {
   return $user;
});

Broadcast::channel('IssueChannel.{id}', function ($user, $id) {
	// return ($user->issues()->where('issue_id', $id)->first()) ? $user : false;
    return $user;
});

Broadcast::channel('RoomChannel.{id}', function ($user, $id) {
	// return ($user->issues()->where('issue_id', $id)->first()) ? $user : false;
    return $user;
});

Broadcast::channel('PublicChat', function ($user) {
	// return ($user->issues()->where('issue_id', $id)->first()) ? $user : false;
    return $user;
});
