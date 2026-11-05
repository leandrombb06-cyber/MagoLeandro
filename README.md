# Juego de combate entre tres jugadores

## 1. Introducción

### Objetivo del juego

Este proyecto consiste en un juego de combate entre tres jugadores desarrollado utilizando HTML y JavaScript.

El objetivo es conseguir ser el último jugador que permanezca vivo. Para conseguirlo, cada jugador dispone de un turno en el que puede atacar a uno de sus rivales o pasar su turno.

Los ataques tienen diferentes probabilidades de éxito dependiendo del jugador y de las opciones seleccionadas.

### Manual de instrucciones

1. Pulsar el botón START para comenzar la partida.
2. El jugador 1 comienza el juego y puede elegir su probabilidad de ataque.
3. Cada jugador debe seleccionar a quién quiere atacar.
4. Pulsar el botón Atacar para intentar eliminar al rival seleccionado.
5. Si no se quiere atacar, se puede pulsar Pasar para ceder el turno.
6. Cuando un ataque tiene éxito, el jugador objetivo queda eliminado.
7. Los jugadores eliminados no pueden volver a participar en los turnos de ataque.
8. La partida termina cuando solamente queda un jugador vivo. Este será el ganador.

### Probabilidades de ataque

Cada jugador tiene unas probabilidades diferentes:

- Jugador 1: puede elegir entre 60 %, 80 % y 100 %.
- Jugador 2: tiene una probabilidad fija del 90 %.
- Jugador 3: tiene una probabilidad fija del 70 %.

## 2. Explicación del código HTML

El HTML se utiliza para construir la estructura visual del juego y organizar los elementos con los que interactúan los jugadores.

### 2.1. Configuración inicial

Al principio del documento encontramos la declaración del tipo de documento, la configuración de caracteres, el título de la página y la conexión con el archivo JavaScript.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Juego</title>
    <script type="text/javascript" src="script.js" defer></script>
</head>
```

El atributo `charset="UTF-8"` permite utilizar diferentes caracteres. El título identifica la página y el elemento `script` conecta el HTML con JavaScript.

El atributo `defer` permite que el navegador procese primero el documento HTML antes de ejecutar el archivo JavaScript.

### 2.2. Botón de inicio

```html
<button onclick="empezarFuncion()">START</button>
```

Este botón permite iniciar la partida. Cuando se pulsa, ejecuta la función `empezarFuncion()` que se encuentra en JavaScript.

### 2.3. Organización de los jugadores

Se utiliza una tabla HTML para organizar visualmente los tres jugadores y el espacio central donde aparecen los resultados.

La tabla contiene:
- Una columna para el jugador 1.
- Una columna central para los resultados.
- Una columna para el jugador 2.
- Una columna para el jugador 3.

### 2.4. Selección de probabilidades

El jugador 1 puede seleccionar entre tres probabilidades diferentes de ataque mediante un elemento `select`.

```html
<select id="probabilidad1">
    <option value="0.6">60%</option>
    <option value="0.8">80%</option>
    <option value="1">100%</option>
</select>
```

Cada opción tiene un valor numérico que posteriormente utiliza JavaScript para calcular la probabilidad de éxito del ataque.

### 2.5. Selección de objetivos

Cada jugador tiene un selector para elegir a cuál de sus rivales quiere atacar.

```html
<select id="objetivo1">
    <option value="2">Jugador 2</option>
    <option value="3">Jugador 3</option>
</select>
```

En este ejemplo, el jugador 1 puede seleccionar como objetivo al jugador 2 o al jugador 3.

Los otros jugadores tienen selectores similares.

### 2.6. Botones de ataque y de pasar turno

Cada jugador dispone de dos botones principales:

- Atacar: ejecuta la función correspondiente para intentar eliminar al objetivo.
- Pasar: permite ceder el turno al siguiente jugador.

Por ejemplo:

```html
<button id="1atacar" onclick="jugador1atacar()">
    Atacar
</button>

<button id="1pasar" onclick="jugador1pasar()">
    Pasar
