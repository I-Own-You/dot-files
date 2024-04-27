local ls = require("luasnip")
local s = ls.snippet
local sn = ls.snippet_node
local isn = ls.indent_snippet_node
local t = ls.text_node
local i = ls.insert_node
local f = ls.function_node
local c = ls.choice_node
local d = ls.dynamic_node
local r = ls.restore_node
local events = require("luasnip.util.events")
local ai = require("luasnip.nodes.absolute_indexer")
local extras = require("luasnip.extras")
local l = extras.lambda
local rep = extras.rep
local p = extras.partial
local m = extras.match
local n = extras.nonempty
local dl = extras.dynamic_lambda
local fmt = require("luasnip.extras.fmt").fmt
local fmta = require("luasnip.extras.fmt").fmta
local conds = require("luasnip.extras.expand_conditions")
local postfix = require("luasnip.extras.postfix").postfix
local types = require("luasnip.util.types")
local parse = require("luasnip.util.parser").parse_snippet
local ms = ls.multi_snippet
local k = require("luasnip.nodes.key_indexer").new_key
ls.add_snippets("typescript", {
	-- 	s("int", {
	-- 		t({ "interface " }),
	-- 		i(1, "InterfaceName"),
	-- 		t({ " {", "\t" }),
	-- 		i(2, "name"),
	-- 		t(": "),
	-- 		i(3, "type"),
	-- 		t({ "", "}" }),
	-- 		i(0),
	-- 	}),
	s("tp", {
		t("type "),
		i(1, "typeName"),
		t(" = "),
		i(2, "typeExpression"),
	}),
	s("en", {
		t("enum "),
		i(1, "EnumName "),
		t({ " {", "\t" }),
		i(2, "Name"),
		t(" = "),
		i(3, "value"),
		t({ "", "}" }),
		i(0),
	}),
})
