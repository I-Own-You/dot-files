module modules/example

go 1.23.0

require (
	rsc.io/quote v1.5.2
	submodule/example v0.0.0-00010101000000-000000000000
)

require (
	golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c // indirect
	rsc.io/sampler v1.3.0 // indirect
)

replace submodule/example => ./module_example
