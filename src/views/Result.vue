<template>
	<div class="container-card">
		<div class="inner-card">
			<h1 class="title">We recommend the following price for you!</h1>
			<input class="input-field" :value="getFormatedResult() || 'Nothing here yet!'" disabled />
			<router-link class="submitbtn" :to="{ name: 'Home' }">
				<arrow class="icon" />
				Back to Homepage
			</router-link>
			<h2 class="subtitle">Thank you for choosing our model and believing in it!</h2>
		</div>
	</div>
</template>

<script>
import arrow from "../assets/Icons/arrow-right-light.svg";

export default {
	name: "Result",
	components: {
		arrow,
	},
	data() {
		return {};
	},
	created() {
		if (this.$store.state.predictedPrice === null) {
			this.$router.push({ name: "Home" });
		}
	},
	beforeUnmount() {
		this.$store.commit("resetePredictedPrice");
	},
	mounted() {},
	methods: {
		getFormatedResult() {
			const unformattedPrice = Number(this.$store.state.predictedPrice);
			return unformattedPrice.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			});
		},
	},
	watch: {},
};
</script>

<style scoped>
.container-card {
	width: 50%;
}

.inner-card {
	display: flex;
	width: 100%;
	row-gap: 70px;
	align-items: center;
	margin-bottom: 20px;
}

.subtitle {
	text-align: center;
}

.input-field {
	font-size: 25px;
	cursor: text;
}

.icon {
	position: static;
	display: flex;
	height: 40px;
	width: 40px;
	background: gray;
	padding: 5px 5px;
	border-radius: 100%;
	margin-right: 20px;
	border: solid 2px white;
}

.submitbtn {
	display: flex;
	text-decoration: none;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

@media (max-width: 1024px) {
	.container-card {
		width: 90%;
	}
}

@media (max-width: 640px) {
	.container-card {
		width: 100%;
		margin-top: 0;
	}
}
</style>
