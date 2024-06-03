/*
    DECLARAMOS UN VECTOR DE 15 POSICIONES
    SE IMPRIMRÁ Y POSTERIORMENTE SE ORDENARÁ
*/
int vectorNumeros [] = new int[15];
vectorNumeros[0] = 1==1? 100:19; //tiene que ser 100
vectorNumeros[1] = 26;
vectorNumeros[2] = 1;
vectorNumeros[3] = 15;
vectorNumeros[4] = 167;
vectorNumeros[5] = 0;
vectorNumeros[6] = 76;
vectorNumeros[7] = 94;
vectorNumeros[8] = 25;
vectorNumeros[9] = 44;
vectorNumeros[100-90] = 5;
vectorNumeros[11] = 59;
vectorNumeros[12] = 95;
vectorNumeros[13] = 10;
vectorNumeros[14] = 23;


Char frase [][]  = [
    ['.','.','.','.','.','.','.','.','.','O'],
    ['.','.','.','.','.','.','.','.','D','.'],
    ['.','.','.','.','.','.','.','N','.','.'],
    ['.','.','.','.','.','.','U','.','.','.'],
    ['.','.','.','.','.','M','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','A','.','.','.','.','.','.'],
    ['.','.','L','.','.','.','.','.','.','.'],
    ['.', 'O' ,'.','.','.','.','.','.','.','.'],
    ['H','.','.','.','.','.','.','.','.','.']
    
];

void voltearFilas( char arreglo[][] ){
    // Guardar de una vez la longitud para hacer más legible el código
    int longitudDelArreglo = arreglo.length();
    // Recorrer arreglo hasta la mitad. Si es impar, se va al entero anterior más 
    // próximo. P. ej. 5 / 2 => 2
    for (int x = 0; x < longitudDelArreglo / 2; x++) {
      // Respaldar el valor actual
      Char temporal[] = arreglo[x];
      // Calcular el índice contrario, es decir, el del otro lado de la mitad; el cual irá descendiendo
      int indiceContrario = longitudDelArreglo - x - 1;
      // En el actual ahora está el del otro lado
      arreglo[x] = arreglo[indiceContrario];
      // Y en el otro lado, el que estaba originalmente en el actual
      arreglo[indiceContrario] = temporal;
    }
    // No regresamos nada porque ya modificamos al arreglo internamente :p
}


void imprimirMatriz(char matriz[][]) {
    int i, j;
    std::String linea = "";
    for (i = 0; i < matriz.length(); i++) {
        for (j = 0; j < matriz[i].length(); j++) {
            linea = linea + " " + matriz[i][j] +" ";
        }
        cout << linea << endl;
        linea = "";
    }
}



void Hanoi(int discos, int origen, int auxiliar, int destino) {
    if (discos == 1) {
        cout << "Mover disco de " + origen + " a " + destino << endl;
    } else {
        Hanoi(discos - 1, origen, destino, auxiliar);
        cout << "Mover disco de " + origen + " a " + destino << endl;
        Hanoi(discos - 1, auxiliar, origen, destino);
    }
}

void imprimirVector(int miVector[]){
    for (int i = 0; i < miVector.length(); i++) {
        cout << "vectorNumeros[" + i + "] = " + miVector[i] << endl;
    }
}

void BubbleSort(int miVector[]){
    for (int i = 0; i < miVector.length(); i++)
    {
        for (int j = 0; j < miVector.length() - i - 1; j++)
        {
            if (miVector[j] > miVector[j + 1]) {
                int temp;
                temp = miVector[j];
                miVector[j] = miVector[j + 1];
                miVector[j + 1] = temp;
            }
        }
    }
}


execute Archivo3();

void ParoImpar(int a) {
    if (par(a) == 1) { // El número es Par
        cout << "El numero '" + a + "'" + " es Par" << endl;
    } else { // El número es impar
        cout << "El numero '" + a + "'" + " es Impar"<< endl;
    }
}

int par(int nump){
    if (nump == 0) {
        return 1;
    }
    return impar(nump - 1);
}

int impar(int numi){
    if (numi == 0) {
        return 0;
    }
    return par(numi - 1);
}

int ackermanPuntosMenos(int m, int n){
    if (m == 0) {
        return n + 1;
    } else if (m > 0 && n == 0) {
        return ackermanPuntosMenos(m - 1, 1);
    } else {
        return ackermanPuntosMenos(m - 1, ackermanPuntosMenos(m, n - 1));
    }
}

int ackerman(int m, int n){
    return (m == 0 ? n + 1 : (m > 0 && n == 0 ? ackerman(m - 1, 1) : ackerman(m - 1, ackerman(m, n - 1))));
}

