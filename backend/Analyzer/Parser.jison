%{
    let {Error} = require('../Classes/Utils/Error')
    let {TypesError} = require('../Classes/Utils/Error')
    let {errores} = require('../Classes/Utils/Outs')
%}
//Analizador léxico
%lex 
%options case-insensitive

content    ([^\n\"\\]?|\\.)

%%

\s+                                 	{}	//ignora espacios
\n             							{}	//ignora saltos de línea
[\r\t]+                             	{}    //ignora tabulaciones

\/\/.*                                  {}//comentario simple

[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     {}//comentario multilínea

(int|double|char|std\:\:string|bool)               return 'TK_types';
"std::tostring"           {return 'TK_tostring';}
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

"."                       return 'TK_dot';
"*"                       return 'TK_mul';
"/"                       return 'TK_div';
";"                       return 'TK_semicolon';
":"                       return 'TK_colon';

"%"                       return 'TK_mod';
","                       return 'TK_comma';
"(" 				      return 'TK_lparen';
")" 				      return 'TK_rparen';
"{" 				      return 'TK_lbrace';
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
"+"                       return 'TK_plus';
"-"                       return 'TK_minus';

[0-9]+("."[0-9]+)\b       return 'TK_double';
[0-9]+\b                  return 'TK_integer';

([a-zA-z])[a-zA-Z0-9_]*   return 'TK_id';

\"{content}*\"              { yytext = yytext.substr(1,yyleng-2); return 'TK_string'; }
\'{content}\'               { yytext = yytext.substr(1,yyleng-2); return 'TK_char'; };

// .					   {    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);    }
.                          {errores.push(new Error(yylloc.first_line, yylloc.first_column+1, TypesError.LEXICO,`Caracter no reconocido, ${yytext}`));}
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
const {IncrDecr} = require('../Classes/Expressions/IncrDecr')
const {Ternary} = require('../Classes/Expressions/Ternary')
const {AccessID} = require('../Classes/Expressions/AccessID')
const {Parameter} = require('../Classes/Expressions/Parameter')
const {Natives} = require('../Classes/Expressions/Natives')
const {Return} = require('../Classes/Expressions/Return')
const {AccessArray} = require('../Classes/Expressions/AccessArray')
const {AccessMatrix} = require('../Classes/Expressions/AccessMatrix')
const {CallFunction} = require('../Classes/Expressions/CallFunction')

const {InitID} = require('../Classes/Instructions/InitID')
const {AsignID} = require('../Classes/Instructions/AsignID')
const {Print} = require('../Classes/Instructions/Print')
const {InitArray} = require('../Classes/Instructions/InitArray')
const {InitMatrix} = require('../Classes/Instructions/InitMatrix')
const {While} = require('../Classes/Instructions/While')
const {DoWhile} = require('../Classes/Instructions/DoWhile')
const {For} = require('../Classes/Instructions/For')
const {Block} = require('../Classes/Instructions/Block')
const {If} = require('../Classes/Instructions/If')
const {Function} = require('../Classes/Instructions/Function')
const {MExecute} = require('../Classes/Instructions/MExecute')

const {Switch} = require('../Classes/Instructions/Switch')
const {Case} = require('../Classes/Instructions/Case')
const {Break} = require('../Classes/Instructions/Break')
const {Continue} = require('../Classes/Instructions/Continue')
const {AsignArray} = require('../Classes/Instructions/AsignArray')
const {AsignMatrix} = require('../Classes/Instructions/AsignMatrix')
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
%left 'TK_dot' 'TK_lbracket' 'TK_rbracket' 'TK_lpar' 'TK_rpar'
// Inicio de gramática
%start INIT

%%

INIT: 
    INSTRUCTIONS EOF {return $1} |
    EOF              {return []}
    ;

INSTRUCTIONS:
    INSTRUCTIONS INSTRUCTION {$$.push($2)}|
    INSTRUCTION              {$$ = [$1];}
    ;

INSTRUCTION:
    EXECUTE_STATEMENT              {$$ = $1}|
    DECLARATION                    {$$ = $1}|
    ARRAY_NEW TK_semicolon         {$$ = $1}|
    ARRAY_ASSIGNMENT TK_semicolon  {$$ = $1}|
    ASSIGNMENT TK_semicolon        {$$ = $1}|
    IF                             {$$ = $1}|
    LOOP                           {$$ = $1}|
    SWITCH                         {$$ = $1}|
    PRINT TK_semicolon             {$$ = $1}|
    NATIVE_FUNCTIONS TK_semicolon  {$$ = $1}|
    FUNCTION                       {$$ = $1}|
    FUNCTION_CALL   TK_semicolon   {$$ = $1}|
    INCRE_AND_DECRE TK_semicolon   {$$ = $1}|
    RETURN TK_semicolon            {$$ = $1}|
    TK_continue TK_semicolon       {$$ = new Continue(@1.first_line,@1.first_column) }|
    TK_break TK_semicolon          {$$ = new Break(@1.first_line,@1.first_column)}|
    error {errores.push(new Error(@1.first_line, @1.first_column, TypesError.SINTACTICO,`No se esperaba ${yytext}`))}
    ;

EXECUTE_STATEMENT:
    TK_execute FUNCTION_CALL TK_semicolon {$$ = new MExecute(@1.first_line,@1.first_column,$2)}
    ;

DECLARATION:
    TK_types IDS TK_asign EXPRESSION TK_semicolon {$$ = new InitID(@1.first_line,@1.first_column,$1,$2,$4)}         |
    TK_types IDS TK_semicolon                     {$$ = new InitID(@1.first_line,@1.first_column,$1,$2,undefined) } 
    ;

PRINT:
    TK_cout TK_double_less EXPRESSION                               {$$=new Print(@1.first_line,@1.first_column, $3, false)}  |
    TK_cout TK_double_less EXPRESSION TK_double_less TK_endl        {$$=new Print(@1.first_line,@1.first_column, $3, true)} 
    ;


IDS: // 
    IDS TK_comma TK_id  {$$.push($3)}     | 
    TK_id               {$$ = [$1]; } 
    ;

ASSIGNMENT:
    TK_id TK_asign EXPRESSION {$$ = new AsignID(@1.first_line,@1.first_column,$1,$3)}
    ;

ARRAY_NEW:
    TK_types TK_id TK_lbracket TK_rbracket TK_asign TK_new TK_types ARRAY_BRACKETS {$$ = new InitArray(@1.first_line,@1.first_column,$2,$1,$8,undefined)}                                              |
    TK_types TK_id TK_lbracket TK_rbracket TK_lbracket TK_rbracket TK_asign TK_new TK_types ARRAY_BRACKETS ARRAY_BRACKETS {$$ = new InitMatrix(@1.first_line, @1.first_column,$2,$1,$10,$11,undefined)}|
    TK_types TK_id TK_lbracket TK_rbracket TK_asign ASIGN_ARRAY {$$ = new InitArray(@1.first_line,@1.first_column,$2,$1,undefined,$6)}                                                                 |
    TK_types TK_id TK_lbracket TK_rbracket TK_lbracket TK_rbracket TK_asign ASIGN_ARRAY {$$ = new InitMatrix(@1.first_line, @1.first_column,$2,$1,undefined,undefined,$8)} 
    // TK_types TK_lbrace TK_rbrace TK_equal EXPRESSION
    ;

ASIGN_ARRAY:
    TK_lbracket VALUES_ARRAY TK_rbracket  {$$ = $2} |
    EXPRESSION TK_dot TK_c_str TK_lparen TK_rparen  {$$ = [new Natives(@1.first_line,@1.first_column,$1,$3)]} 
    ;

ARRAY_BRACKETS:
    TK_lbracket EXPRESSION TK_rbracket  {$$ = $2}
    ;

VALUES_ARRAY:
    VALUES_ARRAY TK_comma VALUE_ARRAY {$$.push($3)} |
    VALUE_ARRAY                       {$$ = [$1]}
    ;

VALUE_ARRAY:
    EXPRESSION          {$$ = $1} |
    ASIGN_ARRAY         {$$ = $1}
    ;

ARRAY_ASSIGNMENT:
    TK_id TK_lbracket EXPRESSION TK_rbracket TK_asign EXPRESSION {$$ = new AsignArray(@1.first_line, @1.first_column, $1, $3, $6)} |
    TK_id TK_lbracket EXPRESSION TK_rbracket TK_lbracket EXPRESSION TK_rbracket TK_asign EXPRESSION {$$ = new AsignMatrix(@1.first_line, @1.first_column, $1, $3, $6, $9)}
    ;

EXPRESSION:
    ARITHMETICS          {$$ = $1}  |
    LOGICAL_EXPRESSION   {$$ = $1}  |
    CASTING              {$$ = $1}  |
    TERNARY              {$$ = $1}  |
    ACCESARRAY           {$$ = $1}  |
    FUNCTION_CALL        {$$ = $1}  |
    INCRE_AND_DECRE      {$$ = $1}  |
    NATIVE_FUNCTION      {$$ = $1}  |
    // EXPRESSION TK_dot CTR_FUNC {$$ = new Natives(@1.first_line,@1.first_column,$1,$3)}          |
    // USER_FUNCTIONS_EXP   {$$ = $1}|
    TK_id                {$$ = new AccessID(@1.first_line,@1.first_column,$1)}                  |
    TK_integer           {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.INT) }    | 
    TK_double            {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.DOUBLE) } |
    TK_char              {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.CHAR) }   |
    TK_string            {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.STRING) } |
    TK_true              {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.BOOLEAN) }|
    TK_false             {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.BOOLEAN) } 
    ;

