<template>
  <section class="content-wrapper">
    <block-wrapper title="上传视频" tips="(仅支持XXX格式)">
      <div class="flex-wrapper">
        <div class="video-item">
          <h3 class="item-title">宣传视频</h3>
          <UploadVideoAndPlay
            :max-size="100"
            :accept-types="['video/mp4']"
            @upload-success="handleUploadSuccess"
          />
        </div>
        <div class="video-item">
          <h3 class="item-title">引导视频</h3>
          <UploadVideoAndPlay />
        </div>
      </div>
    </block-wrapper>
    <!-- <block-wrapper class="m-t" title="主页背景图" tips="(仅支持XXX格式)">
      <img src="" alt="" />
    </block-wrapper>
    <block-wrapper class="m-t" title="加载页背景图" tips="(仅支持XXX格式)">
      <img src="" alt="" />
    </block-wrapper> -->

    <block-wrapper class="m-t" title="上传课件" tips="(支持PDF格式文档,XXXM以内)">
      <Upload :auto-upload="true" trigger-text="本地上传" accept=".pdf" />
    </block-wrapper>
    <block-wrapper class="m-t" title="上传申报书" tips="(支持PDF格式文档,XXXM以内)">
      <Upload :auto-upload="true" trigger-text="本地上传" accept=".pdf" />
    </block-wrapper>
    <block-wrapper class="m-t" title="课程关键字" tips="(为课程添加关键字)">
      <el-input class="key-input" v-model="keyword" placeholder="添加知识点关键字" />
      <span>添加</span>
    </block-wrapper>
  </section>
</template>
<script setup lang="ts">
import UploadVideoAndPlay from '@/components/element-plus/UploadVideoAndPlay.vue'
import BlockWrapper from '../../components/BlockWrapper.vue'
import Upload from '@/components/element-plus/Upload.vue'

const keyword = ref('')
const handleUploadSuccess = (data: { file: File; url: string }) => {
  console.log('上传成功:', data)
  // 这里可以处理上传成功后的逻辑，如保存视频URL到数据库
}
</script>
<style lang="scss" scoped>
@use './common-style.scss';
.m-t {
  margin-top: 1em;
}
.flex-wrapper {
  display: flex;
  gap: 2em;
  .video-item {
    width: 50%;
    .item-title {
      position: relative;
      text-align: center;
      min-width: 400px;
      &::before {
        content: '';
        position: absolute;
        left: 20%;
        top: 50%;
        transform: translateY(-50%);
        width: 20%;
        height: 1px;
        background-color: #aeaeae;
      }
      &::after {
        content: '';
        position: absolute;
        right: 20%;
        top: 50%;
        transform: translateY(-50%);
        width: 20%;
        height: 1px;
        background-color: #aeaeae;
      }
    }
    .video-upload-container {
      height: 300px;
    }
  }
}
.key-input {
  width: 250px;
  margin-right: 1em;
}
</style>
