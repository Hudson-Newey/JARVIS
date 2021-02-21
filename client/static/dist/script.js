var changeMode = function (value) {
    switch (value) {
        case "interaction":
            break;
        case "ambiant":
            location.href = "?q=load://ambiant";
            break;
        case "watermark":
            location.href = "?q=load://watermark";
            break;
        case "music":
            location.href = "?q=https://open.spotify.com";
            break;
        // error (default to interaction mode)
        default:
            break;
    }
};
