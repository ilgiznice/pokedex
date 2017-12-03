module.exports = {
    "extends": [
        "standard",
        "plugin:flowtype/recommended"
    ],
    "plugins": [
        "standard",
        "promise",
        "flowtype"
    ],
    "settings": {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": true
        }
    }
};