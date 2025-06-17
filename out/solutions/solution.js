"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function solve(input) {
    // Parse the input (convert string to a number)
    const n = parseInt(input, 10);
    // Edge cases for n = 0, 1, or 2
    if (n === 0)
        return "0";
    if (n === 1)
        return "1";
    if (n === 2)
        return "1";
    // Create a table to store the Tribonacci numbers
    const table = new Array(n + 1);
    // Initialize the base cases
    table[0] = 0;
    table[1] = 1;
    table[2] = 1;
    // Fill the table using the Tribonacci formula
    for (let i = 3; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2] + table[i - 3];
    }
    // Return the nth Tribonacci number as a string
    return table[n].toString();
}
module.exports = { solve };
//# sourceMappingURL=solution.js.map