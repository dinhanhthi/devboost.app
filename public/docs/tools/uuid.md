A **Universally Unique Identifier** (UUID) is a 128-bit value used to identify information in computer systems. UUIDs are used to uniquely identify any object or entity in a distributed system, such as a database record, a user session, or a network device. They are often used as primary keys in databases, and they can also be used to track objects in a system over time or to link objects together.

UUIDs are represented as a **36-character** string that consists of **hexadecimal digits** and **hyphens**. The string is formatted as follows:

```bash
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

An example,

```bash
c88fd6e0-8921-11ee-a13e-b53b20377c66
```

☝ [Notion](https://notion.so/) uses UUIDs for the ids of the blocks in their app.

There are 4 different versions of UUIDs. You can check [the differences in this website](https://www.uuidtools.com/uuid-versions-explained).

UUIDs are designed to be unique (or "almost unique") and they're hard to be duplicated! You can use UUIDs for *database primary keys*, *user sessions* or *network devices*.

☝ In this tool, we use [this package](https://github.com/uuidjs/uuid) for almost every task. We don't implement a generator for v2, if you want, you can use [this website](https://www.uuidtools.com/generate/v2) instead.