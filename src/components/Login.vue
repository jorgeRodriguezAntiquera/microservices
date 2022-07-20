<template>
    <div id="login" style="background-color: cadetblue;">
        <h4>Login</h4>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" >Login</button>
        <button type="button">Register</button>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
           
        }
    }
</script>

<style >
    #login {
        width: 600px;
        border: 1px solid #CCCCCC;
        background-color: #e40505;
        margin: auto;
        margin-top: 100px;
        padding: 20px;
    }
    
</style>