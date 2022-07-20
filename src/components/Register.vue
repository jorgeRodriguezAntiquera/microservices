<template>
    <div id="login" style="background-color: cadetblue;">
        <h4>Register</h4>
        <div style="color: black; padding-bottom: 2px; padding-top: 5px;">
                    Name:
                </div>
        <input type="text" name="username" v-model="input.username" placeholder="Name" />
        <div style="color: black; padding-bottom: 2px; padding-top: 5px;">
                    LastName:
                </div>
        <input type="text" name="lastname" v-model="input.lastname" placeholder="LastName" />
        <div style="color: black; padding-bottom: 2px; padding-top: 5px;">
                    Mail:
                </div>
        <input type="text" name="mail" v-model="input.mail" placeholder="Mail" />
        <div style="color: black; padding-bottom: 2px; padding-top: 5px;">
                    Password:
                </div>
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        
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
                    lastname: "",
                    mail: "",
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
        width: 300px;
        border: 1px solid #CCCCCC;
        background-color: #e40505;
        margin: auto;
        margin-top: 100px;
        padding: 20px;
    }
    
</style>