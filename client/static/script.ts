let changeMode = (value: string): void => {
    switch (value) {
 
       case "interaction":
            location.href = "/"
            break
        
        case "ambiant":
            location.href = "?q=load://ambiant"
            break
        
        case "watermark":
            location.href = "?q=load://watermark"
            break
        
        // error (default to interaction mode)
        default:
            break
    }
}

let removeSubString = (string, subString): string => {
    return string.replace(subString, "")
}

let loadModeValue = (): string => {
    let query: string = removeSubString(window.location.search, "?q=")

    if (query.includes("load://")) {
        // remove 'load://' protocol to extract mode value
        return removeSubString(query, "load://")
    }

    // default to interaction mode
    return "interaction"
}

// change mode combobox to the active mode
document.getElementById("mode-selection").value = loadModeValue()
