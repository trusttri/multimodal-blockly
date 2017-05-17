
var grammarInfo = {
    "move_object_direction": {
        Lexer: undefined,
        ParserRules: [
            {"name": "MAIN", "symbols": ["int", "_", "int", "_", "direction", "_", "int"]},
            {"name": "MAIN", "symbols": ["int", "int", "_", "direction", "_", "int"]},
            {"name": "MAIN", "symbols": ["int", "int", "direction", "_", "int"]},
            {"name": "MAIN", "symbols": ["int", "int", "direction", "int"]},
            {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
            {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "int", "symbols": ["int$ebnf$1"]},
            {"name": "direction$string$1", "symbols": [{"literal":"u"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "direction", "symbols": ["direction$string$1"]},
            {"name": "direction$string$2", "symbols": [{"literal":"d"}, {"literal":"o"}, {"literal":"w"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "direction", "symbols": ["direction$string$2"]},
            {"name": "direction$string$3", "symbols": [{"literal":"l"}, {"literal":"e"}, {"literal":"f"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "direction", "symbols": ["direction$string$3"]},
            {"name": "direction$string$4", "symbols": [{"literal":"r"}, {"literal":"i"}, {"literal":"g"}, {"literal":"h"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "direction", "symbols": ["direction$string$4"]},
            {"name": "direction$string$5", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"r"}, {"literal":"w"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "direction", "symbols": ["direction$string$5"]},
            {"name": "direction$string$6", "symbols": [{"literal":"b"}, {"literal":"a"}, {"literal":"c"}, {"literal":"k"}, {"literal":"w"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "direction", "symbols": ["direction$string$6"]},
            {"name": "_", "symbols": [{"literal":" "}]}
        ]
        , ParserStart: "MAIN"
    }
    ,
    "set_color": {
        Lexer: undefined,
        ParserRules: [
            {"name": "Main", "symbols": ["ID", "_", "COLOR"]},
            {"name": "ID", "symbols": ["int"]},
            {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
            {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "int", "symbols": ["int$ebnf$1"]},
            {"name": "COLOR$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "COLOR", "symbols": ["COLOR$string$1"]},
            {"name": "COLOR$string$2", "symbols": [{"literal":"b"}, {"literal":"l"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "COLOR", "symbols": ["COLOR$string$2"]},
            {"name": "COLOR$string$3", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"e"}, {"literal":"e"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "COLOR", "symbols": ["COLOR$string$3"]},
            {"name": "COLOR$string$4", "symbols": [{"literal":"y"}, {"literal":"e"}, {"literal":"l"}, {"literal":"l"}, {"literal":"o"}, {"literal":"w"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "COLOR", "symbols": ["COLOR$string$4"]},
            {"name": "_", "symbols": [{"literal":" "}]}
        ]
        , ParserStart: "Main"
    },
    "logic_boolean": {
        Lexer: undefined,
        ParserRules: [
            {"name": "Main", "symbols": ["BOOL"]},
            {"name": "BOOL$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "BOOL", "symbols": ["BOOL$string$1"]},
            {"name": "BOOL$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
            {"name": "BOOL", "symbols": ["BOOL$string$2"]}
        ]
        , ParserStart: "Main"
    },
    "controls_repeat_ext": {
        Lexer: undefined,
        ParserRules: [
            {"name": "Main", "symbols": ["int"]},
            {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
            {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "int", "symbols": ["int$ebnf$1"]}
        ]
        , ParserStart: "Main"
    },
    "controls_for":{
        Lexer: undefined,
        ParserRules: [
            {"name": "Main", "symbols": ["int", "_", "int", "_", "int"]},
            {"name": "Main", "symbols": ["int", "int", "int"]},
            {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
            {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "int", "symbols": ["int$ebnf$1"]},
            {"name": "_", "symbols": [{"literal":" "}]}
        ]
        , ParserStart: "Main"
    },
    "math_number": {
        Lexer: undefined,
        ParserRules: [
            {"name": "Main", "symbols": ["int"]},
            {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
            {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "int", "symbols": ["int$ebnf$1"]}
        ]
        , ParserStart: "Main"
    },
    "math_arithmetic": {
        Lexer: undefined,
        ParserRules: [
            {"name": "Main", "symbols": ["int", "_", "int"]},
            {"name": "Main", "symbols": ["int", "int"]},
            {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
            {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "int", "symbols": ["int$ebnf$1"]},
            {"name": "_", "symbols": [{"literal":" "}]}
        ]
        , ParserStart: "Main"
    }
    ,
    "math_single": {
        Lexer: undefined,
        ParserRules: [
            {"name": "Main", "symbols": ["int"]},
            {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
            {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "int", "symbols": ["int$ebnf$1"]}
        ]
        , ParserStart: "Main"
    },
    "math_random_int":{
        Lexer: undefined,
        ParserRules: [
            {"name": "Main", "symbols": ["int", "_", "int"]},
            {"name": "Main", "symbols": ["int", "int"]},
            {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
            {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
            {"name": "int", "symbols": ["int$ebnf$1"]},
            {"name": "_", "symbols": [{"literal":" "}]}
        ]
        , ParserStart: "Main"
    }

}

var moveObjectGrammar = {
    Lexer: undefined,
    ParserRules: [
        {"name": "MAIN", "symbols": ["int", "_", "int", "_", "direction", "_", "int"]},
        {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
        {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
        {"name": "int", "symbols": ["int$ebnf$1"]},
        {"name": "direction$string$1", "symbols": [{"literal":"u"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "direction", "symbols": ["direction$string$1"]},
        {"name": "direction$string$2", "symbols": [{"literal":"d"}, {"literal":"o"}, {"literal":"w"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "direction", "symbols": ["direction$string$2"]},
        {"name": "direction$string$3", "symbols": [{"literal":"l"}, {"literal":"e"}, {"literal":"f"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "direction", "symbols": ["direction$string$3"]},
        {"name": "direction$string$4", "symbols": [{"literal":"r"}, {"literal":"i"}, {"literal":"g"}, {"literal":"h"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "direction", "symbols": ["direction$string$4"]},
        {"name": "direction$string$5", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"r"}, {"literal":"w"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "direction", "symbols": ["direction$string$5"]},
        {"name": "direction$string$6", "symbols": [{"literal":"b"}, {"literal":"a"}, {"literal":"c"}, {"literal":"k"}, {"literal":"w"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "direction", "symbols": ["direction$string$6"]},
        {"name": "_", "symbols": [{"literal":" "}]}
    ]
    , ParserStart: "MAIN"
};

var setColorGrammar = {
    Lexer: undefined,
    ParserRules: [
        {"name": "Main", "symbols": ["ID", "_", "COLOR"]},
        {"name": "ID", "symbols": ["int"]},
        {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
        {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
        {"name": "int", "symbols": ["int$ebnf$1"]},
        {"name": "COLOR$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "COLOR", "symbols": ["COLOR$string$1"]},
        {"name": "COLOR$string$2", "symbols": [{"literal":"b"}, {"literal":"l"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "COLOR", "symbols": ["COLOR$string$2"]},
        {"name": "COLOR$string$3", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"e"}, {"literal":"e"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "COLOR", "symbols": ["COLOR$string$3"]},
        {"name": "COLOR$string$4", "symbols": [{"literal":"y"}, {"literal":"e"}, {"literal":"l"}, {"literal":"l"}, {"literal":"o"}, {"literal":"w"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "COLOR", "symbols": ["COLOR$string$4"]},
        {"name": "_", "symbols": [{"literal":" "}]}
    ]
    , ParserStart: "Main"
}

var boolGrammar = {
    Lexer: undefined,
    ParserRules: [
        {"name": "Main", "symbols": ["BOOL"]},
        {"name": "BOOL$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "BOOL", "symbols": ["BOOL$string$1"]},
        {"name": "BOOL$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
        {"name": "BOOL", "symbols": ["BOOL$string$2"]}
    ]
    , ParserStart: "Main"
};


var countFromToGrammar = {
    Lexer: undefined,
    ParserRules: [
        {"name": "Main", "symbols": ["int", "_", "int", "_", "int"]},
        {"name": "Main", "symbols": ["int", "int", "int"]},
        {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
        {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
        {"name": "int", "symbols": ["int$ebnf$1"]},
        {"name": "_", "symbols": [{"literal":" "}]}
    ]
    , ParserStart: "Main"

};

var singleNumGrammar = {
    Lexer: undefined,
    ParserRules: [
        {"name": "Main", "symbols": ["int"]},
        {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
        {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
        {"name": "int", "symbols": ["int$ebnf$1"]}
    ]
    , ParserStart: "Main"
}

var doubleNumGrammar = {
    Lexer: undefined,
    ParserRules: [
        {"name": "Main", "symbols": ["int", "_", "int"]},
        {"name": "Main", "symbols": ["int", "int"]},
        {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
        {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
        {"name": "int", "symbols": ["int$ebnf$1"]},
        {"name": "_", "symbols": [{"literal":" "}]}
    ]
    , ParserStart: "Main"
}


var setVariableGrammar = {

};

var changeVariableGrammar = {

};

var getVariableGrammar = {

};

$(document).ready(function(){
    sessionStorage.setItem("grammarInfo", JSON.stringify(grammarInfo));
})
//})();

processResult = function(result){
    var params = [];
    result.forEach(function(container){
        var splits = container[0];
        console.log("splits");
        console.log(container);
        console.log(splits);
        if(typeof splits == "string"){
            if(splits != " "){
                params.push(splits);
            }

        }else if(typeof splits == "object"){
            var str = "";
            splits.forEach(function(element){
                str += element;
            })
            params.push(str);
        }else{
            console.log(splits);
        }
    })
    return params;
}



var parser = new nearley.Parser(grammarInfo["move_object_direction"].ParserRules, grammarInfo["move_object_direction"].ParserStart);
parser.feed("1 12 up 2");
var result = parser.results[0];
console.log("move object");
console.log(result);
console.log(processResult(result));

var parser = new nearley.Parser(grammarInfo["set_color"].ParserRules, grammarInfo["set_color"].ParserStart);
parser.feed("1 red");
var result = parser.results[0];
console.log("set color");
console.log(result);
console.log(processResult(result));

var parser = new nearley.Parser(grammarInfo["logic_boolean"].ParserRules, grammarInfo["logic_boolean"].ParserStart);
parser.feed("true");
var result = parser.results[0];
console.log("boolean");
console.log(result);
console.log(processResult(result));

var parser = new nearley.Parser(grammarInfo["controls_repeat_ext"].ParserRules, grammarInfo["controls_repeat_ext"].ParserStart);
parser.feed("2");
var result = parser.results[0];
console.log("control repeat");
console.log(result);
console.log(processResult(result));


var parser = new nearley.Parser(grammarInfo["controls_for"].ParserRules, grammarInfo["controls_for"].ParserStart);
parser.feed("2 3 1");
var result = parser.results[0];
console.log("control for");
console.log(result);
console.log(processResult(result));

var parser = new nearley.Parser(grammarInfo["math_number"].ParserRules, grammarInfo["math_number"].ParserStart);
parser.feed("9");
var result = parser.results[0];
console.log("math number");
console.log(result);
console.log(processResult(result));

var parser = new nearley.Parser(grammarInfo["math_arithmetic"].ParserRules, grammarInfo["math_arithmetic"].ParserStart);
parser.feed("9 4");
var result = parser.results[0];
console.log("math arthmetic");
console.log(result);
console.log(processResult(result));

var parser = new nearley.Parser(grammarInfo["math_single"].ParserRules, grammarInfo["math_single"].ParserStart);
parser.feed("4");
var result = parser.results[0];
console.log("math single");
console.log(result);
console.log(processResult(result));

var parser = new nearley.Parser(grammarInfo["math_random_int"].ParserRules, grammarInfo["math_random_int"].ParserStart);
parser.feed("4 9");
var result = parser.results[0];
console.log("random int");
console.log(result);
console.log(processResult(result));




