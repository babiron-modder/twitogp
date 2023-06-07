
<script setup>
import { useHead } from "#app";

definePageMeta({
    validate: async(route) => {
        // post_idが数字以外は認めない
        let valid_id = /^\d+$/.test(route.params.post_id);
        // usernameが英数字と_以外は認めない
        let valid_username = /^\w+$/.test(route.params.username);
        if(! (valid_id && valid_username)){
            return false;
        }
        return true;
    }
});

const route = useRoute();
const URL = `/api/oembed?url=https%3A%2F%2Ftwitter.com%2F${route.params.username}%2Fstatus%2F${route.params.post_id}&widget=Tweet`;
const { data } = await useFetch(URL,{key: "cash", onResponse: ({ request, response, options }) => {
    let response_data = {};
    // 応答データの処理
    console.log("============================");
    console.log(response._data.html.match("<p lang=.+\">(.+)</p>")[0].replace(/<br>/g, "\n").replace(/<.+?>/g, ""));
    
    console.log("============================");

    response_data.text = response._data.html.match("<p lang=.+\">(.+)</p>")[0].replace(/<br>/g, "\n").replace(/<.+?>/g, "");

    
    useHead({
        title: 'TwitOGP',
        meta: [
            { property: 'og:title', content: 'Twitter' },
            { property: 'og:description', content: response_data.text },
            { property: 'og:image', content: `https://twitter.com/${route.params.username}/status/${route.params.post_id}/photo/1` },
            { property: 'og:image', content: `https://twitter.com/${route.params.username}/status/${route.params.post_id}/photo/2` },
            { property: 'og:image', content: `https://twitter.com/${route.params.username}/status/${route.params.post_id}/photo/3` },
            { property: 'og:image', content: `https://twitter.com/${route.params.username}/status/${route.params.post_id}/photo/4` },
        ]
    });

    return response_data;
}})





</script>


<template>
    <div>
        <p>{{ $route }}</p>
        <p>{{ data.text }}</p>
    </div>
</template>