ACCESARRAY:
    TK_id TK_lbracket EXPRESSION TK_rbracket  {$$ = new AccessArray(@1.first_line,@1.first_column,$1,$3)}  |
    TK_id TK_lbracket EXPRESSION TK_rbracket TK_lbracket EXPRESSION TK_rbracket  {$$ = new AccessMatrix(@1.first_line,@1.first_column,$1,$3,$6)}           
    ;

TERNARY:
    EXPRESSION TK_question EXPRESSION TK_colon EXPRESSION {$$ = new Ternary(@1.first_line,@1.first_column,$1,$3,$5)}
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
    TK_if TK_lparen EXPRESSION TK_rparen BLOCK                {$$ = new If(@1.first_line, @1.first_column, $3, $5, undefined)} |
    TK_if TK_lparen EXPRESSION TK_rparen BLOCK TK_else BLOCK  {$$ = new If(@1.first_line, @1.first_column, $3, $5, $7)}        |
    TK_if TK_lparen EXPRESSION TK_rparen BLOCK TK_else IF     {$$ = new If(@1.first_line, @1.first_column, $3, $5, $7)}
    ;

BLOCK:
    TK_lbrace INSTRUCTIONS TK_rbrace {$$ = new Block(@1.first_line, @1.first_column,$2)}  |
    TK_lbrace TK_rbrace              {$$ = new Block(@1.first_line, @1.first_column,[])}
    ;

