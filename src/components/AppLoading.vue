<template>
  <div class="loading-bg"></div>
  <div class="site-loading">
    <div class="letter-01"><svg-icon name="letter-L" class="letter-icon"/></div>
    <div class="letter-02"><svg-icon name="letter-O" class="letter-icon"/></div>
    <div class="letter-03"><svg-icon name="letter-A" class="letter-icon"/></div>
    <div class="letter-04"><svg-icon name="letter-D" class="letter-icon"/></div>
    <div class="letter-05"><svg-icon name="letter-I" class="letter-icon"/></div>
    <div class="letter-06"><svg-icon name="letter-N" class="letter-icon"/></div>
    <div class="letter-07"><svg-icon name="letter-G" class="letter-icon"/></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "AppLoading",
})
</script>

<style scoped>
/*=====================================
    loading-bg
=====================================*/
.loading-bg {
  pointer-events: none;
  position: fixed;
  width: calc(100% + 192px);
  height: calc(100% + 192px);
  left: 0;
  top: 0;
  background-image: url(@/assets/image/bg.png);
  -webkit-background-size: 192px 192px;
          background-size: 192px;
  -webkit-animation: body-bg 5s linear 0s infinite normal;
          animation: body-bg 5s linear 0s infinite normal;
  z-index: 1000; }

@keyframes body-bg {
  0% {
    -webkit-transform: translate(-192px, -192px);
            transform: translate(-192px, -192px); }
  100% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0); } }

/*=====================================
    loading
=====================================*/
.site-loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 1em;
  width: 20rem;
  height: 3em;
  z-index: 10000;
  pointer-events: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-animation: loading 1.5s linear 0s infinite alternate;
          animation: loading 1.5s linear 0s infinite alternate;
  -webkit-transition: all .2s;
  transition: all .2s;
  opacity: 1; }

.site-loading > * + * {
  margin-left: 0.25rem; }

@keyframes loading {
  0% {
    -webkit-transform: translateY(-20%);
            transform: translateY(-20%);
    -webkit-animation-timing-function: ease-in-out;
            animation-timing-function: ease-in-out; }
  100% {
    -webkit-transform: translateY(20%);
            transform: translateY(20%); } }

.site-loading > div {
  -webkit-box-flex: 1;
      -ms-flex: 1 0 0px;
          flex: 1 0 0;
  -webkit-animation: loading-child 1.5s linear 0s infinite alternate;
          animation: loading-child 1.5s linear 0s infinite alternate; }

@keyframes loading-child {
  0% {
    -webkit-transform: scale(1) rotate(0deg);
            transform: scale(1) rotate(0deg);
    -webkit-animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1); }
  100% {
    -webkit-transform: scale(0.6) rotate(-370deg);
            transform: scale(0.6) rotate(-370deg); } }

.letter-icon {
  width: 4rem;
  height: 4rem;
}

.site-loading > div:nth-child(1) {
  -webkit-animation-delay: 0.5s;
          animation-delay: 0.5s; }

.site-loading > div:nth-child(2) {
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s; }

.site-loading > div:nth-child(3) {
  -webkit-animation-delay: 0.7s;
          animation-delay: 0.7s; }

.site-loading > div:nth-child(4) {
  -webkit-animation-delay: 0.8s;
          animation-delay: 0.8s; }

.site-loading > div:nth-child(5) {
  -webkit-animation-delay: 0.9s;
          animation-delay: 0.9s; }

.site-loading > div:nth-child(6) {
  -webkit-animation-delay: 1s;
          animation-delay: 1s; }

.site-loading > div:nth-child(7) {
  -webkit-animation-delay: 1.1s;
          animation-delay: 1.1s; }

body.loaded .site-loading {
  opacity: 0; }
</style>