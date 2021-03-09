<template>
	<div class="col-12 col-md-4">
        <div class="card card-default">
            <div class="card-header text-center">
                <h1>♠ Stats ♠</h1>
            </div>
            <div class="card-body">
                <div class="members">
                    <h3>
                        Voting issue: #{{ issue.id }}<br/>
                        Status issue: {{ issue.status }}<br/><br/>
                    </h3>
                    <div class="mb-5">
                        <b-button block variant="primary" @click="changeIssueState('open')">Set Opened</b-button>
                        <b-button block variant="success" @click="changeIssueState('voting')">Start Voting</b-button>
                        <b-button block variant="danger" @click="changeIssueState('reveal')">Reveal Votes</b-button>
                    </div>
                    <h3>• Connected {{users.length}}</h3>
                    <ul id="memberList" class="p-0">
                        <li v-for="(element, index) in issue.users" :key="index">
                            <div class="container d-flex">
                                <div class="col-1 col-md-12 col-lg-2 p-0":class="isOnline(element.user_id)">
                                    <b-icon icon="circle-fill"></b-icon>
                                </div>
                                <div class="col-6 col-md-12 col-lg-7 p-0">{{ element.name }}</div>
                                <div class="col-5 col-md-12 col-lg-3 p-0">{{ getUserVote(element.user_id) }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['issue', 'user'],
        data() {
            return{
                issueId: '',
                users: [],
                votes: null
            }
        },
        methods:{
            isOnline(userId){
                let online = this.users.find(element => element.id === userId)
                if(online)
                    return 'text-success'
                else
                    return 'text-danger'
            },
            getUserVote(userId){
                let vm = this
                if(vm.votes){
                    let vote = vm.votes.find(element => element.user_id === userId)
                    if(typeof vote === 'undefined'){
                        return 'waiting'
                    }
                    else if(vote.value == '☕'){
                        return 'passed'
                    }
                    else{
                        if(vm.issue.status == 'reveal'){
                            return vote.value
                        }
                        else{
                            return 'voted'
                        }
                    }
                }
                else{
                    return 'waiting'
                }
            },
            async changeIssueState(status){
                let vm =  this
                try{
                    let response = await axios.post('/issue/update', {status: status, issueId: vm.issue.id})
                    if(response.data.success){
                        vm.issue.status = status
                        alert('Status changed successfully')
                    }
                    else{
                        alert('Something went wrong updating the issue info')
                    }
                }
                catch(err){
                    alert('Something went wrong fetching the issue info')
                }
            },
            async fetchVotes(){
                let vm = this
                if(vm.issue.id && vm.votes === null){
                    let response = await axios.post('/votes/get', {issueId: vm.issue.id})
                    vm.votes = response.data
                    vm.$eventBus.$emit('votes-fetched', vm.votes)
                }
            },
            searchUserIndex(user){
                for (var i = 0; i < this.users.length; i++) {
                    if(user.id === this.users[i].id){
                        return i
                    }
                }
            },
            pushUserInTheIssue(user){
                let vm = this
                let search = vm.issue.users.filter(element => element.user_id == user.id || element.id == user.id)
                if(search.length == 0){
                    user.user_id = user.id
                    // Envent in PokerRoom.vue
                    vm.$eventBus.$emit('add-user-to-issue', user)
                }
            },
        },
        updated(){
            let vm = this
            if(vm.votes === null){
                vm.fetchVotes()
            }
        },
        async mounted(){
            let vm = this
            vm.issueId = vm.$route.params.issueId
            // Joining into Presence Channel (Issue Channel)
            let channel1 = Echo.join('IssueChannel.' + vm.issueId)
            channel1.here(presents =>{
                    presents.forEach(user => {
                        user.vote = 0
                        vm.users.push(user)
                    })
                })
            channel1.joining(user =>{
                    user.vote = 0
                    vm.users.push(user)
                    vm.pushUserInTheIssue(user)
                })
            channel1.leaving(user =>{
                    vm.users = vm.users.filter(u => u.id != user.id)
                })
            channel1.listen('.IssueChanged', (event) => {
                    vm.$eventBus.$emit('issue-changed', event.data)
                })

            // Joining into Private Channel (Vote Channel)
            let channel2 = Echo.private('RoomChannel.' + vm.issueId)
                .listen('.VoteRecived',(event) => {
                    console.log(event.data)
                    vm.votes.push(event.data)
                })
        },
    }

</script>
<style>
    #memberList li {
        box-shadow: 2px 2px 2px #444;
        text-shadow: 1px 1px 1px #444;
        background: #e76f51;
        margin: 0.5em 0;
        padding: 1em 0;
        border-radius: 8px;
        display: flex;
        align-content: center;
        color: #fff;
        font-weight: 800;
        text-align: center;
    }
    #memberList li div.vote {
        color: #FFF;
        text-shadow: none;
        font-size: 1.5em;
    }
</style>