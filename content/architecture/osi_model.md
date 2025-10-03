---
title: OSI Model
date: "2025-10-02"
description: "Description of Open Systems Interconnection Model"
mainPage: true
---

## The Open Systems Interconnection (OSI) Model: A Seven-Layer Framework for Network Communication

The **Open Systems Interconnection (OSI) model** is a conceptual framework created by the International Organization for Standardization (ISO) that describes how network communication functions. It divides the complex process of data transfer into seven distinct, manageable layers, each responsible for specific tasks. This layered approach allows diverse technologies to communicate seamlessly and is vital for troubleshooting and developing network protocols.

---

## The Seven Layers of the OSI Model

| Layer |       Name       | Function                                                                                        |           Data Unit            | Protocols & Examples                     |
| :---: | :--------------: | :---------------------------------------------------------------------------------------------- | :----------------------------: | :--------------------------------------- |
| **7** | **Application**  | Provides the interface for applications and end-users to access network services.               |              Data              | HTTP, FTP, SMTP, DNS                     |
| **6** | **Presentation** | Handles data format, translation, encryption, and compression.                                  |              Data              | JPEG, MPEG, SSL/TLS                      |
| **5** |   **Session**    | Establishes, manages, and terminates connections (sessions) between applications.               |              Data              | NetBIOS, RPC, Sockets                    |
| **4** |  **Transport**   | Ensures reliable or unreliable end-to-end data delivery; handles segmentation and flow control. | Segment (TCP) / Datagram (UDP) | TCP, UDP                                 |
| **3** |   **Network**    | Handles logical addressing and **routing** of data packets across different networks.           |             Packet             | IP, ICMP, OSPF, EIGRP                    |
| **2** |  **Data Link**   | Provides node-to-node transfer; handles physical addressing (**MAC**) and error checking.       |             Frame              | Ethernet, PPP, Wi-Fi (802.11)            |
| **1** |   **Physical**   | Transmits raw **bitstream** over the physical medium (cables, air, etc.).                       |              Bit               | Cables, Hubs, Electrical/Optical signals |

---

## Layer Descriptions and Examples

### 7. Application Layer

This is the only layer that directly interacts with data from the user. It is where application protocols live, enabling high-level communication.

- **Function:** Interact with software applications to initiate communication.
- **Example:** When you type a web address into a browser, the browser uses the **HTTP** (Hypertext Transfer Protocol) or **HTTPS** protocol at this layer to request the webpage from a server.

### 6. Presentation Layer

Often called the "Syntax Layer," it ensures that the data is readable by the receiving application.

- **Function:** Data translation (e.g., converting between character codes), compression, and **encryption/decryption** (like the SSL/TLS used in HTTPS).
- **Example:** A secure website request uses **TLS/SSL** to encrypt the data before it is sent to the lower layers. The Presentation Layer on the receiving machine decrypts the data back into a readable format.

### 5. Session Layer

This layer is responsible for creating, managing, and closing the communication dialogue between two applications.

- **Function:** Establishes synchronization and determines if data transfer is **half-duplex** (one way at a time) or **full-duplex** (both ways simultaneously).
- **Example:** A **session layer checkpoint** is used during a large file transfer. If the connection fails, the transfer can resume from the last successful checkpoint instead of restarting from the beginning.

### 4. Transport Layer

This is the core of reliable data transmission, managing end-to-end communication between the source and destination hosts.

- **Function:** Breaks data into **Segments** (TCP) or **Datagrams** (UDP), and manages flow control (preventing a fast sender from overwhelming a slow receiver) and error control.
- **Example:**
  - **TCP (Transmission Control Protocol):** Used for web browsing (HTTP) where every part of the data must arrive correctly and in order.
  - **UDP (User Datagram Protocol):** Used for voice calls or video streaming where speed is critical and minor data loss is acceptable.

### 3. Network Layer

This layer is responsible for routing data across different networks to its final destination.

- **Function:** Logical addressing (using **IP addresses**) and determining the best path (**routing**) for a packet to travel.
- **Example:** **Routers** operate at this layer. They look at the destination IP address in a packet's header and consult their routing tables to forward the packet toward its
