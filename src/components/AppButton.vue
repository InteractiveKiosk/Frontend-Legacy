<template>
	<component
		:is="tagName"
		v-bind="attribute"
		:class="classes"
		v-on="listeners"
	>
		<slot />
	</component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
	name: "AppButton"
})
export default class Button extends Vue {
	@Prop({ default: null }) to!: null | string;
	@Prop({ default: null }) href!: string;
	@Prop({ type: Boolean, default: false }) disabled!: boolean;

	active = false;
	hover = false;

	onClick(event: MouseEvent) {
		if (this.to) {
			event.preventDefault();
			this.$router.push(this.to);
		}
	}

	get tagName() {
		if (this.to || this.href) return "a";
		return "button";
	}
	get attribute() {
		if (this.tagName === "a") {
			if (!this.to) return {
				href: this.to || this.href,
				target: "_blank"
			};
			return {
				href: this.to || this.href
			};
		}
		return {};
	}
	get listeners() {
		const vm = this;
		return Object.assign({}, this.$listeners, {
			click: function (event: MouseEvent) {
				vm.onClick(event);
				vm.$emit("click", event);
			},
			touchstart: function (event: TouchEvent) {
				vm.active = true;
				vm.hover = true;
				vm.$emit("touchstart", event);
			},
			touchend: function (event: TouchEvent) {
				vm.active = false;
				vm.hover = false;
				vm.$emit("touchend", event);
			},
			mousedown: function (event: MouseEvent) {
				event.preventDefault();
				vm.active = true;
				vm.$emit("mousedown", event);
			},
			mouseup: function (event: MouseEvent) {
				vm.active = false;
				vm.$emit("mouseup", event);
			},
			mouseenter: function (event: MouseEvent) {
				vm.hover = true;
				vm.$emit("mouseenter", event);
			},
			mouseleave: function (event: MouseEvent) {
				vm.active = false;
				vm.hover = false;
				vm.$emit("mouseleave", event);
			}
		});
	}
	get classes() {
		return {
			"app-button": true,
			"app-button__hover": this.hover,
			"app-button__active": this.active,
			"app-button__disabled": this.disabled
		};
	}
}
</script>

<style lang="scss" scoped>
.app-button {
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 8px 12px;

	border: none;
	border-radius: 12px;

	background: none;
	background-color: #f6cb4c;

	font-size: 16px;

	cursor: pointer;

	transition: background 0.1s;

	&:not(.app-button__disabled).app-button__active {
		background-color: rgba(#f6cb4c, 0.75);
	}

	&.app-button__disabled {
		opacity: 0.8;

		cursor: not-allowed;
	}
}
</style>
