<h1 align="center">Proyecto 2</h1>

<p align="center"></p>

<div align="center">
🙍‍♂️ Joab Israel Ajsivinac Ajsivinac 🆔 202200135
</div>
<div align="center">
📕 Organización de Lenguajes y Compiladores 1
</div>
<div align="center"> 🏛 Universidad San Carlos de Guatemala</div>
<div align="center"> 📆 Primer Semestre 2024</div>

<br/> 

<h1 align="center">📍 Manual Técnico</h1>

<br/> 

## ⚙ Tecnologías Utilizadas

<div align="center" style="display:flex;justify-content:center;gap:20px">
 <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,tailwind,express,ts" />
  </a>
</div>
<ul>
  <li>Typescript</li>
  <li>Librerias Backend</li>
   <ul>
        <li>cors</li>
        <li>express</li>
        <li>jison</li>
    </ul>
<li>Librerias Frontend</li>
   <ul>
        <li>CodeMirror</li>
        <li>Graphviz-react</li>
        <li>Sonner</li>
        <li>react-icons</li>
        <li>react-doom</li>
    </ul>
  <li>Javascript</li>
  <li>Visual Studio Code</li>
  <li>Git</li>
  <li>Tailwind CSS</li>
  <li>React</li>
  </ul>
</ul>

## 🧮 Como funciona

La aplicación consta de una web dividad en Backend y frontend.

<h3>Principal</h3>

El interprete hace uso del patrón interprete para realizar las acciones del lenguaje indicado.

Para ello hacen uso de las siguientes clases Absatractas


### Expresión
Se implementó la clase Expression que es la clase padre de todas aquellas funcionalidades del lenguaje que retornan un valor, tales como:
 
* Llamada a Función
* Acceso a Variables
    - Primitivas
    - Posiciones de Arreglos
    - Posiciones de Listas
* Sentencia `Return`
* Operaciones
    - Aritméticas
    - Relacionales
    - Lógicas
* Funciones Nativas
    - To Lower
    - To Upper
    - Length
    - Round
    - Type Of
    - To Char Array
* Operador Ternario
* Casteo
* Incremento
* Decremento

### Instrucción
Se implementó la clase Instruction que es la clase padre de todas aquellas funcionalidades del lenguaje que no retornan un valor, tales como:

* Inicialización de Variables
    - Primitivas
    - Arreglos
    - Matrices
* Sentencias de Transferencia
    - Continue
    - Break
* Reasignación de Valores
    - Variables Primitivas
    - Posiciones de Arreglos
    - Posiciones de Matrices
* Declaración de Funciones
* Estructuras de Control
    - If
    - Else If
    - Else
    - Switch Case
    - Ciclos
        * For
        * While
        * Do While
* Bloques de Instrucciones
  

### Analisis
Para analizar el código se hace uso de `jison`, el es el encargado de analizar lexicamente y sintactimante el codigo enviado


**Análisis Sintáctico**

La parte sintáctica sigue la siguiente grámatica
[Gramática](grammar.txt)
_____

**Funciónes Aritmeticas**

Para la realización de operaciones se hace uso de la siguiente matriz, para validar el tipo de operacion realizada:

> * Suma
> 
> | +       | INT    | DOUBLE | BOOLEAN | CHAR   | STRING |
> | ------- | ------ | ------ | ------- | ------ | ------ |
> | INT     | INT    | DOUBLE | INT     | INT    | STRING |
> | DOUBLE  | DOUBLE | DOUBLE | DOUBLE  | DOUBLE | STRING |
> | BOOLEAN | INT    | DOUBLE | NULL    | NULL   | STRING |
> | CHAR    | INT    | DOUBLE | NULL    | STRING | STRING |
> | STRING  | STRING | STRING | STRING  | STRING | STRING |


>
> * Resta
>
> | -       | INT    | DOUBLE | BOOLEAN | CHAR   | STRING |
> | ------- | ------ | ------ | ------- | ------ | ------ |
> | INT     | INT    | DOUBLE | INT     | INT    | NULL   |
> | DOUBLE  | DOUBLE | DOUBLE | DOUBLE  | DOUBLE | NULL   |
> | BOOLEAN | INT    | DOUBLE | NULL    | NULL   | NULL   |
> | CHAR    | INT    | DOUBLE | NULL    | NULL   | NULL   |
> | STRING  | NULL   | NULL   | NULL    | NULL   | NULL   |


> * Multiplicación
> 
> | *       | INT    | DOUBLE | BOOLEAN | CHAR   | STRING |
> | ------- | ------ | ------ | ------- | ------ | ------ |
> | INT     | INT    | DOUBLE | NULL    | INT    | NULL   |
> | DOUBLE  | DOUBLE | DOUBLE | NULL    | DOUBLE | NULL   |
> | BOOLEAN | NULL   | NULL   | NULL    | NULL   | NULL   |
> | CHAR    | INT    | DOUBLE | NULL    | NULL   | NULL   |
> | STRING  | NULL   | NULL   | NULL    | NULL   | NULL   |


