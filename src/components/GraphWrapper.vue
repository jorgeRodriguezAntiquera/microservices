<template>    
    <div style="cursor: default;">        
        <!-- div for modeler-->
        <div id="container"></div>
        <!-- div for rightbar-->
        <div id="rightbar" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #ffffff; text-align: center;  display: flex;
    align-items: top;">            
            <div id="modelform" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #ffffff; text-align: center;">
                <ModelDetailsForm ref="form" @change="changeModelDetails" :modelDetails="modelDetails"/>                       
            </div>
            <div id="editform" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #ffffff; text-align: center;  display: flex;
    align-items: top;">
                <EditForm ref="form" @change="changeObjectValues" :cell-data="currentCell"/> 
            </div>
            <div id="panelProperties" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #ffffff; text-align: center;">
                <strong style="position: relative; bottom: 12px;"><i class='fas fa-cog'></i> Properties</strong>                
            </div>
        </div>        
        <!-- div for sidebar-->
        <div id="sidebar">
            <a id="panelTitle" onclick="location.reload()" style="cursor: pointer; margin-top: 18px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: white; text-align: center;" title=
            "Created by Emilio Miranda from Universidad de Valparaíso in Chile">                
                <a style="color: white; text-decoration:none; font-weight: bold; position: relative; bottom: 0px; font-size:xx-small" 
                >Microservices Modeling Tool</a>
                <!-- <i class='fas fa-project-diagram' style="font-size: 10px; position: relative; bottom: 35px; color: white;"></i> -->
            </a>
            <div id="edit" style="margin-bottom: 15px; margin-right: 5px; margin-top: 10px; height: 100%; font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #C0C0C0; text-align: left;">
                <strong style="white-space: pre-wrap; color: white;" title=
"Cut (cmd + x)
Copy (cmd + c)
Paste (cmd + v)
Undo (cmd + z)
Redo (cmd + y)
Delete (cmd + 0)"
                ><i class='fas fa-th'></i> Edit</strong>
                <p><i class='fas fa-cut'></i> Cut (ctrl + x)</p>
                <p><i class='fas fa-copy'></i> Copy (ctrl + c)</p>
                <p><i class='fas fa-paste'></i> Paste (ctrl + v)</p>
                <p><i class='fas fa-undo-alt'></i> Undo (ctrl + z)</p>
                <p><i class='fas fa-redo-alt'></i> Redo (ctrl + y)</p>
                <p style="margin-bottom: 20px;"><i class='fas fa-eraser'></i> Delete (ctrl + 0)</p>
            </div>
        </div>
    </div>
</template>

<script>    
    import mxgraph from 'mxgraph';    
    import EditForm from "./EditForm";    
    import ModelDetailsForm from "./ModelDetailsForm";    
    import clipboardInit from "../helpers/clipboard";
    import undo from "../helpers/undo";    
    import toolBarButtons from "../helpers/toolBarButtons";
    import validation from "../helpers/validation";
    import zoom from "../helpers/zoom";

// MXGRAPH SETUP
// if you plan to use the built-in interfaces, you need to specify the path to the resources
    const graphConfig = {
        mxBasePath: '/mx/', //Specifies the path in mxClient.basePath.
        mxImageBasePath: '/mx/images', // Specifies the path in mxClient.imageBasePath.
        mxLanguage: 'en', // Specifies the language for resources in mxClient.language.
        mxDefaultLanguage: 'en', // Specifies the default language in mxClient.defaultLanguage.
        mxLoadResources: false, // Specifies if any resources should be loaded.  Default is true.
        mxLoadStylesheets: true, // Specifies if any stylesheets should be loaded.  Default is true
    };

// MXGRAPH objects creation
    const {
        mxClient, mxUtils, mxEvent, mxEditor, mxRectangle, mxEllipse, mxRhombus,mxLine, mxActor, mxGraph, mxGeometry, mxCell,
        mxImage, mxDivResizer, mxObjectCodec, mxCodecRegistry, mxConnectionHandler,
        mxClipboard, mxRubberband, mxGraphModel,  mxCodec, mxConstants,mxUndoManager, mxMorphing, mxFastOrganicLayout,
        mxEdgeStyle, mxWindow, mxKeyHandler, mxLog, mxShape, mxConnectionConstraint, mxPoint,
        mxPolyline, mxPerimeter, mxPrintPreview, mxMultiplicity, mxDragSource, mxEdgeHandler, mxGraphHandler
    } = mxgraph(graphConfig);

