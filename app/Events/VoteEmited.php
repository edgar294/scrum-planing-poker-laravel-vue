<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Vote;

class VoteEmited implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $vote;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Vote $vote)
    {
        $this->vote = $vote;
        // $this->vote->vote = false;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('RoomChannel.'.$this->vote->issue_id);
    }

    public function broadcastAs()
    {
        return 'VoteRecived';
    }

    public function broadcastWith()
    {
        return [
            'data' => $this->vote
        ];
    }

}
