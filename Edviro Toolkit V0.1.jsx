{   
    function createHead(pathLine){
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


        // attaching head
        myTextLayer.position.expression = "tPath = thisComp.layer(\""+ pathLine.name +"\").content(\"Shape 1\").content(\"Path 1\").path; \r" +
            "TrimEnd = thisComp.layer(\""+ pathLine.name +"\").content(\"ADBE Vector Filter - Trim\").end/100; \r" +
            "x = tPath.pointOnPath(TrimEnd)[0]; \r" +
            "y = tPath.pointOnPath(TrimEnd)[1]; \r" +
            "[x+1920, y+1080];"
        
        // rotation head
        myTextLayer.rotation.expression = "TrimEnd = thisComp.layer(\""+ pathLine.name +"\").content(\"ADBE Vector Filter - Trim\").end/100;\r" +
            "tTang = thisComp.layer(\""+ pathLine.name +"\").content(\"Shape 1\").content(\"Path 1\").path.tangentOnPath(TrimEnd); \r" +
            "angle = Math.atan2(tTang[1], tTang[0]); \r" +
            "radiansToDegrees(angle);"
        
        //anchor fix
        myTextLayer.property("Anchor Point").expression = "s = thisLayer; \r " +
            "sTop = s.sourceRectAtTime().top; \r " +
            "sLeft = s.sourceRectAtTime().left; \r " +
            "sHeight = s.sourceRectAtTime().height; \r " +
            "sAnchorY = sTop + (sHeight/2); \r " +
            "sAnchorX = sLeft ; \r " +
            "[sAnchorX, sAnchorY]"

        //animating size
        textScale = myTextLayer.scale
        textScale.addKey(0)
        textScale.addKey(0.4)
        textScale.setValueAtKey(1, [0,0])
        textScale.setValueAtKey(2, [100, 100])
    }


    function drw(ishead) {
        
        var pathLine = app.project.activeItem.selectedLayers[0]
        pathLine.label = 11

        //getting trim keys
        try {
            var trimPath = pathLine.property("Contents").addProperty("ADBE Vector Filter - Trim")
        } catch (e) {
            alert("No Layer Selected");
        }

        //animating trim path shape layer
        controlEnd = trimPath.property("ADBE Vector Trim End")

        var easeIn = new KeyframeEase(0, 55);
        var easeOut = new KeyframeEase(0, 55);

        // key at 1 sec
        controlEnd.addKey(0)
        controlEnd.addKey(1)
        controlEnd.setValueAtKey(1, 0)
        controlEnd.setValueAtKey(2, 100)

        controlEnd.setTemporalEaseAtKey(1, [easeIn], [easeOut]);
        controlEnd.setTemporalEaseAtKey(2, [easeIn], [easeOut]);

        var s = app.project.activeItem.selectedLayers[0];
        s.label = 11

        // create head id checked
        if(ishead){
            createHead(pathLine)
        }
        

    }

    
    function createUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "My Tools",
            undefined);
        var btn = myPanel.add("button", [10, 10, 90, 40], "Draw Arrow");
        var ck = myPanel.add("checkbox", undefined, "Enable Arrow Head");


        try {
            btn.onClick = function () {
                
                    drw(ck.value)

            }
        } catch (e) { }

        return myPanel;
        
    }
    
    var myToolsPanel = createUI(this);

    // myToolsPanel.show()
    
}