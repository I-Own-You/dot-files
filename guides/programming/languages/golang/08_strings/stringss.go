package main

import (
	"fmt"
	"unicode/utf8"
)

func stringss() {
	// strings in go are read only slice of bytes, []byte.
	// go treats strings as containers of text encoded in utf8.
	// in other languages strings are treated as characters, for example.
	// in go, a character is called a 'rune',
	// rune - a decimal integer that represents a unicode code point.

	const s = "สวัสดี"

	// len(string) gives you the total raw bytes, not the length of the actual characters,
	// it means each character has  byte(s), and those bytes are counted, and returned
	// in this case thai letters have 3 bytes, there are 6 letters, 3 * 6 = 18 bytes,
	fmt.Println("Len:", len(s)) // 18

	// it also means you can index the string up to 17 element, from 0(included) to 18(excluded),
	// since byte is alias for uint8, each element will be an unsigned number like [102, 103, 110, n],
	for i := 0; i < len(s); i++ {
		fmt.Printf("%x ", s[i])
	}
	fmt.Println()

	// you can get the string length by using utf8 package, but be cautious,
	// the RuneCountInString() must decode every rune sequentally,
	// so if the string is very big, it can affect performance.
	// this method also ensures accuracy when coutning characters,
	// especially those containing multi-byte characters
	fmt.Println("Rune count:", utf8.RuneCountInString(s))

	// using range over strings will decode into runes(characters unicode code unit) so, a number.
	// you can also have the index at which the new rune starts, without it, only the decoded rune is present.
	// runeValue itself is rune type (int32), so a number, to get the unicode code point the %#U in Printf is used
	for idx, runeValue := range s {
		fmt.Printf("%#U starts at %d\n", runeValue, idx) // ส starts at 0, ว starts at 3 .etc
		fmt.Println("runeValue:", runeValue)             // a decimal number will be printed, which holds
		//                                                  the hexadecimal representation of rune
	}

	// same as above with range but using the utf8.DecodeLastRuneInString() method
	for i, w := 0, 0; i < len(s); i += w {
		// it basically returns the first character as combined bytes into rune type(unicode code pointd),
		// and counter of the bytes used
		runeValue, width := utf8.DecodeRuneInString(s[i:])
		fmt.Printf("%#U starts at %d\n", runeValue, i)
		w = width

		examineRune(runeValue)
	}

	// you can also define string that can contain only 'raw string', it will contain only literal text,
	// and not things like interpreted: \xba, \n .etc
	const literalString = `adafsad`
	const literalString1 = `\xab` // it wont be encoded into a literal string like �, it would be raw \xab string
	//                               under the hood literalString1 hold sequence of bytes anyway,
	//                               its just that the variable can be assigned only to plain text(raw string)

	// there are 2 types of string literals in go, interpreted string literals and raw string literals.
	// the difference is:
	// 1. interpreted string literals: can include escape sequences or any form of sequence,
	//    that will lead to an interpretation of the string (construct) at runtime.
	// 2. raw string literals: store text as it is, wihtout interpreting it.
	// raw string literals also always store valid utf8 sequences of bytes,
	// the sequence represents the unicode code points like U+02EA(hexadecimal representation) called rune,
	// rune - a unicode code point of decimal type
	//example:
	// here the variable will be: Hello
	//                            World
	var interpretedStringLiteral = "Hello\nWorld" //"Hello" = 5bytes, "\n"=1byte, "World"=5bytes,5+1+5=11
	fmt.Printf("interpretedStrinLiteral: %v\n", interpretedStringLiteral)
	//here the variable will be: Hello\nWorld
	var rawStringLiteral = `Hello\nWorld` //"Hello" = 5bytes, "\"=1byte, "n"=1byte, "World"=5bytes, 5+1+1+5=12
	fmt.Printf("rawStringLiteral: %v\n", rawStringLiteral)

	// if you have an invalid character(byte sequence) in an interpreted string literal, it will be shown as
	// � , its out of utf8 range, unknown or invalid symbol

	// unicode - character encdogin standard that assigns a unique code point to every symbol, range:U+0000 - U+10FFFF.
	// utf8 - a way to encode unicode code points into bytes, from 1 to 4 bytes as needed,
	// ASCII range (U+0000 to U+007F), UTF-8 uses just 1 byte.
	// U+07FF require 2 bytes.
	// U+FFFF (which includes most common characters) require 3 bytes.
	// U+FFFF, up to U+10FFFF, require 4 bytes.

	// also, strings are immutable and also sliced, so if another string points to your string through a slice,
	// it still references the pointer to full original string, its good if the original string is also needed,
	// but if its not, you retain its memory bloating the memory itself instead of using the new string created,
	// from the original.
	myString := "abcdefg"
	_ = myString[0:2] // "ab", where "ab" is shared between myString and _ internally
	//                      but _ still points to the underlying full string of myString

	// concatenate a string
	myString2 := "a" + "b"
	myString3 := "a" + myString
}

func examineRune(r rune) {
	// values enclosed in single quotes like here 't' are considered rune literals.
	// rune type values can be compared with rune literals
	if r == 't' {
		fmt.Println("found tee")
	} else if r == 'ส' {
		fmt.Println("found so sua")
	}
}

// be aware that string(2365) will give the unicode code point of 2365 and not the string "2365" in go.
