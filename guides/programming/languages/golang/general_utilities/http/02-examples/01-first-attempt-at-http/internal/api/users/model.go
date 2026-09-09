package users

// 1. model files are usually for data types/interfaces which are used inside its package across
//    multiple files within the package
// 2. data types/interfaces that are used only within a single file should be defined there instead
// 3. if there are a lot of "interfaces" in multiple files they are put inside internal/interfaces/ folder

type User struct {
	ID   int
	Name string
}