LOOP:
    TK_while TK_lparen EXPRESSION TK_rparen BLOCK        {$$ = new While(@1.first_line,@1.first_column,$3,$5)}              |
    TK_do BLOCK TK_while TK_lparen EXPRESSION TK_rparen  {$$ = new DoWhile(@1.first_line,@1.first_column,$5,$2)}            |
    TK_for TK_lparen FOR_LOOP TK_rparen BLOCK            {$$ = new For(@1.first_line,@1.first_column,$3[0],$3[1],$3[2],$5)}
    ;

FOR_LOOP:
    ID_FOR TK_semicolon EXPRESSION TK_semicolon UPDATE  {$$ = [$1,$3,$5]}
    ;

ID_FOR:
    TK_types TK_id TK_asign EXPRESSION {$$ = new InitID(@1.first_line,@1.first_column,$1,$2,$4)} |
    ASSIGNMENT {$$ = $1}
    ;

UPDATE:
    INCRE_AND_DECRE  {$$=$1} |
    ASSIGNMENT       {$$=$1}
    ;

INCRE_AND_DECRE:
    TK_id TK_incr  {$$ = new IncrDecr(@1.first_line, @1.first_column, $1, $2)}|
    TK_id TK_decr  {$$ = new IncrDecr(@1.first_line, @1.first_column, $1, $2)}
    ;

