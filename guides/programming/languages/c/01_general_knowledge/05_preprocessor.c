// [1]. preprocessor: a preprocessor handles directives and also can add/modify things to the program,
//                     basically it inlines code from library into your .c program so you could use
//                     functions, .etc and alters text(tokens) into what it knows to alter,
//                     like "#define BAD +", in your code "BAD" will be replaced with "+",
//                     example: int x = 5 BAD 3 becomes int x = 5 + 3;
