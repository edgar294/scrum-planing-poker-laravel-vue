<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\User;
use App\Models\Vote;
use App\Events\IssueEvents;
use Illuminate\Http\Request;

class IssuesController extends Controller
{
    public function __construct(){
    	$this->middleware('auth');
    }

    /**
     * Show the main view
     * @return void
     */
    public function index(){
        return view('issues');
    }

    /**
     * Return the issue info with its users and votes associated to the users
     * @param Request $request
     * @param Intehet     $issueId  The ID of the issue required
     * @return Response in Json format
     */
    public function fetchIssueInfo(Request $request, $issueId)
    {
        // Fetch the issue with all the users joined in them
        $issue = Issue::with(['users' => function ($query) use ($issueId) {
                            $query->select('user_id','name', 'email');
                        }])
                        ->where('id', $issueId)
                        ->first(['id', 'name', 'status']);

        // Loop through the users in the issue to fetch his votes associated to the specific issue
        foreach ($issue->users as $user) {
            $user->vote = Vote::where('issue_id', $issueId)
                                ->where('user_id', $user->user_id)
                                ->first();
        }

        // Prepare the response
        return response()->json([
                    'success' => true,
                    'issue' => $issue
                ], 200);
    }

    /**
     * Return all the issues stored in the database
     * @return Array of objects
     */
    public function getIssues()
    {
        // Fetch all the issues with all the users joined in them
    	$issues = Issue::with(['users' => function ($query) {
                            $query->select('user_id','name', 'email');
                        }])->get(['id', 'name', 'status']);

        // Loop through the users in the issue to fetch his votes associated to the specific issue
        foreach ($issues as $issue) {
            foreach ($issue->users as $user) {
                $user->vote = Vote::where('issue_id', $issue->id)
                                ->where('user_id', $user->user_id)
                                ->first();
            }
        }

        // Return all the issues
        return $issues;
    }

    /**
     * Permit to the authenticated user to join in a specific issue
     * @param Request   $request
     * @return Response in Json format
     */
    public function joinIssue(Request $request)
    {
        // Look in the response if issue ID was specificated
    	$issueId = ($request->issue) ? $request->issue : false;
    	if($issueId){
            // If the ID was specificated, then the user is trying join to an existing issue
    		// Get the issue
    		$issue = Issue::find($issueId);
    		if($issue){
                // If the was not joined to this isse
                if(!$issue->users()->find(auth()->user()->id)){
                    // Then attach the user to the issue
                    $issue->users()->attach(auth()->user()->id);
                }

    			// Preparing response
    			$issue->load('users');
    			return response()->json([
                    'success' => true,
                    'issue' => $issue
                ], 200);
    		}
    	}
    	else{
            // If the ID was NOT specificated, then is trying to join in a new issue
            if($request->name){
        		try{
        			// Saving the new issue
        			$issue = new Issue();
        			$issue->name   = $request->name;
        			$issue->status = 'open';
        			$issue->save();

        			//Attaching the user
        			$issue->users()->attach(auth()->user()->id);
        			$issue->load('users');

                    // Preparing response;
        			return response()->json([
        				'success' => true,
        				'issue' => $issue
        			], 200);
    			}
    			catch(QueryException  $e){
    				return response()->json([
    					'success' => false,
    					'message' => $e
    				], 200);
    			}
            }
            else{
                return response()->json([
                    'success' => false,
                    'message' => 'Must specify the issue name'
                ], 200);
            }

    	}
    }

    /**
     * Change the status of an issue
     * @param Request $request  With the issue ID and the new status
     * @return Response in Json format
     */
    public function updateIssue(Request $request){
        // Look in the response if issue ID was specificated
        $issueId = ($request->issueId) ? $request->issueId : false;
        if($issueId){
            // Get the issue
            $issue     = Issue::find($issueId);
            $newStatus = $request->status;
            if($issue){
                if($issue->status != $newStatus){
                    // Preparing response
                    $issue->status = $request->status;
                    $issue->save();

                    // Broadcast the issue with the new status
                    broadcast(new IssueEvents($issue))->toOthers();

                    // Prepare the response
                    return response()->json([
                        'success' => true,
                        'issue'   => $issue
                    ], 200);
                }
                else{
                    // The status is not changed because is the same status
                    return response()->json([
                        'success' => false,
                        'error'   => 'Issue status was not changed'
                    ], 200);
                }
            }
        }
        else{
            return response()->json([
                'success' => false,
                'error' => 'Issue not found'
            ], 200);
        }
    }
}
