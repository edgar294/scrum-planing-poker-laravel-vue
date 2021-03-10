<template>
    <div class="container row">
        <div class="col-12 col-md-8">
            <div class="card card-default">
                <div class="card-header text-center">
                    <h1>♠ Issue List ♠</h1>
                </div>
                <div class="card-body">
                    <register-issue></register-issue>
                    <b-table striped hover
                        :items="issues"
                        :fields="fields"
                        :busy="isBusy">
                        <template #table-busy>
                            <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>{{ bussyMessage }}</strong>
                            </div>
                        </template>
                        <template #cell(id)="data">
                            #{{ data.index + 1 }}
                        </template>
                        <template #cell(options)="data">
                            <b-button
                                variant="success"
                                @click="JoinInRoom(data.item.id)">
                                Join!
                            </b-button>
                        </template>
                        <template #cell(show_details)="row">
                            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                                {{ row.detailsShowing ? 'Hide' : 'Show'}} Users
                            </b-button>
                        </template>
                        <template #row-details="row">
                            <b-table
                                striped hover
                                :items="row.item.users"
                                :fields="['name', 'vote']"
                                table-variant="primary">
                                <template #cell(vote)="data">
                                    <b-badge
                                        :variant="variantVote(data.item.vote, row.item.status)">
                                        {{ getVote(data.item.vote, row.item.status) }}
                                    </b-badge>
                                </template>
                            </b-table>
                        </template>
                    </b-table>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="card card-default">
                <div class="card-header text-center">
                    <h1>♠ Global Chat ♠</h1>
                </div>
                <public-chat></public-chat>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return{
                isBusy: true,
                bussyMessage: 'Loading...',
                fields: [
                    {
                        key: 'id',
                        label: 'Number',
                        sortable: true
                    },
                    {
                        key: 'name',
                        label: 'Name',
                        sortable: false
                    },
                    {
                        key: 'status',
                        label: 'Status',
                        sortable: true,
                    },
                    {
                        key: 'options',
                        label: 'Join',
                        variant: 'success'
                    },
                    {
                        key: 'show_details',
                        label: 'Joined',
                        variant: 'success'
                    }
                ],
                issues: []
            }
        },
        methods:{
            getVote(vote, issueStatus){
                if(issueStatus === 'reveal'){
                    if(vote === null){
                        return 'User has not voted'
                    }
                    else{
                        return vote.value
                    }
                }
                else{
                    return 'Secret'
                }
            },
            async fetchIssues(){
                let vm = this
                vm.isBusy = true
                let res = await axios.get('/get/issues')
                vm.issues = res.data
                vm.isBusy = false
            },
            async JoinInRoom(id){
                try{
                    let vm = this
                    vm.bussyMessage = 'Joining...'
                    vm.isBusy = true
                    let response = await axios.post('/issue/join', {issue: id})
                    if(response.data.success)
                        vm.$router.push({name: 'poker-room', params: {issueId: id }})
                    else
                        alert('something went wrong: ' + response.data.error)

                    vm.isBusy = false
                }
                catch(err){
                    alert('something went wrong: ' + err)
                    vm.isBusy = false
                }
            },
            variantVote(vote, issueStatus){
                if(issueStatus == 'reveal'){
                    if(vote === null){
                        return 'danger'
                    }
                    else if(vote.value >= 0){
                        return 'success'
                    }
                    else{
                        return 'warning'
                    }
                }
                else{
                    return 'dark'
                }
            },
            test(){
                console.log('example')
            }
        },
        created(){
            let vm = this
            vm.$eventBus.$on('issue-registered', function(issue){
                vm.issues.push(issue)
            });
        },
        mounted(){
            let vm = this
            vm.fetchIssues()
        }

    }
</script>

<style></style>
