<template>
  <section class="content-wrapper">
    <div class="block-one">
      <div class="block-title">上传视频</div>
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
    </div>
  </section>
</template>
<script setup lang="ts">
import UploadVideoAndPlay from '@/components/element-plus/UploadVideoAndPlay.vue'

const handleUploadSuccess = (data: { file: File; url: string }) => {
  console.log('上传成功:', data)
  // 这里可以处理上传成功后的逻辑，如保存视频URL到数据库
}
</script>
<style lang="scss" scoped>
@use './common-style.scss';
.flex-wrapper {
  display: flex;
  gap: 2em;
  .video-item {
    width: 50%;
    .item-title {
      text-align: center;
    }
    .video-upload-container {
      height: 500px;
    }
  }
}
</style>
