function undo(graph)
{
    //Sets undo manager and listeners 
    var undoManager = new mxUndoManager();
    var listener = function(sender, evt)
    {
        undoManager.undoableEditHappened(evt.getProperty('edit'));
    };
    graph.getModel().addListener(mxEvent.UNDO, listener);
    graph.getView().addListener(mxEvent.UNDO, listener);

    //Undo listener for keypress "z"
    mxEvent.addListener(document, 'keydown', function(evt){
        if (evt.which === 90 && (evt.ctrlKey || evt.metaKey)) {   
            undoManager.undo();
        }
    });

    //Redo listener for keypress "y"
    mxEvent.addListener(document, 'keydown', function(evt){
        if (evt.which === 89 && (evt.ctrlKey || evt.metaKey)) {
            undoManager.redo();                   
        }
    });

    /*
    mxEvent.addListener(document, 'keydown', function(evt){
        if (evt.which === 65 && (evt.ctrlKey || evt.metaKey)) {
            graph.selectAll();
        }
    });
    */

};
export default undo;
