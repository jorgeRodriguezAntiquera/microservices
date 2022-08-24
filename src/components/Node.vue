<template>
  <div style="white-space: pre;">
    <!-- All -->
    <div>
    <input style="padding-top: 6px; padding-left: 0px; width : 90px;" type="text" placeholder="enter name" v-model="node.name" />
    <button @click="addChild">add</button>
     <!-- <console.log>{{node}}</console.log>  -->
    
    <button v-if="!noRemove" @click="$emit('remove');" style="width:50px">delete</button>
    <ul  style="padding-top: 6px; padding-left: 0px;" v-if="node.children">
      <li v-for="(child, index) in node.children" :key="index" style="padding-top: 6px; padding-left: 0px;">
        <node :node="child" @remove="remove(index);"></node>
      </li>
    </ul>
  </div>
    

  </div>
</template>

<script>

// Based on https://codesandbox.io/s/0y7jw79ljn

export default {
  name: "node",
  props: {
    node: {
      type: Object,
      required: true
    },
    noRemove: {
      type: Boolean
    }
  },
  methods: {
   
    remove(index) {
      this.node.children.splice(index, 1);
    },
    addChild() {
      this.node.children.push({
        name: "",
        children: []
      });
    }
  }
};
</script>
