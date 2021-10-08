<template>
    <li class="ef-option"
        @mouseenter="handleHover"
        :class="[
        {
          'is-selected': isSelected,
          'is-hover': isHover,
          'is-disabled': disabled

        },
        size ? 'ef-option-'+size : ''
      ]"
        @click.stop="handleClick">
    <span class="ef-option-content">
      <slot>
        {{ label }}
      </slot>
    </span>
    </li>
</template>

<script type="text/babel">
    export default {
        name: 'efOption',
        props: {
            label: {
                type: [String, Number]
            },
            value: {
                type: [String, Number],
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                isSelected: false,
                isHover: false,
                size: ''
            };
        },
        computed: {
            parent () {
                let parent = this.$parent;
                while (parent.$options.name !== 'efSelect') {
                    parent = parent.$parent;
                }
                return parent;
            }
        },
        components: {},
        created () {
            this.parent.options.push(this);
            this.size = this.parent.size;
        },
        mounted () {

        },
        watch: {},
        methods: {
            handleClick () {
                if (this.disabled) {
                    return false;
                }
                this.parent.optionSelected(this.value);
            },
            handleHover () {
                if (!this.disabled) {
                    this.parent.hoverIndex = this.parent.options.indexOf(this);
                    this.parent.setOptionHover();
                }
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-option.less"></style>


