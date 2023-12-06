<template>
    <div>
        <Navbar/>
        <router-view></router-view>
        <Footer/>
    </div>
</template>
<script>
import Navbar from "../components/navbar.vue"
import Footer from "../components/foot.vue"

export default {
    components:{
        Footer,
        Navbar
    }
}
</script>
<style>
    
</style>