
var s = app.project.activeItem.selectedLayers[0];
s.label=11

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



myTextLayer.position.expression = "tPath = thisComp.layer(\"Shape Layer 1\").content(\"Shape 1\").content(\"Path 1\").path; \r"+
"TrimEnd = thisComp.layer(\"Shape Layer 1\").content(\"ADBE Vector Filter - Trim\").end/100; \r" +
"x = tPath.pointOnPath(TrimEnd)[0]; \r" +
"y = tPath.pointOnPath(TrimEnd)[1]; \r" +
"[x+1920, y+1080];"
myTextLayer.rotation.expression = "TrimEnd = thisComp.layer(\"Shape Layer 1\").content(\"ADBE Vector Filter - Trim\").end/100;\r"+ 
"tTang = thisComp.layer(\"Shape Layer 1\").content(\"Shape 1\").content(\"Path 1\").path.tangentOnPath(TrimEnd); \r" +
"angle = Math.atan2(tTang[1], tTang[0]); \r" +
"radiansToDegrees(angle);"

// myTextLayer.property("Anchor Point").expression = "s = thisLayer; \r"+ 
// "sTop = s.sourceRectAtTime().top; \r" + 
// "sLeft = s.sourceRectAtTime().left; \r" + 

// "sHeight = s.sourceRectAtTime().height;\r " + 
// "sWidth = s.sourceRectAtTime().width;\r " + 

// "sAnchorY = sTop + (sHeight/2); \r " +
// "sAnchorX = sLeft + (sWidth/2); \r " +

// "[sAnchorX, sAnchorY]"
