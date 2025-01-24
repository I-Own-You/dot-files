// IndexedDB is a low-level API for client-side storage of significant amounts of structured data,
// including files/blobs.
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

// this API uses indexes to enable high-performance searches of this data.

// While Web Storage is useful for storing smaller amounts of data,
// it is less useful for storing larger amounts of structured data.

// IndexedDB is a transactional database system,
// like an SQL-based Relational Database Management System (RDBMS).
//
// however, unlike SQL-based RDBMSes, which use fixed-column tables,
// IndexedDB is a JavaScript-based object-oriented database.
//
// IndexedDB lets you store and retrieve objects that are indexed with a key;
// any objects supported by the structured clone algorithm can be stored.
//
// you need to specify the database schema, open a connection to your database,
// and then retrieve and update data within a series of transactions.

// operations done by IndexedDB are asynchronous.

// its particularly the best api for storing persistent data on the clinet side.
