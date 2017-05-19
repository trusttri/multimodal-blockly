/**
 * Created by Jane on 5/17/2017.
 */

var variableGrammar = {

    "initialize_with_speech":{
        Lexer: undefined,
        ParserRules: [
            {"name": "Main$subexpression$1$string$1", "symbols": [{"literal":"e"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$1", "symbols": ["Main$subexpression$1$string$1"]},
            {"name": "Main$subexpression$1$string$2", "symbols": [{"literal":"i"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$1", "symbols": ["Main$subexpression$1$string$2"]},
            {"name": "Main", "symbols": ["VAR", "_", "Main$subexpression$1", "_", "VALUE"]},
            {"name": "VAR$ebnf$1", "symbols": [/[a-zA-Z]/]},
            {"name": "VAR$ebnf$1", "symbols": ["VAR$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "VAR", "symbols": ["VAR$ebnf$1"]},
            {"name": "_", "symbols": [{"literal":" "}]},
            {"name": "VALUE$ebnf$1", "symbols": [/[a-zA-Z]/]},
            {"name": "VALUE$ebnf$1", "symbols": ["VALUE$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "VALUE", "symbols": ["VALUE$ebnf$1"]},
            {"name": "VALUE$ebnf$2", "symbols": [/[0-9]/]},
            {"name": "VALUE$ebnf$2", "symbols": ["VALUE$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "VALUE", "symbols": ["VALUE$ebnf$2"]}
        ]
        , ParserStart: "Main"
    },

    "set_value":{
        Lexer: undefined,
        ParserRules: [
            {"name": "Main$subexpression$1$string$1", "symbols": [{"literal":"e"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$1", "symbols": ["Main$subexpression$1$string$1"]},
            {"name": "Main$subexpression$1$string$2", "symbols": [{"literal":"i"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$1", "symbols": ["Main$subexpression$1$string$2"]},
            {"name": "Main", "symbols": ["Main$subexpression$1", "_", "VALUE"]},
            {"name": "_", "symbols": [{"literal":" "}]},
            {"name": "VALUE$ebnf$1", "symbols": [/[0-9]/]},
            {"name": "VALUE$ebnf$1", "symbols": ["VALUE$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "VALUE", "symbols": ["VALUE$ebnf$1"]}
        ]
        , ParserStart: "Main"
    },

    "create_variable":{
        Lexer: undefined,
        ParserRules: [
            {"name": "Main$subexpression$1$string$1", "symbols": [{"literal":"v"}, {"literal":"a"}, {"literal":"r"}, {"literal":"i"}, {"literal":"a"}, {"literal":"b"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$1", "symbols": ["Main$subexpression$1$string$1"]},
            {"name": "Main$subexpression$1$string$2", "symbols": [{"literal":"V"}, {"literal":"a"}, {"literal":"r"}, {"literal":"i"}, {"literal":"a"}, {"literal":"b"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$1", "symbols": ["Main$subexpression$1$string$2"]},
            {"name": "Main", "symbols": ["Main$subexpression$1", "_", "VAR"]},
            {"name": "VAR$ebnf$1", "symbols": [/[a-zA-Z]/]},
            {"name": "VAR$ebnf$1", "symbols": ["VAR$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "VAR", "symbols": ["VAR$ebnf$1"]},
            {"name": "_", "symbols": [{"literal":" "}]}
        ]
        , ParserStart: "Main"

    },

    "get_variable":{
        Lexer: undefined,
        ParserRules: [
            {"name": "Main$subexpression$1$string$1", "symbols": [{"literal":"G"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$1", "symbols": ["Main$subexpression$1$string$1"]},
            {"name": "Main$subexpression$1$string$2", "symbols": [{"literal":"g"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$1", "symbols": ["Main$subexpression$1$string$2"]},
            {"name": "Main$subexpression$1$string$3", "symbols": [{"literal":"j"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$1", "symbols": ["Main$subexpression$1$string$3"]},
            {"name": "Main$subexpression$1$string$4", "symbols": [{"literal":"J"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$1", "symbols": ["Main$subexpression$1$string$4"]},
            {"name": "Main$subexpression$2$string$1", "symbols": [{"literal":"v"}, {"literal":"a"}, {"literal":"r"}, {"literal":"i"}, {"literal":"a"}, {"literal":"b"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$2", "symbols": ["_", "Main$subexpression$2$string$1", "_"]},
            {"name": "Main$subexpression$2$string$2", "symbols": [{"literal":"v"}, {"literal":"e"}, {"literal":"r"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "Main$subexpression$2", "symbols": ["_", "Main$subexpression$2$string$2", "_"]},
            {"name": "Main$subexpression$2", "symbols": [{"literal":" "}]},
            {"name": "Main", "symbols": ["Main$subexpression$1", "Main$subexpression$2", "VAR"]},
            {"name": "VAR$ebnf$1", "symbols": [/[a-zA-Z]/]},
            {"name": "VAR$ebnf$1", "symbols": ["VAR$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "VAR", "symbols": ["VAR$ebnf$1"]},
            {"name": "_", "symbols": [{"literal":" "}]},
            {"name": "VALUE$ebnf$1", "symbols": [/[a-zA-Z]/]},
            {"name": "VALUE$ebnf$1", "symbols": ["VALUE$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "VALUE", "symbols": ["VALUE$ebnf$1"]},
            {"name": "VALUE$ebnf$2", "symbols": [/[0-9]/]},
            {"name": "VALUE$ebnf$2", "symbols": ["VALUE$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "VALUE", "symbols": ["VALUE$ebnf$2"]}
        ]
        , ParserStart: "Main"
    }


}