<template>
  <div class="home">
    <STT></STT>
    <TTS></TTS>
  </div>
</template>

<script lang="ts">
import STT from "@/components/STT.vue";
import TTS from "@/components/TTS.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { STT, TTS },
})
export default class Home extends Vue {}
</script>
