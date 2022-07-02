<template>
    <div spellcheck="false" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; width: 210px; margin-top: 10px;">
        
            <div>
                <div style="color: #C0C0C0; padding-bottom: 2px; padding-top: 5px;">
                        User Name:
                </div>
                <div style="display: flex; text-align: center;">
                    <div v-if="modelDetails">
                        <input @focus="$event.target.select()" type="text" placeholder="user name" style="outline: none; pointer-events: auto; width : 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px;"
                                @input="debounce_change" v-model="modelDetails.userName"/>
                    </div>  
                </div>
            </div>
         </div> 
</template>

<script>
    import debounce from '../helpers/debounce'

    // Prevent error
    document.onkeydown = function(evt) {
        if ((evt.ctrlKey || evt.metaKey) && (evt.keyCode === 89 || evt.keyCode === 90)) {
            return false;
        } else {
            return true;
        }
    };

    export default {
        name: 'ModelDetailsForm',
        components: {},
        props: {
            modelDetails: {
                type: Object
            }
        },
        methods: {
            // Eliminate frequent requests
            debounce_change: debounce(function () {
               // Report changes
                this.$emit('change', this.modelDetails.userName);
            }, 200)
        }  
    }    
</script>