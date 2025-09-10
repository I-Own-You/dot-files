# Text Processing Services
#     string — Common string operations
#     re — Regular expression operations
#     difflib — Helpers for computing deltas
#     textwrap — Text wrapping and filling
#     unicodedata — Unicode Database
#     stringprep — Internet String Preparation
#     readline — GNU readline interface
#     rlcompleter — Completion function for GNU readline
#
# Binary Data Services
#     struct — Interpret bytes as packed binary data
#     codecs — Codec registry and base classes
#
# Data Types
#     datetime — Basic date and time types
#     zoneinfo — IANA time zone support
#     calendar — General calendar-related functions
#     collections — Container datatypes
#     collections.abc — Abstract Base Classes for Containers
#     heapq — Heap queue algorithm
#     bisect — Array bisection algorithm
#     array — Efficient arrays of numeric values
#     weakref — Weak references
#     types — Dynamic type creation and names for built-in types
#     copy — Shallow and deep copy operations
#     pprint — Data pretty printer
#     reprlib — Alternate repr() implementation
#     enum — Support for enumerations
#     graphlib — Functionality to operate with graph-like structures
#
# Numeric and Mathematical Modules
#     numbers — Numeric abstract base classes
#     math — Mathematical functions
#     cmath — Mathematical functions for complex numbers
#     decimal — Decimal fixed-point and floating-point arithmetic
#     fractions — Rational numbers
#     random — Generate pseudo-random numbers
#     statistics — Mathematical statistics functions
#     Functional Programming Modules
#     itertools — Functions creating iterators for efficient looping
#     functools — Higher-order functions and operations on callable objects
#     operator — Standard operators as functions
#
# File and Directory Access
#     pathlib — Object-oriented filesystem paths
#     os.path — Common pathname manipulations
#     stat — Interpreting stat() results
#     filecmp — File and Directory Comparisons
#     tempfile — Generate temporary files and directories
#     glob — Unix style pathname pattern expansion
#     fnmatch — Unix filename pattern matching
#     linecache — Random access to text lines
#     shutil — High-level file operations
#
# Data Persistence
#     pickle — Python object serialization
#     copyreg — Register pickle support functions
#     shelve — Python object persistence
#     marshal — Internal Python object serialization
#     dbm — Interfaces to Unix “databases”
#     sqlite3 — DB-API 2.0 interface for SQLite databases
#
# Data Compression and Archiving
#     zlib — Compression compatible with gzip
#     gzip — Support for gzip files
#     bz2 — Support for bzip2 compression
#     lzma — Compression using the LZMA algorithm
#     zipfile — Work with ZIP archives
#     tarfile — Read and write tar archive files
#
# File Formats
#     csv — CSV File Reading and Writing
#     configparser — Configuration file parser
#     tomllib — Parse TOML files
#     netrc — netrc file processing
#     plistlib — Generate and parse Apple .plist files
#
# Cryptographic Services
#     hashlib — Secure hashes and message digests
#     hmac — Keyed-Hashing for Message Authentication
#     secrets — Generate secure random numbers for managing secrets
#
# Generic Operating System Services
#     os — Miscellaneous operating system interfaces
#     io — Core tools for working with streams
#     time — Time access and conversions
#     logging — Logging facility for Python
#     logging.config — Logging configuration
#     logging.handlers — Logging handlers
#     platform — Access to underlying platform’s identifying data
#     errno — Standard errno system symbols
#     ctypes — A foreign function library for Python
#
# Command-line interface libraries
#     argparse — Parser for command-line options, arguments and subcommands
#     optparse — Parser for command line options
#     getpass — Portable password input
#     fileinput — Iterate over lines from multiple input streams
#     curses — Terminal handling for character-cell displays
#     curses.textpad — Text input widget for curses programs
#     curses.ascii — Utilities for ASCII characters
#     curses.panel — A panel stack extension for curses
#     cmd — Support for line-oriented command interpreters
#
# Concurrent Execution
#     threading — Thread-based parallelism
#     multiprocessing — Process-based parallelism
#     multiprocessing.shared_memory — Shared memory for direct access across processes
#
# The concurrent package
#     concurrent.futures — Launching parallel tasks
#     subprocess — Subprocess management
#     sched — Event scheduler
#     queue — A synchronized queue class
#     contextvars — Context Variables
#     _thread — Low-level threading API
#
# Networking and Interprocess Communication
#     asyncio — Asynchronous I/O
#     socket — Low-level networking interface
#     ssl — TLS/SSL wrapper for socket objects
#     select — Waiting for I/O completion
#     selectors — High-level I/O multiplexing
#     signal — Set handlers for asynchronous events
#     mmap — Memory-mapped file support
#
# Internet Data Handling
#     email — An email and MIME handling package
#     json — JSON encoder and decoder
#     mailbox — Manipulate mailboxes in various formats
#     mimetypes — Map filenames to MIME types
#     base64 — Base16, Base32, Base64, Base85 Data Encodings
#     binascii — Convert between binary and ASCII
#     quopri — Encode and decode MIME quoted-printable data
#     Structured Markup Processing Tools
#     html — HyperText Markup Language support
#     html.parser — Simple HTML and XHTML parser
#     html.entities — Definitions of HTML general entities
#
# XML Processing Modules
#     xml.etree.ElementTree — The ElementTree XML API
#     xml.dom — The Document Object Model API
#     xml.dom.minidom — Minimal DOM implementation
#     xml.dom.pulldom — Support for building partial DOM trees
#     xml.sax — Support for SAX2 parsers
#     xml.sax.handler — Base classes for SAX handlers
#     xml.sax.saxutils — SAX Utilities
#     xml.sax.xmlreader — Interface for XML parsers
#     xml.parsers.expat — Fast XML parsing using Expat
#
# Internet Protocols and Support
#     webbrowser — Convenient web-browser controller
#     wsgiref — WSGI Utilities and Reference Implementation
#     urllib — URL handling modules
#     urllib.request — Extensible library for opening URLs
#     urllib.response — Response classes used by urllib
#     urllib.parse — Parse URLs into components
#     urllib.error — Exception classes raised by urllib.request
#     urllib.robotparser — Parser for robots.txt
#     http — HTTP modules
#     http.client — HTTP protocol client
#     ftplib — FTP protocol client
#     poplib — POP3 protocol client
#     imaplib — IMAP4 protocol client
#     smtplib — SMTP protocol client
#     uuid — UUID objects according to RFC 4122
#     socketserver — A framework for network servers
#     http.server — HTTP servers
#     http.cookies — HTTP state management
#     http.cookiejar — Cookie handling for HTTP clients
#     xmlrpc — XMLRPC server and client modules
#     xmlrpc.client — XML-RPC client access
#     xmlrpc.server — Basic XML-RPC servers
#     ipaddress — IPv4/IPv6 manipulation library
#
# Multimedia Services
#     wave — Read and write WAV files
#     colorsys — Conversions between color systems
#     Internationalization
#     gettext — Multilingual internationalization services
#     locale — Internationalization services
#
# Graphical user interfaces with Tk
#     tkinter — Python interface to Tcl/Tk
#     tkinter.colorchooser — Color choosing dialog
#     tkinter.font — Tkinter font wrapper
#     Tkinter Dialogs
#     tkinter.messagebox — Tkinter message prompts
#     tkinter.scrolledtext — Scrolled Text Widget
#     tkinter.dnd — Drag and drop support
#     tkinter.ttk — Tk themed widgets
#
# IDLE — Python editor and shell
#     turtle — Turtle graphics
#
# Development Tools
#     typing — Support for type hints
#     pydoc — Documentation generator and online help system
#
# Python Development Mode
#     doctest — Test interactive Python examples
#     unittest — Unit testing framework
#     unittest.mock — mock object library
#     unittest.mock — getting started
#     test — Regression tests package for Python
#     test.support — Utilities for the Python test suite
#     test.support.socket_helper — Utilities for socket tests
#     test.support.script_helper — Utilities for the Python execution tests
#     test.support.bytecode_helper — Support tools for testing correct bytecode generation
#     test.support.threading_helper — Utilities for threading tests
#     test.support.os_helper — Utilities for os tests
#     test.support.import_helper — Utilities for import tests
#     test.support.warnings_helper — Utilities for warnings tests
#
# Debugging and Profiling
#     Audit events table
#     bdb — Debugger framework
#     faulthandler — Dump the Python traceback
#     pdb — The Python Debugger
#
# The Python Profilers
#     timeit — Measure execution time of small code snippets
#     trace — Trace or track Python statement execution
#     tracemalloc — Trace memory allocations
#
# Software Packaging and Distribution
#     ensurepip — Bootstrapping the pip installer
#     venv — Creation of virtual environments
#     zipapp — Manage executable Python zip archives
#
# Python Runtime Services
#     sys — System-specific parameters and functions
#     sys.monitoring — Execution event monitoring
#     sysconfig — Provide access to Python’s configuration information
#     builtins — Built-in objects
#     __main__ — Top-level code environment
#     warnings — Warning control
#     dataclasses — Data Classes
#     contextlib — Utilities for with-statement contexts
#     abc — Abstract Base Classes
#     atexit — Exit handlers
#     traceback — Print or retrieve a stack traceback
#     __future__ — Future statement definitions
#     gc — Garbage Collector interface
#     inspect — Inspect live objects
#     site — Site-specific configuration hook
#
# Custom Python Interpreters
#     code — Interpreter base classes
#     codeop — Compile Python code
#
# Importing Modules
#     zipimport — Import modules from Zip archives
#     pkgutil — Package extension utility
#     modulefinder — Find modules used by a script
#     runpy — Locating and executing Python modules
#     importlib — The implementation of import
#     importlib.resources – Package resource reading, opening and access
#     importlib.resources.abc – Abstract base classes for resources
#     importlib.metadata – Accessing package metadata
#     The initialization of the sys.path module search path
#
# Python Language Services
#     ast — Abstract Syntax Trees
#     symtable — Access to the compiler’s symbol tables
#     token — Constants used with Python parse trees
#     keyword — Testing for Python keywords
#     tokenize — Tokenizer for Python source
#     tabnanny — Detection of ambiguous indentation
#     pyclbr — Python module browser support
#     py_compile — Compile Python source files
#     compileall — Byte-compile Python libraries
#     dis — Disassembler for Python bytecode
#     pickletools — Tools for pickle developers
#
# MS Windows Specific Services
#     msvcrt — Useful routines from the MS VC++ runtime
#     winreg — Windows registry access
#     winsound — Sound-playing interface for Windows
#
# Unix-specific services
#     shlex — Simple lexical analysis
#     posix — The most common POSIX system calls
#     pwd — The password database
#     grp — The group database
#     termios — POSIX style tty control
#     tty — Terminal control functions
#     pty — Pseudo-terminal utilities
#     fcntl — The fcntl and ioctl system calls
#     resource — Resource usage information
#     syslog — Unix syslog library routines

print(22 // 10)
