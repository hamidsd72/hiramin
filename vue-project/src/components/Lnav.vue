<template>
    <div class="Lnav">
        <div v-if="!$store.state.isAuthenticated" class="wheat col-lg-8 mx-auto" >
            <div v-if="action=='login'">
                <button class="border p-2 redu20 bg-light" @click="changeAction('register')">BackToRegister</button><hr>
                <h4>LogIn</h4>
                <hr>
                <input class="form-control text-right" :class="{'is-invalid':usernameE===true}" type="text" name="username" placeholder="UserName" v-model="username" >
                <div class="invalid-feedback" v-if="usernameE">{{usernameEM}}</div><br>
                <input class="form-control text-right" :class="{'is-invalid':passwordE===true}" type="text" name="password" placeholder="Password" v-model="password" >
                <div class="invalid-feedback" v-if="passwordE">{{passwordEM}}</div><br>
                <button class="btn btn-block btn-success" @click="DoLogin" >LogIn</button>
            </div> 
            <div v-else-if="action=='register'">
                <button class="border p-2 redu20 bg-light" @click="changeAction('login')">BackToLogin</button><hr>
                <h4>SignUp</h4>
                <hr>
                <input class="form-control text-right" :class="{'is-invalid':usernameE===true}" type="text" name="username" placeholder="UserName" v-model="username" ><br>
                <div class="invalid-feedback" v-if="usernameE">{{usernameEM}}</div>
                <input class="form-control text-right" :class="{'is-invalid':passwordE===true}" type="text" name="password" placeholder="Password" v-model="password" ><br>
                <div class="invalid-feedback" v-if="passwordE">{{passwordEM}}</div>
                <input class="form-control text-right" :class="{'is-invalid':passwordE===true}" type="text" name="password2" placeholder="ReplyPassword" v-model="password2" ><br>
                <button class="btn btn-block btn-success" @click="DoRegister" >SignUp</button>
            </div>
        </div>

        <div v-if="action!='edit'">
            <div v-if="$store.state.isAuthenticated">
                <img v-if="this.user.avatar" :src="user.avatar" alt="avatar" class="img-fixed rounded-circle">
                <img v-else :src="require('@/assets/edit.png')" alt="avatar" class="img-fixed rounded-circle">
            </div>
            <!-- <div class="d-flex flex-column justify-content-end bg-dark"> -->
            <div v-if="$store.state.isAuthenticated" class="d-flex align-items-center flex-column wheat" style="height: 500px;">  
                <div>
                    <div v-if="!this.user.avatar" class="custom-file col-10 mx-auto mt-2">
                        <input type="file" class="custom-file-input" accept="image/*" @change="changeAvatar($event)" >
                        <label class="custom-file-label text-left" for="customFile">ChangeAvatar</label>
                    </div>
                    <div v-else>
                        <!-- <button class="border redu20 p-2 mt-3 bg-danger" @click="removeAvatar">RemoveAvatar</button> -->
                    </div>

                    <button class="border redu20 bg-warning mt-3 p-2 pr-4 pl-4" @click="DoLogout" >LogOut</button>
                    <h4 class="mt-5">Trad</h4>
                </div>

                <button class="border redu20 mt-auto p-2 bg-light d-none d-lg-block" @click="changeAction('edit')">EditAccount</button><hr> 
                <button class="border redu20 p-2 bg-light d-lg-none" @click="changeAction('edit')">EditAccount</button>
            </div>
        </div>
        <div v-else-if="action=='edit'">
            <button class="border p-2 redu20 bg-light" @click="changeAction('login')">BackToMenu</button><hr>
            <h4 class="wheat">EditUser</h4>
            <hr>
            <div class="col-10 mx-auto">
                <input class="form-control text-right" type="text" name="username" placeholder="نام کاربری" v-model="user.username" ><br>
                <input class="form-control text-right" type="email" name="email" placeholder="ایمیل" v-model="user.email" ><br>
                <button class="btn btn-block btn-success" @click="DoEdit" >ChangeEdit</button>
            </div>
        </div>

    </div>
</template>

