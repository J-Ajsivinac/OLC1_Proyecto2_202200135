int var1 = 1;
int punteo = 0;

EXECUTE InicioArchivo1();

void InicioArchivo1() {
    cout << "-----------------CALIFICACION ARCHIVO 1-----------------" << endl;
    cout << "Valor: 15 pts" << endl;
    cout << "" << endl;
    cout << "--------------------------------------------------------" << endl;
    int var1 = 0;

    //Verificar ambitos, se toma con prioridad la variable local ante la global.
    if (var1 != 0) {
        cout << "No se toma con prioridad la variable local ante la global" << endl;
        cout << "Perdiste 8 puntos :c" << endl;
    }
    else {
        punteo = punteo + 8;
        cout << "Muy bien, prioridad de variable local correcta" << endl;
        cout << "Haz sumado 8 puntos" << endl;
        cout << "Punteo = " + punteo << endl;
    }

    //Sección de declaracion de variables
    Declaracion();

    //seccion de manejo de Ámbitos 2
    int amb1 = 3;
    Ambitos2();

    //Sección de expresiones aritméticas
    Aritmeticas();

    //Seccion de expresiones lógicas
    Logicas();

    //Seccion de expresiones relacionales
    Relacionales();

    //punteo final
    cout << "Punteo Final: " + punteo << endl;
    double resultado = (punteo * 15) / 100;
    cout << "-----------------------------------" << endl;
    cout << "|   RESULTADO ARCHIVO 1 = " + resultado +" pts  |" << endl;
    cout << "-----------------------------------" << endl;
}

void Declaracion(){
    /*  SALIDA ESPERADA:
            ========= Metodo Declaracion =========
            Voy a ganar Compiladores 1 :D
            ======================================
    */
    cout << "========= Metodo Declaracion =========" << endl;
    int n1,n2,n3,n4 = 1;
    std::StriNg str1 = "Voy a ganar Compiladores";
    std::string str2 = "Voy a ganar Compiladores";
    std::String str3 = "Voy a ganar Compiladores";
    std::string str4 = "Voy a ganar Compiladores";
    DoublE db1 = 0.0;
    double db2 = 0.0;
    Double db3 = 0.0;
    double db4 = 0.0;
    char chr1 = 's';
    char chr2 = 's';
    char chr3 = 's';
    char chr4 = 's';

    //si n modificar la asignacion
    if (db1 == db4) {
        cout << str1 + chr2 + " " + n3 + " :D" << endl;
        punteo = punteo + 6;
        cout << "Declaración correcta" << endl;
        cout << "Haz sumado 6 puntos" << endl;
    } else {
        cout << "Problemas en el metodo declaracion :(" << endl;
        cout << "Perdiste 6 pts :(" << endl;
    }
    cout << "--------------------------------------" << endl;
    cout << "Punteo = " + punteo << endl;
    cout << "--------------------------------------" << endl;
}

void Ambitos2(){
    //Ambito local                                                                                                           //aca hay un error semantico amb1 //no existe   |F:64 C18|
    std::string amb1 = "Desde ambito2";
    cout << "==============Ambitos 2===============" << endl;
    if (amb1 == "Desde ambito2") {
        cout << amb1 << endl;
        punteo = punteo + 8;
    }
    else {
        cout << "Tienes un error al manejar la variable amb1 :(" << endl;
        cout << "Perdiste 8 puntos" << endl;
    }
    cout << "Punteo = " + punteo << endl;
    cout << "======================================" << endl;
}