// making MXGRAPH objects available for VUE
    window.mxClient = mxClient;
    window.mxUtils = mxUtils;
    window.mxActor = mxActor;
    window.mxRectangle = mxRectangle;    
    window.mxEllipse = mxEllipse;
    window.mxRhombus = mxRhombus;
    window.mxLine = mxLine;
    window.mxGraph = mxGraph;
    window.mxEvent = mxEvent;
    window.mxGeometry = mxGeometry;
    window.mxCell = mxCell;
    window.mxImage = mxImage;
    window.mxEditor = mxEditor;
    window.mxDivResizer = mxDivResizer;
    window.mxObjectCodec = mxObjectCodec;
    window.mxCodecRegistry = mxCodecRegistry;
    window.mxConnectionHandler = mxConnectionHandler;
    window.mxClipboard = mxClipboard;
    window.mxRubberband = mxRubberband;
    window.mxGraphModel = mxGraphModel;
    window.mxCodec = mxCodec;
    window.mxConstants = mxConstants;
    window.mxUndoManager = mxUndoManager;
    window.mxMorphing = mxMorphing;
    window.mxFastOrganicLayout = mxFastOrganicLayout;
    window.mxEdgeStyle = mxEdgeStyle;
    window.mxWindow = mxWindow;
    window.mxKeyHandler = mxKeyHandler;
    window.mxLog = mxLog;
    window.mxShape = mxShape;
    window.mxConnectionConstraint = mxConnectionConstraint;
    window.mxPoint = mxPoint;
    window.mxPolyline = mxPolyline;
    window.mxPerimeter = mxPerimeter;
    window.mxPrintPreview = mxPrintPreview;
    window.mxMultiplicity = mxMultiplicity;
    window.mxDragSource = mxDragSource;
    window.mxEdgeHandler = mxEdgeHandler;
    window.mxGraphHandler = mxGraphHandler;

    
    //CONSTANTS
    // Cells selection color
    mxConstants.HANDLE_FILLCOLOR = '#C0C0C0'; // Color cuadrado de selección en centro
	mxConstants.HANDLE_STROKECOLOR = '#000000'; // Color bordes de cuadrados de selección puntas
    mxConstants.VERTEX_SELECTION_COLOR = '#00FF00'; // Color líneas punteadas de selección
    mxConstants.EDGE_SELECTION_COLOR = '#00FF00'; // Color líneas punteadas de conector
    mxConstants.DEFAULT_VALID_COLOR = '#00FF00'; // Color de llegada positiva de línea
    mxConstants.LABEL_HANDLE_FILLCOLOR = '#C0C0C0'; // Color punto del centro del texto
    mxConstants.CONNECT_HANDLE_FILLCOLOR = '#C0C0C0'; // Color puntos de inicio y fin
    mxConstants.LOCKED_HANDLE_FILLCOLOR = '#C0C0C0'; // Color de puntos de inicio y fin bloqueados
    mxConstants.VERTEX_SELECTION_DASHED = true; // Estilo de bordeado punteado
    mxConstants.DEFAULT_MARKERSIZE = 6; // Tamaño flecha
    mxConstants.VERTEX_SELECTION_STROKEWIDTH = 2; // Tamaño cuadro de selección figura
    mxConstants.EDGE_SELECTION_STROKEWIDTH = 2; // Tamaño seleccionador de flecha
    mxConstants.DROP_TARGET_COLOR = '#0000FF'; // Color de piscina
        
    var editor;    


    //CUSTOM DATA STRUCTURES (for each node and relationship)
 
    // CustomUserObject
    window.CustomUserObject = function (identifier, name, type) {
        this.identifier = identifier || 'Identifier';
        this.name = name || 'New Name';
        this.type = type || 'Type';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    // CustomStartObject
    window.CustomStartObject = function (definition, reference, identifier, name, type) {
        this.definition = definition || 'Start';
        this.identifier = identifier || 'Start';
        this.reference = reference || 'Event Type 4';
        this.name = name || 'Start ';
        this.type = type || 'Start';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    // CustomEndObject
    window.CustomEndObject = function (definition, reference, identifier, name, type) {
        this.definition = definition || 'End';
        this.identifier = identifier || 'End';
        this.reference = reference || 'Event Type 4';
        this.name = name || 'End ';
        this.type = type || 'End';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    
    // CustomActorObject
    window.CustomActorObject = function (definition, identifier, name, type) {
        this.definition = definition || 'Atributte';
        this.identifier = identifier || 'Atributte ';
        this.name = name || 'New Atributte ';
        this.type = type || 'Atributte';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    // CustomSupportActorObject
    window.CustomSupportActorObject = function (definition, identifier, name, type) {
        this.definition = definition || 'Atributte';
        this.identifier = identifier || 'Atributte';
        this.name = name || 'New Atributte';
        this.type = type || 'Support Atributte';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };
    
    // CustomMethodObject
    window.CustomMethodObject = function (definition, identifier, name, type) {
        this.definition = definition || 'Method';
        this.identifier = identifier || 'Method ';
        this.name = name || 'New Method ';
        this.type = type || 'Method';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    // CustomSupportMethodObject
    window.CustomSupportMethodObject = function (definition, identifier, name, type) {
        this.definition = definition || 'Method';
        this.identifier = identifier || 'Method';
        this.name = name || 'New Method';
        this.type = type || 'Support Method';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };


    // CustomCompositionObject
    window.CustomCompositionObject = function (definition, identifier, name, type) {
        this.definition = definition || 'Composition';
        this.identifier = identifier || 'Composition ';
        this.name = name || 'New Composition ';
        this.type = type || 'Composition';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    // CustomSupportCompositionObject
    window.CustomSupportCompositionObject = function (definition, identifier, name, type) {
        this.definition = definition || 'Composition';
        this.identifier = identifier || 'Composition';
        this.name = name || 'New Composition';
        this.type = type || 'Support Composition';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    // CustomCommunicativeInteractionObject
    window.CustomCommunicativeInteractionObject = function (definition, identifier, name, type, messageStructure, removeSelection) {
        this.definition = definition || 'Interaction';
        this.identifier = identifier || 'Class';
        this.name = name || 'New Class';
        this.type = type || 'Communicative Interaction';
        this.messageStructure = {
            name: "New Structure",
            type: "Structure",
            children: []
        };
        this.removeSelection = removeSelection || 0;
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    // CustomPrecedenceRelationshipObject
    window.CustomRelationObject = function (definition, identifier, name, type) {
        this.definition = definition || 'Relation';
        this.identifier = identifier || '';
        this.name = name || '';
        this.type = type || 'Precedence Relation';                
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };
    
    // CustomCommunicativeEventObject
    window.CustomCommunicativeEventObject = function (definition, reference, identifier, name, type, goals, description, channel,
    temporalRestrictions, frequency, contextConstraints, structuralConstraints, treatment, linkedCommunication,
    linkedReaction) {
        this.definition = definition || 'Event';
        this.reference = reference || 'Event Type 1';
        this.identifier = identifier || 'Class ';
        this.name = name || 'New Class ';
        this.type = type || 'Communicative Event';
        this.goals = goals || '';
        this.description = description || '';
        this.channel = channel || '';
        this.temporalRestrictions = temporalRestrictions || '';
        this.frequency = frequency || '';
        this.contextConstraints = contextConstraints || '';
        this.structuralConstraints = structuralConstraints || '';
        this.treatment = treatment || '';
        this.linkedCommunication = linkedCommunication || '';
        this.linkedReaction = linkedReaction || '';            
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };        
        
    // CustomSpecialisedCommunicativeEventObject
    window.CustomSpecialisedCommunicativeEventObject = function (definition, reference, identifier, name, type, goals, description, channel,
    temporalRestrictions, frequency, contextConstraints, structuralConstraints, treatment, linkedCommunication,
    linkedReaction) {
        this.definition = definition || 'Event';
        this.reference = reference || 'Event Type 2';
        this.identifier = identifier || 'SCE ';
        this.name = name || 'New SCE ';
        this.type = type || 'Specialised Communicative Event';
        this.goals = goals || '';
        this.description = description || '';
        this.channel = channel || '';
        this.temporalRestrictions = temporalRestrictions || '';
        this.frequency = frequency || '';
        this.contextConstraints = contextConstraints || '';
        this.structuralConstraints = structuralConstraints || '';
        this.treatment = treatment || '';
        this.linkedCommunication = linkedCommunication || '';
        this.linkedReaction = linkedReaction || '';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    // CustomInternalCommunicativeEventObject
    window.CustomInternalCommunicativeEventObject = function (definition, reference, identifier, name, type, goals, description, channel,
    temporalRestrictions, frequency, contextConstraints, structuralConstraints, treatment, linkedCommunication,
    linkedReaction) {
        this.definition = definition || 'Event';
        this.reference = reference || 'Event Type 3';
        this.identifier = identifier || 'CE';
        this.name = name || 'New CE';
        this.type = type || 'Internal Communicative Event';
        this.goals = goals || '';
        this.description = description || '';
        this.channel = channel || '';
        this.temporalRestrictions = temporalRestrictions || '';
        this.frequency = frequency || '';
        this.contextConstraints = contextConstraints || '';
        this.structuralConstraints = structuralConstraints || '';
        this.treatment = treatment || '';
        this.linkedCommunication = linkedCommunication || '';
        this.linkedReaction = linkedReaction || '';            
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    export default {
        name: 'graph-wrapper',
        components: {EditForm, ModelDetailsForm},
        data() {
            return {
                currentCell: null,
                modelDetails: null,
            }
        },
        methods: {
        // change selected in a separate panel
        // transfer the object to the VUE environment
            selectionChanged() {
                let cell = editor.graph.getSelectionCell();
                this.$set(this, 'currentCell', cell);
            },
        // return the updated value to the mxGraph environment
            changeObjectValues(newCellValue) {
                editor.graph.model.setValue(this.currentCell, newCellValue);
            },

        // return the model details
            changeModelDetails(newCellValue) {
                //editor.graph.model.setValue(this.currentCell, newCellValue);
                console.log("CAMBIO----------------");
            },
        // add sidebar elements
            addSidebarIcon: function (graph, sidebar, prototype) {
                
                graph.connectionHandler.addListener(mxEvent.CONNECT, function(sender, evt)
                {   
                    var edge = evt.getProperty('cell');
                    let edgevalue = new window.CustomCommunicativeInteractionObject();
                    edge.value=edgevalue;
                    
                    //Interacción Comunicativa Entrante
                    if((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Actor"))
                    &&((Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 1"))
                    ||(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 2"))))                    
                    {                                         
                        //console.log('Conectando Actor y CE o SCE...'); 
                        edgevalue.removeSelection = 0;
                        edge.style='strokeWidth=2;strokeColor=#008200;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#008200;';
                    }

                    //Interacción Comunicativa Saliente
                    if(((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 1"))
                    ||(Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 2")))
                    &&(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Actor")))
                    {                                         
                        //console.log('Conectando CE o SCE y Actor...');
                        edgevalue.removeSelection = 0;
                        edge.style='strokeWidth=2;strokeColor=#a00000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#a00000;';
                    }

                   
                   
                    //Remover Interacciones entrantes con nodo START y END
                    if(((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Actor"))
                    ||(Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 4")))
                    &&(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 4")))
                    {                                         
                        edgevalue.removeSelection = 1;
                        graph.getModel().remove(edge);                        
                    }

                    //Remover Interacciones salientes de nodo START y END
                    if(((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 4"))
                    &&((Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Actor")))
                    ||(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 3")))
                    )
                    {                                         
                        //console.log('Conectando CE con Eventos Comunicativos Internos...');
                        edgevalue.removeSelection = 1;
                        graph.getModel().remove(edge);                        
                    }
                   
                   
                   //Relación de Precedencia y Otras
                    if((((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 1"))
                    ||(Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 2"))
                    ||(Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 3"))
                    ||(Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 4"))))
                    &&(((Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 1")))
                    ||(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 2"))
                    ||(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 4"))
                    ))
                    {                                         
                        //console.log('Conectando CE o SCE y CE o SCE...');                        
                        var edgeRelation = evt.getProperty('cell');
                        let edgevalueRelation = new window.CustomRelationObject();
                        edgeRelation.value=edgevalueRelation;
                        edgeRelation.style='strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;';
                    }                    

               


                    if((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 3"))
                    &&(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 1")))
                    {                                         
                        //console.log('Conectando ICE y CE...');                        
                        var edgeRelation = evt.getProperty('cell');
                        let edgevalueRelation = new window.CustomRelationObject();
                        edgeRelation.value=edgevalueRelation;
                        edgeRelation.style='strokeWidth=2;strokeColor=#000000;fontSize=11;fontFamily=Arial;fontColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;';
                    }                   

                    //Remover CI de CE con Eventos Comunicativos Internos
                    if((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 1"))
                    &&(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 3")))
                    {                                         
                        //console.log('Conectando CE con Eventos Comunicativos Internos...');
                        edgevalue.removeSelection = 1;
                        graph.getModel().remove(edge);                        
                    }

                    //Remover CI de SCE con Eventos Comunicativos Internos
                    if((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 2"))
                    &&(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 3")))
                    {                                         
                        //console.log('Conectando SCE con Eventos Comunicativos Internos...');
                        edgevalue.removeSelection = 1;
                        graph.getModel().remove(edge);
                    }

                    //Remover CI de SCE con Eventos Comunicativos Internos
                   // if((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 3"))
                   // &&(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 2")))
                    //{                                         
                        //console.log('Conectando Eventos Comunicativos Internos con SCE...');
                    //    edgevalue.removeSelection = 1;
                    //    graph.getModel().remove(edge);
                   // }

                    //Remover CI con Actores
                    if((((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Actor"))
                    ||(Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Event Type 3"))))
                    &&(((Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Actor")))
                    ||(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Event Type 3"))))
                    {                                         
                        //console.log('ICE con Actores o viceversa, entre Actores, entre ICE...');
                        edgevalue.removeSelection = 1;
                        graph.getModel().remove(edge);
                    }
                    
                    //Remover relacines desde END
                    if((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("End")))
                    {                                         
                        edgevalue.removeSelection = 1;
                        graph.getModel().remove(edge);
                    }



                });

                var arrowStyle = graph.getStylesheet().getDefaultEdgeStyle();
                arrowStyle[mxConstants.STYLE_ROUNDED] = true;
                arrowStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.OrthConnector;
                //graph.edgeLabelsMovable = false;

                var graphHandlerGetInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
                mxGraphHandler.prototype.getInitialCellForEvent = function(me)
                {
                    var cell = graphHandlerGetInitialCellForEvent.apply(this, arguments);
                    
                    if (this.graph.isPart(cell))
                    {
                        cell = this.graph.getModel().getParent(cell)
                    }
                    
                    return cell;
                };

                graph.isPart = function(cell)
                {
                    return this.getCurrentCellStyle(cell)['constituent'] == '1';
                };

                graph.selectCellForEvent = function(cell)
                {
                    if (this.isPart(cell))
                    {
                        cell = this.model.getParent(cell);
                    }
                    
                    mxGraph.prototype.selectCellForEvent.apply(this, arguments);
                };

                
                
                let dragCallBackFunctStart = function (graph, evt, obj) {                    
                    
                    graph.recursiveResize = true;                    

                    let pt = graph.getPointForEvent(evt);

                    let parent = graph.getDefaultParent();
                    let model = graph.getModel();

                    let v = model.cloneCell(prototype);

                    model.beginUpdate();
                    try {
                        v.setValue(obj);
                        let sac = new window.CustomSupportMethodObject();
                        v.geometry.x = pt.x;
                        v.geometry.y = pt.y;
                        v.geometry.width = 60;
                        v.geometry.height = 60;
                        v.style='shape=line;fillColor=#00a8f3;strokeWidth=3;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=top;verticalAlign=bottom;';
                         let v1 = graph.insertVertex(v, null, null, 100, 0, 60, 60, 'constituent=0;deletable=1;arcSize=10;rounded=1;strokeWidth=0;shape=rhombus;fillColor=black;fontSize=12;fontFamily=Arial;strokeColor=black;verticalLabelPosition=middle;verticalAlign=middle;') 
                         v1.setConnectable(false);
                        graph.addCell(v, parent);

                    } finally {
                        model.endUpdate();
                    }
                    graph.setSelectionCell(v);                    
                    
                };
            
                let dragCallBackFunctEnd = function (graph, evt, obj) {                    
                    
                    graph.recursiveResize = true;                    


                    let pt = graph.getPointForEvent(evt);

                    let parent = graph.getDefaultParent();
                    let model = graph.getModel();

                    let v = model.cloneCell(prototype);

                    model.beginUpdate();
                    try {
                        v.setValue(obj);
                        v.geometry.x = pt.x;
                        v.geometry.y = pt.y;
                        v.geometry.width = 50;
                        v.geometry.height = 50;
                        v.style='shape=ellipse;fillColor=#00a8f3;strokeWidth=15;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=bottom;verticalAlign=middle;';
                        graph.addCell(v, parent);

                    } finally {
                        model.endUpdate();
                    }
                    graph.setSelectionCell(v);                    
                    
                };

                let dragCallBackFunctActor = function (graph, evt, obj) {                    
                    
                    graph.recursiveResize = true;                    

                    let pt = graph.getPointForEvent(evt);

                    let parent = graph.getDefaultParent();
                    let model = graph.getModel();

                    let v = model.cloneCell(prototype);

                    model.beginUpdate();
                    try {
                        v.setValue(obj);
                        v.geometry.x = pt.x;
                        v.geometry.y = pt.y;
                        v.geometry.width = 60;
                        v.geometry.height = 75;
                        v.style='shape=actor;fillColor=#00a8f3;strokeWidth=3;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=top;verticalAlign=bottom;';
                        graph.addCell(v, parent);

                    } finally {
                        model.endUpdate();
                    }
                    graph.setSelectionCell(v);                    
                    
                };

                let dragCallBackFunctCommunicativeEvent = function (graph, evt, obj) {

                    graph.recursiveResize = true;
                    
                    let pt = graph.getPointForEvent(evt);

                    let parent = graph.getDefaultParent();                    
                    let model = graph.getModel();                    
                    let v = model.cloneCell(prototype);
                    let sac = new window.CustomSupportActorObject();
                    let sac1 = new window.CustomSupportMethodObject();
                    model.beginUpdate();
                    try {                        
                        v.setValue(obj);
                        v.geometry.x = pt.x;
                        v.geometry.y = pt.y;
                        v.geometry.width = 180;
                        
                        v.geometry.height = 175;
                        v.style='shape=rectangle;fillColor=#00a8f3;arcSize=3;rounded=1;strokeWidth=3;foldable=0;resizable=1;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=top;';
                        
                        //ADD Support Actor as vertex inside the Communicative Event Vertex
                        let v1 = graph.insertVertex(v, null, sac, 0, 55, 225, 60, 'constituent=1;deletable=0;arcSize=10;rounded=1;strokeWidth=3;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;')
                        let v2 = graph.insertVertex(v, null, sac1, 0, 115, 225, 60, 'constituent=1;deletable=0;arcSize=10;rounded=1;strokeWidth=3;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;')

                        

                        //rounded=0;whiteSpace=wrap;html=1;autosize=1;resizable=0;opacity=50; arcSize=10;rounded=1;
                        v1.setConnectable(false);
                        v2.setConnectable(false);                        
                        graph.addCell(v, parent);

                    } finally {
                        model.endUpdate();
                    }
                    graph.setSelectionCell(v);
                    
                };   
                
                let dragCallBackFunctComposition = function (graph, evt, obj) {

                    graph.recursiveResize = true;
                    
                    let pt = graph.getPointForEvent(evt);

                    let parent = graph.getDefaultParent();                    
                    let model = graph.getModel();                    
                    let v = model.cloneCell(prototype);
                    let sac = new window.CustomSupportCompositionObject();
                    model.beginUpdate();
                    try {                        
                        v.setValue(obj);
                        v.geometry.x = pt.x;
                        v.geometry.y = pt.y;
                        v.geometry.width = 180;
                        
                        v.geometry.height = 175;
                        v.style='shape=rhombus;fillColor=#00a8f3;arcSize=3;rounded=1;strokeWidth=3;foldable=0;resizable=1;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=top;';
                        
                        //ADD Support Actor as vertex inside the Communicative Event Vertex
                        let v1 = graph.insertVertex(v, null, sac, 0, 55, 225, 60, 'constituent=1;deletable=0;arcSize=10;rounded=1;strokeWidth=3;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;')
                        let v2 = graph.insertVertex(v, null, sac1, 0, 115, 225, 60, 'constituent=1;deletable=0;arcSize=10;rounded=1;strokeWidth=3;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;')

                        

                        //rounded=0;whiteSpace=wrap;html=1;autosize=1;resizable=0;opacity=50; arcSize=10;rounded=1;
                        //v1.setConnectable(false);
                        //v2.setConnectable(false);                        
                        graph.addCell(v, parent);

                    } finally {
                        model.endUpdate();
                    }
                    graph.setSelectionCell(v);
                    
                };        

                let dragCallBackFunctSpecialisedCommunicativeEvent = function (graph, evt, obj) {

                    graph.recursiveResize = true;

                    let pt = graph.getPointForEvent(evt);

                    let parent = graph.getDefaultParent();
                    let model = graph.getModel();

                    let v = model.cloneCell(prototype);                    
                    let sac = new window.CustomSupportActorObject();
                    let ice1 = new window.CustomInternalCommunicativeEventObject();
                    let ice2 = new window.CustomInternalCommunicativeEventObject();


                    model.beginUpdate();
                    try {
                        v.setValue(obj);
                        v.geometry.x = pt.x;                        
                        v.geometry.y = pt.y;
                        v.geometry.width = 240;                        
                        v.geometry.height = 190;                        
                        v.style='shape=rectangle;fillColor=#00a8f3;arcSize=2;rounded=1;strokeWidth=3;foldable=0;resizable=1;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=top;';
                        let v1 = graph.insertVertex(v, null, ice1, 20, 55, 90, 60, 'constituent=1;deletable=0;arcSize=5;rounded=1;strokeWidth=3;resizable=1;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;');
                        let v2 = graph.insertVertex(v, null, ice2, 130, 55, 90, 60, 'constituent=1;deletable=0;arcSize=5;rounded=1;strokeWidth=3;resizable=1;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;');
                        let v3 = graph.insertVertex(v, null, sac, 0, 140, 240, 50, 'constituent=1;deletable=0;arcSize=8;rounded=1;strokeWidth=3;resizable=1;shape=rectangle;fillColor=#00a8f3;fontSize=12;fontFamily=Arial;strokeColor=#000000;verticalLabelPosition=middle;verticalAlign=middle;');                        
                        v3.setConnectable(false);
                        graph.addCell(v, parent);

                    } finally {
                        model.endUpdate();
                    }
                    graph.setSelectionCell(v);
                    
                };

                var numberStart = 0;
                var numberEnd = 0;
                var numberActor = 0;
                var numberCE = 0;
                var numberSCE = 0;

                // Passes type of node depending on dragged icon
                let dragStartCallBackFunct = function (graph, evt) {                    
                    let obj = new window.CustomStartObject();
                    numberStart = numberStart+1;
                    obj.name = obj.name;                    
                    obj.identifier = obj.identifier+numberStart;
                    dragCallBackFunctStart(graph, evt, obj);
                };        
                
                let dragEndCallBackFunct = function (graph, evt) {                    
                    let obj = new window.CustomEndObject();
                    numberEnd = numberEnd+1;
                    obj.name = obj.name;                    
                    obj.identifier = obj.identifier+numberEnd;
                    dragCallBackFunctEnd(graph, evt, obj);
                };        
                
                let dragActorCallBackFunct = function (graph, evt) {                    
                    let obj = new window.CustomActorObject();
                    numberActor = numberActor+1;
                    obj.name = obj.name+numberActor;                    
                    obj.identifier = obj.identifier+numberActor;
                    dragCallBackFunctActor(graph, evt, obj);
                };                

                let dragCommunicativeEventCallBackFunct = function (graph, evt) {
                    let obj = new window.CustomCommunicativeEventObject();
                    numberCE = numberCE+1;
                    obj.name = obj.name+numberCE;
                    obj.identifier = obj.identifier+numberCE;
                    dragCallBackFunctCommunicativeEvent(graph, evt, obj);
                };

                let dragSpecialisedCommunicativeEventCallBackFunct = function (graph, evt) {
                    let obj = new window.CustomSpecialisedCommunicativeEventObject();
                    numberSCE = numberSCE+1;
                    obj.name = obj.name+numberSCE;
                    obj.identifier = obj.identifier+numberSCE;
                    dragCallBackFunctSpecialisedCommunicativeEvent(graph, evt, obj);
                };            

                // Creates the image which is used as the sidebar icon (drag source)                

                // Specialised Communicative Event concept wrapper                

                let specialisedCommunicativeEventWrapper = document.createElement('div');
                 specialisedCommunicativeEventWrapper.style.cursor = 'pointer';
                specialisedCommunicativeEventWrapper.style.margin = '0px 5px 20px 5px';
                specialisedCommunicativeEventWrapper.style.width = '75px';
                specialisedCommunicativeEventWrapper.style.height = '75px';
                specialisedCommunicativeEventWrapper.style.textAlign = 'center';
                specialisedCommunicativeEventWrapper.style.display = 'flex';
                specialisedCommunicativeEventWrapper.style.flexWrap = 'wrap';
                specialisedCommunicativeEventWrapper.style.alignItems = 'center';
                specialisedCommunicativeEventWrapper.style.justifyContent = 'center';
                specialisedCommunicativeEventWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/specialised.png></div>';
                sidebar.appendChild(specialisedCommunicativeEventWrapper);

                let titleSpecialisedCommunicativeEventWrapper = document.createElement('div');
                titleSpecialisedCommunicativeEventWrapper.innerHTML = '<div style="font-weight: bold; font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #C0C0C0; text-align: center;">Specialised Communicative Event</div>';
                sidebar.appendChild(titleSpecialisedCommunicativeEventWrapper);                                            

                // Communicative Event concept wrapper
                let communicativeEventWrapper = document.createElement('div');
                communicativeEventWrapper.style.cursor = 'pointer';
                communicativeEventWrapper.style.margin = '0px 5px 20px 5px';
                communicativeEventWrapper.style.width = '75px';
                communicativeEventWrapper.style.height = '75px';
                communicativeEventWrapper.style.textAlign = 'center';
                communicativeEventWrapper.style.display = 'flex';
                communicativeEventWrapper.style.flexWrap = 'wrap';
                communicativeEventWrapper.style.alignItems = 'center';
                communicativeEventWrapper.style.justifyContent = 'center';
                communicativeEventWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/communicative_event.png></div>';
                sidebar.appendChild(communicativeEventWrapper);

                let titleCommunicativeEventWrapper = document.createElement('div');
                titleCommunicativeEventWrapper.innerHTML = '<div style="font-weight: bold; font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #C0C0C0; text-align: center;">Class</div>';
                sidebar.appendChild(titleCommunicativeEventWrapper);    
                
                // Actor concept wrapper                
                let actorWrapper = document.createElement('div');
                /* actorWrapper.style.cursor = 'pointer';
                actorWrapper.style.margin = '0px 5px 20px 5px';
                actorWrapper.style.width = '75px';
                actorWrapper.style.height = '75px';
                actorWrapper.style.textAlign = 'center';
                actorWrapper.style.display = 'flex';
                actorWrapper.style.flexWrap = 'wrap';
                actorWrapper.style.alignItems = 'center';
                actorWrapper.style.justifyContent = 'center';
                actorWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/actor.png></div>';
                sidebar.appendChild(actorWrapper);  

                let titleActorWrapper = document.createElement('div');
                titleActorWrapper.innerHTML = '<div style="font-weight: bold; margin-top: 10px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #C0C0C0; text-align: center;">Actor</div>';
                sidebar.appendChild(titleActorWrapper);  */               

                // End concept wrapper                
                let endWrapper = document.createElement('div');
               /*  endWrapper.style.cursor = 'pointer';
                endWrapper.style.margin = '0px 5px 20px 5px';
                endWrapper.style.width = '60px';
                endWrapper.style.height = '60px';
                endWrapper.style.textAlign = 'center';
                endWrapper.style.display = 'flex';
                endWrapper.style.flexWrap = 'wrap';
                endWrapper.style.alignItems = 'center';
                endWrapper.style.justifyContent = 'center';
                endWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/end.png></div>';
                sidebar.appendChild(endWrapper);  

                let titleEndWrapper = document.createElement('div');
                titleEndWrapper.innerHTML = '<div style="font-weight: bold; margin-top: 10px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #C0C0C0; text-align: center;">End</div>';
                sidebar.appendChild(titleEndWrapper);      */
            
                // Start concept wrapper                
                let startWrapper = document.createElement('div');
                startWrapper.style.cursor = 'pointer';
                startWrapper.style.margin = '0px 5px 20px 5px';
                startWrapper.style.width = '60px';
                startWrapper.style.height = '60px';
                startWrapper.style.textAlign = 'center';
                startWrapper.style.display = 'flex';
                startWrapper.style.flexWrap = 'wrap';
                startWrapper.style.alignItems = 'center';
                startWrapper.style.justifyContent = 'center';
                startWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/start.png></div>';
                sidebar.appendChild(startWrapper);  

                let titleStartWrapper = document.createElement('div');
                titleStartWrapper.innerHTML = '<div style="font-weight: bold; margin-top: 10px;font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #C0C0C0; text-align: center;">Start</div>';
                sidebar.appendChild(titleStartWrapper);      

                // Creates the image which is used as the drag icon (preview)

                let dragImageStart = startWrapper.cloneNode(true);
                mxUtils.makeDraggable(startWrapper, graph, dragStartCallBackFunct, dragImageStart);

                let dragImageEnd = endWrapper.cloneNode(true);
                mxUtils.makeDraggable(endWrapper, graph, dragEndCallBackFunct, dragImageEnd);

                let dragImageActor = actorWrapper.cloneNode(true);
                mxUtils.makeDraggable(actorWrapper, graph, dragActorCallBackFunct, dragImageActor);

                let dragImageCommunicativeEvent = communicativeEventWrapper.cloneNode(true);
                mxUtils.makeDraggable(communicativeEventWrapper, graph, dragCommunicativeEventCallBackFunct, dragImageCommunicativeEvent);

                let dragImageSpecialisedCommunicativeEvent = specialisedCommunicativeEventWrapper.cloneNode(true);
                mxUtils.makeDraggable(specialisedCommunicativeEventWrapper, graph, dragSpecialisedCommunicativeEventCallBackFunct, dragImageSpecialisedCommunicativeEvent);                

            },
                        
            // Create and configure the model editor
            createGraph() {
                // Checks if the browser is supported
                if (!mxClient.isBrowserSupported()) {
                    // Displays an error message if the browser is not supported.
                    mxUtils.error('Browser is not supported!', 200, false);
                } else {
                    mxConnectionHandler.prototype.connectImage = new mxImage(mxImageBasePath +'/handle-connect.png', 16, 16);

                    // Grid configuration
                    let container = document.getElementById('container');
                    container.style.position = 'absolute';
                    container.style.overflow = 'auto';                    
                    container.style.justifyContent = 'flex-end';
                    container.style.left = '120px';
                    container.style.top = '0px';
                    container.style.right = '240px';
                    container.style.bottom = '0px';                    
                    container.style.background = `url("${require('../assets/grid.gif')}")`;

                    // Sidebar configuration
                    let sidebar = document.getElementById('sidebar');
                    sidebar.style.position = 'absolute';
                    sidebar.style.overflow = 'hidden';
                    sidebar.style.padding = '5px';
                    sidebar.style.left = '0px';
                    sidebar.style.top = '0px';
                    sidebar.style.width = '110px';
                    sidebar.style.bottom = '0px';
                    sidebar.style.display = 'flex';
                    sidebar.style.flexDirection = 'column-reverse';
                    sidebar.style.alignItems = 'center';
                    sidebar.style.justifyContent = 'flex-end';
                    sidebar.style.backgroundColor = '#202020';
                    
                    // Rightbar configuration
                    let rightbar = document.getElementById('rightbar');
                    rightbar.style.position = 'absolute';
                    rightbar.style.overflow = 'hidden';
                    rightbar.style.padding = '5px';
                    rightbar.style.paddingLeft = '10px';
                    rightbar.style.paddingRight = '10px';
                    rightbar.style.right = '0px';
                    rightbar.style.paddingTop = '47px';
                    rightbar.style.top = '0px';                    
                    rightbar.style.bottom = '0px';
                    rightbar.style.width = '220px';
                    rightbar.style.display = 'flex';
                    rightbar.style.flexDirection = 'column';
                    rightbar.style.alignItems = 'center';
                    rightbar.style.justifyContent = 'space-between';
                    rightbar.style.backgroundColor = '#202020';

                    if (mxClient.IS_QUIRKS) {
                        document.body.style.overflow = 'hidden';
                        new mxDivResizer(container);
                        new mxDivResizer(sidebar);
                        new mxDivResizer(rightbar);
                    }

                    editor = new mxEditor();
                    editor.setGraphContainer(container);

                    // Global connection management
                    editor.graph.setConnectable(true);
                    editor.graph.setCellsDisconnectable(false); // Impedir desconexión, sino hay que apicar las mismas validaicones que al conectar
                    editor.graph.setPanning(true);
                    editor.graph.setAllowDanglingEdges(false);                    

                    // Change selected in a separate panel
                    editor.graph.getSelectionModel().addListener(mxEvent.CHANGE, () => {
                        this.selectionChanged();
                    });
                    this.selectionChanged();

                    editor.graph.centerZoom = true;
                    editor.graph.swimlaneNesting = false;
                    editor.graph.dropEnabled = false; // Evitar piscina

                    // Fields are dynamically created HTML labels
                    editor.graph.isHtmlLabel = function (cell) {
                        return !this.isSwimlane(cell) &&
                            !this.model.isEdge(cell);
                    };

                    // Not editable
                    editor.graph.isCellEditable = function () {
                        return false
                    };

                    // Returns the name propertie of the user object for the label
                    editor.graph.convertValueToString = function (cell) {
                        if (cell.value != null && cell.value.name != null) {
                            return cell.value.name;
                        }
                        return mxGraph.prototype.convertValueToString.apply(this, arguments); // "supercall"
                    };

                    // Creates a dynamic HTML label for properties
                    editor.graph.getLabel = function (cell) {
                        //console.log('getLabel ', cell);
                        if (cell && this.isHtmlLabel(cell) && cell.value) {
                            
                            var identifierLabel = (this.labelsVisible) ? cell.value.identifier : '';
                            var nameLabel = (this.labelsVisible) ? cell.value.name : '';
                            var geometry = this.model.getGeometry(cell);
                            var identifierValue;
                            var nameValue;
                            
                            if (!this.model.isCollapsed(cell) && geometry != null && (geometry.offset == null ||
                                (geometry.offset.x == 0 && geometry.offset.y == 0)) && this.model.isVertex(cell) &&
                                geometry.width >= 2)
                            {
                                var style = this.getCellStyle(cell);
                                var fontSize = style[mxConstants.STYLE_FONTSIZE] || mxConstants.DEFAULT_FONTSIZE;
                                var max = geometry.width / (fontSize * 0.675);
                                var newLine = max*2 - max/25;
                                
                                if (max < identifierLabel.length)
                                {
                                    identifierValue = identifierLabel.substring(0, max) + '...';
                                } else {
                                    identifierValue = identifierLabel;
                                }

                                if (max < nameLabel.length)
                                {   
                                    nameValue = nameLabel.substring(0, max);
                                    
                                    if(nameLabel.substring(max, max+1) === " " || nameLabel.substring(max-1, max) === " "){
                                        nameValue += '\n';
                                    } else {
                                        nameValue += '-\n';
                                    }

                                    nameValue += nameLabel.substring(max, newLine);
                                    
                                    if(newLine < nameLabel.length){
                                        nameValue += '...';
                                    }

                                } else {
                                    nameValue = nameLabel;
                                }

                                if (cell.value.type == 'Actor') {
                                    //identifierValue = identifierLabel;
                                    identifierValue = '';
                                    nameValue = nameLabel;
                                }
                                if (cell.value.type == 'Start') {
                                    //identifierValue = identifierLabel;
                                    identifierValue = '';
                                    nameValue = nameLabel;
                                }

                                if (cell.value.type == 'End') {
                                    //identifierValue = identifierLabel;
                                    identifierValue = '';
                                    nameValue = nameLabel;
                                }
                            }

                            let label = '';
                            label += '<div style="color: black; width: 100%; text-align: center;">';
                            label += '<div style="margin-top: 5px;">' + mxUtils.htmlEntities(`${identifierValue}`, false) + '</div>';
                            label += '<div style="margin-bottom: 5px;">' +
                                '<strong>' + mxUtils.htmlEntities(nameValue, false) + '</strong>' +
                                '</div>';
                            label += '</div>';

                            return label
                        }

                        return mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
                    };

                    // Adds sidebar icon for the propertie object
                    let customObject = new window.CustomUserObject();

                    let object = new mxCell(customObject, new mxGeometry(0, 0,75, 75), '');
                    object.setVertex(true);
                    object.setConnectable(true);

                    this.addSidebarIcon(editor.graph, sidebar, object);
                    
                    // Init cliboard: cut-copy-paste
                    clipboardInit(editor.graph);
                    // Init undo
                    undo(editor.graph);
                    // Init exportmodel
                    toolBarButtons(editor.graph, this.modelDetails);
                    // Init validation
                    validation(editor.graph);
                    // Init zoom
                    zoom(editor.graph);
}
            },
        // Settings
            init() {
                //////////////////////////////////////////
                // CUSTOM FIELDS CODES for export import
                //////////////////////////////////////////
            
                var detailsData = {
                    userName: "default user",
                    modelidentifier: Date.now(),
                    modelType: "COMMUNICATIONANALYSIS"
                };
            
                this.$set(this, 'modelDetails', detailsData);


                // Create a node with a unique identifier for the model
                var identifierP = document.createElement("P");
                identifierP.className = 'modelIdentifier';
                var identifierT = document.createTextNode(Date.now());
                identifierP.appendChild(identifierT);  
                document.body.appendChild(identifierP);


                let codecCustomUserObject = new mxObjectCodec(new window.CustomUserObject());
                codecCustomUserObject.encode = function (enc, obj) {
                    let node = enc.document.createElement('CustomUserObject');
                    mxUtils.setTextContent(node, JSON.stringify(obj));

                    return node;
                };
                codecCustomUserObject.decode = function (dec, node) {
                    let obj = JSON.parse(mxUtils.getTextContent(node));
                    let beatyObj = new window.CustomUserObject();
                    obj = Object.assign(beatyObj, obj);
                    return obj;
                };
                mxCodecRegistry.register(codecCustomUserObject);

                this.createGraph();
            },
        },
        mounted() {
            this.init();
        }
    }
</script>
