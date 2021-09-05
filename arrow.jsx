{   
    function arrower() {
        
        var pathLine = app.project.activeItem.selectedLayers[0]
        pathLine.label = 11

        try {
            var trimPath = pathLine.property("Contents").addProperty("ADBE Vector Filter - Trim")
        } catch (e) {
            alert("No Layer Selected");
        }
        controlEnd = trimPath.property("ADBE Vector Trim End")

        var easeIn = new KeyframeEase(0, 55);
        var easeOut = new KeyframeEase(0, 55);

        // key at second
        controlEnd.addKey(0)
        controlEnd.addKey(1)
        controlEnd.setValueAtKey(1, 0)
        controlEnd.setValueAtKey(2, 100)

        controlEnd.setTemporalEaseAtKey(1, [easeIn], [easeOut]);
        controlEnd.setTemporalEaseAtKey(2, [easeIn], [easeOut]);

        var s = app.project.activeItem.selectedLayers[0];
        s.label = 11

        var myTextLayer = app.project.activeItem.layers.addText();

        myTextLayer.label = 11
        var textProp = myTextLayer.property("Source Text");
        var textDocument = textProp.value;
        myString = "►";

        textDocument.resetCharStyle();
        textDocument.fontSize = 90;
        textDocument.font = "Segoe UI Symbol";
        textDocument.text = myString;

        textProp.setValue(textDocument);



        myTextLayer.position.expression = "tPath = thisComp.layer(\""+ pathLine.name +"\").content(\"Shape 1\").content(\"Path 1\").path; \r" +
            "TrimEnd = thisComp.layer(\""+ pathLine.name +"\").content(\"ADBE Vector Filter - Trim\").end/100; \r" +
            "x = tPath.pointOnPath(TrimEnd)[0]; \r" +
            "y = tPath.pointOnPath(TrimEnd)[1]; \r" +
            "[x+1920, y+1080];"
        myTextLayer.rotation.expression = "TrimEnd = thisComp.layer(\""+ pathLine.name +"\").content(\"ADBE Vector Filter - Trim\").end/100;\r" +
            "tTang = thisComp.layer(\""+ pathLine.name +"\").content(\"Shape 1\").content(\"Path 1\").path.tangentOnPath(TrimEnd); \r" +
            "angle = Math.atan2(tTang[1], tTang[0]); \r" +
            "radiansToDegrees(angle);"

    }

    
    function createUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "My Tools",
            undefined);
        var btn = myPanel.add("button", [10, 10, 90, 40], "Draw Arrow");
        
        try {
            btn.onClick = function () { arrower() }
        } catch (e) { }

        return myPanel;
        
    }
    
    var myToolsPanel = createUI(this);

    // myToolsPanel.show()
    
}