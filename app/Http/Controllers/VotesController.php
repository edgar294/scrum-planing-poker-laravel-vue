<?php

namespace App\Http\Controllers;
use App\Models\Vote;
use App\Models\User;
use App\Models\Issue;
use App\Events\VoteEmited;
use Illuminate\Database\QueryException;

use Illuminate\Http\Request;

class VotesController extends Controller
{
    public function __construct()
    {
    	$this->middleware('auth');
    }

    /**
     * Return all the votes of an Issue
     * @param Request $request
     * @return Array
     */
    public function fecthVotes(Request $request){
        $issueId = $request->issueId;
    	return Vote::where('issue_id', $issueId)->get(['id', 'issue_id', 'user_id', 'value']);
    }

    /**
     * Save a new vote in the database
     * @param Request $request
     * @return json
     */
    public function sendVote(Request $request){
    	$user = auth()->user();
    	$issueId = $request->issue_id;
    	try{
    		// Validating the issue
    		$validIssue = $this->validateIssue($issueId);
    		if(!$validIssue['status']){
    			return response()->json([
					'success' => false,
                    'message' => $validIssue['message']
				], 200);
    		}

    		// Validating the User
    		$validUser = $this->validateUser($issueId);
    		if(!$validUser['status']){
    			return response()->json([
					'success' => false,
                    'message' => $validUser['message']
				], 200);
    		}

    		// All validations passed
    		// Save the vote
    		$vote = new Vote();
	    	$vote->user_id = $user->id;
	    	$vote->issue_id = $issueId;
	    	$vote->value = $request->vote;
	    	$vote->save();

	    	if($vote)
	    	{
                // Broadcast the vote emited
	    		broadcast(new VoteEmited($vote->load('user')))->toOthers();

				return response()->json([
					'success' => true,
					'vote' => $vote
				], 200);
	    	}
	    	else
	    	{
				return response()->json([
					'success' => false,
					'message' => 'Error saving the vote, please try in a few minutes'
				], 200);
	    	}
	    }
	    catch(QueryException  $e){
	    	return response()->json([
	    		'error' => $e
	    	]);
	    }
    }

    /**
     * Validate an issue associated to a vote with the next:
     * - Verifiying if the issue exist
     * - Verifiying if the user is joined in the issue
     * - Verifiying if the issue status is 'voting'
     * @param integre       $issueId    Issue Id
     * @return Array
     */
    private function validateIssue($issueId)
    {
        $user = auth()->user();

        // Validate if the issue exist
    	$issue = Issue::find($issueId);
        if(!$issue){
            return [
                'status' => false,
                'message' => 'Issue does not exist'
            ];
        }

        // Validate if the user is joined in the issue
        $userJoined = $issue->users()->where('user_id', $user->id);
        if(!$userJoined){
            return [
                'status' => false,
                'message' => 'User not joined in the issue'
            ];
        }

        // Validate if the issue status is 'voting'
    	if($issue->status != 'voting'){
    		return [
                'status' => false,
                'message' => 'The issue status is not voting'
            ];
    	}
    	else{
    		return [
                'status' => true
            ];
    	}
    }

    /**
     * Validate if the user hasn't voted yet
     * @param integre       $issueId    Issue Id
     * @return Array
     */
    private function validateUser($issueId)
    {
    	$user = auth()->user();

        // Validate if the user hasn't voted yet
        $hasVoted = Vote::where('user_id', $user->id)->where('issue_id', $issueId)->first();
        if($hasVoted){
    	   return [
                'status' => false,
                'message' => 'The user has voted in this issue'
            ];
        }
        else{
            return [
                'status' => true,
            ];
        }
    }
}
