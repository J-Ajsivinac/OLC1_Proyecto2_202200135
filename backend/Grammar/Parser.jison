%{
    // Importar librerías
%}

%lex // Inicia parte léxica

%options case-insensitive

content    ([^\n\"\\]?|\\.)
var_types "int"|"double"|"char"|"std::string"|"bool"

%%

\s+                                 		//ignora espacios
\n             								//ignora saltos de línea
[\r\t]+                             	    //ignora tabulaciones
[/\/]([^\r\n]*)? 	    					//ignora comentarios de una línea
[/][*][^*]*[*]+([/\*][^*]*[*]+)*[/] 		//ignora comentarios de varias líneas

// "int"                     return 'TK_dec_int';
// "double"                  return 'TK_dec_double';
// "char"                    return 'TK_dec_char';
// "std::string"             return 'TK_dec_string';
// "bool"                    return 'TK_dec_bool';
{var_types}               return 'TK_types';
"void"                    return 'TK_void';
"<<endl"                  return 'TK_endl';
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

[0-9]+("."[0-9]+)\b       return 'TK_double';
[0-9]+\b                  return 'TK_integer';

([a-zA-z])[a-zA-Z0-9_]*   return 'TK_id';

\"{content}*\"              return 'TK_string'; 
\'{content}\'               return 'TK_char';

"+"                       return 'TK_plus';
"-"                       return 'TK_minus';
"*"                       return 'TK_mul';
"/"                       return 'TK_div';
";"                       return 'TK_semicolon';
"%"                       return 'TK_mod';
","                       return 'TK_comma';
"(" 				      return 'TK_lparen';
")" 				      return 'TK_rparen';
"{" 				      return 'TL_lbrace';
"}" 				      return 'TK_rbrace';
"[" 				      return 'TK_lbracket';
"]" 				      return 'TK_rbracket';
"=" 				      return 'TK_asign';
"==" 				      return 'TK_equal';
"!=" 				      return 'TK_notequal';
"<" 				      return 'TK_less';
">" 				      return 'TK_greater';
"<=" 				      return 'TK_less_equal';
">=" 				      return 'TK_greater_equal';
"&&" 				      return 'TK_and';
"||" 				      return 'TK_or';
"!" 				      return 'TK_not';
"++" 				      return 'TK_incr';
"--" 				      return 'TK_decr';

.					   {    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);    }
<<EOF>>                   return 'EOF';
// Finaliza parte de Léxica
/lex


// Inicio de gramática
%start init

%%
// Parte sintáctica  - Definición de la gramática
init : 
    INSTRUCTIONS EOF| 
    EOF
    ;

INSTRUCTIONS:
    INSTRUCTIONS INSTRUCTION |
    INSTRUCTION
    ;

INSTRUCTION:
    EXECUTE_STATEMENT TK_semicolon |
    DECLARATION TK_semicolon       |
    ARRAY_NEW TK_semicolon         |
    ARRAY_ASSIGNMENT TK_semicolon  |
    ASSIGNMENT TK_semicolon        |
    PRINT TK_semicolon             |
    IF                             |
    WHILE                          |
    FOR                            |
    DO_WHILE                       |
    SWITCH                         |
    RETURN TK_comma                |
    BREAK TK_comma                 |
    CONTINUE TK_comma              |
    FUNCTION                       |
    FUNCTION_CALL   TK_semicolon   |
    INCRE_AND_DECRE TK_semicolon  
    ;

EXECUTE_STATEMENT:
    TK_execute FUNCTION_CALL TK_semicolon
    ;

DECLARATION:
    TK_types TK_id TK_asign EXPRESSION TK_semicolon  |
    TK_types TK_id TK_semicolon |
    TK_types IDS TK_asign EXPRESSION TK_semicolon |
    ;

IDS:
    IDS TK_comma TK_id |
    TK_id
    ;

ASSIGNMENT:
    TK_id TK_asign EXPRESSION |
    TK_id TK_asign FUNCTION_CALL
    ;

ARRAY_NEW:
    TK_types TK_id TK_lbracket TK_rbracket TK_asign TK_new TK_types ARRAY_BRACKETS |
    TK_types TK_id TK_lbracket TK_rbracket TK_lbracket TK_rbracket TK_asign TK_new TK_types ARRAY_BRACKETS ARRAY_BRACKETS |
    TK_types TK_id TK_lbracket TK_rbracket TK_asign ASIGN_ARRAY |
    TK_types TK_id TK_lbracket TK_rbracket TK_lbracket TK_rbracket TK_asign ASIGN_ARRAY
    ;

ASIGN_ARRAY:
    TK_lbracket VALUES_ARRAY TK_rbracket  |
    ;

ARRAY_BRACKETS:
    TK_lbracket EXPRESSION TK_rbracket |
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