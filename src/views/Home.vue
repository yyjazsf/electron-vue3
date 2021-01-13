<template>
  <div class="agora-demo">
    <el-form :inline="true" :model="form" >
      <el-form-item label="uid">
        <el-input v-model.number="form.uid" placeholder="uid"></el-input>
      </el-form-item>
       <el-form-item label="token">
        <el-input v-model.number="form.token" placeholder="uid"></el-input>
      </el-form-item>
      <el-button-group>
        <el-button type="primary">加入</el-button>
        <el-button type="danger">退出</el-button>
      </el-button-group>
    </el-form>
    <div class="class">
      <div class="wrap-video">
        <div class="teacher video" ref="localVideo"></div>
        <p>老师</p>
      </div>
      
      <div class="wrap-video" v-for="uid in students" :key="uid" >
        <div :id="`client-video-container-${uid}`">
          {{student}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {ElMessage} from 'element-plus'
import Agora from '@/utils/agora'

// Math.floor(Math.random()*(100000-0)+1)

export default defineComponent({
  name: 'Home',
  components: {
  },
  data() {
    return {
      students: [] as number[],
      form: {
        uid: 0,
        token: '00607c87cea43744f39a0ecc0283d07fa75IAAB6Rv6huUj/aKhCvV63qz4uuKrfJIaScYP/5HqQGpspU5ptMcAAAAAEAAlICC+x97+XwEAAQDG3v5f'
      }
    }
  },
  mounted() {
    const agora = new Agora({
      localVideoContainer: this.$refs.localVideo as HTMLDivElement,
      onAddUserVideoContiner:(uid: number) => {
        return new Promise((resolve) => {
          this.students.push(uid)
          this.$nextTick(() => {
            resolve(document.getElementById(`client-video-container-${uid}`))
          })
        })
      }
    })

    const ok = agora.onJoinChannel({
      token: this.form.token,
      channel: 'ipalfish',
      uid: this.form.uid++
    })
    if(ok) {
      ElMessage({
        message: '渠道 ipalfish 加入成功',
        type: 'success'
      })
    }
  }
});
</script>
<style lang="scss">
.agora-demo {
  .wrap-video {
    width: 150px;
    height: 150px;
  }
  .video {
    width: 100%;
    height: 100%;
  }
}
</style>
