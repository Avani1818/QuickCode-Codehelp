# CPH LeetCode Extension

This repository hosts a custom Visual Studio Code (VS Code) extension named QuickCode, built to streamline the workflow of acquiring, structuring, and validating task data with your custom scripts. It’s an integrated tool designed to bring automation and simplicity to your testing process.

## Features

Fetch LeetCode Test Cases: Automatically fetch test cases from a LeetCode problem URL.

Parse and Store Test Cases: Parse the fetched test cases and store them locally in JSON format.

Run Solutions: Execute your solutions (in Python or C++) against the stored test cases and display results.

Unified Command: Perform all these actions in one go with a single command.

## Prerequisites

Before using the extension, ensure you have the following installed:

Node.js and npm

Yo Generator: For creating and scaffolding the extension.

VS Code: Latest version.

Python: Installed and added to the system PATH.

C++ Compiler: Ensure g++ is installed for C++ solutions.

Google Chrome: Required for Puppeteer to fetch LeetCode test cases.

## Installation

Follow these steps to set up and activate the cph-leetcode extension:

### Step 1: Install the Yeoman Generator for VS Code Extensions

npm install -g yo generator-code

### Step 2: Clone This Repository

git clone https://github.com/Avani1818/QuickCode-Codehelp.git
cd QuickCode-Codehelp

### Step 3: Install Dependencies

Install all the required Node.js dependencies using:

npm install

### Step 4: Open in VS Code

Launch VS Code and open the extension project directory:

code .

### Step 5: Run the Extension

Press F5 in VS Code to launch an Extension Development Host.

This will activate your extension in a new VS Code window.

## Usage

Unified Command: Fetch, Parse, Store, and Run Test Cases

### Step 1: Input the LeetCode Problem URL

Use the command palette (Ctrl+Shift+P / Cmd+Shift+P) and search for the command:

CPH LeetCode: Fetch, Parse, and Run Test Cases

Enter the URL of the LeetCode problem (e.g., https://leetcode.com/problems/two-sum/).

### Step 2: Select Solution Language

You will be prompted to select the language for your solution (Python or C++).

### Step 3: Write Your Solution

Ensure your solution file is located in the workspace directory with the following default names:

For Python: solution.py

For C++: solution.cpp

If the default files are not found, you will be prompted to manually select the solution file.

### Step 4: Run the Test Cases

The extension will:

Fetch test cases from the provided URL.

Parse and save the test cases into the test-cases folder within the workspace.

Execute the solution against the test cases.

Display the results in a dedicated VS Code terminal (Test Results).

## File Structure

The parsed test cases are stored as follows:

workspace/
|-- test-cases/
    |-- input_1.json
    |-- output_1.json
    |-- input_2.json
    |-- output_2.json
|-- solution.py
|-- solution.cpp

Example of Parsed Input File (input_1.json):

[1, 2, 3]

Example of Parsed Output File (output_1.json):

6

## Key Components of the Extension

Command Registration

The following commands are registered:

Fetch, Parse, and Run: Unified command to handle the entire workflow.

Run Solution: Allows running the solution against already fetched test cases.

Puppeteer Integration

The extension uses Puppeteer to scrape test cases from the LeetCode problem page.

Dynamic Language Support

Supports solutions written in Python and C++.

## Future Enhancements

Add support for more programming languages.

Enhance error handling and debugging tools.

Improve test case parsing for complex problems.