void Aritmeticas(){
    //suma de strings con caracteres
    /* SALIDA ESPERADA
    ==============Aritmeticas=============
    Hola COMPI
    El valor de  n1 = 52.1
    El valor de n3 = 70.0
    -Operaciones Basicas: valor esperado:   a)62   b)0   c)-19   d)256   resultados>
    a) 62
    b) 0
    c) -19
    d) 256
    ======================================
    */
    cout << "==============Aritmeticas=============" << endl; 
    std::string art1 = "Hola " + 'C' + "" + 'O' + "" + 'M' + "" + 'P' + "" + 'I';
    cout << art1 << endl;

    if (art1 == "Hola COMPI") {
        punteo = punteo + 6;
    } else {
        cout << "Perdiste 6 puntos en suma de cadena y caracter :c" << endl;
    }

    double n1 = 0.0 + true + true + 1 + 0.1 + '1';  //ascii del 1 es 49
    cout << "El valor de  n1 = " + n1 << endl;
    if (n1 == 52.1) {
        punteo = punteo + 6;
    } else {
        cout << "Perdiste 6 puntos en suma de enteros booleanos y caracteres :c" << endl;
    }

    int n2 = '2' - 1 - '1';
    if (n2 == 0) {
        punteo = punteo + 5;
    } else {
        cout << "Perdiste 5 puntos en la resta de caracteres :c" << endl;
    }

    double n4 = (5750 * 2) - 11800 + 1.0;
    double n3 = (((3 * 3) + 4) - 80 + 40.00 * 2 + 358.50 - (29 / 14.50)) - (0.50) + n4;
    cout << "El valor de n3 = " + n3 << endl;
    if (n3 == 70.0) {
        punteo = punteo + 6;
    }
    else {
        cout << "Perdiste 6 puntos :c " << endl;
    }

    operacionesBasicas();
    operacionesAvanzadas();
    cout << "Punteo = " + punteo << endl;
    cout << "======================================" << endl;
}

void operacionesBasicas(){
    cout << "Operaciones Aritmeticas 1: valor esperado:   a)62   b)0   c)-19   d)256   resultados>" << endl;
    int a;
    a = (int)(20 - 10 + 8 / 2 * 3 + 10 - 10 - 10 + 50);
    int b;
    b = (int)(50 / 50 * 50 + 50 - 100 + 100 - 100);
    int c;
    c = (int)(100 / 20 * 9 - 78 + 6 - 7 + 8 - 7 + 7 * 1 * 2 * 3 / 3);
    int d;
    d = (int)(pow(2, (20 / 5 * 2)));
    cout << "a) " + a << endl;
    cout << "b) " + b << endl;
    cout << "c) " + c << endl;
    cout << "d) " + d << endl;
    if (a == 62 && b == 0 && c == -19 && d == 256) {
        cout << "Operaciones aritmeticas 1 bien :D" << endl;
        punteo = punteo + 8;
    } else {
        cout << "Error para las operaciones basicas :(" << endl;
    }
}

void operacionesAvanzadas(){
    int aritmetica1 = 2;
    int aritmetica2 = -10;
    cout << "Operaciones Aritmeticas 2: valor esperado>-20  41 \nresultado>" << endl;
    int aritmetica3 = aritmetica2 * aritmetica1;
    cout << aritmetica3 + "" << endl;
    aritmetica1 = (int)(aritmetica3 / aritmetica1 + pow(50, 2) / 50 + 50 * 2 - 100 + 100 / 100 - 0);
    cout << aritmetica1 + "" << endl;
    if (aritmetica3 == -20 && aritmetica1 == 41) {
        cout << "Operaciones aritmeticas 2 bien :D" << endl;
        punteo = punteo + 8;
    } else {
        cout << "Error Operaciones Aritmeticas" << endl;
    }
}

void Logicas(){
    cout << "==============Logicas1=============" << endl;
    if (!!!!!!!!!!!!!!!!!!true) {
        punteo = punteo + 1;
        cout << "Bien primera condicion:)" << endl;
    } else {
        cout << "Perdiste 1 punto :c" << endl;
    }

    if (((true && true) || ((false && false) && (false == true))) || (!true)) {
        punteo = punteo + 5;
        cout << "Bien segunda condicion:)" << endl;
    } else {
        cout << "Perdiste 5 puntos :c" << endl;
    }
    cout << "======================================" << endl;
    Logicas2();
    cout << "--------------------------------------" << endl;
    cout << "Punteo = " + punteo << endl;
    cout << "--------------------------------------" << endl;
}

