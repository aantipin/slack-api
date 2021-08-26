module.exports = {
    verbose: true,
    reporters: [
        "default",
        [
            "jest-junit",
            {
                outputDirectory: "results"
            }
        ]
    ]
};