<template>
    <div class="card-template">
        <h3>{{title}}</h3>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type:String,
    default: '',
  },
})
</script>
<style lang="scss" scoped>
.card-template{
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 10px 16px 0px rgba(213,221,232,0.42);
    border-radius: 10px;
    padding: 30px;
    box-sizing: border-box;
    h3{
        padding-bottom:25px;
    }
}
</style>