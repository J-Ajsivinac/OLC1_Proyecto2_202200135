void FactorialIterativo(int n2){
    cout << "==============Para Calificar Ciclos=============" << endl;
    cout << "----------------CICLO WHILE Y FOR---------------" << endl;

    int numeroFactorial = n2;
    while (numeroFactorial > -1) {
        mostrarFactorial(numeroFactorial);
        numeroFactorial--;
    }
    cout << "------------------------------------------------" << endl;
    SentenciasAnidadas();
    cout << "======================================" << endl;
}

EXECUTE Principal(7);

void Principal (int start1){
    cout << "***************ARCHIVO 2**************" << endl;
    cout << "VALOR: 15 PTS" << endl;
    FactorialIterativo(start1);
    RecursividadBasica();
    multiPlicacionPorSumas(7,9);
    cout << "**************************************" << endl;
}


void mostrarFactorial(int n2){
    int fact = 1;
    std::string cadena1 = "El factorial de: " + n2 + " = ";
    if (n2 != 0) {
        for (int i = n2; i > 0; i--) {
            fact = fact * i;
            cadena1 = cadena1 + i;
            if (i > 1) {
                cadena1 = cadena1 + " * ";

            } else {
                cadena1 = cadena1 + " = ";
            }
        }
    }
    cadena1 = cadena1 + fact;
    cout << cadena1 << endl;
}

void SentenciasAnidadas(){
    cout << "-----------------CICLO DO WHILE-----------------" << endl;
    int numero1 = 0;
    cout << "-------------------SWITCH CASE------------------" << endl;
    do {
        switch (numero1) {
            case 0:
                figura0(8);
                break;
            case 1:
                figura1(10);
                break;
            case 2:
                figura2();
                cout<<""<< endl;
                break;
            case 3:
                ciclosContinueBreak();
                cout<<""<< endl;
                break;
            default:
                cout << "Esto se va a imprimir 2 veces :3" << endl;
        }
        numero1 = numero1 + 1;
    } while (numero1 < 6);
    cout << "------------------------------------------------" << endl;
}

void figura0(int numero){
    cout << "-----------------WHILE ANIDADO------------------" << endl;
    int i = 0;
    while (i < numero) {
        int j = 0;
        int numeroMostrar = 1;
        std::string unaFila = "";
        while (j <= i) {
            unaFila = unaFila + " " + numeroMostrar;
            numeroMostrar = numeroMostrar + 1;
            j = j + 1;
        }
        cout << unaFila << endl;
        i = i + 1;
    }
    cout << "Si la figura es un triangulo de numeros + 5 :3" << endl;
    cout << "------------------------------------------------" << endl;
}

void figura1(int n){

    std::string cadenaFigura = "";
    int i;
    for (i = (int)(-3 * n / 2); i <= n; i++) {
        cadenaFigura = "";
        int j;
        for (j = (int)(-3 * n / 2); j <= 3 * n / 2; j++) {

            int absolutoi;
            absolutoi = i;
            int absolutoj;
            absolutoj = j;
            if (i < 0) {
                absolutoi = i * -1;
            }
            if (j < 0) {
                absolutoj = j * -1;
            }
            if ((absolutoi + absolutoj < n)
                || ((-n / 2 - i) * (-n / 2 - i) + (n / 2 - j) * (n / 2 - j) <= n * n / 2)
                || ((-n / 2 - i) * (-n / 2 - i) + (-n / 2 - j) * (-n / 2 - j) <= n * n / 2)) {
                cadenaFigura = cadenaFigura + "* ";
            }
            else {
                cadenaFigura = cadenaFigura + ". ";
            }
        }
        cout << cadenaFigura << endl;
    }
    cout << "Si la figura es un corazon +10 <3" << endl;
}

