document.getElementById("1atacar").disabled = true
document.getElementById("1pasar").disabled = true
document.getElementById("2atacar").disabled = true
document.getElementById("2pasar").disabled = true
document.getElementById("3atacar").disabled = true;
document.getElementById("3pasar").disabled = true;

let jugador1_vivo = true;
let jugador2_vivo = true;
let jugador3_vivo = true;
let partidaTerminada = false;
let turnoActual = 0;

function empezarFuncion(){
    jugador1_vivo = true;
    jugador2_vivo = true;
    jugador3_vivo = true;
    partidaTerminada = false;
    document.getElementById("estado1").innerHTML = "Vivo";
    document.getElementById("estado2").innerHTML = "Vivo";
    document.getElementById("estado3").innerHTML = "Vivo";
    document.getElementById("resultado").innerHTML = "";
    activarTurno(1);
}

function jugador1pasar(){
    document.getElementById("1atacar").disabled = true;
    document.getElementById("1pasar").disabled = true;
    document.getElementById("2atacar").disabled = false;
    document.getElementById("2pasar").disabled = false;
}

function jugador2pasar(){
    document.getElementById("2atacar").disabled = true;
    document.getElementById("2pasar").disabled = true;
    document.getElementById("3atacar").disabled = false;
    document.getElementById("3pasar").disabled = false;
}

function jugador3pasar(){
    document.getElementById("3atacar").disabled = true;
    document.getElementById("3pasar").disabled = true;
    document.getElementById("1atacar").disabled = false;
    document.getElementById("1pasar").disabled = false;
}
function jugador1atacar(){
    realizarAtaque(1);
}

function jugador2atacar(){
    realizarAtaque(2);
}

function jugador3atacar(){
    realizarAtaque(3);
}
function avanzarTurno(jugador){
    let siguiente = jugador + 1;
    if(siguiente > 3){
        siguiente = 1;
    }
    while(
        (siguiente == 1 && !jugador1_vivo) ||
        (siguiente == 2 && !jugador2_vivo) ||
        (siguiente == 3 && !jugador3_vivo)
    ){
        siguiente++;
        if(siguiente > 3){
            siguiente = 1;
        }
    }
    activarTurno(siguiente);
}   

function activarTurno(jugador){
turnoActual = jugador;
document.getElementById("1atacar").disabled = true;
document.getElementById("1pasar").disabled = true;
document.getElementById("2atacar").disabled = true;
document.getElementById("2pasar").disabled = true;
document.getElementById("3atacar").disabled = true;
document.getElementById("3pasar").disabled = true;

    if(jugador == 1){
        document.getElementById("1atacar").disabled = false;
        document.getElementById("1pasar").disabled = false;
    }

    if(jugador == 2){
        document.getElementById("2atacar").disabled = false;
        document.getElementById("2pasar").disabled = false;
    }

    if(jugador == 3){
        document.getElementById("3atacar").disabled = false;
        document.getElementById("3pasar").disabled = false;
    }
}
function comprobarFinPartida(){
    let vivos = 0;
    let ganador = 0;

    if(jugador1_vivo){
        vivos++;
        ganador = 1;
    }

    if(jugador2_vivo){
        vivos++;
        ganador = 2;
    }

    if(jugador3_vivo){
        vivos++;
        ganador = 3;
    }

    if(vivos == 1){
        partidaTerminada = true;

        document.getElementById("resultado").innerHTML =
        "¡El jugador " + ganador + " ha ganado la partida!";

        document.getElementById("1atacar").disabled = true;
        document.getElementById("1pasar").disabled = true;
        document.getElementById("2atacar").disabled = true;
        document.getElementById("2pasar").disabled = true;
        document.getElementById("3atacar").disabled = true;
        document.getElementById("3pasar").disabled = true;
    }
}
function realizarAtaque(jugador){

    let objetivo;
    let probabilidad;

    if(jugador == 1){
        objetivo = document.getElementById("objetivo1").value;
        probabilidad = document.getElementById("probabilidad1").value;
    }

    if(jugador == 2){
        objetivo = document.getElementById("objetivo2").value;
        probabilidad = 0.9;
    }

    if(jugador == 3){
        objetivo = document.getElementById("objetivo3").value;
        probabilidad = 0.7;
    }

    let p = Math.random();

    if(p < probabilidad){

        if(objetivo == 1){
            jugador1_vivo = false;
            document.getElementById("estado1").innerHTML = "Muerto";
        }

        if(objetivo == 2){
            jugador2_vivo = false;
            document.getElementById("estado2").innerHTML = "Muerto";
        }

        if(objetivo == 3){
            jugador3_vivo = false;
            document.getElementById("estado3").innerHTML = "Muerto";
        }

        document.getElementById("resultado").innerHTML =
        "El jugador " + jugador + " ha matado al jugador " + objetivo;

    }else{

        document.getElementById("resultado").innerHTML =
        "El jugador " + jugador + " ha fallado el ataque";
    }
    comprobarFinPartida();

    if(partidaTerminada == false){
        avanzarTurno(jugador);
    }
}