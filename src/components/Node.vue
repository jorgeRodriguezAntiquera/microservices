<template>
  <div style="white-space: pre;">
    <!-- All -->
    <div>
    <input style="padding-top: 6px; padding-left: 0px; width : 90px;" type="text" placeholder="enter name" v-model="node.name" />
    <button @click="addChild">add</button>
    <!-- <console.log>{{node}}</console.log> -->
    
    <button v-if="!noRemove" @click="$emit('remove');" style="width:50px">delete</button>
    <ul  style="padding-top: 6px; padding-left: 0px;" v-if="node.children">
      <li v-for="(child, index) in node.children" :key="index" style="padding-top: 6px; padding-left: 0px;">
        <node :node="child" @remove="remove(index);"></node>
      </li>
    </ul>
  </div>
    <!-- <a class="container" v-if="node.type != 'Data Field' && node.type != 'Reference Field'">
      <a disabled class="a" id='iconInput'><i class="fas fa-list-ul"></i></a>
      <input type="text" :placeholder="node.type" v-model="node.name" style="width : 104px; padding-bottom: 4px;" class="messageStructures"/>
      <br>
      <a class="div">
        <a @click="addDataField" title="Add Data Field" id="data-field" class="a"><i class="far fa-sticky-note"></i></a>
        <a @click="addReferenceField" title="Add Reference Field" id="reference-field" class="a"><i class="far fa-dot-circle"></i></a>
        <a @click="addSubstructure" title="Add Substructure" id="substructure" class="a" style="margin-left: 0px;"><i class="far fa-list-alt"></i></a>
        <a @click="addAggregation" title="Add Aggregation" id="aggregation" class="a"><i class="far fa-plus-square"></i></a>
        <a @click="addIteration" title="Add Iteration" id="Iteration" class="a"><i class="far fa-check-circle"></i></a>
        <a @click="addSpecialisation" title="Add Specialisation" id="specialisation" class="a"><i class="fas fa-bars"></i></a>
        <a v-if="!noRemove" @click="$emit('remove');" title="Delete" class="a"><i class="fas fa-eraser"></i></a>
      </a>
    </a> -->
    <!-- Data Field -->
    <!-- <a v-if="node.type == 'Data Field'">
      <a class="container">
        <a disabled class="a" id='iconInput'><i class="far fa-folder-open"></i></a>
        <input type="text" :placeholder="node.type" v-model="node.name" class="messageStructures"/>
        <a class="div" style="margin-top: -2px;">
          <a v-if="!noRemove" @click="$emit('remove');" title="Delete" class="a"><i class="fas fa-eraser"></i></a>
        </a>
      </a>
      <div class="subclass" style="padding-top: 2px; padding-bottom: 3px;">
        <i class="fas fa-chevron-down" id="iconSelect1"></i>
        <select v-model="node.operation" name="Operation" class="select" style="width: 90px">
          <option selected="true" disabled="disabled">Operation</option>
          <option value="Input">Input</option>
          <option value="Generation">Generation</option>
          <option value="Derivation">Derivation</option>
        </select>
      </div>
      <div class="subclass" style="padding-bottom: 2px;">
        <i class="fas fa-chevron-down" id="iconSelect2"></i>
        <select v-model="node.domain" name="Domain" class="select" style="width: 90px">
          <option selected="true" disabled="disabled">Domain</option>
          <option value="Text">Text</option>
          <option value="Number">Number</option>
          <option value="Money">Money</option>
          <option value="Date">Date</option>
        </select>
      </div>
      <a v-if="node.domain == 'Text'">
        <div class="subclass">
          <i class="far fa-comment" id="iconSelect3"></i>
          <input type="text" placeholder='Example' v-model="node.example[0]" class="example">
        </div>
      </a>
      <a v-if="node.domain == 'Number'">
        <div class="subclass">
          <i class="far fa-comment" id="iconSelect3"></i>
          <input type="text" placeholder='Example' v-model="node.example[1]" class="example">
        </div>
      </a>
      <a v-if="node.domain == 'Money'">
        <div class="subclass">
          <i class="far fa-comment" id="iconSelect3"></i>
          <input type="text" placeholder='Example' v-model="node.example[2]" class="example">
        </div>
      </a>
      <a v-if="node.domain == 'Date'">
        <div class="subclass">
          <i class="far fa-comment" id="iconSelect3"></i>
          <input type="text" placeholder='Example' v-model="node.example[3]" class="example">
        </div>
      </a>
    </a> -->
    <!-- Reference Field -->
    <!-- <a v-if="node.type == 'Reference Field'">
      <a class="container">
        <a disabled class="a" id='iconInput'><i class="far fa-folder-open"></i></a>
        <input type="text" :placeholder="node.type" v-model="node.name" class="messageStructures"/>
        <a class="div" style="margin-top: -2px;">
          <a v-if="!noRemove" @click="$emit('remove');" title="Delete" class="a"><i class="fas fa-eraser"></i></a>
        </a>
      </a>
      <div class="subclass" style="padding-top: 2px; padding-bottom: 3px;">
        <i class="fas fa-chevron-down" id="iconSelect1"></i>
        <select v-model="node.operation" name="Operation" class="select" style="width: 90px">
          <option selected="true" disabled="disabled">Operation</option>
          <option value="Input">Input</option>
          <option value="Generation">Generation</option>
          <option value="Derivation">Derivation</option>
        </select>
      </div>
      <div class="subclass" style="padding-bottom: 2px;">
        <i class="far fa-user-circle" id="iconSelect2"></i>
        <input type="text" placeholder='Domain (Object)' v-model="node.domain" class="example">
      </div>
      <div class="subclass" style="padding-bottom: 2px;">
        <i class="far fa-comment" id="iconSelect3"></i>
        <input type="text" placeholder='Example' v-model="node.example" class="example">
      </div>
    </a>  

    <ul style="padding-top: 6px; padding-left: 15px;" v-if="node.children">
        <li v-for="(child, index) in node.children" :key="index">
            <node :node="child" @remove="remove(index);"></node>
        </li>
    </ul> -->

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
    },
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
