fn mai() {
    // 1. constant variable are not the same as immutable variables:
    //    1. "mut" cannot be used on a const variable
    //    2. you create cosntants with "const" instead of "let"
    //    3. const variable must have an annotated type
    //    4. constatns can be declared in any scope
    //    5. const value must be an expressin which value can be computed before runtime
    //
    //    so constants are usually the hardcoded values which never change and usually put,
    //    inside a place where only constatn relies and where you can make changes
    const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
}
