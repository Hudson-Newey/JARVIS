var changeMode = function (value) {
    switch (value) {
        case "interaction":
            location.href = "/";
            break;
        case "ambiant":
            location.href = "?q=load://ambiant";
            break;
        case "watermark":
            location.href = "?q=load://watermark";
            break;
        // error (default to interaction mode)
        default:
            break;
    }
};
var removeSubString = function (string, subString) {
    return string.replace(subString, "");
};
var loadModeValue = function () {
    var query = removeSubString(window.location.search, "?q=");
    if (query.includes("load://")) {
        // remove 'load://' protocol to extract mode value
        return removeSubString(query, "load://");
    }
    // default to interaction mode
    return "interaction";
};
// change mode combobox to the active mode
document.getElementById("mode-selection").value = loadModeValue();
