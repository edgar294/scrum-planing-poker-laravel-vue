<template>
	<div>
		<transition name="slide-fade" mode="out-in">
			<router-view :key="$route.fullPath"></router-view>
		</transition>
     </div>
</template>

<script>
	import { mapMutations, mapState } from 'vuex';

	export default{
		props: ['user'],
		mounted(){
			this.$store.state.user = this.user
		}
	}
</script>

<style>
    #logo {
        margin: auto;
        height: 35px;
        width: 219px;
        background: url(https://wkncdn.com/newx/assets/build/img/workana-logo-2x.9e13d14c2.png);
        background-repeat: no-repeat;
        background-size: cover;
    }
    h1 {
        margin: 0px;
        color: #e76f51;
        text-shadow: 2px 2px 2px #ccc;
    }
    h2 {
        margin: auto;
        color: #e76f51;
        font-size: 1em;
        text-shadow: 1px 1px 2px #ccc;
        text-align: center;
    }
    h3 {
        color: #2a9d8f;
        text-shadow: 2px 2px 2px #ccc;
    }
</style>