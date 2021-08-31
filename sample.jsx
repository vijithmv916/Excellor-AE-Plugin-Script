

{
    function lineEaser() {

        var pathLine = app.project.activeItem.selectedLayers[0]
        try {
            var trimPath = pathLine.property("Contents").addProperty("ADBE Vector Filter - Trim")
        } catch (e) {
            alert("No Layer Selected");
        }
        controlEnd = trimPath.property("ADBE Vector Trim End")

        var easeIn = new KeyframeEase(.5, 70);
        var easeOut = new KeyframeEase(.5, 70);

        // key at second
        controlEnd.addKey(0)
        controlEnd.addKey(0.75)
        controlEnd.setValueAtKey(1, 0)
        controlEnd.setValueAtKey(2, 100)

        controlEnd.setTemporalEaseAtKey(1, [easeIn], [easeOut]);
        controlEnd.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
    }

    function createUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "My Tools",
            undefined);
        var btn = myPanel.add("button", [10, 10, 90, 40], "Draw");
        try {
            btn.onClick = function () { lineEaser() }
        } catch (e) { }

        return myPanel;
    }
    var myToolsPanel = createUI(this);

    // myToolsPanel.show()




    // Excellor_Flash(this)
}