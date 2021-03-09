<template>

    <div class="container row">
        <div class="row col-12">
            <b-alert show :variant="alertConfig.type" :show="alertConfig.countdown">
                <h4 class="alert-heading">{{ alertConfig.title }}</h4>
                <hr>
                <p>{{ alertConfig.body }}</p>
            </b-alert>
        </div>
        <game-table :issue="issue" :user="user"></game-table>
        <game-stats :issue="issue" :user="user"></game-stats>
    </div>
</template>


<script>
    export default {
        props: ['issueId'],
        data() {
            return{
                user: {},
                issue: {
                    users: {}
                },
                alertConfig: {
                    title: '12',
                    body: '12',
                    type: 'success',
                    countdown: 0
                }
            }
        },
        methods:{
            // Fetch the info of the is passe by props
            // and setup it in the var issue of data
            async fetchIssueInfo(){
                let vm =  this
                try{
                    let response = await axios.get('/issue/' + vm.issueId)
                    if(response.data.success){
                        vm.issue = response.data.issue
                    }
                    else{
                        alert('Something went wrong fetching the issue info')
                        vm.$router.go(-1)
                    }
                }
                catch(err){
                    alert('Something went wrong fetching the issue info')
                    vm.$router.go(-1)
                }
            },
        },
        async created(){
            let vm = this
            await vm.fetchIssueInfo()
            // whe suscribe to the envents of the event bus
            vm.$eventBus.$on('show-alert', function(data){
                vm.showAlert(data.title, data.body, data.type)
            });
            vm.$eventBus.$on('issue-changed', function(issue){
                vm.issue.status = issue.status
            });
            vm.$eventBus.$on('add-user-to-issue', function(user){
                vm.issue.users.push(user)
            });
        },
        mounted(){
            // Recover the user of the store and save it a local var
            let vm = this
            vm.user = this.$store.state.user
        },
        beforeRouteLeave (to, from, next) {
            // Desuscribe of all the channels
            Echo.leave('IssueChannel.' + this.issueId)
            Echo.leave('RoomChannel.' + this.issueId)
            next()
        },
    }
</script>