import swal from "sweetalert";


function openEvaluation(graph, modelDetailsP) {
    
    //Crea nuevo formulario html para hacer post que se abrirá en una pestaña nueva. 
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'http://google.com');
    form.setAttribute('target', 'blank');
    form.style.display = 'hidden';

    //datos de entrada =  json del modelo.
    var data = exportModelJSON(graph, modelDetailsP);

    //crea input de tipo oculto para el formulario, para enviar datos del form
    var input = document.createElement("input");
    input.type = "hidden";
    input.value = data;

    
    document.body.appendChild(form)
    
    form.appendChild(input);

    form.submit();
}


//Genera JSON a partir de modelo mxGrph y datos generles del modelo.
function exportModelJSON(graph, modelDetailsP) {
    
    graph.selectAll();
    var selection = graph.getSelectionCells();
    
    var model = 
    {
        "header":[],
        /* "actors":[], */
        /* "starts":[], */
        /* "ends":[], */
        /* "communicativeEvents":[], */
        "classDiagram":[],
        "Atributtes": [],
        /* "specialisedCommunicativeEvents":[], */
        "communicativeInteractions":[],
        "precedenceRelations":[]
    };

    var currentId = document.getElementsByClassName('modelIdentifier')[0].textContent;        

    //Generate model details from global var
    var modelDetails = {
        /* userName: modelDetailsP.userName, */
        identifier: currentId,
        type: 'ClassDiagram'
    }

    model.header.push(modelDetails);

    for (let index = 0; index < selection.length; index++) {
        if(selection[index].value.type == "Actor"){
            var actor = {
                unique: selection[index].id,
                identifier: selection[index].value.identifier,
                name: selection[index].value.name,
                type: selection[index].value.type,
                x: selection[index].geometry.x,
                y: selection[index].geometry.y
            }
            model.actors.push(actor);
        }
    }

    /* for (let index = 0; index < selection.length; index++) {
        if(selection[index].value.type == "Communicative Interaction"){
             if(selection[index].geometry.points != null){
                 var geometryPoints = []
                 for (let a = 0; a < selection[index].geometry.points.length; a++) {
                     geometryPoints[a] = selection[index].geometry.points[a];
                 }
                 var communicativeInteraction = {
                     unique: selection[index].id,
                     identifier: selection[index].value.identifier,
                     name: selection[index].value.name,
                     type: selection[index].value.type,
                     messageStructure: selection[index].value.messageStructure,
                     source: selection[index].source.id,
                     target: selection[index].target.id,
                     "points": geometryPoints
                 }
                 model.communicativeInteractions.push(communicativeInteraction);
             } else {
                 var communicativeInteraction = {
                     unique: selection[index].id,
                     identifier: selection[index].value.identifier,
                     name: selection[index].value.name,
                     type: selection[index].value.type,
                     messageStructure: selection[index].value.messageStructure,
                     source: selection[index].source.id,
                     target: selection[index].target.id,
                 }
                 model.communicativeInteractions.push(communicativeInteraction);
             }
        }
     } */


    for (let index = 0; index < selection.length; index++) {
        if(selection[index].value.type == "Atributte"){
            if(selection[index].geometry.points != null){
                var geometryPoints = []
                for (let a = 0; a < selection[index].geometry.points.length; a++) {
                    geometryPoints[a] = selection[index].geometry.points[a];
                }
            var atributte = {
                unique: selection[index].id,
                identifier: selection[index].value.identifier,
                name: selection[index].value.name,
                type: selection[index].value.type,
                atributtes: selection[index].value.atributtes,
                "points": geometryPoints
            }
            model.Atributtes.push(atributte);
            }else{
                var atributte = {
                    unique: selection[index].id,
                    identifier: selection[index].value.identifier,
                    name: selection[index].value.name,
                    type: selection[index].value.type,
                    atributtes: selection[index].value.atributtes,
                    
                    
                }
                model.Atributtes.push(atributte);
            }
        }
    }
    
    /* for (let index = 0; index < selection.length; index++) {
        if(selection[index].value.type == "Start"){
            var start = {
                unique: selection[index].id,
                identifier: selection[index].value.identifier,
                name: selection[index].value.name,
                type: selection[index].value.type,
                x: selection[index].geometry.x,
                y: selection[index].geometry.y
            }
            model.starts.push(start);
        }
    } */

    /* for (let index = 0; index < selection.length; index++) {
        if(selection[index].value.type == "End"){
            var end = {
                unique: selection[index].id,
                identifier: selection[index].value.identifier,
                name: selection[index].value.name,
                type: selection[index].value.type,
                x: selection[index].geometry.x,
                y: selection[index].geometry.y
            }
            model.ends.push(end);
        }
    } */
    
    for (let index = 0; index < selection.length; index++) {
        if(selection[index].value.type == "Communicative Event"){
            var communicativeEvent = {
                unique: selection[index].id,
                identifier: selection[index].value.identifier,
                name: selection[index].value.name,
                /* type: selection[index].value.type, */
                stereotype: selection[index].value.stereotype,
                description: selection[index].value.description,
                /* channel: selection[index].value.channel,
                temporalRestrictions: selection[index].value.temporalRestrictions,
                frequency: selection[index].value.frequency,
                contextConstraints: selection[index].value.contextConstraints,
                structuralConstraints: selection[index].value.structuralConstraints,
                treatment: selection[index].value.treatment,
                linkedCommunication: selection[index].value.linkedCommunication,
                linkedReaction: selection[index].value.linkedReaction,
                x: selection[index].geometry.x,
                y: selection[index].geometry.y,
                "supportActor":[
                    {   
                        unique: selection[index].children[0].id,
                        identifier: selection[index].children[0].value.identifier,
                        name: selection[index].children[0].value.name,
                        type: selection[index].children[0].value.type
                    }
                ] */
            }
            model.classDiagram.push(communicativeEvent);
        }
    }

    for (let index = 0; index < selection.length; index++) {
        if(selection[index].value.type == "Specialised Communicative Event"){
            var specialisedCommunicativeEvent = {
                unique: selection[index].id,
                identifier: selection[index].value.identifier,
                name: selection[index].value.name,
                type: selection[index].value.type,
                goals: selection[index].value.goals,
                description: selection[index].value.description,
                channel: selection[index].value.channel,
                temporalRestrictions: selection[index].value.temporalRestrictions,
                frequency: selection[index].value.frequency,
                contextConstraints: selection[index].value.contextConstraints,
                structuralConstraints: selection[index].value.structuralConstraints,
                treatment: selection[index].value.treatment,
                linkedCommunication: selection[index].value.linkedCommunication,
                linkedReaction: selection[index].value.linkedReaction,
                x: selection[index].geometry.x,
                y: selection[index].geometry.y,
                "internalCommunicativeEvent":[
                    {   
                        unique: selection[index].children[0].id,
                        identifier: selection[index].children[0].value.identifier,
                        name: selection[index].children[0].value.name,
                        type: selection[index].children[0].value.type,
                        goals: selection[index].children[0].value.goals,
                        description: selection[index].children[0].value.description,
                        channel: selection[index].children[0].value.channel,
                        temporalRestrictions: selection[index].children[0].value.temporalRestrictions,
                        frequency: selection[index].children[0].value.frequency,
                        contextConstraints: selection[index].children[0].value.contextConstraints,
                        structuralConstraints: selection[index].children[0].value.structuralConstraints,
                        treatment: selection[index].children[0].value.treatment,
                        linkedCommunication: selection[index].children[0].value.linkedCommunication,
                        linkedReaction: selection[index].children[0].value.linkedReaction
                    },
                    {   
                        unique: selection[index].children[1].id,
                        identifier: selection[index].children[1].value.identifier,
                        name: selection[index].children[1].value.name,
                        type: selection[index].children[1].value.type,
                        goals: selection[index].children[1].value.goals,
                        description: selection[index].children[1].value.description,
                        channel: selection[index].children[1].value.channel,
                        temporalRestrictions: selection[index].children[1].value.temporalRestrictions,
                        frequency: selection[index].children[1].value.frequency,
                        contextConstraints: selection[index].children[1].value.contextConstraints,
                        structuralConstraints: selection[index].children[1].value.structuralConstraints,
                        treatment: selection[index].children[1].value.treatment,
                        linkedCommunication: selection[index].children[1].value.linkedCommunication,
                        linkedReaction: selection[index].children[1].value.linkedReaction
                    }
                ],
                "supportActor":[
                    {   
                        unique: selection[index].children[2].id,
                        identifier: selection[index].children[2].value.identifier,
                        name: selection[index].children[2].value.name,
                        type: selection[index].children[2].value.type
                    }
                ],
            }
            model.specialisedCommunicativeEvents.push(specialisedCommunicativeEvent);                
        }
    }

    for (let index = 0; index < selection.length; index++) {
       if(selection[index].value.type == "Communicative Interaction"){
            if(selection[index].geometry.points != null){
                var geometryPoints = []
                for (let a = 0; a < selection[index].geometry.points.length; a++) {
                    geometryPoints[a] = selection[index].geometry.points[a];
                }
                var communicativeInteraction = {
                    unique: selection[index].id,
                    identifier: selection[index].value.identifier,
                    name: selection[index].value.name,
                    type: selection[index].value.type,
                    messageStructure: selection[index].value.messageStructure,
                    source: selection[index].source.id,
                    target: selection[index].target.id,
                    "points": geometryPoints
                }
                model.communicativeInteractions.push(communicativeInteraction);
            } else {
                var communicativeInteraction = {
                    unique: selection[index].id,
                    identifier: selection[index].value.identifier,
                    name: selection[index].value.name,
                    type: selection[index].value.type,
                    messageStructure: selection[index].value.messageStructure,
                    source: selection[index].source.id,
                    target: selection[index].target.id,
                }
                model.communicativeInteractions.push(communicativeInteraction);
            }
       }
    }

    for (let index = 0; index < selection.length; index++) {
        if(selection[index].value.type == "Precedence Relation"){
            if(selection[index].geometry.points != null){
                var geometryPoints = [];
                for (let a = 0; a < selection[index].geometry.points.length; a++) {
                    geometryPoints[a] = selection[index].geometry.points[a];
                }
                var relation = {
                    unique: selection[index].id,
                    type: selection[index].value.type,
                    source: selection[index].source.id,
                    target: selection[index].target.id,
                    "points": geometryPoints
                }
                model.precedenceRelations.push(relation);
            } else {
                var relation = {
                    unique: selection[index].id,
                    type: selection[index].value.type,
                    source: selection[index].source.id,
                    target: selection[index].target.id
                }
                model.precedenceRelations.push(relation);
            }
        }
     }
    
    //console.log("Modelo JSON...", model);

    var modelString = JSON.stringify(model, null, 4);    
    return modelString;

}