> * División
> 
> | /       | INT    | DOUBLE | BOOLEAN | CHAR   | STRING |
> | ------- | ------ | ------ | ------- | ------ | ------ |
> | INT     | DOUBLE | DOUBLE | NULL    | DOUBLE | NULL   |
> | DOUBLE  | DOUBLE | DOUBLE | NULL    | DOUBLE | NULL   |
> | BOOLEAN | NULL   | NULL   | NULL    | NULL   | NULL   |
> | CHAR    | DOUBLE | DOUBLE | NULL    | NULL   | NULL   |
> | STRING  | NULL   | NULL   | NULL    | NULL   | NULL   |

> * Potencia
> 
> | ^       | INT    | DOUBLE | BOOLEAN | CHAR | STRING |
> | ------- | ------ | ------ | ------- | ---- | ------ |
> | INT     | INT    | DOUBLE | NULL    | NULL | NULL   |
> | DOUBLE  | DOUBLE | DOUBLE | NULL    | NULL | NULL   |
> | BOOLEAN | NULL   | NULL   | NULL    | NULL | NULL   |
> | CHAR    | NULL   | NULL   | NULL    | NULL | NULL   |
> | STRING  | NULL   | NULL   | NULL    | NULL | NULL   |


> * 2.1.6. Módulo
> 
> | %       | INT    | DOUBLE | BOOLEAN | CHAR | STRING |
> | ------- | ------ | ------ | ------- | ---- | ------ |
> | INT     | DOUBLE | DOUBLE | NULL    | NULL | NULL   |
> | DOUBLE  | DOUBLE | DOUBLE | NULL    | NULL | NULL   |
> | BOOLEAN | NULL   | NULL   | NULL    | NULL | NULL   |
> | CHAR    | NULL   | NULL   | NULL    | NULL | NULL   |
> | STRING  | NULL   | NULL   | NULL    | NULL | NULL   |

Operaciones disponibles:
* Suma
* Resta
* Multiplicación
* División
* Módulo
* Elevación a un exponencial N

### Entornos
En el entorno se guarda la referencia hacia cada variable, arreglo, método o función declarada.
Para declarar una variable nueva primero se debe verificar que no exista previamente, en el Map de identificadores del entorno, una variable con el mismo nombre sin importar el tipo, si ya existe se agregara como un error semantico.

* Guardado de Variables

```ts
public saveId(id: string, value: any, type: Types, line: number, column: number) {
        let env: Environment = this;
        if (!env.ids.has(id)) {
            env.ids.set(id.toLowerCase(), new Symbol(value, id, type, undefined));
            symbolTable.push(line, column, id.toLowerCase(), 'Variable', this.getTypeOf(type), env.name);
        } else {
            errores.push(new Error(line, column, TypesError.SEMANTICO, `Variable ${id} ya existe en el entorno actual`))
        }
    }
```

* Guardado de Funciones

```ts
 public saveFunction(id: string, func: Function) {
        let env: Environment = this;
        if (env.functions.has(id.toLowerCase())) {
            this.setErrore(func.line, func.column, `La función ${id} ya existe en el entorno actual`)
            return
        }
        env.functions.set(id.toLowerCase(), func);
        let typeFunc: string = this.getTypeOfFunc(func.types)
        symbolTable.push(func.line, func.column + 1, id.toLowerCase(), 'Function', typeFunc == 'void' ? 'Método' : 'Función', env.name);
    }
```

* Guardado de Arreglos

```ts
public saveArray(id: string, type: Types, values: any, line: number, column: number) {
        let env: Environment = this;
        if (env.ids.has(id.toLowerCase())) {
            this.setErrore(line, column, `Variable ${id} ya existe en el entorno actual`)
            return
        }

        env.ids.set(id.toLowerCase(), new Symbol(values, id, Types.ARRAY, type));
        symbolTable.push(line, column, id.toLowerCase(), 'Variable', this.getTypeOf(type), env.name);
    }
```

Para la creación del servidor se utilizo de Express de la siguiente forma

```ts
    app.use(cors(corsOptions));
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); 
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
        res.setHeader('Access-Control-Allow-Credentials', 'true'); 
        next();
    });

    app.get('/', (req, res) => {
        res.send('Backend is running...')
    })
    app.use('/interpreter', router)

    app.post('/save', saveFile)

    const PORT = process.env.PORT || 3002
    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`)
    })

```


El código configura un servidor Node.js utilizando Express, un framework para aplicaciones web en Node.js. Las principales características son:

- **CORS (Cross-Origin Resource Sharing):** Se configura para permitir solicitudes desde un origen específico (`http://localhost:5173`) y definir los métodos HTTP permitidos, encabezados y la habilitación de cookies.
  
- **Rutas de API:** Se definen rutas para las solicitudes GET en la ruta raíz (`/`) y POST en la ruta `/save`, junto con la montura de un enrutador en la subruta `/interpreter`.
  
- **Inicio del servidor:** El servidor se inicia en un puerto específico (ya sea el definido en la variable de entorno `process.env.PORT` o el puerto 3002 por defecto) y se muestra un mensaje en la consola indicando en qué puerto está escuchando.