void Logicas2(){
    int n0 = 16;
    cout << "==============Logicas2=============" << endl;

    if (!(!(n0 == 16 && false == true) && !(true))) {
        cout << "Not y Ands Correctos" << endl;
        punteo = punteo + 5;

    } else {
        cout << "No funcionan nots y ands :(" << endl;
    }
    int n1;
    n1 = (int)(n0 / 16);
    n1 = n1 + true;
    bool condicion1 = n1 != 2; //esto es falso
    int aritmetica1 = (int)(n0 / 16 + ((!(true || false)))); // aritmetica1 = 0
    bool condicion2 = aritmetica1 == n1; //falso
    bool condicion3 = !true; //falso

    if (!(!(!(condicion1 || condicion2) || condicion3))) {
        cout << "Nots y Ors correctos" << endl;
        punteo = punteo + 5;
    } else {
        cout << "No Funciona nots y ands :(" << endl;
    }
    cout << "======================================" << endl;

    Logicas3(n0);
}

void Logicas3(int n0){
    //Hacer lo mismo que logicas2 pero con nands y nors
    cout << "==============Logicas3=============" << endl;

    if (!(!(n0 == 16 && false == true) && !(true))) {
        cout << "NANDS Correctos" << endl;
        punteo = punteo + 5;

    } else {
        cout << "No funcionan NANDS :(" << endl;
    }

    int n1;
    n1 = (int)(n0 / 16);
    n1 = n1 + true;
    bool condicion1 = false; //esto es falso
    int aritmetica1;
    aritmetica1 = (int)(n0 / 16 + ((!(true || false)))); // aritmetica1 = 0
    bool condicion2 = false; //falso
    bool condicion3 = true; //verdadero

    if (!(!(!(condicion1 || condicion2) || condicion3))) {
        cout << "NORS correectos" << endl;
        punteo = punteo + 3;
    } else {
        cout << "No Funcionan NORS :(" << endl;
    }

    cout << "======================================" << endl;
}

void Relacionales(){
    int n0 = 34;
    int n1 = 16;

    relaciones1(n0);
    relaciones2(n1);
}

void relaciones1(int salida){
    cout << "==============relacionales1=============" << endl;
    double n0 = salida + 0.0;
    if (n0 < 34.44) {
        salida = salida + 15;
        if (salida > 44) {
            salida++;

        }
    }
    else {
        salida = 1;
    }

    if (salida != 1) {
        if (salida == 50) {
            cout << "Salida Correcta Relacionales 1!" << endl;
            punteo = punteo + 10;
        }
        else {
            cout << "Salida incorrecta!!" << endl;
        }
    }
    else {
        cout << "Salida incorrecta!!" << endl;
    }
    cout << "======================================" << endl;
}

void relaciones2(int n0){
    cout << "vas bien, animo :D" << endl;

    cout << "============Relacionales2=============" << endl;


    if(10 - 15 >= 0 && 44.44 == 44.44)
    {

        cout << "Salida incorrecta primer Si relacionales2!!" << endl;

    }

    else {

        if(15 + 8 == 22 - 10 + 5 * 3 - 4 && 13 * 0 > -1)

        {

            if(10.0 != 11.0 - 1.01)

            {

                cout << "Salida CORRECTA en relacionales2!!" << endl;
                punteo = punteo + 5;
            }

            else {

                cout << "Salida incorrecta segundo Si relacionales 2!!" << endl;

            }



        }

        else {

            if(1 == 1)

            {

                cout << "Salida incorrecta relacionales 2 3er si !!" << endl;

            }

            else {

                cout << "Salida incorrecta relacionales 2 Sino3er si !!" << endl;

            }



        }



    }
    cout << "======================================" << endl;
}

