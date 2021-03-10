<template>
	<b-container>
		<b-row>
			<b-card title="Messages">
				<b-form-input v-model="message" placeholder="Enter your message" @keyup.enter="sendMessage()"></b-form-input>
				<b-list-group style="max-height: 250px; overflow-y: scroll;">
					<b-list-group-item v-for="(msg, index) in messages" :key="index">
						<b>{{ msg.user }} says </b> {{ msg.message }}
					</b-list-group-item>
				</b-list-group>
			</b-card>
		</b-row>
		<b-row>
			<b-card title="Online Users">
				<b-list-group>
					<b-list-group-item v-for="user in users" :key="user.id">
						{{ user.name }}
					</b-list-group-item>
				</b-list-group>
			</b-card>
		</b-row>
	</b-container>
</template>

<script>

	export default{
		data(){
			return{
				users: {},
				messages: [],
				message: '',
				user: {}
			}
		},
		methods:{
			async sendMessage(){
				let vm = this
				let response = await axios.post('/chat/send/message', {
					message: vm.message
				})
				vm.messages.unshift({
					user: vm.user.name,
					message: vm.message
				})
				vm.message = ''
			}
		},
		async mounted(){
            let vm = this
            vm.user = this.$store.state.user
            // Joining into Presence Channel (Public Chat)
            let channel1 = Echo.join('PublicChat')
            channel1.here(users =>{
                    vm.users = users
                })
            channel1.joining(user =>{
                    vm.users.push(user)
                })
            channel1.leaving(user =>{
                    vm.users = vm.users.filter(u => u.id != user.id)
                })
            channel1.listen('.MessageSent', (event) => {
	            	vm.messages.unshift(event.message)
               	})
        }

	}

</script>