void Archivo3(){
   cout <<"====================ARCHIVO 3===================="<< endl;
   cout <<"**************SECCION DE VECTORES****************"<< endl;
   cout <<"---Vector Desordenado---"<< endl;
    imprimirVector(vectorNumeros);
    BubbleSort(vectorNumeros);
   cout <<"-----Vector Ordenado----"<< endl;
    imprimirVector(vectorNumeros);
   cout <<"************FIN DE SECCION VECTORES***************" << endl;
   cout <<"**************SECCION DE CASTEOS***************" << endl;
    Casteos();
   cout <<"************FIN DE SECCION DE CASTEOS*************"<< endl;
   cout <<"**************SECCION DE NATIVAS***************" << endl;
    FuncionesEspecialesNativas();
   cout <<"************FIN DE SECCION DE NATIVAS*************" << endl;
   cout <<"***********SECCION DE RECURSIVIDAD***************" << endl;
   cout <<"---------------FUNCION FIBONACCI-----------------" << endl;
    imprimir_fibonacci(20);
   cout <<"-------------------------------------------------" << endl;
   cout <<"---------------FUNCION PAR-IMPAR-----------------" << endl;
    ParoImpar(71);
   cout <<"-------------------------------------------------" << endl;
   cout <<"----------------TORRES DE HANOI------------------" << endl;
    int discos = 3;
    int origen = 1;
    int auxiliar = 2;
    int destino = 3;
    Hanoi(discos, origen, auxiliar, destino);
   cout <<"-------------------------------------------------" << endl;
   cout <<"---------------FUNCION ACKERMANN-----------------" << endl;
    int m = 3;
    int n = 4;
   cout <<"Funcion de Ackerman (" + m + ", " + n + ") = " + ackerman(m, n)<< endl;
    //cout <<"Funcion de Ackerman Puntos Menos (" + m + ", " + n + ") = " + ackermanPuntosMenos(m, n) << endl;
    cout <<"-------------------------------------------------" << endl;
    cout <<"*************FIN DE RECURSIVIDAD*****************" << endl;
    cout <<"=================================================" << endl;

    cout <<"-------------------------------------------------" << endl;
    cout <<"---------------Vectores de dos dimensiones-----------------" << endl;
    voltearFilas(frase);
    imprimirMatriz(frase);
    cout <<"-------------------------------------------------"<< endl;
    cout <<"*************FIN DE vectores de dos dimensiones*****************" << endl;
    cout <<"=================================================" << endl;
}

void Casteos(){
    cout <<"int a "+typeof((double) 1789)<< endl;
    cout <<"double a "+ typeof((int) 258.2) << endl;
    cout <<"char  a "+ typeof((double) 'F')<< endl;
    cout <<"int a "+typeof((char) 98)<< endl;
    cout <<"double a "+typeof(std::toString(2589.97)) << endl;
}

void FuncionesEspecialesNativas(){
    cout <<"------------------LENGTH-------------------"<< endl;
    cout <<"vectorNumero es de "+vectorNumeros.length()+" elementos"<< endl;
    int a = 15;
    cout <<"------------------TOLOWER-------------------"<< endl;
    cout <<"SIN TOLOWER"<< endl;
    cout <<toLower("CON TOLOWER")<< endl;
    cout <<"------------------TOUPPER-------------------" << endl;
    cout <<"sin toupper"<< endl;
    cout <<toUpper("con toupper")<< endl;
    cout <<"------------------ROUND-------------------" << endl;
    double c=60.51;
    cout <<"sin round: "+c << endl;
    c=(double)round(c);
    cout <<"con round "+c << endl;
    double cc=60.39;
    cout <<"sin round: "+cc << endl;
    cc=(double)round(cc);
    cout <<"con round "+cc << endl;
    cout <<"-----------------TYPEOF--------------------" << endl;
    std::string nombreAuxiliar = "Fabian Reyna";
    int y = 45;
    double z = 3.14159;
    char xx = '6';
    bool yy = false;
    cout <<"tipo: "+typeof(nombreAuxiliar)<< endl;
    cout <<"tipo: "+typeof(y)<< endl;
    cout <<"tipo: "+typeof(z)<< endl;
    cout <<"tipo: "+typeof(xx)<< endl;
    cout <<"tipo: "+typeof(yy)<< endl;
    cout <<"------------------LENGTH-------------------"<< endl;
    std::string cadena="Si sale Compiladores 1";
    cout <<"tamaño: "+cadena.length()<< endl;
    cout <<"------------------TOSTRING-------------------"<< endl;
    int numero = 5;
    cout <<"tipo: "+typeof(numero)<< endl;
    cout <<"tipo: "+typeof(std::toString(numero))<< endl;
    cout <<"----------------TOCHARARRAY------------------"<< endl;
    cout <<"######## imprimiendo nombre del auxiliar #######"<< endl;
    
    char saludo [] = nombreAuxiliar.c_str();
    impresion_recursiva(saludo.length() - 1, saludo);
}

void impresion_recursiva(int pos, char arreglo[]){
    if(pos >= 1){
        impresion_recursiva(pos - 1, arreglo);
    }
    cout << arreglo[pos] << endl;

}

void imprimir_fibonacci(int valor) {
   cout <<"Resultado de fibonacci(" + valor + ") = " + fibonacci(valor)<< endl;
}

int fibonacci(int n) {
    if (n > 1) {
        return fibonacci(n - 1) + fibonacci(n - 2);
    } else if (n == 1) {
        return 1;
    } else if (n == 0) {
        return 0;
    } else {
        cout <<"error"<< endl;
        return 0;
    }
}
