<template>
	<div class="col-12 col-md-8">
		<div class="card card-default">
	        <div class="card-header text-center">
	            <h1>♠ Planning Poker ♠</h1>
	            <b-button
	                variant="warning"
	                @click="$router.go(-1)">Go Back</b-button>
	        </div>
	        <div class="card-body">
	            <div id="logo"></div>
	            <h2>Hiring Challenge 👋</h2>
	            <b-overlay :show="overlayShow" rounded="sm">
	                <div class="vote">
	                    <ul id="voteList">
	                        <li v-for="vote in validVotes"
	                            @click="selectVote(vote)"
	                            :key="vote"
	                            :class="{voted: myVote === vote}">
	                            {{ vote }}
	                        </li>
	                    </ul>
	                    <button
	                        v-if="myVote && issue.status == 'voting'"
	                        @click="emitVote(myVote)"
	                        class="btn btn-primary p-4 w-100">
	                        <h3 class="text-light">✍ Vote!</h3>
	                    </button>
	                </div>
	                <template #overlay>
	                    <div class="text-center">
	                      <b-icon :icon="overlayIcon" font-scale="3" animation="cylon"></b-icon>
	                      <p id="cancel-label">{{overlayText}}</p>
	              		</div>
	          		</template>
	            </b-overlay>
	        </div>
	    </div>
	</div>
</template>
<script>
    export default {
        props: ['issue', 'user'],
        data() {
            return{
                myVote: '',
                votes: null,
                users: [],
                activeUser: false,
                typingTimer: false,
                validVotes: [1,2,3,5,8,13,21,34,55,89,'☕','?'],
            }
        },
        methods:{
            async emitVote(vote) {
                let vm = this
                try{
                    let res = await axios.post('/issue/vote', {
                        vote: vm.myVote,
                        issue_id: vm.issue.id
                    })
                    if(res.data.success)
                    {
                    	vm.myVote = ''
                        vm.votes.push(res.data.vote)
                        alert('Your vote has sent successfully')
                        Echo.join('IssueChannel.' + vm.issueId)
                        	.whisper('voting', {
                        		user: vm.user,
                        		vote: vote
                        	}, false)
                    }
                    else
                    {
                        alert('Error: ' + res.data.message)
                    }
                }
                catch(err){
                    alert('Error: Something went wrong, please try later')
                }
            },
            selectVote(vote){
                let vm = this
                if(vm.myVote === vote){
                    vm.myVote = false
                    vm.user.vote = false
                }
                else{
                    vm.myVote = vote
                    vm.user.vote = vote
                    Echo.join('IssueChannel.' + vm.issueId)
                        .whisper('voted', vm.user, vote)
                }
            },
            searchUserIndex(user){
                for (var i = 0; i < this.users.length; i++) {
                    if(user.id === this.users[i].id){
                        return i
                    }
                }
            },
            calculateAvgVotes(){
                let vm = this
                let acum = 0
                let cont = 0
                if(vm.votes != null){
                    vm.votes.forEach(vote =>{
                        if(vote.value !== '☕' && vote.value !== '?'){
                            acum += parseInt(vote.value)
                            cont++
                        }
                    })
                }

                // We can't divide by 0 XD
                if(cont > 0)
                    return acum / cont
                else
                    return 0
            },
        },
        computed:{
            overlayText(){
                let vm = this
                if(vm.issue.status == 'open'){
                    return 'Wait for all the users...'
                }
                else if(vm.issue.status == 'reveal'){
                    return 'The average value is ' +  vm.calculateAvgVotes()
                }
                else{
                	if(vm.votes === null){
	                	return 'Please wait....'
	                }
	                else{
	                	if(vm.votes.find(element => element.user_id == vm.user.id))
	                		return 'Your vote has sent successfully'
	                	else
	                    	return 'Please wait....'
	                }
                }
            },
            overlayIcon(){
                let vm = this
                if(vm.issue.status == 'open')
                    return 'stopwatch'
                else if(vm.issue.status == 'reveal')
                    return 'hand-thumbs-up'
                else
                    return 'bookmark-check'
            },
            overlayShow(){
                let vm = this
                if(typeof vm.issue.users.length === 'undefined' || vm.votes === null){
                	return true
                }
                else{
	                if(vm.issue.status == 'voting'){
	                	if(vm.votes.find(element => element.user_id == vm.user.id)){
	                		return true
	                	}
	                	else{
	                    	return false
	                	}
	                }
	                else
	                    return true
	            }
            }
        },
        created(){
        	let vm = this
        	vm.$eventBus.$on('votes-fetched', function(votes){
                vm.votes = votes
            });
        }
    }
</script>
<style>
	#voteList {
        padding: 0;
        margin: 10px auto;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        justify-content: space-around;
        text-align: center;
    }
    #voteList li {
        box-sizing: border-box;
        cursor: pointer;
        height: 100px;
        width: 100px;
        margin: 0;
        padding: 30px 0;
        border-radius: 9px;
        box-shadow: 2px 2px 2px #000;
        text-shadow: 1px 1px 2px #444;
        background: #e76f51;
        color: #fff;
        margin: 10px;
        font-size: 30px;
        transition: background-color 0.3s ease font-size 0.3s ease;
    }
    #voteList li.voted {
        font-size: 33px;
        background: #2a9d8f;
    }
</style>