</button>
```

Los identificadores permiten que JavaScript pueda controlar los botones y activar o desactivar su funcionamiento.

### 2.7. Estado de los jugadores y resultados

Cada jugador tiene un elemento de texto que muestra si está vivo o muerto.

```html
<p id="estado1">Vivo</p>
```

También existe un espacio central identificado como `resultado`, donde aparecen los mensajes de los ataques y el ganador de la partida.

### 2.8. Capturas de pantalla

En este apartado se añadirán capturas de pantalla de la interfaz del juego, mostrando su aspecto visual y la distribución de los tres jugadores.

## 3. Explicación del código JavaScript

JavaScript se encarga de controlar toda la lógica del juego. Gestiona los turnos, los ataques, las probabilidades, la eliminación de jugadores y la finalización de la partida.

### 3.1. Variables principales

Al principio del código se declaran las variables que permiten controlar el estado de los jugadores y de la partida.

```javascript
let jugador1_vivo = true;
let jugador2_vivo = true;
let jugador3_vivo = true;

let partidaTerminada = false;
let turnoActual = 0;
```

- `jugador1_vivo`, `jugador2_vivo` y `jugador3_vivo`: indican si cada jugador sigue vivo.
- `partidaTerminada`: indica si la partida ha finalizado.
- `turnoActual`: almacena el número del jugador que tiene el turno.

También se desactivan inicialmente los botones de ataque y de pasar turno para impedir que los jugadores puedan actuar antes de comenzar la partida.

### 3.2. Inicio de la partida

La función `empezarFuncion()` se encarga de preparar el juego cuando se pulsa START.

```javascript
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
```

Esta función devuelve a todos los jugadores a su estado inicial, borra los resultados anteriores y activa el turno del jugador 1.

### 3.3. Sistema de pasar turno

Existen tres funciones diferentes: `jugador1pasar()`, `jugador2pasar()` y `jugador3pasar()`.

Cada una desactiva los botones del jugador actual y activa los botones del siguiente.

Por ejemplo:

```javascript
function jugador1pasar(){
    document.getElementById("1atacar").disabled = true;
    document.getElementById("1pasar").disabled = true;

    document.getElementById("2atacar").disabled = false;
    document.getElementById("2pasar").disabled = false;
}
```

De esta manera, cuando el jugador 1 pasa su turno, se habilitan las opciones del jugador 2.

### 3.4. Funciones de ataque

Cada jugador tiene una función que inicia su ataque.

```javascript
function jugador1atacar(){
    realizarAtaque(1);
}

function jugador2atacar(){
    realizarAtaque(2);
}

function jugador3atacar(){
    realizarAtaque(3);
}
```

Las tres funciones utilizan `realizarAtaque()`, enviando como argumento el número del jugador que está atacando.

Esto permite utilizar una misma función para gestionar los ataques de los tres jugadores.

### 3.5. Control del sistema de turnos

La función `activarTurno()` se encarga de desactivar todos los botones y habilitar únicamente los del jugador al que le corresponde actuar.

Por otro lado, `avanzarTurno()` calcula cuál será el siguiente jugador.

También utiliza un bucle `while` para saltarse a los jugadores que hayan sido eliminados.

### 3.6. Sistema de probabilidades y ataques

La función `realizarAtaque(jugador)` es una de las partes más importantes del programa.

Primero comprueba qué jugador está atacando, obtiene el objetivo seleccionado y establece su probabilidad de éxito.

Después utiliza `Math.random()` para generar un número aleatorio.

```javascript
let p = Math.random();

if(p < probabilidad){
    // El ataque tiene éxito.
} else {
    // El ataque falla.
}
```

Si el número generado es inferior a la probabilidad establecida, el ataque tiene éxito. En caso contrario, el ataque falla.

Cuando el ataque tiene éxito, el jugador objetivo pasa a estar eliminado y su estado cambia de "Vivo" a "Muerto".

### 3.7. Comprobación del final de la partida

La función `comprobarFinPartida()` cuenta cuántos jugadores siguen vivos.

Si solamente queda uno, establece que la partida ha terminado, muestra quién ha ganado y desactiva todos los botones.

De esta forma se impide que la partida continúe después de encontrar un ganador.

## 4. Acerca de

**Creador:** Leandro Martín.

**Proyecto:** Juego de combate entre tres jugadores.

**Finalidad:** Proyecto desarrollado como práctica académica del primer curso de FP Superior de Desarrollo de Aplicaciones Web (DAW).

**Tecnologías utilizadas:**
- HTML5.
- JavaScript.

**Dedicatoria:** Este proyecto está dedicado a todas las personas que disfrutan de los videojuegos y los juegos de estrategia. 