<!-- Created Following this Tutorial: https://www.youtube.com/watch?v=s1B3kadwhFU -->

<script>
	import Header from "./components/Header.svelte";
	import List from "./components/List.svelte";
</script>


<style>
	.container {
		width: 500px;
		background: #1abc9c;
		margin: 25px auto;
		border-radius: 25px;
		padding: 10px;
	}

	:global(.container *) {
		font-family: 'Lato', sans-serif;
	}
</style>

<div class="container">
	<!-- #Component, both Header and List are components that have their own files  -->
	<Header />
	<List />
</div>