<script>
import axios  from 'axios'
export default {
    name: 'Lnav',
    props: {
        user: {},
    },
    data() {
        return {
            action: 'login',
            username: '',
            usernameE: null,
            usernameEM: null,
            password: '',
            passwordE: null,
            passwordEM: null,
            password2: '',
            passwordE2: null,
            passwordEM2: null,
        }
    },
    methods: {
        DoLogin() {
            let access = true
            if (this.username.length < 8) {
                access = false
                this.usernameE = true
                this.usernameEM = "Username must be at least 8 characters long."
                if (this.username.length == 0) {
                    this.usernameEM = "The username field is required."
                }
            } else {
                this.usernameE = false
                this.usernameEM = ""
            }

            if (this.password.length < 8) {
                access = false
                this.passwordE = true
                this.passwordEM = "Password must be at least 8 characters long."
                if (this.password.length == 0) {
                    this.passwordEM = "The password field is required."
                } 
            } else {
                this.passwordE = false
                this.passwordEM = ""
            }
            if (access) {
                axios.post('/api/auth/token/login/', {password: this.password, username: this.username})
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.commit("login", response.data.auth_token)
                            location.reload();
                        }
                    })
                    .catch(e => {
                        console.log(e.response.status, e.response.data)
                        this.usernameE  = true
                        this.passwordE  = true
                        this.usernameEM = e.response.data.non_field_errors.join(" ")
                    })
            }

        },
        DoRegister() {
            let access = true
            if (this.username.length < 8) {
                access = false
                this.usernameE = true
                this.usernameEM = "Username must be at least 8 characters long."
                if (this.username.length == 0) {
                    this.usernameEM = "The username field is required."
                }
            } else {
                this.usernameE = false
                this.usernameEM = ""
            }

            if (this.password.length < 8) {
                access = false
                this.passwordE = true
                this.passwordEM = "Password must be at least 8 characters long."
                if (this.password.length == 0) {
                    this.passwordEM = "The password field is required."
                }
            } else {
                this.passwordE = false
                this.passwordEM = ""
            }
            
            if (this.password2.length < 8) {
                access = false
                this.passwordE2 = true
                this.passwordEM2 = "Password must be at least 8 characters long."
                if (this.password2.length == 0) {
                    this.passwordEM2 = "The reply password field is required."
                }
            } else {
                this.passwordE2 = false
                this.passwordEM2 = ""
            }

            if (this.password != this.password2) {
                access = false
                this.passwordE = true
                this.passwordE2 = true
                this.passwordEM  = "The password values ​​entered are not the same."
            } else {
                if (!this.passwordE && !this.passwordE2) {                    
                    this.passwordEM = ""
                }
            }

            if (access) {
                axios.post('/api/auth/users/', {password: this.password, username: this.username})
                    .then(response => {
                        if (response.status == 201) {
                            axios.post('/api/auth/token/login/', {password: this.password, username: this.username})
                                .then(response => {
                                    if (response.status == 200) {
                                        this.$store.commit("login", response.data.auth_token)
                                        // location.reload();
                                    }
                                })
                                .catch(e => console.log(e.response.data) )
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        if (e.response.data.username) {
                            this.usernameE  = true
                            this.usernameEM = e.response.data.username.join(" ")
                        }else if (e.response.data.password) {
                            this.passwordE   = true
                            this.passwordE2  = true
                            this.passwordEM  = e.response.data.password.join(" ")
                        }
                    })
            }
        },
        DoEdit() {
            axios.patch(`/myuser/${this.user.id}/`,{
                email: this.user.email,
                username: this.user.username
                })
                .then(response => this.action = 'login')
                .catch(e => {console.log(e.response.status, e.response.data), alert('Difficulty sending user information')})
        },
        DoLogout() {
            this.$store.commit("logout")
            this.action = 'login'
        },
        changeAvatar(event) {
            let file   = event.target.files[0]
            let custom = file.slice(0, file.size); 
            this.avatar = new File([custom], this.user.id+'-'+file.name);
            
            const fd = new FormData();
            fd.append('avatar', this.avatar, this.avatar.name) 
            
            axios.patch(`/myuser/${this.user.id}/`,fd)
                .then(response => this.user.avatar = response.data.avatar )
                .catch(e => {console.log(e.response.status, e.response.data), alert('مشگل در ارسال اطلاعات کاربر')})
        },
        changeAction(action) {
            this.action = action
        }
    },
}
</script>