function toolBarButtons(graph, modelDetailsP){

    let exportModelButton = document.body.appendChild(mxUtils.button('Export', function()
    {   
        var modelString = exportModelJSON(graph, modelDetailsP);

        function copyClipboard(text) {
            var x = document.createElement("textarea");
            document.body.appendChild(x);
            x.value = text;
            x.select();
            document.execCommand("copy");
            document.body.removeChild(x);
        }

        swal({
            title: "Export Model",
            text: modelString,
            className: 'view-model',
            buttons: {
                copyclipboard: {
                    text: "Copy Clipboard"
                },
                close: {
                    text: "Close"
                },
            },
        })
        .then((value) => {
            switch (value) {
                case "copyclipboard":
                    swal("Copied", "The model has been copied to the clipboard", "success",{
                        className: 'view-model-normal',
                    });
                    copyClipboard(modelString);
                    break;
                case "close":
                    break;
            }
        });

        window.scrollTo(0, 0);
    

    }));	
    
    exportModelButton.style.position = 'absolute';    
    exportModelButton.style.top = '4px';
    exportModelButton.style.right = '159px';
    exportModelButton.style.width = '73px';
    exportModelButton.setAttribute("class", "button");

    let buttonLoad = document.body.appendChild(mxUtils.button('Load', function()
    {        
        var modelEntered;
        var loadedIdentifier;

        
        swal("Load", "Please enter a communicational analysis model",{
            content: "input",
            className: 'view-model-normal',
            buttons: ['Cancel', 'Load']
        })
       .then((value) => {
            modelEntered = value;
            //var modelEntered = prompt("Please enter model:", "");
            if (modelEntered == null || modelEntered == "") {
                //alert("Canceled");
                if(modelEntered == null){
                    /*
                    swal("Canceled", "", "error", {
                        dangerMode: true
                    });
                    */
                }
                if(modelEntered == ""){
                    swal("Empty", "", "error", {
                        dangerMode: true
                    });
                }
            } else {

                


                if(modelEntered.includes('"actors":')&&
//                modelEntered.includes('"starts":')&&
  //              modelEntered.includes('"ends":')&&
                modelEntered.includes('"communicativeEvents":')&&
                modelEntered.includes('"specialisedCommunicativeEvents":')&&
                modelEntered.includes('"communicativeInteractions":')&&
                modelEntered.includes('"precedenceRelations":')){

                graph.getModel().beginUpdate();

                try
                {

                    
                    
                    //load model from JSON
                    let model = JSON.parse(modelEntered);
                    
                    //console.log("Model Load...\n", model);

                    //sets model identifier from loaded file
                    if(modelEntered.includes('"header":')){  
                        document.getElementsByClassName('modelIdentifier')[0].textContent =  model.header[0].identifier;
                    }

                    
                    var onlyActors = [];
                    
                    for (let index = 0; index < model.actors.length; index++) {
                        let ac = new window.CustomActorObject();
                        ac.identifier = model.actors[index].identifier;
                        ac.name = model.actors[index].name;
                        ac.type = model.actors[index].type;
                        let parent = graph.getDefaultParent();
                        onlyActors[index] = graph.insertVertex(parent, model.actors[index].unique, ac, model.actors[index].x, model.actors[index].y, 60, 75, 'shape=actor;fillColor=#00a8f3;strokeWidth=3;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=top;verticalAlign=bottom;');
                    }


                    var onlyStarts = [];
                    if(modelEntered.includes('"starts":')){
                        
                        for (let index = 0; index < model.starts.length; index++) {
                            let ac = new window.CustomStartObject();
                            ac.identifier = model.starts[index].identifier;
                            ac.name = model.starts[index].name;
                            ac.type = model.starts[index].type;
                            let parent = graph.getDefaultParent();
                            onlyStarts[index] = graph.insertVertex(parent, model.starts[index].unique, ac, model.starts[index].x, model.starts[index].y, 60, 60, 'shape=ellipse;fillColor=#00a8f3;strokeWidth=3;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=top;verticalAlign=bottom;');
                        }
                    }
                    var onlyEnds = [];
                    
                    if(modelEntered.includes('"ends":')){
                        for (let index = 0; index < model.ends.length; index++) {
                            let ac = new window.CustomEndObject();
                            ac.identifier = model.ends[index].identifier;
                            ac.name = model.ends[index].name;
                            ac.type = model.ends[index].type;
                            let parent = graph.getDefaultParent();
                            onlyEnds[index] = graph.insertVertex(parent, model.ends[index].unique, ac, model.ends[index].x, model.ends[index].y, 60, 60, 'shape=ellipse;fillColor=#00a8f3;strokeWidth=15;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=bottom;verticalAlign=bottom;');
                        }
                    }

                    var onlyCE = [];

                    for (let index = 0; index < model.communicativeEvents.length; index++) {
                        let ce = new window.CustomCommunicativeEventObject();
                        ce.identifier = model.communicativeEvents[index].identifier;
                        ce.name = model.communicativeEvents[index].name;
                        ce.type = model.communicativeEvents[index].type;
                        ce.goals = model.communicativeEvents[index].goals;
                        ce.description = model.communicativeEvents[index].description;
                        ce.channel = model.communicativeEvents[index].channel;
                        ce.temporalRestrictions = model.communicativeEvents[index].temporalRestrictions;
                        ce.frequency = model.communicativeEvents[index].frequency;
                        ce.contextConstraints = model.communicativeEvents[index].contextConstraints;
                        ce.structuralConstraints = model.communicativeEvents[index].structuralConstraints;
                        ce.treatment = model.communicativeEvents[index].treatment;
                        ce.linkedCommunication = model.communicativeEvents[index].linkedCommunication;
                        ce.linkedReaction = model.communicativeEvents[index].linkedReaction;

                        let sac = new window.CustomSupportActorObject();
                        sac.identifier = model.communicativeEvents[index].supportActor[0].identifier;
                        sac.name = model.communicativeEvents[index].supportActor[0].name;
                        sac.type = model.communicativeEvents[index].supportActor[0].type;

                        let parent = graph.getDefaultParent();
                        onlyCE[index] = graph.insertVertex(parent, model.communicativeEvents[index].unique, ce, model.communicativeEvents[index].x, model.communicativeEvents[index].y, 180, 125, 'shape=rectangle;fillColor=#00a8f3;arcSize=3;rounded=1;strokeWidth=3;foldable=0;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=top;');
                        let v1 = graph.insertVertex(onlyCE[index], model.communicativeEvents[index].supportActor[0].unique, sac, 0, 75, 180, 50, 'constituent=1;deletable=0;arcSize=10;rounded=1;strokeWidth=3;resizable=0;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;');
                        v1.setConnectable(false);
                    }

                    var onlySCE = [];

                    for (let index = 0; index < model.specialisedCommunicativeEvents.length; index++) {
                        let sce = new window.CustomSpecialisedCommunicativeEventObject();
                        sce.identifier = model.specialisedCommunicativeEvents[index].identifier;
                        sce.name = model.specialisedCommunicativeEvents[index].name;
                        sce.type = model.specialisedCommunicativeEvents[index].type;
                        sce.goals = model.specialisedCommunicativeEvents[index].goals;
                        sce.description = model.specialisedCommunicativeEvents[index].description;
                        sce.channel = model.specialisedCommunicativeEvents[index].channel;
                        sce.temporalRestrictions = model.specialisedCommunicativeEvents[index].temporalRestrictions;
                        sce.frequency = model.specialisedCommunicativeEvents[index].frequency;
                        sce.contextConstraints = model.specialisedCommunicativeEvents[index].contextConstraints;
                        sce.structuralConstraints = model.specialisedCommunicativeEvents[index].structuralConstraints;
                        sce.treatment = model.specialisedCommunicativeEvents[index].treatment;
                        sce.linkedCommunication = model.specialisedCommunicativeEvents[index].linkedCommunication;
                        sce.linkedReaction = model.specialisedCommunicativeEvents[index].linkedReaction;

                        let ice1 = new window.CustomInternalCommunicativeEventObject();
                        ice1.identifier = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].identifier;
                        ice1.name = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].name;
                        ice1.type = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].type;
                        ice1.goals = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].goals;
                        ice1.description = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].description;
                        ice1.channel = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].channel;
                        ice1.temporalRestrictions = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].temporalRestrictions;
                        ice1.frequency = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].frequency;
                        ice1.contextConstraints = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].contextConstraints;
                        ice1.structuralConstraints = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].structuralConstraints;
                        ice1.treatment = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].treatment;
                        ice1.linkedCommunication = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].linkedCommunication;
                        ice1.linkedReaction = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].linkedReaction;

                        let ice2 = new window.CustomInternalCommunicativeEventObject();
                        ice2.identifier = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].identifier;
                        ice2.name = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].name;
                        ice2.type = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].type;
                        ice2.goals = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].goals;
                        ice2.description = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].description;
                        ice2.channel = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].channel;
                        ice2.temporalRestrictions = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].temporalRestrictions;
                        ice2.frequency = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].frequency;
                        ice2.contextConstraints = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].contextConstraints;
                        ice2.structuralConstraints = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].structuralConstraints;
                        ice2.treatment = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].treatment;
                        ice2.linkedCommunication = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].linkedCommunication;
                        ice2.linkedReaction = model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].linkedReaction;

                        let sac = new window.CustomSupportActorObject();
                        sac.identifier = model.specialisedCommunicativeEvents[index].supportActor[0].identifier;
                        sac.name = model.specialisedCommunicativeEvents[index].supportActor[0].name;
                        sac.type = model.specialisedCommunicativeEvents[index].supportActor[0].type;

                        let parent = graph.getDefaultParent();
                        onlySCE[index] = graph.insertVertex(parent, model.specialisedCommunicativeEvents[index].unique, sce, model.specialisedCommunicativeEvents[index].x, model.specialisedCommunicativeEvents[index].y, 240, 190, 'shape=rectangle;fillColor=#00a8f3;arcSize=2;rounded=1;strokeWidth=3;foldable=0;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=top;');
                        let v1 = graph.insertVertex(onlySCE[index], model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[0].unique, ice1, 20, 55, 90, 60, 'constituent=1;deletable=0;arcSize=5;rounded=1;strokeWidth=3;resizable=0;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;');
                        let v2 = graph.insertVertex(onlySCE[index], model.specialisedCommunicativeEvents[index].internalCommunicativeEvent[1].unique, ice2, 130, 55, 90, 60, 'constituent=1;deletable=0;arcSize=5;rounded=1;strokeWidth=3;resizable=0;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;');
                        let v3 = graph.insertVertex(onlySCE[index], model.specialisedCommunicativeEvents[index].supportActor[0].unique, sac, 0, 140, 240, 50, 'constituent=1;deletable=0;arcSize=10;rounded=1;strokeWidth=3;resizable=0;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;');
                        v3.setConnectable(false);
                    }

                    // CI
                    for (let index = 0; index < model.communicativeInteractions.length; index++) {
                        
                        // Actor-CE
                        for (let i = 0; i < model.actors.length; i++) {
                            for (let j = 0; j < model.communicativeEvents.length; j++) {
                                if((model.communicativeInteractions[index].source == model.actors[i].unique)&&
                                (model.communicativeInteractions[index].target == model.communicativeEvents[j].unique)){
                                    // onlyActors-onlyCE
                                    for (let a = 0; a < onlyActors.length; a++) {
                                        for (let b = 0; b < onlyCE.length; b++) {
                                            if((onlyActors[a].id == model.actors[i].unique)&&
                                            onlyCE[b].id == model.communicativeEvents[j].unique){
                                                let ci = new window.CustomCommunicativeInteractionObject();
                                                ci.identifier = model.communicativeInteractions[index].identifier;
                                                ci.name = model.communicativeInteractions[index].name;
                                                ci.type = model.communicativeInteractions[index].type;
                                                ci.messageStructure = model.communicativeInteractions[index].messageStructure;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.communicativeInteractions[index].unique, ci, onlyActors[a], onlyCE[b], 'strokeWidth=2;strokeColor=#008200;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#008200;');
                                                if(model.communicativeInteractions[index].points != null){
                                                    edge.geometry.points = model.communicativeInteractions[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // CE-Actor
                        for (let i = 0; i < model.communicativeEvents.length; i++) {
                            for (let j = 0; j < model.actors.length; j++) {
                                if((model.communicativeInteractions[index].source == model.communicativeEvents[i].unique)&&
                                (model.communicativeInteractions[index].target == model.actors[j].unique)){
                                    // onlyCE-onlyActors
                                    for (let a = 0; a < onlyCE.length; a++) {
                                        for (let b = 0; b < onlyActors.length; b++) {
                                            if((onlyCE[a].id == model.communicativeEvents[i].unique)&&
                                            onlyActors[b].id == model.actors[j].unique){
                                                let ci = new window.CustomCommunicativeInteractionObject();
                                                ci.identifier = model.communicativeInteractions[index].identifier;
                                                ci.name = model.communicativeInteractions[index].name;
                                                ci.type = model.communicativeInteractions[index].type;
                                                ci.messageStructure = model.communicativeInteractions[index].messageStructure;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.communicativeInteractions[index].unique, ci, onlyCE[a], onlyActors[b], 'strokeWidth=2;strokeColor=#a00000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#a00000;');
                                                if(model.communicativeInteractions[index].points != null){
                                                    edge.geometry.points = model.communicativeInteractions[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // Actor-SCE
                        for (let i = 0; i < model.actors.length; i++) {
                            for (let j = 0; j < model.specialisedCommunicativeEvents.length; j++) {
                                if((model.communicativeInteractions[index].source == model.actors[i].unique)&&
                                (model.communicativeInteractions[index].target == model.specialisedCommunicativeEvents[j].unique)){
                                    // onlyActors-onlySCE
                                    for (let a = 0; a < onlyActors.length; a++) {
                                        for (let b = 0; b < onlySCE.length; b++) {
                                            if((onlyActors[a].id == model.actors[i].unique)&&
                                            onlySCE[b].id == model.specialisedCommunicativeEvents[j].unique){
                                                let ci = new window.CustomCommunicativeInteractionObject();
                                                ci.identifier = model.communicativeInteractions[index].identifier;
                                                ci.name = model.communicativeInteractions[index].name;
                                                ci.type = model.communicativeInteractions[index].type;
                                                ci.messageStructure = model.communicativeInteractions[index].messageStructure;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.communicativeInteractions[index].unique, ci, onlyActors[a], onlySCE[b], 'strokeWidth=2;strokeColor=#008200;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#008200;');
                                                if(model.communicativeInteractions[index].points != null){
                                                    edge.geometry.points = model.communicativeInteractions[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                        // SCE-Actor
                        for (let i = 0; i < model.specialisedCommunicativeEvents.length; i++) {
                            for (let j = 0; j < model.actors.length; j++) {
                                if((model.communicativeInteractions[index].source == model.specialisedCommunicativeEvents[i].unique)&&
                                (model.communicativeInteractions[index].target == model.actors[j].unique)){
                                    // onlySCE-onlyActors
                                    for (let a = 0; a < onlySCE.length; a++) {
                                        for (let b = 0; b < onlyActors.length; b++) {
                                            if((onlySCE[a].id == model.specialisedCommunicativeEvents[i].unique)&&
                                            onlyActors[b].id == model.actors[j].unique){
                                                let ci = new window.CustomCommunicativeInteractionObject();
                                                ci.identifier = model.communicativeInteractions[index].identifier;
                                                ci.name = model.communicativeInteractions[index].name;
                                                ci.type = model.communicativeInteractions[index].type;
                                                ci.messageStructure = model.communicativeInteractions[index].messageStructure;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.communicativeInteractions[index].unique, ci, onlySCE[a], onlyActors[b], 'strokeWidth=2;strokeColor=#a00000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#a00000;');
                                                if(model.communicativeInteractions[index].points != null){
                                                    edge.geometry.points = model.communicativeInteractions[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Relation
                    for (let index = 0; index < model.precedenceRelations.length; index++) {
                        
                        // CE-CE
                        for (let i = 0; i < model.communicativeEvents.length; i++) {
                            for (let j = 0; j < model.communicativeEvents.length; j++) {
                                if((model.precedenceRelations[index].source == model.communicativeEvents[i].unique)&&
                                (model.precedenceRelations[index].target == model.communicativeEvents[j].unique)){
                                    // onlyCE-onlyCE
                                    for (let a = 0; a < onlyCE.length; a++) {
                                        for (let b = 0; b < onlyCE.length; b++) {
                                            if((onlyCE[a].id == model.communicativeEvents[i].unique)&&
                                            onlyCE[b].id == model.communicativeEvents[j].unique){
                                                let relation = new window.CustomRelationObject();
                                                relation.type = model.precedenceRelations[index].type;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlyCE[a], onlyCE[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                if(model.precedenceRelations[index].points != null){
                                                    edge.geometry.points = model.precedenceRelations[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // SCE-SCE
                        for (let i = 0; i < model.specialisedCommunicativeEvents.length; i++) {
                            for (let j = 0; j < model.specialisedCommunicativeEvents.length; j++) {
                                if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].unique)&&
                                (model.precedenceRelations[index].target == model.specialisedCommunicativeEvents[j].unique)){
                                    // onlySCE-onlySCE
                                    for (let a = 0; a < onlySCE.length; a++) {
                                        for (let b = 0; b < onlySCE.length; b++) {
                                            if((onlySCE[a].id == model.specialisedCommunicativeEvents[i].unique)&&
                                            onlySCE[b].id == model.specialisedCommunicativeEvents[j].unique){
                                                let relation = new window.CustomRelationObject();
                                                relation.type = model.precedenceRelations[index].type;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a], onlySCE[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                if(model.precedenceRelations[index].points != null){
                                                    edge.geometry.points = model.precedenceRelations[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // CE-SCE
                        for (let i = 0; i < model.communicativeEvents.length; i++) {
                            for (let j = 0; j < model.specialisedCommunicativeEvents.length; j++) {
                                if((model.precedenceRelations[index].source == model.communicativeEvents[i].unique)&&
                                (model.precedenceRelations[index].target == model.specialisedCommunicativeEvents[j].unique)){
                                    // onlyCE-onlyCE
                                    for (let a = 0; a < onlyCE.length; a++) {
                                        for (let b = 0; b < onlySCE.length; b++) {
                                            if((onlyCE[a].id == model.communicativeEvents[i].unique)&&
                                            onlySCE[b].id == model.specialisedCommunicativeEvents[j].unique){
                                                let relation = new window.CustomRelationObject();
                                                relation.type = model.precedenceRelations[index].type;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlyCE[a], onlySCE[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                if(model.precedenceRelations[index].points != null){
                                                    edge.geometry.points = model.precedenceRelations[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // SCE-CE
                        for (let i = 0; i < model.specialisedCommunicativeEvents.length; i++) {
                            for (let j = 0; j < model.communicativeEvents.length; j++) {
                                if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].unique)&&
                                (model.precedenceRelations[index].target == model.communicativeEvents[j].unique)){
                                    // onlyCE-onlyCE
                                    for (let a = 0; a < onlySCE.length; a++) {
                                        for (let b = 0; b < onlyCE.length; b++) {
                                            if((onlySCE[a].id == model.specialisedCommunicativeEvents[i].unique)&&
                                            onlyCE[b].id == model.communicativeEvents[j].unique){
                                                let relation = new window.CustomRelationObject();
                                                relation.type = model.precedenceRelations[index].type;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a], onlyCE[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                if(model.precedenceRelations[index].points != null){
                                                    edge.geometry.points = model.precedenceRelations[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // ICE-CE
                        for (let i = 0; i < model.specialisedCommunicativeEvents.length; i++) {
                            for (let j = 0; j < model.communicativeEvents.length; j++) {
                                if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[0].unique)&&
                                (model.precedenceRelations[index].target == model.communicativeEvents[j].unique)){
                                    // onlySCE*-onlyCE (ICE 1)
                                    for (let a = 0; a < onlySCE.length; a++) {
                                        for (let b = 0; b < onlyCE.length; b++) {
                                            if((onlySCE[a].children[0].id == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[0].unique)&&
                                            onlyCE[b].id == model.communicativeEvents[j].unique){
                                                let relation = new window.CustomRelationObject();
                                                relation.type = model.precedenceRelations[index].type;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a].children[0], onlyCE[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                if(model.precedenceRelations[index].points != null){
                                                    edge.geometry.points = model.precedenceRelations[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                                if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[1].unique)&&
                                (model.precedenceRelations[index].target == model.communicativeEvents[j].unique)){
                                    // onlySCE*-onlyCE (ICE 2)
                                    for (let a = 0; a < onlySCE.length; a++) {
                                        for (let b = 0; b < onlyCE.length; b++) {
                                            if((onlySCE[a].children[1].id == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[1].unique)&&
                                            onlyCE[b].id == model.communicativeEvents[j].unique){
                                                let relation = new window.CustomRelationObject();
                                                relation.type = model.precedenceRelations[index].type;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a].children[1], onlyCE[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                if(model.precedenceRelations[index].points != null){
                                                    edge.geometry.points = model.precedenceRelations[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // ICE-SCE
                        for (let i = 0; i < model.specialisedCommunicativeEvents.length; i++) {
                            for (let j = 0; j < model.specialisedCommunicativeEvents.length; j++) {
                                if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[0].unique)&&
                                (model.precedenceRelations[index].target == model.specialisedCommunicativeEvents[j].unique)){
                                    // onlySCE*-onlyCE (ICE 1)
                                    for (let a = 0; a < onlySCE.length; a++) {
                                        for (let b = 0; b < onlySCE.length; b++) {
                                            if((onlySCE[a].children[0].id == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[0].unique)&&
                                            onlySCE[b].id == model.communicativeEvents[j].unique){
                                                let relation = new window.CustomRelationObject();
                                                relation.type = model.precedenceRelations[index].type;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a].children[0], onlySCE[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                if(model.precedenceRelations[index].points != null){
                                                    edge.geometry.points = model.precedenceRelations[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                                if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[1].unique)&&
                                (model.precedenceRelations[index].target == model.specialisedCommunicativeEvents[j].unique)){
                                    // onlySCE*-onlyCE (ICE 2)
                                    for (let a = 0; a < onlySCE.length; a++) {
                                        for (let b = 0; b < onlySCE.length; b++) {
                                            if((onlySCE[a].children[1].id == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[1].unique)&&
                                            onlySCE[b].id == model.specialisedCommunicativeEvents[j].unique){
                                                let relation = new window.CustomRelationObject();
                                                relation.type = model.precedenceRelations[index].type;
                                                let parent = graph.getDefaultParent();
                                                let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a].children[1], onlySCE[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                if(model.precedenceRelations[index].points != null){
                                                    edge.geometry.points = model.precedenceRelations[index].points;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // START-CE
                        if(modelEntered.includes('"starts":')){

                            for (let i = 0; i < model.starts.length; i++) {
                                for (let j = 0; j < model.communicativeEvents.length; j++) {
                                    if((model.precedenceRelations[index].source == model.starts[i].unique)&&
                                    (model.precedenceRelations[index].target == model.communicativeEvents[j].unique)){
                                        // onlyCE-onlyCE
                                        for (let a = 0; a < onlyStarts.length; a++) {
                                            for (let b = 0; b < onlyCE.length; b++) {
                                                if((onlyStarts[a].id == model.starts[i].unique)&&
                                                onlyCE[b].id == model.communicativeEvents[j].unique){
                                                    let relation = new window.CustomRelationObject();
                                                    relation.type = model.precedenceRelations[index].type;
                                                    let parent = graph.getDefaultParent();
                                                    let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlyStarts[a], onlyCE[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                    if(model.precedenceRelations[index].points != null){
                                                        edge.geometry.points = model.precedenceRelations[index].points;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            // CE-START
                            for (let i = 0; i < model.communicativeEvents.length; i++) {
                                for (let j = 0; j < model.starts.length; j++) {
                                    if((model.precedenceRelations[index].source == model.communicativeEvents[i].unique)&&
                                    (model.precedenceRelations[index].target == model.starts[j].unique)){
                                        // onlyCE-onlyStarts
                                        for (let a = 0; a < onlyCE.length; a++) {
                                            for (let b = 0; b < onlyStarts.length; b++) {
                                                if((onlyCE[a].id == model.communicativeEvents[i].unique)&&
                                                onlyStarts[b].id == model.starts[j].unique){
                                                    let relation = new window.CustomRelationObject();
                                                    relation.type = model.precedenceRelations[index].type;
                                                    let parent = graph.getDefaultParent();
                                                    let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlyCE[a], onlyStarts[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                    if(model.precedenceRelations[index].points != null){
                                                        edge.geometry.points = model.precedenceRelations[index].points;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            // START-SCE
                            for (let i = 0; i < model.starts.length; i++) {
                                for (let j = 0; j < model.specialisedCommunicativeEvents.length; j++) {
                                    if((model.precedenceRelations[index].source == model.starts[i].unique)&&
                                    (model.precedenceRelations[index].target == model.specialisedCommunicativeEvents[j].unique)){
                                        // onlyCE-onlyCE
                                        for (let a = 0; a < onlyStarts.length; a++) {
                                            for (let b = 0; b < onlySCE.length; b++) {
                                                if((onlyStarts[a].id == model.starts[i].unique)&&
                                                onlySCE[b].id == model.specialisedCommunicativeEvents[j].unique){
                                                    let relation = new window.CustomRelationObject();
                                                    relation.type = model.precedenceRelations[index].type;
                                                    let parent = graph.getDefaultParent();
                                                    let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlyStarts[a], onlySCE[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                    if(model.precedenceRelations[index].points != null){
                                                        edge.geometry.points = model.precedenceRelations[index].points;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            // SCE-START
                            for (let i = 0; i < model.specialisedCommunicativeEvents.length; i++) {
                                for (let j = 0; j < model.starts.length; j++) {
                                    if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].unique)&&
                                    (model.precedenceRelations[index].target == model.starts[j].unique)){
                                        // onlyCE-onlyCE
                                        for (let a = 0; a < onlySCE.length; a++) {
                                            for (let b = 0; b < onlyStarts.length; b++) {
                                                if((onlySCE[a].id == model.specialisedCommunicativeEvents[i].unique)&&
                                                onlyStarts[b].id == model.starts[j].unique){
                                                    let relation = new window.CustomRelationObject();
                                                    relation.type = model.precedenceRelations[index].type;
                                                    let parent = graph.getDefaultParent();
                                                    let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a], onlyStarts[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                    if(model.precedenceRelations[index].points != null){
                                                        edge.geometry.points = model.precedenceRelations[index].points;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        
                            // ICE-START
                            for (let i = 0; i < model.specialisedCommunicativeEvents.length; i++) {
                                for (let j = 0; j < model.starts.length; j++) {
                                    if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[0].unique)&&
                                    (model.precedenceRelations[index].target == model.starts[j].unique)){
                                        // onlySCE*-onlyCE (ICE 1)
                                        for (let a = 0; a < onlySCE.length; a++) {
                                            for (let b = 0; b < onlyStarts.length; b++) {
                                                if((onlySCE[a].children[0].id == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[0].unique)&&
                                                onlyStarts[b].id == model.starts[j].unique){
                                                    let relation = new window.CustomRelationObject();
                                                    relation.type = model.precedenceRelations[index].type;
                                                    let parent = graph.getDefaultParent();
                                                    let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a].children[0], onlyStarts[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                    if(model.precedenceRelations[index].points != null){
                                                        edge.geometry.points = model.precedenceRelations[index].points;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[1].unique)&&
                                    (model.precedenceRelations[index].target == model.starts[j].unique)){
                                        // onlySCE*-onlyCE (ICE 2)
                                        for (let a = 0; a < onlySCE.length; a++) {
                                            for (let b = 0; b < onlyStarts.length; b++) {
                                                if((onlySCE[a].children[1].id == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[1].unique)&&
                                                onlyStarts[b].id == model.starts[j].unique){
                                                    let relation = new window.CustomRelationObject();
                                                    relation.type = model.precedenceRelations[index].type;
                                                    let parent = graph.getDefaultParent();
                                                    let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a].children[1], onlyStarts[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                    if(model.precedenceRelations[index].points != null){
                                                        edge.geometry.points = model.precedenceRelations[index].points;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(modelEntered.includes('"ends":')){

                            // CE-END
                            for (let i = 0; i < model.communicativeEvents.length; i++) {
                                for (let j = 0; j < model.ends.length; j++) {
                                    if((model.precedenceRelations[index].source == model.communicativeEvents[i].unique)&&
                                    (model.precedenceRelations[index].target == model.ends[j].unique)){
                                        // onlyCE-onlyEnds
                                        for (let a = 0; a < onlyCE.length; a++) {
                                            for (let b = 0; b < onlyEnds.length; b++) {
                                                if((onlyCE[a].id == model.communicativeEvents[i].unique)&&
                                                onlyEnds[b].id == model.ends[j].unique){
                                                    let relation = new window.CustomRelationObject();
                                                    relation.type = model.precedenceRelations[index].type;
                                                    let parent = graph.getDefaultParent();
                                                    let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlyCE[a], onlyEnds[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                    if(model.precedenceRelations[index].points != null){
                                                        edge.geometry.points = model.precedenceRelations[index].points;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            // SCE-END
                            for (let i = 0; i < model.specialisedCommunicativeEvents.length; i++) {
                                for (let j = 0; j < model.ends.length; j++) {
                                    if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].unique)&&
                                    (model.precedenceRelations[index].target == model.ends[j].unique)){
                                        // onlyCE-onlyCE
                                        for (let a = 0; a < onlySCE.length; a++) {
                                            for (let b = 0; b < onlyEnds.length; b++) {
                                                if((onlySCE[a].id == model.specialisedCommunicativeEvents[i].unique)&&
                                                onlyEnds[b].id == model.ends[j].unique){
                                                    let relation = new window.CustomRelationObject();
                                                    relation.type = model.precedenceRelations[index].type;
                                                    let parent = graph.getDefaultParent();
                                                    let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a], onlyEnds[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                    if(model.precedenceRelations[index].points != null){
                                                        edge.geometry.points = model.precedenceRelations[index].points;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        

                            // ICE-END
                            for (let i = 0; i < model.specialisedCommunicativeEvents.length; i++) {
                                for (let j = 0; j < model.ends.length; j++) {
                                    if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[0].unique)&&
                                    (model.precedenceRelations[index].target == model.ends[j].unique)){
                                        for (let a = 0; a < onlySCE.length; a++) {
                                            for (let b = 0; b < onlyEnds.length; b++) {
                                                if((onlySCE[a].children[0].id == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[0].unique)&&
                                                onlyEnds[b].id == model.ends[j].unique){
                                                    let relation = new window.CustomRelationObject();
                                                    relation.type = model.precedenceRelations[index].type;
                                                    let parent = graph.getDefaultParent();
                                                    let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a].children[0], onlyEnds[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                    if(model.precedenceRelations[index].points != null){
                                                        edge.geometry.points = model.precedenceRelations[index].points;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if((model.precedenceRelations[index].source == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[1].unique)&&
                                    (model.precedenceRelations[index].target == model.ends[j].unique)){
                                        // onlySCE*-onlyCE (ICE 2)
                                        for (let a = 0; a < onlySCE.length; a++) {
                                            for (let b = 0; b < onlyEnds.length; b++) {
                                                if((onlySCE[a].children[1].id == model.specialisedCommunicativeEvents[i].internalCommunicativeEvent[1].unique)&&
                                                onlyEnds[b].id == model.ends[j].unique){
                                                    let relation = new window.CustomRelationObject();
                                                    relation.type = model.precedenceRelations[index].type;
                                                    let parent = graph.getDefaultParent();
                                                    let edge = graph.insertEdge(parent, model.precedenceRelations[index].unique, relation, onlySCE[a].children[1], onlyEnds[b], 'strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;');
                                                    if(model.precedenceRelations[index].points != null){
                                                        edge.geometry.points = model.precedenceRelations[index].points;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    graph.refresh();

                }
                finally
                {
                    graph.getModel().endUpdate();
                }

                } else {
                    //alert("Invalid model");
                    swal("Invalid Model", "", "error", {
                        dangerMode: true
                    });
                }
            }
        });
    }));	
    
    buttonLoad.style.position = 'absolute';    
    buttonLoad.style.top = '4px';
    buttonLoad.style.right = '81px';
    buttonLoad.style.width = '73px';
    buttonLoad.setAttribute("class", "button");

    /* let buttonPreview = document.body.appendChild(mxUtils.button('Print', function()
    {        
        var preview = new mxPrintPreview(graph, 1);
        preview.title = 'Print';
        
        swal("Print", "Do you want to open a new tab to generate a model in pdf format?",{
            className: 'view-model-normal',
            buttons: {
                cancel: true,
                open: {
                  text: "Open",
                },
            },
        })
        .then((value) => {
            switch (value) {
                case "open":
                    preview.open();
                    break;
                default:
                    break;
            }
        });

    }));

    buttonPreview.style.position = 'absolute';    
    buttonPreview.style.top = '4px';
    buttonPreview.style.right = '82px';
    buttonPreview.style.width = '72px';
    buttonPreview.setAttribute("class", "button"); */
	

    let buttonEvaluate = document.body.appendChild(mxUtils.button('Evaluate', function()
    {        
        var preview = new mxPrintPreview(graph, 1);
        preview.title = 'Evaluate';
        
        swal("Evaluate", "Do you want to open the model evaluatio form?",{
            className: 'view-model-normal',
            buttons: {
                cancel: true,
                open: {
                  text: "Open",
                },
            },
        })
        .then((value) => {
            switch (value) {
                case "open":
                    openEvaluation(graph, modelDetailsP);
                default:
                    break;
            }
        });

    }));

    buttonEvaluate.style.position = 'absolute';    
    buttonEvaluate.style.top = '27px';
    buttonEvaluate.style.right = '82px';
    buttonEvaluate.style.width = '72px';  // 220px toda la barra
    buttonEvaluate.setAttribute("class", "button");




}

export default toolBarButtons;