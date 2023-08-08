<template>
  <div class="head-menus">
    <el-dropdown ref="dropdown" trigger="contextmenu" @command="onCommand">
      <div class="user" @click="onClickUser">
        <el-avatar
          :size="28"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="ml-2">超级管理员</span>
        <span class="i-mdi:menu-down text-5"></span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="menu in menus" :key="menu.key" :command="menu.key">
            {{ menu.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
const { push, replace } = useRouter()
const userStore = useUserStore()

const dropdown = ref<any>(null)

interface MenuItem {
  name: string
  key: Command
}

enum Command {
  ToAccount,
  Logout
}

const menus: MenuItem[] = [
  {
    name: '账户中心',
    key: Command.ToAccount
  },
  {
    name: '退出登录',
    key: Command.Logout
  }
]

function onClickUser() {
  dropdown.value.handleOpen()
}

function onCommand(command: Command) {
  if (command === Command.ToAccount) {
    push({ path: '/account/AccountCenter' })
  }

  if (command === Command.Logout) {
    userStore.logout()
  }
}
</script>

<style scoped lang="scss">
.head-menus {
  display: flex;
  align-items: center;
  padding: 0 120rpx;

  .user {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 2px 10px;
    color: #2c3e50;
    border-radius: 8px;
    white-space: nowrap;
    margin: 0 8px;
    &:hover {
      background-color: #eee;

      span {
        color: #000;
      }
    }
  }
}
</style>
