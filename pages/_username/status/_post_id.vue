<template>
    <div>
        <p>test</p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'IndexPage',
    head: {
        title: 'my website title',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'my website description'
            },
            { property: 'og:title', content: '<ページタイトルを記載>' },
            { property: 'og:description', content: '<descriptionを記載>' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    validate({params}) {
        // post_idが数字以外は認めない
        let valid_id = /^\d+$/.test(params.post_id)
        // usernameが英数字と_以外は認めない
        let valid_username = /^\w+$/.test(params.post_id)
        return valid_id && valid_username;
    },
    async asyncData ({ params }) {
        // CORS対策にProxyに記述してある
        const { data: twitter } = await axios.get(`/api/${params.username}/status/${params.post_id}`);
    },
}

</script>