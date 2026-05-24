// 1. a variable,function, macros and many other things must have a NAME, all these names,
//    are called "identifiers"
// 2. an identifier must begin with a letter or underscore and then optionally,
//    can contain letters,digits,underscores and some "universtal characters names"
// 3. C is a case-sensitive language so 2 same upper/lower characters are 2 different characters
// 4. C does not restrict the length of an identifier

// 5. there are special KEYWORDS reserved for C itself which cannot be used, such as:
//    auto break case char const continue default do double else enum extern float for goto
//    if inline† int long register restrict† return short signed sizeof static struct switch
//    typedef union unsigned void volatile while _Bool† _Complex† _Imaginary†

// 6. all functioins from stdlib are lowercase as well

// 7. some compilers can have its own identifiers that they could consider "reserved" like "asm",
//    or something else, so be cautious (anyway will find out because of errors)

// 8. identifiers that belong to stdlib are reserved as well, so if you have someting from there,
//    during compilation/linking errors could arise.

// 9. an important rule is try to avoid underscore as first letter in an identifier since,
//    a lot of stdlib/compiler has reserved identifiers that start with "_", so better dont even,
//    assign underscore as first symbol for an identifier, always start with a letter and then,
//    you can put letters/difigts/underscores
