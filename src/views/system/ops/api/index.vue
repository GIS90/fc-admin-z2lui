<template>
  <el-tree
      style="max-width: 600px"
      :data="data"
      :props="defaultProps"
      :current-node-key="0"
      @node-click="handleNodeClick"
  />
</template>

<script lang="ts" setup>
interface Tree {
  id: number,
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    id: 0,
    label: 'Level one 1'
  },
  {
    id: 1,
    label: 'Level one 2',
  },
  {
    id: 2,
    label: 'Level one 3',
  },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>
