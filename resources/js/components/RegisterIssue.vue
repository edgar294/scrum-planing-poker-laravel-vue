<template>
	<div>
		<b-button v-b-toggle.collapse-1 variant="primary">Register new issue</b-button>
		<b-overlay :show="visibleOvelay" rounded="sm">
			<b-collapse id="collapse-1" class="mt-2" v-model="visibleColapse">
				<b-card>
					<b-form-group
						id="fieldset-1"
						description="Register a new Issue"
						label="Enter Issue Name"
						label-for="input-1"
						valid-feedback="Press enter to register the issue"
						:invalid-feedback="invalidFeedback"
						:state="state"
						>
						<b-form-input
							id="input-1"
							v-model="issueName"
							:state="state" trim
							@keyup.enter="registerIssue()">
						</b-form-input>
					</b-form-group>
				</b-card>
			</b-collapse>
		</b-overlay>
	</div>
</template>
<script>

	export default{
		data(){
			return{
				visibleColapse: false,
				visibleOvelay: false,
				issueName: ''
			}
		},
		computed:{
            state() {
                return this.issueName.length >= 4
            },
            invalidFeedback() {
                if (this.issueName.length > 0) {
                    return 'Enter at least 4 characters.'
                }
                return 'Please enter issue name.'
            }
        },
        methods:{
        	async registerIssue(){
                let vm = this
                vm.visibleOvelay = true
                try{
                    let response = await axios.post('/issue/join', {name: vm.issueName})
                    if(response.data.success){
                    	vm.issueName = ''
                    	vm.$eventBus.$emit('issue-registered', response.data.issue);
                    	vm.$router.push({ path: '/poker/room/' + response.data.issue.id })
                    }
                    else{
                    	alert('something went wrong')
                    }
                }
                catch(e){
                    alert('something went wrong')
                }
                vm.visibleOvelay = false
                vm.visibleColapse = false
            }
        }
	}
</script>
