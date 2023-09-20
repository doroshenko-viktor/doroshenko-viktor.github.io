---
title: NeoVim API
date: "2023-06-28T22:12:03.284Z"
description: ""
---

## Standard Functions

Get vim working directory: `vim.api.nvim_call_function("getcwd", {})`

## Dap


---@field event_breakpoint table<string, fun(session: Session, body: any)>
---@field event_capabilities table<string, fun(session: Session, body: any)>
---@field event_continued table<string, fun(session: Session, body: any)>
---@field event_exited table<string, fun(session: Session, body: any)>
---@field event_initialized table<string, fun(session: Session, body: any)>
---@field event_invalidated table<string, fun(session: Session, body: any)>
---@field event_loadedSource table<string, fun(session: Session, body: any)>
---@field event_memory table<string, fun(session: Session, body: any)>
---@field event_module table<string, fun(session: Session, body: any)>
---@field event_output table<string, fun(session: Session, body: any)>
---@field event_process table<string, fun(session: Session, body: any)>
---@field event_progressEnd table<string, fun(session: Session, body: dap.ProgressEndEvent)>
---@field event_progressStart table<string, fun(session: Session, body: dap.ProgressStartEvent)>
---@field event_progressUpdate table<string, fun(session: Session, body: dap.ProgressUpdateEvent)>
---@field event_stopped table<string, fun(session: Session, body: dap.StoppedEvent)>
---@field event_terminated table<string, fun(session: Session, body: dap.TerminatedEvent)>
---@field event_thread table<string, fun(session: Session, body: any)>
---@field attach table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field breakpointLocations table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field completions table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field configurationDone table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field continue table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field dataBreakpointInfo table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field disassemble table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field disconnect table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field evaluate table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field exceptionInfo table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field goto table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field gotoTargets table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field initialize table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field launch table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field loadedSources table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field modules table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field next table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field pause table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field readMemory table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field restart table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field restartFrame table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field reverseContinue table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field scopes table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field setBreakpoints table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field setDataBreakpoints table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field setExceptionBreakpoints table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field setExpression table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field setFunctionBreakpoints table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field setInstructionBreakpoints table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field setVariable table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field source table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field stackTrace table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field stepBack table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field stepIn table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field stepInTargets table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field stepOut table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field terminate table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field terminateThreads table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field threads table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field variables table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>
---@field writeMemory table<string, fun(session: Session, err: any, body: any, request: any, seq: number)>

