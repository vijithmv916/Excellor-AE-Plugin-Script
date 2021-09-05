textLy = app.project.activeItem.selectedLayers[0]

scaleTextProp = textLy.property(5).property(6)


scaleTextProp.setValuesAtTimes([0, 1], [[0,0], [100, 100]])

