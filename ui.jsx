{
    function ExTool(thisObj) {
        function BuildIt(thisObj) {
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "", [100, 100, 300, 280]);//
    
            //SAMPLE UI CODE
            var btn = myPanel.add("button", [10,10,180,30], "Name Of Your Button");
            var ck = myPanel.add("checkbox", [10,35,180,55], "Name Of Your Checkbox");

            return myPanel;
        } //END OF PANEL CREATION
    
    
    
    ///	THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW	â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
        var win = BuildIt(thisObj);
        if ((win != null) && (win instanceof Window)) {
            win.center();
            win.show();
            }
        }
        ExTool(this);
}