SWITCH:
    TK_switch TK_lparen EXPRESSION TK_rparen TK_lbrace CASES_BLOCK TK_rbrace {$$ = new Switch(@1.first_line,@1.first_column,$3,$6[0],$6[1])}
    ;

CASES_BLOCK:
    CASES DEFAULT {$$ = [$1,$2]}        |
    CASES         {$$ = [$1,undefined]} |
    DEFAULT       {$$ = [undefined,$1]}
    ;

CASES:
    CASES CASE {$$.push($2)} |
    CASE       {$$ = [$1]  }
    ;

CASE:
    TK_case EXPRESSION TK_colon INSTRUCTIONS {$$ = new Case(@1.first_line, @1.first_column, $2, new Block(@4.first_line, @4.first_column, $4))}     |
    TK_case EXPRESSION TK_colon       {$$ = new Case(@1.first_line, @1.first_column, $2, new Block(@4.first_line, @4.first_column, []))}
    ;

DEFAULT:
    TK_default TK_colon INSTRUCTIONS {$$ = new Block(@1.first_line, @1.first_column, $3)} |
    TK_default TK_colon       {$$ = new Block(@1.first_line, @1.first_column, [])}
    ;

RETURN:
    TK_return EXPRESSION {$$ = new Return(@1.first_line,@1.first_column, $2)} |
    TK_return            {$$ = new Return(@1.first_line,@1.first_column, undefined)}
    ;

FUNCTION:
    TK_types TK_id TK_lparen TK_rparen BLOCK             {$$ = new Function(@1.first_line,@1.first_column,$2,[],$5,$1 )} |  
    TK_void TK_id TK_lparen TK_rparen BLOCK              {$$ = new Function(@1.first_line,@1.first_column,$2,[],$5,$1 )} |
    TK_types TK_id TK_lparen PARAMETERS TK_rparen BLOCK  {$$ = new Function(@1.first_line,@1.first_column,$2,$4,$6,$1 )} |
    TK_void TK_id TK_lparen PARAMETERS TK_rparen BLOCK   {$$ = new Function(@1.first_line,@1.first_column,$2,$4,$6,$1 )} 
    ;

PARAMETERS:
    PARAMETERS TK_comma PARAMETER  {$$.push($3)} |
    PARAMETER                      {$$ = [$1]  }
    ;

PARAMETER:
    TK_types TK_id {$$ = new Parameter(@1.first_line,@1.first_column,$2,$1)} |
    TK_types TK_id TK_lbracket TK_rbracket {$$ = new Parameter(@1.first_line,@1.first_column,$2,$1,true)} 
    ;

FUNCTION_CALL:
    TK_id TK_lparen PARAMETERS_CALL TK_rparen {$$ = new CallFunction(@1.first_line,@1.first_column, $1, $3)}|
    TK_id TK_lparen TK_rparen                 {$$ = new CallFunction(@1.first_line,@1.first_column, $1, [])}
    ;

PARAMETERS_CALL:
    PARAMETERS_CALL TK_comma EXPRESSION {$$.push($3)} |
    EXPRESSION                          {$$ = [$1]  }
    ;

NATIVE_FUNCTION:
    TK_tolower TK_lparen EXPRESSION TK_rparen       {$$ = new Natives(@1.first_line,@1.first_column,$3,$1)}|
    TK_toupper TK_lparen EXPRESSION TK_rparen       {$$ = new Natives(@1.first_line,@1.first_column,$3,$1)}|
    TK_round TK_lparen EXPRESSION TK_rparen         {$$ = new Natives(@1.first_line,@1.first_column,$3,$1)}|
    TK_typeof TK_lparen EXPRESSION TK_rparen        {$$ = new Natives(@1.first_line,@1.first_column,$3,$1)}|
    TK_tostring TK_lparen EXPRESSION TK_rparen      {$$ = new Natives(@1.first_line,@1.first_column,$3,"tostring")}|
    EXPRESSION TK_dot TK_length TK_lparen TK_rparen {$$ = new Natives(@1.first_line,@1.first_column,$1,$3)}
    // EXPRESSION TK_dot TK_c_str TK_lparen TK_rparen  {$$ = new Natives(@1.first_line,@1.first_column,$1,$3)}
    ;