fn main() {
    // 1. you use single quotes, not double quotes for a character type
    // 2. char type has always 4 bytes which can represent a Unicode value,
    //    ranges from U+0000 ~ U+D7FF and U+E000 ~ U+10FFFF, you cannot get the bytes,
    //    from a character which is 2+ bytes for different unicode symbols unfortunately
    let c = 'z';
    
    let z: char = 'ℤ'; // with explicit type annotation
    
    let heart_eyed_cat = '😻';
}
