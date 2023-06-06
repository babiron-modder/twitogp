<template>
    <div>
        <p>{{ $route }}</p>
        <p>{{ data }}</p>
    </div>
</template>

<script setup>
import { useHead } from "#app";

useHead({
  title: '<ページタイトル>',
  meta: [
    { property: 'og:title', content: '<ページタイトルを記載>' },
    { property: 'og:description', content: '<descriptionを記載>' }
  ]
});

definePageMeta({
    validate: async(route) => {
        // post_idが数字以外は認めない
        let valid_id = /^\d+$/.test(route.params.post_id)
        // usernameが英数字と_以外は認めない
        let valid_username = /^\w+$/.test(route.params.username)
        if(! (valid_id && valid_username)){
            return false;
        }

        const URL = `https://twitter.com/${route.params.username}/status/${route.params.post_id}`
        const { data, pending, refresh, error } = await useFetch(URL,{
            key: "cash", // POINT1
            //method: METHOD,
            // credentials: 'include', //POINT3
            // headers: HEADERS, //POINT4
            // params: params, // POINT5
            async onResponse({ request, response, options }) {
                console.log('onResponse log1', request, response.status)
                for (const header of response.headers.entries()) {
                    console.log('onResponse HEADER', header)
                }
            }, // POINT2
        })
        console.log(data)
        console.log(pending)
        console.log(refresh)
        console.log(error)
    }
})


</script>