void figura2(){
    std::string cadenaFigura = "";
    std::string c = "* ";
    std::string b = "  ";
    int altura = 10;
    int ancho = 1;
    for (int i = 0; i < altura / 4; i++) {
        for (int k = 0; k < altura - i; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < i * 2 + ancho; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        cout << cadenaFigura << endl;
        cadenaFigura = "";
    }
    cadenaFigura = "";
    for (int i = 0; i < altura / 4; i++) {
        for (int k = 0; k < (altura - i) - 2; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < i * 2 + 5; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        cout << cadenaFigura << endl;
        cadenaFigura = "";
    }
    cadenaFigura = "";
    for (int i = 0; i < altura / 4; i++) {
        for (int k = 0; k < (altura - i) - 4; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < i * 2 + 9; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        cout << cadenaFigura << endl;
        cadenaFigura = "";
    }

    cadenaFigura = "";
    for (int i = 0; i < altura / 4; i++) {
        for (int k = 0; k < (altura - i) - 6; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < i * 2 + 13; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        cout << cadenaFigura << endl;
        cadenaFigura = "";
    }
    cadenaFigura = "";
    for (int i = 0; i < altura / 4; i++) {
        for (int k = 0; k < altura - 2; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < 5; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        cout << cadenaFigura << endl;
        cadenaFigura = "";
    }

    cout << "Si la figura es un Arbol +10 <3"<< endl;

}

void ciclosContinueBreak(){
    cout << "============Validar Continue y Break===========" << endl;
    int i = 0;

    while (i < 10) { //repetir 10 veces
        int j = i;
        if (i != 7 && i != 5) {
            while (!(j <= 0)) {
                j = j - 2;
            }
            if (j == 0) {
                cout<<"El numero: " + i + " es par"<< endl;
            } else if (j != 0) {
                cout<<"El numero: " + i + " es impar"<< endl;

            }
        } else {
            if (i == 7) {

                cout << "Hay un break para el numero 7 :3"<< endl;
                break;
                cout << "Esto no deberia imprimirse por el continue :/"<< endl;
            } else if (i == 5) {
                cout << "me voy a saltar el 5 porque hay un continue :3" << endl;
                i = i + 1;
                continue;
            }
        }
        i = i + 1;

    }
    if (i == 7) {
        cout << "Si el ultimo numero impreso es un 7, tienes un +5 :D" << endl;

    } else {
        cout << "No funciona tu Break o Continue, perdiste 5 puntos :(" << endl;
    }
    cout << "======================================" << endl;

}

double r_toRadians;
double r_cos;

void toRadians(double angulo){
    r_toRadians = angulo * 3.141592653589793 / 180;
}

double potenciaRecursiva(double base, double exponente){
    if(exponente == 0){
        return 1.0;
    }
    return base * potenciaRecursiva(base, exponente - 1);
}

void coseno(double x){
    double coseno = 0.0;
    int factorial;
    for(int i = 0; i <= 10; i++){
        factorial = 1;
        for(int j = 1; j <= 2 * i; j++){
            factorial = factorial * j;
        }
        if(i % 2 == 0){
            coseno = coseno + potenciaRecursiva(x, 2.0 * i) / factorial;
        }else{
            coseno = coseno - potenciaRecursiva(x, 2.0 * i) / factorial;
        }
    }
    r_cos = coseno;
}



void DibujarArbol(double x1, double y1, double angulo, int depth) {
    if (depth != 0) {
        toRadians(angulo);
        coseno(3.141592653589793 / 2 + r_toRadians);
        double x2 = x1 + (r_cos * depth * 50.0);
        toRadians(angulo);
        coseno(r_toRadians);
        double y2 = y1 + (r_cos * depth * 50.0);
        cout << x1 + " " + y1 + " " + x2 + " " + y2 + "" << endl;
        DibujarArbol(x2, y2, angulo - 20, depth - 1);
        DibujarArbol(x2, y2, angulo + 20, depth - 1);
    }

}

void RecursividadBasica() {
    cout << "===============RECURSIVIDAD BASICA=================" << endl;
    DibujarArbol(250.0, 500.0, -90.0, 4);
    cout << "======================= FIN =======================" << endl;
}

void multiPlicacionPorSumas(int m, int n){
    cout << "===============MULTIPLICACION POR SUMAS==============" << endl;
    int mul = 0;
    //Establecemos condición de que (m y n) no sean cero.
    if ((m != 0) && (n != 0)) {
        //Utilizamos un for para ejecutar el ciclo de sumas.
        for (int i = 0; i < n; i++) {
            // += representa (mul = mul + m), solo acorta lo anterior.
            mul = mul + m;
        }
    }
    //Retornamos el resultado.
    //Si m o n es cero, retornará cero.
    cout << m + "x" + n + " = " + mul << endl;
    cout << "========================= FIN ======================="<< endl;
}



