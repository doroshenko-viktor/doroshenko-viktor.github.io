---
title: Netcat
date: "2023-03-17"
description: ""
---

In Linux, `nc` stands for `netcat`, which is a simple utility used to read from and write to network connections using `TCP` or 
`UDP`. It is a versatile tool that can be used for a variety of network-related tasks, such as debugging and testing network 
connectivity, sending files across the network, and creating custom network applications.

The `nc` program provides a command-line interface that allows users to specify various parameters to control the behavior of 
the tool, such as the type of connection to use, the port number to connect to or listen on, and the data to be sent or received. 
Here are a few examples of how `nc` can be used:

**Debugging network connectivity:**

The `nc` program can be used to test network connectivity between two hosts by connecting to a specific port and sending a 
test message. For example, the command:

```bash
nc -vz example.com 80
```

will attempt to connect to port `80` on the host `example.com` and report whether the connection was successful or not.

**Sending files over the network:**

The `nc` program can be used to transfer files over the network by piping the file contents to the `nc` command on one end, 
and receiving the data on the other end using the `nc` command. For example, to send a file `file.txt` from one host to another, 
you can use the command:

```bash
cat file.txt | nc -q 5 host2 1234
```

on the sending end, and 

```bash
nc -l -p 1234 > file.txt
```

on the receiving end.

Creating custom network applications: The `nc` program can be used as a building block for custom network applications that 
need to establish `TCP` or `UDP` connections. By using `nc` in conjunction with other Unix utilities, it is possible to 
create custom network clients and servers that perform specific tasks.

