---
title: Tasks In Visual Studio Code
date: "2022-05-31"
description: "Working with tasks in Visual Studio Code"
---

Workspace or folder specific `tasks` are configured from the `tasks.json` file in the `.vscode` folder for a `workspace`.

To create a new task in project select in `Terminal` menu `Configure tasks` option or in command 
pallet type: `Tasks: Configure Task`.

## Binding Tasks

Tasks may be binded to some key combinations.
It may be achieved with various default actions. For example we can bind specific build task to the
editor's build action. To do that, we can type `Tasks: Configure Default Build Task` in command 
pallet and select necessary task. From now on pressing `cmd-shift-b` editor will run our task.

## Creating Custom Task

To create custom task, add following template structure in the `.vscode/tasks.json` `tasks` array field:

```json
{
      "label": "Run tests",
      "type": "shell",
      "command": "./scripts/test.sh",
      "windows": {
        "command": ".\\scripts\\test.cmd"
      },
      "group": "test",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
```

The task's properties have the following semantic:

- `label`: The task's label used in the user interface.
- `type`: The task's type. For a custom task, this can either be shell or process. If shell is specified, the command is interpreted as a shell command (for example: `bash`, `cmd`, or `PowerShell`). If process is specified, the command is interpreted as a process to execute.
- `command`: The actual command to execute.
- `windows`: Any Windows specific properties. Will be used instead of the default properties when the command is executed on the Windows operating system.
- `group`: Defines to which group the task belongs. In the example, it belongs to the test group. Tasks that belong to the test group can be executed by running Run Test Task from the Command Palette.
- `presentation`: Defines how the task output is handled in the user interface. In this example, the Integrated Terminal showing the output is always revealed and a new terminal is created on every task run.
- `options`: Override the defaults for cwd (current working directory), env (environment variables), or shell (default shell). Options can be set per task but also globally or per platform. Environment variables configured here can only be referenced from within your task script or process and will not be resolved if they are part of your args, command, or other task attributes.
- `runOptions`: Defines when and how a task is run.

## Composing Tasks

It is possible to compose `tasks` combining simple `tasks` in the task chain using `dependsOn` property. If you list more than one task in the `dependsOn` property, they are executed in parallel by default.

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Client Build",
      "command": "gulp",
      "args": ["build"],
      "options": {
        "cwd": "${workspaceFolder}/client"
      }
    },
    {
      "label": "Server Build",
      "command": "gulp",
      "args": ["build"],
      "options": {
        "cwd": "${workspaceFolder}/server"
      }
    },
    {
      "label": "Build",
      "dependsOn": ["Client Build", "Server Build"]
    }
  ]
}
```

If you specify `"dependsOrder": "sequence"`, then your task dependencies are executed in the order they are listed in `dependsOn`. 
Any `background/watch` tasks used in `dependsOn` with `"dependsOrder": "sequence"` must have a problem matcher that tracks when they are `done`. 

```json
{
  "label": "One",
  "type": "shell",
  "command": "echo Hello ",
  "dependsOrder": "sequence",
  "dependsOn": ["Two", "Three"]
}
```

## Output Behavior

Sometimes you want to control how the Integrated Terminal panel behaves when running tasks. For instance, you may want to maximize editor space and only look at task output if you think there is a problem. The behavior of the terminal can be controlled using the presentation property of a task. It offers the following properties:

- `reveal` - Controls whether the Integrated Terminal panel is brought to front. Valid values are:
    - `always` - The panel is always brought to front. This is the default.
    - `never` - The user must explicitly bring the terminal panel to the front using the View > Terminal command (⌃`).
    - `silent` - The terminal panel is brought to front only if the output is not scanned for errors and warnings.
- `focus` - Controls whether the terminal is taking input focus or not. Default is false.
- `echo` - Controls whether the executed command is echoed in the terminal. Default is true.
- `showReuseMessage`: Controls whether to show the "Terminal will be reused by tasks, press any key to close it" message.
- `panel` - Controls whether the terminal instance is shared between task runs. Possible values are:
    - `shared` - The terminal is shared and the output of other task runs are added to the same terminal.
    - `dedicated` - The terminal is dedicated to a specific task. If that task is executed again, the terminal is reused. However, the output of a different task is presented in a different terminal.
    - `new` - Every execution of that task is using a new clean terminal.
- `clear` - Controls whether the terminal is cleared before this task is run. Default is false.
- `group` - Controls whether the task is executed in a specific terminal group using split panes. Tasks in the same group (specified by a string value) will use split terminals to present instead of a new terminal panel.

```bash
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "lint",
      "problemMatcher": ["$eslint-stylish"],
      "presentation": {
        "reveal": "never"
      }
    }
  ]
}
```

## Run Options

You can specify a task's run behaviors using the `runOptions` property:

`reevaluateOnRerun`: Controls how variables are evaluated when a task is executed through the `Rerun Last Task` command. The default is true, meaning that variables will be reevaluated when a task is rerun. When set to false the resolved variable values from the previous run of the task will be used.
`runOn`: Specifies when a task is run.
`default` - The task will only be run when executed through the Run Task command.
`folderOpen` - The task will be run when the containing folder is opened. The first time you open a folder that contains a task with `folderOpen`, you will be asked if you want to allow tasks to run automatically in that folder. You can change your decision later using the Allow Automatic Tasks in Folder and Disallow Automatic Tasks in Folder commands.

## Processing task output with problem matchers

`VS Code` can process the output from a task with a problem matcher. Problem matchers scan the task output text for known warning or error strings, 
and report these inline in the editor and in the Problems panel. `VS Code` ships with several problem matchers `in-the-box`:

- `TypeScript`: `$tsc` assumes that file names in the output are relative to the opened folder.
- TypeScript Watch: `$tsc-watch` matches problems reported from the `tsc` compiler when executed in watch mode.
- `JSHint`: `$jshint` assumes that file names are reported as an absolute path.
- JSHint Stylish: `$jshint-stylish` assumes that file names are reported as an absolute path.
- `ESLint` Compact: `$eslint-compact` assumes that file names in the output are relative to the opened folder.
- ESLint Stylish: `$eslint-stylish` assumes that file names in the output are relative to the opened folder.
- `Go`: `$go` matches problems reported from the go compiler. Assumes that file names are relative to the opened folder.
- `CSharp and VB Compiler`: `$mscompile` assumes that file names are reported as an absolute path.
- `Lessc compiler`: `$lessc` assumes that file names are reported as absolute path.
- `Node Sass compiler`: `$node-sass` assumes that file names are reported as an absolute path.

## Requesting variables from user

To request in task for user input value following syntax can be used:

```text
${input:<variableName>}
```

and `variable name` should be defined in `inputs` section of `launch.json`:

```json
"inputs": [
        {
            "id": "<variable-name>",
            "description": "variable optional description",
            "default": "some default value",
            "type": "promptString" // type of user request
        }
    ]
```

```json
{
  {
    "label": "MAKE_MIGRATIONS",
    "command": "dotnet",
    "args": [
        "ef",
        "migrations",
        "add",
        "${input:migrationName}",
        "-p",
        "${workspaceFolder}/Immat.Sourcing.Etl.Repository.Postgres/",
        "-s",
        "${workspaceFolder}/Immat.Sourcing.Etl.Api/"
    ],
    "type": "process",
    "problemMatcher": "$msCompile"
  },
  "inputs": [
          {
              "id": "migrationName",
              "description": "name of migration file to create",
              "default": "Init",
              "type": "promptString"
          }
      ]
}
```



## References

- [VS Code Doc on Tasks](https://code.visualstudio.com/Docs/editor/tasks)