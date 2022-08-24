<template>
    <input type="text" placeholder="enter name" v-model="cellData.value.atributtes.name" />
</template>


<script>

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
    addSubstructure() {
      this.node.children.push({
        name: "Substructure",
        type: "Substructure",
        children: []
      });
    },
    addAggregation() {
      this.node.children.push({
        name: "Aggregation",
        type: "Aggregation",
        children: []
      });
    },
    addIteration() {
      this.node.children.push({
        name: "Iteration",
        type: "Iteration",
        children: []
      });
    },
    addSpecialisation() {
      this.node.children.push({
        name: "Specialisation",
        type: "Specialisation",
        children: []
      });
    },
    addDataField() {
      this.node.children.push({
        name: "Data Field",
        type: "Data Field",
        operation: "Operation",
        domain: "Domain",
        example: ["Example: Tyrell", "Example: 256", "Example: €100", "Example: 31/09/2020"],
        children: []
      });
    },
    addReferenceField() {
      this.node.children.push({
        name: "Reference Field",
        type: "Reference Field",
        operation: "Operation",
        domain: "Domain (Object)",
        example: "Example: A513, Tyrell",
        children: []
      });
    }
  }
};
</script>
