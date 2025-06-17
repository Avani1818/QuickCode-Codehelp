"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = __importStar(require("vscode"));
const puppeteer = __importStar(require("puppeteer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
function activate(context) {
    console.log('Congratulations, your extension "cph-leetcode" is now active!');
    // Command to fetch test cases
    const fetchTestCasesCommand = vscode.commands.registerCommand('cph-leetcode.fetchTestCases', async () => {
        try {
            const problemURL = await vscode.window.showInputBox({
                prompt: 'Input a LeetCode problem URL (e.g., https://leetcode.com/problems/two-sum/)',
                placeHolder: 'https://leetcode.com/problems/two-sum/',
            });
            if (problemURL) {
                vscode.window.showInformationMessage(`Fetching test cases from: ${problemURL}`);
                await fetchTestCases(problemURL);
            }
            else {
                vscode.window.showWarningMessage('No URL was provided!');
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error while executing fetchTestCases: ${error.message}`);
        }
    });
    // Function to select language
    const selectLanguage = async () => {
        return vscode.window.showQuickPick(['Python', 'C++'], {
            placeHolder: 'Select the language for your solution',
        });
    };
    // Command to run the solution
    const runSolutionCommand = vscode.commands.registerCommand('cph-leetcode.runSolution', async () => {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder open');
                return;
            }
            const language = await selectLanguage();
            if (!language) {
                vscode.window.showWarningMessage('No language selected');
                return;
            }
            const testCasesFolder = path.join(workspaceFolder, 'test-cases');
            if (!fs.existsSync(testCasesFolder)) {
                vscode.window.showErrorMessage('No test cases found. Please fetch test cases first.');
                return;
            }
            const testCases = readTestCases(testCasesFolder);
            if (testCases.length === 0) {
                vscode.window.showErrorMessage('No test cases found in the folder.');
                return;
            }
            if (language === 'Python') {
                let solutionPath = path.join(workspaceFolder, 'solution.py');
                if (!fs.existsSync(solutionPath)) {
                    vscode.window.showWarningMessage('Default solution file not found. Please select the file.');
                    const solutionFileUri = await vscode.window.showOpenDialog({
                        canSelectFiles: true,
                        canSelectFolders: false,
                        openLabel: 'Select Solution File',
                        filters: { Python: ['py'] },
                    });
                    if (!solutionFileUri || solutionFileUri.length === 0) {
                        vscode.window.showErrorMessage('No solution file selected.');
                        return;
                    }
                    solutionPath = solutionFileUri[0].fsPath;
                }
                const results = await runPythonSolution(solutionPath, testCases);
                displayResults(results);
            }
            else if (language === 'C++') {
                let solutionPath = path.join(workspaceFolder, 'solution.cpp');
                if (!fs.existsSync(solutionPath)) {
                    vscode.window.showWarningMessage('Default solution file not found. Please select the file.');
                    const solutionFileUri = await vscode.window.showOpenDialog({
                        canSelectFiles: true,
                        canSelectFolders: false,
                        openLabel: 'Select Solution File',
                        filters: { Cpp: ['cpp'] },
                    });
                    if (!solutionFileUri || solutionFileUri.length === 0) {
                        vscode.window.showErrorMessage('No solution file selected.');
                        return;
                    }
                    solutionPath = solutionFileUri[0].fsPath;
                }
                const results = await runCppSolution(solutionPath, testCases);
                displayResults(results);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error while running the solution: ${error.message}`);
        }
    });
    context.subscriptions.push(fetchTestCasesCommand, runSolutionCommand);
}
function extractDataAfterEqual(input) {
    const dataArray = [];
    let currentPos = 0;
    while (currentPos < input.length) {
        const equalPos = input.indexOf('=', currentPos);
        if (equalPos === -1) {
            break;
        }
        const start = equalPos + 1;
        const commaSpacePos = input.indexOf(', ', start);
        if (commaSpacePos !== -1) {
            const segment = input.slice(start, commaSpacePos).trim();
            if (segment)
                dataArray.push(segment); // Add only non-empty segments
            currentPos = commaSpacePos + 2;
        }
        else {
            const segment = input.slice(start).trim();
            if (segment)
                dataArray.push(segment); // Add only non-empty segments
            break;
        }
    }
    return dataArray;
}
function parseExtractedData(input) {
    const extractedData = extractDataAfterEqual(input);
    return extractedData.map((data) => {
        try {
            // If the data is an integer
            if (/^-?\d+$/.test(data)) {
                return parseInt(data, 10);
            }
            // If the data is a JSON array
            if (/^\[.*\]$/.test(data)) {
                return JSON.parse(data);
            }
            // Default case: return as a string
            return data;
        }
        catch (error) {
            console.error(`Error parsing data: "${data}". Error: ${error.message}`);
            throw error;
        }
    });
}
// Fetch, save raw test cases, parse, and update input files
async function fetchTestCases(url) {
    try {
        const testCases = await fetchTestCasesFromLeetCode(url);
        if (testCases.length === 0) {
            vscode.window.showErrorMessage('No test cases were found.');
            return;
        }
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }
        const testCasesFolder = path.join(workspaceFolder, 'test-cases');
        console.log(`Saving raw test cases to: ${testCasesFolder}`);
        if (!fs.existsSync(testCasesFolder)) {
            fs.mkdirSync(testCasesFolder);
        }
        // Step 1: Save raw test cases
        testCases.forEach((testCase, index) => {
            try {
                const inputFilePath = path.join(testCasesFolder, `input_${index + 1}.json`);
                const outputFilePath = path.join(testCasesFolder, `output_${index + 1}.json`);
                fs.writeFileSync(inputFilePath, testCase.input.trim());
                fs.writeFileSync(outputFilePath, testCase.output.trim());
                console.log(`Saved raw test case ${index + 1}`);
            }
            catch (error) {
                console.error(`Error saving raw test case ${index + 1}:`, error.message);
            }
        });
        vscode.window.showInformationMessage('Raw test cases saved successfully!');
        // Step 2: Parse and update input files
        const inputFiles = fs.readdirSync(testCasesFolder).filter(file => file.startsWith('input_') && file.endsWith('.json')).sort();
        inputFiles.forEach((inputFile, index) => {
            try {
                const inputFilePath = path.join(testCasesFolder, inputFile);
                // Read and parse raw input
                const rawInput = fs.readFileSync(inputFilePath, 'utf8');
                const parsedData = parseExtractedData(rawInput);
                // Overwrite the file with parsed data
                fs.writeFileSync(inputFilePath, JSON.stringify(parsedData, null, 2));
                console.log(`Parsed and updated input file: ${inputFile}`);
            }
            catch (error) {
                console.error(`Error parsing and saving input file ${inputFile}:`, error.message);
            }
        });
        vscode.window.showInformationMessage('Input files parsed and updated successfully!');
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to fetch, save, and process test cases: ${error.message}`);
    }
}
// Extract test cases from LeetCode
async function fetchTestCasesFromLeetCode(problemURL) {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,
        timeout: 60000,
    });
    const page = await browser.newPage();
    try {
        await page.goto(problemURL, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('.elfjS');
        const testCases = await page.evaluate(() => {
            const testCaseElements = Array.from(document.querySelectorAll('.elfjS pre'));
            const testCases = [];
            testCaseElements.forEach((el) => {
                const textContent = el.textContent || '';
                const inputMatch = textContent.match(/Input:\s*(.*)/);
                const outputMatch = textContent.match(/Output:\s*(.*)/);
                if (inputMatch && outputMatch) {
                    testCases.push({
                        input: inputMatch[1].trim(),
                        output: outputMatch[1].trim(),
                    });
                }
            });
            return testCases;
        });
        if (testCases.length > 0) {
            return testCases;
        }
        await page.waitForSelector('.example-block');
        const fallbackTestCases = await page.evaluate(() => {
            const exampleBlocks = Array.from(document.querySelectorAll('.example-block'));
            const testCases = [];
            exampleBlocks.forEach((block) => {
                const inputElement = block.querySelector('p > span.example-io');
                const outputElement = block.querySelector('p + p > span.example-io');
                if (inputElement && outputElement) {
                    testCases.push({
                        input: inputElement.textContent?.replace('Input:', '').trim() || '',
                        output: outputElement.textContent?.replace('Output:', '').trim() || '',
                    });
                }
            });
            return testCases;
        });
        if (fallbackTestCases.length > 0) {
            return fallbackTestCases;
        }
        throw new Error('No test cases found');
    }
    catch (error) {
        console.error('Error fetching test cases:', error);
        throw error;
    }
    finally {
        await browser.close();
    }
}
function readTestCases(folderPath) {
    try {
        const testCases = [];
        // Read and sort input and output files
        const files = fs.readdirSync(folderPath);
        const inputFiles = files.filter(file => file.startsWith('input_') && file.endsWith('.json')).sort();
        const outputFiles = files.filter(file => file.startsWith('output_') && file.endsWith('.json')).sort();
        // Validate file pairing
        if (inputFiles.length !== outputFiles.length) {
            throw new Error('Mismatch between input and output files. Ensure files are paired correctly.');
        }
        // Read inputs and outputs without parsing
        inputFiles.forEach((inputFile, index) => {
            const inputFilePath = path.join(folderPath, inputFile);
            const outputFilePath = path.join(folderPath, outputFiles[index]);
            const rawInput = fs.readFileSync(inputFilePath, 'utf8'); // Already parsed input
            const rawOutput = fs.readFileSync(outputFilePath, 'utf8'); // Expected output
            testCases.push({ input: JSON.parse(rawInput), output: rawOutput.trim() });
        });
        return testCases;
    }
    catch (error) {
        console.error('Error reading test cases:', error.message);
        throw error;
    }
}
function runPythonSolution(solutionPath, testCases) {
    return Promise.all(testCases.map(testCase => new Promise(resolve => {
        const process = (0, child_process_1.exec)(`python "${solutionPath}"`, (error, stdout, stderr) => {
            const actualOutput = error ? stderr.trim() : stdout.trim();
            resolve({
                input: testCase.input,
                expected: testCase.output,
                actual: actualOutput,
                passed: actualOutput === testCase.output,
            });
        });
        // Feed JSON input into the Python script
        //process.stdin?.write(JSON.stringify(testCase.input) + '\n');
        // for (let i = 0; i < testCases.length; i++) {
        const inputs = testCase.input;
        for (let j = 0; j < inputs.length; j++) {
            process.stdin?.write(JSON.stringify(inputs[j]));
        }
        process.stdin?.end();
    })));
}
// Compile and run C++ solution
function runCppSolution(solutionPath, testCases) {
    const compiledPath = path.join(path.dirname(solutionPath), 'solution.exe');
    return new Promise((resolve, reject) => {
        // Compile the C++ solution
        (0, child_process_1.exec)(`g++ "${solutionPath}" -o "${compiledPath}"`, (compileError, stdout, stderr) => {
            if (compileError) {
                reject(new Error(stderr || 'Compilation failed.'));
                return;
            }
            // Run test cases
            Promise.all(testCases.map(testCase => new Promise(resolveTestCase => {
                const process = (0, child_process_1.exec)(`"${compiledPath}"`, (error, stdout, stderr) => {
                    const actualOutput = error ? stderr.trim() : stdout.trim();
                    resolveTestCase({
                        input: testCase.input,
                        expected: testCase.output,
                        actual: actualOutput,
                        passed: actualOutput === testCase.output,
                    });
                });
                // Feed JSON input into the C++ executable
                //process.stdin?.write(JSON.stringify(testCase.input) + '\n');
                const inputs = testCase.input;
                for (let i = 0; i < inputs.length; i++) {
                    process.stdin?.write(JSON.stringify(inputs[i]));
                }
                // for (let i = 0; i < testCases.length; i++) {
                //     const inputs = testCase.input[i];
                //     for(let j=0;j<inputs.length;j++){
                //         process.stdin?.write(JSON.stringify(inputs[j]));
                //     }}
                process.stdin?.end();
            }))).then(resolve).catch(reject);
        });
    });
}
function displayResults(results) {
    // Create or get a terminal named "Test Results"
    const terminal = vscode.window.createTerminal({ name: "Test Results" });
    terminal.show(); // Show the terminal
    // Write results to the terminal using echo with quotes
    terminal.sendText('echo "Test case execution completed. Here are the details:"');
    results.forEach((result, index) => {
        terminal.sendText(`echo "Test Case ${index + 1}: ${result.passed ? 'Passed ✅' : 'Failed ❌'}"`);
        if (!result.passed) {
            const rinputs = result.input;
            // for(let i=0;i<rinputs.length;i++){
            //     terminal.sendText(`echo "  Input: ${JSON.stringify(rinputs[i])}"`);
            // }
            terminal.sendText(`echo "  Input: ${JSON.stringify(result.input)}"`);
            terminal.sendText(`echo "  Expected: ${result.expected}"`);
            terminal.sendText(`echo "  Actual: ${result.output}"`);
        }
    });
    // Optional: Inform the user in the editor UI
    vscode.window.showInformationMessage('Test case execution completed. Check the "Test Results" terminal for details.');
}
//# sourceMappingURL=extension.js.map