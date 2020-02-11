<template>
	<div
		class="tag-container"
	>
		<slot></slot>
		<div v-on="$listeners" class="close" data-cy="closeTag">x</div>
	</div>
</template>
<script>
export default {
	name: 'tag',
	inheritAttrs: false,
};
</script>
<style lang="scss" scoped>
	.tag-container {
		background-color: #c6cbef;
		border: 1px solid #494ca2;
		border-radius: 5px;
		color: #494ca2;
		display: flex;
		margin: 0.25rem;
		padding: 0.25rem 0.25rem 0.25rem 0.5rem;
		white-space: nowrap;
	}

	.close {
		align-items: center;
		border: 1px solid #494ca2;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		height: 14px;
		justify-content: center;
		margin-left: 5px;
		width: 14px;
	}

	.close:hover {
		background-color: #494ca2;
		border: 1px solid #494ca2;
		color: #c6cbef;
	}
</style>
