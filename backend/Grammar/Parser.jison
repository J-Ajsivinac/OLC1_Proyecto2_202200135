%{
    // Importar librerías
%}

%lex // Inicia parte léxica

%options case-insensitive

char1    ([^\n\"\\]?|\\.)

%%

\s+                                 		//ignora espacios
\n             								//ignora saltos de línea
[\r\t]+                             	    //ignora tabulaciones
[/\/]([^\r\n]*)? 	    					//ignora comentarios de una línea
[/][*][^*]*[*]+([/\*][^*]*[*]+)*[/] 		//ignora comentarios de varias líneas

"int" 				      return 'TK_DEC_INT';
"double" 			      return 'TK_DEC_DOUBLE';
"char" 				      return 'TK_DEC_CHAR';
"std::string" 		      return 'TK_DEC_STRING';
"bool" 				      return 'TK_DEC_BOOL';
"void" 				      return 'TK_VOID';
"<<endl" 			      return 'TK_ENDL';
"pow" 				      return 'TK_POW';
"if" 				      return 'TK_IF';
"else" 				      return 'TK_ELSE';
"while" 			      return 'TK_WHILE';
"for" 				      return 'TK_FOR';
"do" 				      return 'TK_DO';
"return" 			      return 'TK_RETURN';
"break" 			      return 'TK_BREAK';
"continue" 			      return 'TK_CONTINUE';
"switch" 			      return 'TK_SWITCH';
"case" 				      return 'TK_CASE';
"default" 			      return 'TK_DEFAULT';
"cout" 				      return 'TK_COUT';
"new" 				      return 'TK_NEW';
"tolower" 			      return 'TK_TOLOWER';
"toupper" 			      return 'TK_TOUPPER';
"length" 			      return 'TK_LENGTH';
"round" 			      return 'TK_ROUND';
"typeof" 			      return 'TK_TYPEOF';
"tostring" 			      return 'TK_TOSTRING';
"c_str" 			      return 'TK_C_STR';
"true" 				      return 'TK_TRUE';
"false" 			      return 'TK_FALSE';
"execute" 			      return 'TK_EXECUTE';

[0-9]+("."[0-9]+)\b       return 'TK_DOUBLE';
[0-9]+\b                  return 'TK_INTEGER';

([a-zA-z])[a-zA-Z0-9_]*   return 'TK_ID';

\"{char1}*\"              return 'TK_STRING'; 
\'{char1}\'               return 'TK_CHAR';

"+"                       return 'TK_MAS';
"-"                       return 'TK_RES';
"*"                       return 'TK_MUL';
"/"                       return 'TK_DIV';
";"                       return 'TK_PYC';
"%"                       return 'TK_MOD';
","                       return 'TK_COMA';
"(" 				      return 'TK_PAR_IZQ';
")" 				      return 'TK_PAR_DER';
"{" 				      return 'TK_LLAVE_IZQ';
"}" 				      return 'TK_LLAVE_DER';
"[" 				      return 'TK_COR_IZQ';
"]" 				      return 'TK_COR_DER';
"=" 				      return 'TK_ASIGNACION';
"==" 				      return 'TK_IGUAL';
"!=" 				      return 'TK_DIFERENTE';
"<" 				      return 'TK_MENOR';
">" 				      return 'TK_MAYOR';
"<=" 				      return 'TK_MENOR_IGUAL';
">=" 				      return 'TK_MAYOR_IGUAL';
"&&" 				      return 'TK_AND';
"||" 				      return 'TK_OR';
"!" 				      return 'TK_NOT';
"++" 				      return 'TK_INCREMENTO';
"--" 				      return 'TK_DECREMENTO';

.					   {    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);    }
<<EOF>>                   return 'EOF';
// Finaliza parte de Léxica
/lex


// Inicio de gramática
%start ini
%%
ini : TK_EXECUTE EOF ;
// Parte sintáctica  - Definición de la gramática
