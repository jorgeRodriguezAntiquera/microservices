<template>
    <div spellcheck="false" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; width: 210px; margin-top: 0px;">
        
        <div v-if="cellData && (cellData.value.definition == 'Relation') && cellData.value">
            <div style="text-align: center; padding-bottom: 8px;">
                <strong style="color: #C0C0C0">Precedence Relation</strong>
            </div>
        </div>        
        
        <div v-if="cellData && (cellData.value.definition != 'Relation') && cellData.value">


            <div v-if="cellData && (cellData.value.definition == 'Interaction') && (cellData.value.removeSelection == 0) && cellData.value">
                <div style="text-align: center; padding-bottom: 8px;">
                    <strong style="color: #C0C0C0">Relation</strong>
                </div>
            </div>

            <div v-if="cellData && (cellData.value.definition == 'Actor') && cellData.value">
                <div style="text-align: center; padding-bottom: 8px;">
                    <strong style="color: #C0C0C0">Actor</strong>
                </div>
            </div>

            <div v-if="cellData && ((cellData.value.reference == 'Event Type 1') || (cellData.value.reference == 'Event Type 3')) && cellData.value">
                <div style="text-align: center;">
                    <strong style="color: #C0C0C0">Class</strong>
                </div>
            </div>

            <div v-if="cellData && (cellData.value.reference == 'Event Type 2') && cellData.value">
                <div style="text-align: center; padding-bottom: 8px;">
                    <strong style="color: #C0C0C0">Specialised Communicative Event</strong>
                </div>
            </div>            

        <div v-if="cellData && (cellData.value.removeSelection != 1) && cellData.value">    
            

            <div>
                <!-- <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Identifier:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Identifier" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.identifier"/>
                </div> -->
                <!-- <div style="color: #C0C0C0; padding-bottom: 2px; padding-top: 5px;">
                    Name:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Name" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.name"/>
                           
                        
                </div> -->

            </div>
        </div>


        <div v-if="cellData && (cellData.value.removeSelection == 1) && cellData.value" style="text-align: center; color: #C0C0C0; line-height: 500px;">
            <strong style="text-align: center; color: #C0C0C0; font-size: 11px;">
                No object selected
            </strong>
        </div>
        
        </div>
        <div v-if="cellData && (cellData.value.definition == 'Event') && cellData.value">
            <div>
                <div style="padding-bottom: 5px;">
                <strong style="color: white;"><i class='fas fa-quote-left'/> General Description</strong>
            </div>
                <div style="color: #C0C0C0; padding-bottom: 2px; padding-top: 5px;">
                    Name:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Name" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.name"/>
                           
                        
                </div>
                <div style="color: #C0C0C0; padding-bottom: 2px; padding-top: 5px;">
                    Stereotypes:
                </div>
                <div style="display: flex;">
                    <select @focus="$event.target.select()" type="text" placeholder="Stereotypes" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.stereotype">
                        <option disabled value="">Please select one</option>
                        <option>None</option>
                        <option>Entity</option>
                        <option>ValueObject</option>
                        <option>Aggregate</option>
                        <option>Repository</option>
                        <option>Service</option>
                    </select>
                    
                </div>
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Description:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Description" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.description"/>
                </div>                                               
            </div>
           <!--  <div style="padding-bottom: 5px; padding-top: 7px;">
                <strong style="color: white;"><i class='fas fa-bell'/> Atributte</strong>
            </div> -->
            <div>
                 <!-- <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Name Atributte:
                </div>  -->
                <div style="display: flex;">

                  <!-- <input @focus="$event.target.select()" type="text" placeholder="Name Atributte" style="outline: none; pointer-events: auto; width : 50%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change" v-model="cellData.value.channel"/>


                    <Select @focus="$event.target.select()" type="text" placeholder="Atributte" style="outline: none; pointer-events: auto; width : 50%; margin-left: 5%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                    v-model="cellData.value.structuralConstraints">

                    <option disabled value="">Please select one</option>
                    <option>int</option>
                    <option>float</option>
                    <option>double</option>
                    <option>string</option>
                    <option>boolean</option>
                    </select>  
  
                     -->
                <!-- <div class="work-experiences">
                    <div class="form-row" style="display: flex;" v-for="(experience, index) in workExperiences" :key="index">
                        <div class="form-group row-md-6">
                            <div>
                                <input v-model="experience.company" :name="`workExperiences[${index}][company]`" type="text" class="form-control" placeholder="Atributte">
                                <button @click="addExperience" type="button" class="btn btn-secondary">Add</button>
                            </div>
                        </div>
                     </div>
                </div> -->

                
      </div>
