package com.web.mindtrackproject.command;

import java.util.Queue;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class CommandInvoker {
    private Queue<Command> commandQueue;

    @Autowired
    public CommandInvoker(Queue<Command> commandQueue) {
        this.commandQueue = commandQueue;
    }

    public void addToQueue(Command command) {
        commandQueue.add(command);
    }

    public void executeCommands() {
        while (!commandQueue.isEmpty()) {
            Command command = commandQueue.poll();
            command.execute();
        }
    }
}
