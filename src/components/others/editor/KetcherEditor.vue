<template>
  <div class="ketcher-wrapper">
    <iframe
      ref="ketcherIframe"
      class="ketcher-iframe"
      :src="ketcherIframeSrc"
      frameborder="0"
      sandbox="allow-scripts allow-same-origin"
    ></iframe>

    <div class="controls">
      <button @click="setMolecule">setMolecule</button>
      <button @click="getSmiles">getSmiles</button>
      <button @click="getMolfile">getMolfile</button>
      <button @click="exportPicture">导出图片</button>
    </div>
  </div>
</template>

<script setup>
const ketcherIframe = useTemplateRef('ketcherIframe')
const emit = defineEmits(['export-picture'])
// 根据环境变量配置路径
const ketcherIframeSrc = import.meta.env.VITE_KETCHER_PATH
// let ketcher = ref(null)

let imageUrl = ref(null)

// setMolecule()
// This method updates the current structure in the editor. Pass it a SMILES string or a Molfile/Rxnfile:
const setMolecule = () => {
  const ketcher = ketcherIframe?.value?.contentWindow?.ketcher
  ketcher.setMolecule('c1ccccc1')
}

// Exports current structure as a SMILES string.
const getSmiles = async () => {
  const ketcher = ketcherIframe?.value?.contentWindow?.ketcher
  const SMILES = await ketcher.getSmiles()
  console.log('SMILES', SMILES)
  return SMILES
}

// Exports current structure as a Molfile/Rxnfile string.
const getMolfile = async () => {
  const ketcher = ketcherIframe?.value?.contentWindow?.ketcher
  const MOLFILE = await ketcher.getMolfile()
  console.log('MOLFILE', MOLFILE)
  return MOLFILE
}

const exportPicture = async () => {
  const ketcher = ketcherIframe?.value?.contentWindow?.ketcher
  const SMILES = await ketcher.getSmiles()
  console.log(SMILES)

  const blob = await ketcher.generateImage(SMILES, {
    outputFormat: 'png',
    // backgroundColor: '',
    bondThickness: 5,
  })

  // 创建对象 URL
  const newblob = new Blob([blob], { type: 'image/png' })
  imageUrl.value = URL.createObjectURL(newblob)

  emit('export-picture', imageUrl.value)
}

onUnmounted(() => {
  URL.revokeObjectURL(imageUrl.value)
})
</script>

<style scoped>
.ketcher-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.ketcher-iframe {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.output {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
