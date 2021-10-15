<template>
  <div style="height: 100%">
<!--    <h2>Dashboard</h2>-->
<!--    <el-button @click.native.prevent="logout">注销</el-button>-->
<!--    <el-button @click.native.prevent="getUserInfo">获取用户信息</el-button>-->
    <el-container style="height: 100%">
      <el-aside width="205px">
        <el-menu text-color="#bfcbd9" class="sidebar-container" style="text-align: left">
          <el-submenu :index="item.name" v-for="item in menuList">
            <template slot="title">
              <svg-icon slot="prefix" :icon-class="item.meta.icon"/>
              {{ item.meta.title }}
            </template>
            <el-menu-item :index="child.name" v-for="child in item.children" style="text-align: center" @click="selectMenu(item.path,child.path)">
              <template slot="title">
                <svg-icon slot="prefix" :icon-class="child.meta.icon"/>
                {{ child.meta.title }}
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <span>Jeff</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item @click.prevent.native="logout">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
<!--          通过router-view引入子路由system/user-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {removeToken} from "../utils/auth";
import Config from "../settings";

export default {
  name: "Dashboard",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      menuList:[]
    }
  },
  created() {
    this.getMenus()
  },
  methods:{
    logout(){
      this.$request.delete('http://localhost:8000/auth/logout').then(res=>{
        removeToken(Config.TokenKey)
        this.$router.replace('/')
      })
    },
    selectMenu(path1, path2) {
      this.$router.replace(path1 + '/' + path2).catch(err => err)
    },
    getMenus() {
      this.$request.get('http://localhost:8000/api/menus/build').then(res => {
        this.menuList = res.data
        console.log(this.menuList);
      })
    }
  }
}
</script>

<style scoped>

</style>
