define(['widgets/brease/CheckBox/CheckBox'], function (SuperClass) {

    'use strict';

    /**
    * @class widgets.VF.StatusBall
    * @extends widgets.brease.CheckBox
    */
    var defaultSettings = {
        "boxSize": 24,
        "breakWord": false,
        "checkedBoxImage": "",
        "disabledCheckedBoxImage": "Media/SymbolLib/_VulcanForms/BallGreenOK.svg",
        "disabledUncheckedBoxImage": "Media/SymbolLib/_VulcanForms/BallRedCancel.svg",
        "draggable": false,
        "ellipsis": false,
        "enable": false,
        "imageAlign": "left",
        "mouseDownText": "",
        "multiLine": false,
        "style": "default",
        "tooltip": "",
        "uncheckedBoxImage": "",
        "value": false,
        "visible": true,
        "wordWrap": false,
        "maxHeight": 0,
        "minHeight": 0,
        "maxWidth": 0,
        "minWidth": 0,
        "height": "30",
        "width": "220"
},

    WidgetClass = SuperClass.extend(function StatusBall() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    return WidgetClass;

});
