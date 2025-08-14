define(['widgets/brease/CheckBox/CheckBox'], function (SuperClass) {

    'use strict';

    /**
    * @class widgets.VF.StatusMoving
    * @extends widgets.brease.CheckBox
    */
    var defaultSettings = {
        "boxSize": 24,
        "breakWord": false,
        "checkedBoxImage": "",
        "disabledCheckedBoxImage": "Media/SymbolLib/_VulcanForms/MovingBlack.svg",
        "disabledUncheckedBoxImage": "Media/SymbolLib/_VulcanForms/MovingLightGray.svg",
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

    WidgetClass = SuperClass.extend(function StatusMoving() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    return WidgetClass;

});
