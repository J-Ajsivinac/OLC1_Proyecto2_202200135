%{
    // Importar librerías
%}

%lex // Inicia parte léxica

%options case-insensitive

content    ([^\n\"\\]?|\\.)

%%

\s+                                 		//ignora espacios
\n             								//ignora saltos de línea
[\r\t]+                             	    //ignora tabulaciones

\/\/.*                                  {}//comentario simple
//[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     {}//comentario multilínea
// "int"                     return 'TK_dec_int';
// "double"                  return 'TK_dec_double';
// "char"                    return 'TK_dec_char';
// "std::string"             return 'TK_dec_string';
// "bool"                    return 'TK_dec_bool';
(int|double|char|string|bool)               return 'TK_types';
"void"                    return 'TK_void';
"endl"                    return 'TK_endl';
"pow"                     return 'TK_pow';
"if"                      return 'TK_if';
"else"                    return 'TK_else';
"while"                   return 'TK_while';
"for"                     return 'TK_for';
"do"                      return 'TK_do';
"return"                  return 'TK_return';
"break"                   return 'TK_break';
"continue"                return 'TK_continue';
"switch"                  return 'TK_switch';
"case"                    return 'TK_case';
"default"                 return 'TK_default';
"cout"                    return 'TK_cout';
"new"                     return 'TK_new';
"tolower"                 return 'TK_tolower';
"toupper"                 return 'TK_toupper';
"length"                  return 'TK_length';
"round"                   return 'TK_round';
"typeof"                  return 'TK_typeof';
"tostring"                return 'TK_tostring';
"c_str"                   return 'TK_c_str';
"true"                    return 'TK_true';
"false"                   return 'TK_false';
"execute"                 return 'TK_execute';

"+"                       return 'TK_plus';
"-"                       return 'TK_minus';
"*"                       return 'TK_mul';
"/"                       return 'TK_div';
";"                       return 'TK_semicolon';
":"                       return 'TK_colon';
"%"                       return 'TK_mod';
","                       return 'TK_comma';
"(" 				      return 'TK_lparen';
")" 				      return 'TK_rparen';
"{" 				      return 'TL_lbrace';
"}" 				      return 'TK_rbrace';
"[" 				      return 'TK_lbracket';
"]" 				      return 'TK_rbracket';
"?"                       return 'TK_question';
"==" 				      return 'TK_equal';
"!=" 				      return 'TK_notequal';
"<<"                      return 'TK_double_less';
"<=" 				      return 'TK_less_equal';
">=" 				      return 'TK_greater_equal';
"<" 				      return 'TK_less';
">" 				      return 'TK_greater';
"&&" 				      return 'TK_and';
"||" 				      return 'TK_or';
"!" 				      return 'TK_not';
"++" 				      return 'TK_incr';
"--" 				      return 'TK_decr';
"=" 				      return 'TK_asign';

[0-9]+("."[0-9]+)\b       return 'TK_double';
[0-9]+\b                  return 'TK_integer';

([a-zA-z])[a-zA-Z0-9_]*   return 'TK_id';

\"{content}*\"              { yytext = yytext.substr(1,yyleng-2); return 'TK_string'; }
\'{content}\'               { yytext = yytext.substr(1,yyleng-2); return 'TK_char'; };

.					   {    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);    }
<<EOF>>                   return 'EOF';
// Finaliza parte de Léxica
/lex

%{
const {Types} = require('../Classes/Utils/Types')

//Expresiones
const {Primitive} = require('../Classes/Expressions/Primitive')
const {Arithmetic} = require('../Classes/Expressions/Arithmetic')
const {Logic} = require('../Classes/Expressions/Logic')
const {Relational} = require('../Classes/Expressions/Relational')
const {Cast} = require('../Classes/Expressions/Cast')
const {Ternary} = require('../Classes/Expressions/Ternary')
const {InitID} = require('../Classes/Instructions/InitID')
const {Print} = require('../Classes/Instructions/Print')
%}

%left TK_question TK_colon
%left TK_or
%left TK_and
%right TK_not
%left TK_equal TK_notequal
%left TK_less TK_greater TK_less_equal TK_greater_equal
%left TK_plus TK_minus
%left TK_mul TK_div TK_mod
%right UMINUS
%nonassoc TK_pow
%left TK_incr TK_decr
%left 'TK_lbracket' 'TK_rbracket'
// Inicio de gramática
%start INIT

%%

INIT: 
    INSTRUCTIONS EOF {return $1} |
    EOF              {return []}
    ;

INSTRUCTIONS:
    INSTRUCTIONS INSTRUCTION { $$.push($2)}|
    INSTRUCTION              { $$ = [$1];}
    ;

INSTRUCTION:
    EXECUTE_STATEMENT|
    DECLARATION                    {$$=$1}|
    ARRAY_NEW TK_semicolon         |
    ARRAY_ASSIGNMENT TK_semicolon  |
    ASSIGNMENT TK_semicolon        |
    PRINT TK_semicolon             |
    IF                             |
    LOOP                           |
    SWITCH                         |
    RETURN TK_semicolon            |
    TK_break TK_semicolon             |
    TK_continue TK_semicolon          |
    FUNCTION                       |
    FUNCTION_CALL   TK_semicolon   |
    INCRE_AND_DECRE TK_semicolon  |
    NATIVE_FUNCTIONS TK_semicolon  
    ;

// INSTRUCTION: TK_execute EXPRESSION TK_semicolon         { $$ =  $2;};

EXECUTE_STATEMENT:
    TK_execute FUNCTION_CALL TK_semicolon
    ;

DECLARATION:
    TK_types IDS TK_asign EXPRESSION TK_semicolon {$$ = new InitID(@1.first_line,@1.first_column,$1,$2,$4)} |
    TK_types IDS TK_semicolon 
    ;

PRINT:
    TK_cout TK_double_less EXPRESSION                               {$$=new Print(@1.first_line,@1.first_column, $3, false)}     |
    TK_cout TK_double_less EXPRESSION TK_double_less TK_endl        {$$=new Print(@1.first_line,@1.first_column, $3, true)} 
    ;


IDS:
    IDS TK_comma TK_id  {$$.push($3)}     | 
    TK_id               {$$ = [$1]; }
    ;

ASSIGNMENT:
    TK_id TK_asign EXPRESSION
    ;

ARRAY_NEW:
    TK_types TK_id TK_lbracket TK_rbracket TK_asign TK_new TK_types ARRAY_BRACKETS |
    TK_types TK_id TK_lbracket TK_rbracket TK_lbracket TK_rbracket TK_asign TK_new TK_types ARRAY_BRACKETS ARRAY_BRACKETS |
    TK_types TK_id TK_lbracket TK_rbracket TK_asign ASIGN_ARRAY |
    TK_types TK_id TK_lbracket TK_rbracket TK_lbracket TK_rbracket TK_asign ASIGN_ARRAY
    ;

ASIGN_ARRAY:
    TK_lbracket VALUES_ARRAY TK_rbracket  
    ;

ARRAY_BRACKETS:
    TK_lbracket EXPRESSION TK_rbracket 
    ;

VALUES_ARRAY:
    VALUES_ARRAY TK_comma VALUE_ARRAY |
    VALUE_ARRAY
    ;

VALUE_ARRAY:
    TK_integer |
    TK_double |
    TK_char |
    TK_string |
    TK_true |
    TK_false |
    ASIGN_ARRAY 
    ;

ARRAY_ASSIGNMENT:
    TK_id TK_lbracket TK_types TK_rbracket TK_asign EXPRESSION |
    TK_id TK_lbracket EXPRESSION TK_rbracket TK_lbracket EXPRESSION TK_rbracket TK_asign EXPRESSION
    ;

EXPRESSION:
    ARITHMETICS                                           {$$ = $1}  |
    LOGICAL_EXPRESSION                                    {$$ = $1}  |
    CASTING                                               {$$ = $1} |
    EXPRESSION TK_question EXPRESSION TK_colon EXPRESSION {$$ = new Ternary(@1.first_line,@1.first_column,$1,$3,$5)}|
    TK_id TK_lbracket EXPRESSION TK_rbracket              |
    TK_id TK_lbracket EXPRESSION TK_rbracket TK_lbracket EXPRESSION TK_rbracket |
    FUNCTION_CALL   |
    INCRE_AND_DECRE |
    TK_id |
    TK_integer   { $$ = new Primitive(@1.first_line, @1.first_column, $1,Types.INT) }|
    TK_double    { $$ = new Primitive(@1.first_line, @1.first_column, $1,Types.DOUBLE) }|
    TK_char      { $$ = new Primitive(@1.first_line, @1.first_column, $1,Types.CHAR) }|
    TK_string    { $$ = new Primitive(@1.first_line, @1.first_column, $1,Types.STRING) }|
    TK_true      { $$ = new Primitive(@1.first_line, @1.first_column, $1,Types.BOOLEAN) }|
    TK_false     { $$ = new Primitive(@1.first_line, @1.first_column, $1,Types.BOOLEAN) }
    ;

ARITHMETICS:
    EXPRESSION TK_plus EXPRESSION    {$$ = new Arithmetic(@1.first_line,@1.first_column,$1,$2,$3)}         |
    EXPRESSION TK_minus EXPRESSION   {$$ = new Arithmetic(@1.first_line,@1.first_column,$1,$2,$3)}         |
    EXPRESSION TK_mul EXPRESSION     {$$ = new Arithmetic(@1.first_line,@1.first_column,$1,$2,$3)}         |
    EXPRESSION TK_div EXPRESSION     {$$ = new Arithmetic(@1.first_line,@1.first_column,$1,$2,$3)}         |
    EXPRESSION TK_mod EXPRESSION     {$$ = new Arithmetic(@1.first_line,@1.first_column,$1,$2,$3)}         |
    TK_minus EXPRESSION %prec UMINUS {$$ = new Arithmetic(@1.first_line,@1.first_column,undefined,$1,$2)}  |
    TK_lparen EXPRESSION TK_rparen   {$$ = $2}                                                             |
    POW                              {$$ = $1}                                                               
    ;

POW:
    TK_pow TK_lparen EXPRESSION TK_comma EXPRESSION TK_rparen {$$ = new Arithmetic(@1.first_line,@1.first_column,$3,"^",$5)}
    ;

LOGICAL_EXPRESSION:
    EXPRESSION TK_equal EXPRESSION           {$$ = new Relational(@1.first_line,@1.first_column,$1,$2,$3)}             |
    EXPRESSION TK_notequal EXPRESSION        {$$ = new Relational(@1.first_line,@1.first_column,$1,$2,$3)}             |
    EXPRESSION TK_less EXPRESSION            {$$ = new Relational(@1.first_line,@1.first_column,$1,$2,$3)}             |
    EXPRESSION TK_greater EXPRESSION         {$$ = new Relational(@1.first_line,@1.first_column,$1,$2,$3)}             |
    EXPRESSION TK_less_equal EXPRESSION      {$$ = new Relational(@1.first_line,@1.first_column,$1,$2,$3)}             |
    EXPRESSION TK_greater_equal EXPRESSION   {$$ = new Relational(@1.first_line,@1.first_column,$1,$2,$3)}             |
    EXPRESSION TK_and EXPRESSION             {$$ = new Logic(@1.first_line,@1.first_column,$1,$2,$3)}                  |
    EXPRESSION TK_or EXPRESSION              {$$ = new Logic(@1.first_line,@1.first_column,$1,$2,$3)}                  |
    TK_not EXPRESSION                        {$$ = new Logic(@1.first_line,@1.first_column,undefined,$1,$2)}                                   
    ;

CASTING:
    TK_lparen TK_types TK_rparen EXPRESSION %prec UMINUS  {$$ = new Cast(@1.first_line,@1.first_column,$2,$4)} 
    ;

IF:
    TK_if TK_lparen EXPRESSION TK_rparen BLOCK |
    TK_if TK_lparen EXPRESSION TK_rparen BLOCK TK_else BLOCK |
    TK_if TK_lparen EXPRESSION TK_rparen BLOCK TK_else IF
    ;

BLOCK:
    TK_lbrace INSTRUCTIONS TK_rbrace |
    TK_lbrace TK_rbrace
    ;

LOOP:
    TK_while TK_lparen EXPRESSION TK_rparen BLOCK |
    TK_do BLOCK TK_while TK_lparen EXPRESSION TK_rparen |
    TK_for TK_lparen FOR_LOOP TK_rparen BLOCK
    ;

FOR_LOOP:
    ID_FOR TK_semicolon EXPRESSION TK_semicolon UPDATE 
    ;

ID_FOR:
    TK_types TK_id TK_asign EXPRESSION |
    ASSIGNMENT
    ;

UPDATE:
    INCRE_AND_DECRE |
    ASSIGNMENT
    ;

INCRE_AND_DECRE:
    TK_id TK_incr |
    TK_id TK_decr
    ;

SWITCH:
    TK_switch TK_lparen EXPRESSION TK_rparen TK_lbrace CASES_BLOCK TK_rbrace
    ;

CASES_BLOCK:
    CASES DEFAULT |
    CASES |
    DEFAULT
    ;


CASES:
    CASES CASE |
    CASE
    ;

CASE:
    TK_case EXPRESSION TK_colon BLOCK |
    TK_case EXPRESSION TK_colon 
    ;

DEFAULT:
    TK_default TK_colon BLOCK |
    TK_default TK_colon
    ;

RETURN:
    TK_return EXPRESSION |
    TK_return
    ;

FUNCTION:
    TK_types TK_id TK_lparen PARAMETERS TK_rparen BLOCK |
    TK_types TK_id TK_lparen TK_rparen BLOCK |  
    TK_void TK_id TK_lparen PARAMETERS TK_rparen BLOCK |
    TK_void TK_id TK_lparen TK_rparen BLOCK 
    ;

PARAMETERS:
    PARAMETERS TK_comma PARAMETER |
    PARAMETER 
    ;

PARAMETER:
    TK_types TK_id 
    ;

FUNCTION_CALL:
    TK_id TK_lparen PARAMETERS_CALL TK_rparen |
    TK_id TK_lparen TK_rparen
    ;

PARAMETERS_CALL:
    PARAMETERS_CALL TK_comma EXPRESSION |
    EXPRESSION
    ;

NATIVE_FUNCTIONS:
    TK_tolower TK_lparen EXPRESSION TK_rparen |
    TK_toupper TK_lparen EXPRESSION TK_rparen |
    TK_length TK_lparen EXPRESSION TK_rparen |
    TK_round TK_lparen EXPRESSION TK_rparen |
    TK_typeof TK_lparen EXPRESSION TK_rparen |
    TK_tostring TK_lparen EXPRESSION TK_rparen |
    TK_c_str TK_lparen EXPRESSION TK_rparen
    ;