function validation(graph)
{
    graph.setConnectable(true);
    graph.setTooltips(true);
    graph.setAllowDanglingEdges(false);
    graph.setMultigraph(false);
    
    var editor = new mxEditor();
    
    editor.validation = true;

    graph.alreadyConnectedResource = 'Already Connected';
        
    var listener = function()
    {        
        graph.validateGraph();
    };
    
    graph.getModel().addListener(mxEvent.CHANGE, listener);

}
export default validation;