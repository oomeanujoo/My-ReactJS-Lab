    import React from "react";

    const StarPattern = () => {
    const n = 6;

    // Method to generate a square pattern
    const generateSquarePattern = (size) => {
        let pattern = "";
        for (let i = 0; i < size; i++) {
        let row = "";
        for (let j = 0; j < size; j++) {
            row += "*";
        }
        pattern += row + "\n";
        }
        return pattern;
    };

    // Other methods can be added here, e.g., rightTrianglePattern, pyramidPattern, etc.

    const squarePattern = generateSquarePattern(n);

    console.log("Square Pattern\n" + squarePattern);

    return (
        <>
        <div>⭐ Star Pattern Component ⭐</div>
        <h2>Square Pattern:</h2>
        <pre>{squarePattern}</pre>
        </>
    );
    };

    export default StarPattern;
