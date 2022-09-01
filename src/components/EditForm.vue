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
           
            <div>
                 
                <div style="display: flex;">

                  

                
      </div>

      

                  
                          
            </div>
           
            
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
                                                        
            </div>

             <div style="overflow: auto; height: 400px; width: 100%;">
                <ul>
                    <li><node :node="cellData.value.atributtes" no-remove style="margin-top: -5px; padding-left: 0px;"/></li>
                </ul>

                 
            </div> 
            <!-- <console.log>{{cellData.value.atributtes}}</console.log> -->
        

    


         </div> 


         <div v-if="cellData && (cellData.value.definition == 'Method') && cellData.value">
            <div style="padding-bottom: 5px; padding-top: 7px;">
                <strong style="color: white;"><i class='fas fa-bell'/> Method</strong>
            </div>
            
            <div style="overflow: auto; height: 400px; width: 100%;">
                <ul>
                    <li><node :node="cellData.value.methods" no-remove style="margin-top: -5px; padding-left: 0px;"/></li>
                </ul>

            </div>
            <!-- <console.log>{{cellData.value.methods}}</console.log> -->
         </div> 






        <div v-if="cellData && (cellData.value.definition == 'Interaction') && (cellData.value.removeSelection == 0) && cellData.value">   
        <div style="color: #C0C0C0; padding-bottom: 2px; padding-top: 5px;">
                    Relation:
                </div>
                <div style="display: flex;">
                    <!-- <select @focus="$event.target.select()" type="text" placeholder="Stereotypes" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.name">
                        <option disabled value="">Please select one</option>
                        <option>Association</option>
                        <option>Inheritance</option>
                        <option>Dependency</option>
                        <option>Aggregation</option>
                        <option>Composition</option>
                        
                    </select> -->
                    <input @focus="$event.target.select()" type="text" placeholder="Description" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;" @input="debounce_change"
                           v-model="cellData.value.name"/>
                    <!-- <console.log>{{cellData.value.name}}</console.log> -->
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
    import GraphWrapper from "./GraphWrapper.vue"

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
        
  
        methods: {
            // Eliminate frequent requests
            debounce_change: debounce(function () {
               // Report changes
                this.$emit('change', this.cellData.value);
            }, 200),
           
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