<!-- 
      <div class="form-group">
        <button @click="addExperience" type="button" class="btn btn-secondary">Add</button>
      </div> -->

                  
                          
            </div>
           <!--  <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Temporal Restrictions:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Temporal Restrictions" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.temporalRestrictions"/>
                </div>                                               
            </div> -->
            <!-- <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Frequency:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Frequency" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.frequency"/>
                </div>                                               
            </div> -->
             <!-- <div style="padding-bottom: 5px; padding-top: 7px;">
                <strong style="color: white;"><i class='fas fa-bell'/> Methods</strong>
            </div>
            <div class="work-experiences">
                    <div class="form-row" style="display: flex;" v-for="(experience, index) in methods" :key="index">
                        <div class="form-group row-md-6">
                            <div>
                                <input v-model="experience.company" :name="`methods[${index}][company]`" type="text" class="form-control" placeholder="method">
                                <button @click="addMethod" type="button" class="btn btn-secondary">Add</button>
                            </div>
                        </div>
                     </div>
                </div> -->
            <!-- <div>
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Methods:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Method" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.contextConstraints"/>
                </div>                                               
            </div>  -->
            <!-- <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Structural Constraints:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Structural Constraints" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.structuralConstraints"/>
                </div>                                               
            </div> -->
            <!-- <div style="padding-bottom: 5px; padding-top: 7px;">
                <strong style="color: white;"><i class='fas fa-comments'/> Reaction Requirements</strong>
            </div> -->
            <!-- <div>
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Treatment:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Treatment" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.treatment"/>
                </div>                                               
            </div> -->
            <!-- <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Linked Communication:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Linked Communication" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.linkedCommunication"/>
                </div>                                               
            </div> -->
            <!--  -->
            
        </div>

        <div style="text-align: center; color: #C0C0C0; line-height: 500px;" v-else>
            <div v-if="cellData && (cellData.value.definition !== 'Event') && cellData.value">
                <!-- Does not apply -->
            </div>
            <strong style="text-align: center; color: #C0C0C0; font-size: 11px;" v-else>
                No object selected
            </strong>
        </div>

          <div v-if="cellData && (cellData.value.definition == 'Atributte') && cellData.value">
            <div style="padding-bottom: 5px; padding-top: 7px;">
                <strong style="color: white;"><i class='fas fa-bell'/> Atributte</strong>
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Atributte:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Attribute(type)" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.atributte1"/>
                </div>                                               
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Atributte:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Attribute(type)" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.atributte2"/>
                </div>                                               
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Atributte:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Attribute(type)" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.atributte3"/>
                </div>                                               
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Atributte:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Attribute(type)" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.atributte4"/>
                </div>                                               
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Atributte:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Attribute(type)" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.atributte5"/>
                </div>                                               
            </div>
         </div> 


         <div v-if="cellData && (cellData.value.definition == 'Method') && cellData.value">
            <div style="padding-bottom: 5px; padding-top: 7px;">
                <strong style="color: white;"><i class='fas fa-bell'/> Method</strong>
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Method:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Method" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.method1"/>
                </div>                                               
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Method:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Method" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.method2"/>
                </div>                                               
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Method:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Method" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.method3"/>
                </div>                                               
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Method:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Method" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.method4"/>
                </div>                                               
            </div>
            <div style="padding-top: 5px;">
                <div style="color: #C0C0C0; padding-bottom: 2px;">
                    Method:
                </div>
                <div style="display: flex;">
                    <input @focus="$event.target.select()" type="text" placeholder="Method" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.method5"/>
                </div>                                               
            </div>
         </div> 

        <div v-if="cellData && (cellData.value.definition == 'Interaction') && (cellData.value.removeSelection == 0) && cellData.value">   
        <div style="color: #C0C0C0; padding-bottom: 2px; padding-top: 5px;">
                    Relation:
                </div>
                <div style="display: flex;">
                    <select @focus="$event.target.select()" type="text" placeholder="Stereotypes" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.rel">
                        <option disabled value="">Please select one</option>
                        <option>Association</option>
                        <option>Inheritance</option>
                        <option>Dependency</option>
                        <option>Aggregation</option>
                        <option>Composition</option>
                        
                    </select>
                    
                </div>         
            <!-- <div style="margin-top: 7px;">
                <strong style="color: white;"><i class='fas fa-envelope'/> Message Structure</strong>
            </div>
            <div style="overflow: auto; height: 400px; width: 100%;">
                <ul>
                    <li><node :node="cellData.value.messageStructure" no-remove style="margin-top: -5px;"/></li>
                </ul>
            </div> -->
        </div>
        
    </div>

    
</template>

<script>
    import debounce from '../helpers/debounce'
    import Node from "./Node.vue";

    // Prevent error
    document.onkeydown = function(evt) {
        if ((evt.ctrlKey || evt.metaKey) && (evt.keyCode === 89 || evt.keyCode === 90)) {
            return false;
        } else {
            return true;
        }
    };

    

    export default {
        name: 'EditForm',
        components: {Node},
        props: {
            cellData: {
                type: Object
            }
        },
        data: () => ({
    workExperiences: [
      {
        company: "",
      }
    ],
    methods: [
        {
            method: "",
        }
    ]
  }),
        
    
  
        methods: {
            // Eliminate frequent requests
            debounce_change: debounce(function () {
               // Report changes
                this.$emit('change', this.cellData.value);
            }, 200),
            addExperience () {
      this.workExperiences.push({
        company: '',
        title: ''
      })
    },
    addMethod(){
        this.methods.push({
            method: "",
        })

    }
            
        }
       
  
       
    }       
    

  

  

       

    
</script>

<style>
.work-experiences > div {
  margin: 0px 0;
  padding-bottom: 0px;
}
.work-experiences > div:not(:last-child) {
  border-bottom: 1px solid rgb(206, 212, 218);
}
</style>
