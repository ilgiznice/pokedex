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
    },
    "rules": {
        "operator-linebreak": { "overrides": { "?": "ignore", ":": "ignore" } }
    }
};