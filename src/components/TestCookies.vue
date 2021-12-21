<template>
    <div>Test</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Cookies from 'js-cookie'

export default defineComponent({
    name: 'TestCookie',
    setup() {
        let neededAttributes = {
            path: '/',
            domain: '.music.163.com'
        }

        const cookieNames = ref([])

        // Cookies.remove('JSESSIONID-WYYY', neededAttributes)
        for (let cookieName in Cookies.get()) {
            cookieNames
        }
    },
})
</script>
