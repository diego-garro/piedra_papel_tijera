const REGLAS = [
    'PIEDRA aplasta a LAGARTO',
    'PIEDRA destruye a TIJERAS',
    'PAPEL tapa a PIEDRA',
    'PAPEL desautoriza a SPOCK',
    'TIJERAS cortan a PAPEL',
    'TIJERAS decapitan a LAGARTO',
    'LAGARTO envenena a SPOCK',
    'LAGARTO devora a PAPEL',
    'SPOCK rompe TIJERAS',
    'SPOCK vaporiza a PIEDRA'
]

const MANOS = {
    piedra : 0,
    papel  : 1,
    tijeras: 2,
    lagarto: 3,
    spock  : 4
}

const GANADORES = {
    piedra: [
        MANOS.lagarto,
        MANOS.tijeras
    ],
    papel: [
        MANOS.piedra,
        MANOS.spock
    ],
    tijeras: [
        MANOS.papel,
        MANOS.lagarto
    ],
    lagarto: [
        MANOS.spock,
        MANOS.papel
    ],
    spock: [
        MANOS.tijeras,
        MANOS.piedra
    ]
}

// Número aleatorio para jugada de la máquina
function numeroAleatorio(min, max) {
    let numero = Math.floor(Math.random() * (max - min + 1) + min)
    return numero
}

function regresaEleccion(numero) {
    let eleccion = ''
    switch (numero) {
        case MANOS.piedra:
            eleccion = 'PIEDRA'
            break
        case MANOS.papel:
            eleccion = 'PAPEL'
            break
        case MANOS.tijeras:
            eleccion = 'TIJERAS'
            break
        case MANOS.lagarto:
            eleccion = 'LAGARTO'
            break
        case MANOS.spock:
            eleccion = 'SPOCK'
            break
    }

    return eleccion
}

function imprimirJugada(eleccionUsuario, eleccionMaquina) {
    const jugada = `${eleccionUsuario}${eleccionMaquina}`
    let resultado = ''
    switch (jugada) {
        case '01':
        case '10':
            resultado = REGLAS[2]
            break
        case '02':
        case '20':
            resultado = REGLAS[1]
            break
        case '03':
        case '30':
            resultado = REGLAS[0]
            break
        case '04':
        case '40':
            resultado = REGLAS[9]
            break
        case '12':
        case '21':
            resultado = REGLAS[4]
            break
        case '13':
        case '31':
            resultado = REGLAS[7]
            break
        case '14':
        case '41':
            resultado = REGLAS[3]
            break
        case '23':
        case '32':
            resultado = REGLAS[5]
            break
        case '24':
        case '42':
            resultado = REGLAS[8]
            break
        case '34':
        case '43':
            resultado = REGLAS[6]
            break
        default:
            resultado = `Ambos eligieron ${regresaEleccion(eleccionUsuario)}`
            break
    }

    return resultado
}

function procesarResultado(eleccionUsuario, eleccionMaquina) {
    let resultado = '¡PERDISTE!'
    if (eleccionUsuario === eleccionMaquina) {
        resultado = '¡EMPATE!'
    } else {
        switch (eleccionUsuario) {
            case 0:
                if (GANADORES.piedra.includes(eleccionMaquina, 0)) {
                    resultado = '¡GANASTE!'
                }
                break
            case 1:
                if (GANADORES.papel.includes(eleccionMaquina, 0)) {
                    resultado = '¡GANASTE!'
                }
                break
            case 2:
                if (GANADORES.tijeras.includes(eleccionMaquina, 0)) {
                    resultado = '¡GANASTE!'
                }
                break
            case 3:
                if (GANADORES.lagarto.includes(eleccionMaquina, 0)) {
                    resultado = '¡GANASTE!'
                }
                break
            case 4:
                if (GANADORES.spock.includes(eleccionMaquina, 0)) {
                    resultado = '¡GANASTE!'
                }
                break
        }
    }
    return resultado
}

function guardarYLimpiar() {
    document.getElementById('choices').innerHTML = ''
    document.getElementById('results').innerHTML = ''
}

let jugadas = 0
let scoreUsuario = 0
let scoreMaquina = 0

function jugar(numero) {
    let eleccionUsuario = numero
    let eleccionMaquina = numeroAleatorio(0, 4)
    resultado = procesarResultado(eleccionUsuario, eleccionMaquina)
    document.getElementById('choices').innerHTML = `
        <h5>Resultados</h5>
        <h6>Elegiste: ${regresaEleccion(eleccionUsuario)}</h6>
        <h6>La máquina eligió: ${regresaEleccion(eleccionMaquina)}</h6>
    `
    document.getElementById('results').innerHTML = `
        <h5>${imprimirJugada(eleccionUsuario, eleccionMaquina)}</h5>
        <h5>${resultado}</h5>
    `
    if (resultado == '¡GANASTE!') {
        scoreUsuario++
        jugadas++
    } else if (resultado == '¡PERDISTE!') {
        scoreMaquina++
        jugadas++
    }
    if (jugadas === 3 || scoreUsuario == 2 || scoreMaquina == 2) {
        setTimeout(() => {
            if (scoreUsuario > scoreMaquina) {
                alert(`Usuario ${scoreUsuario} - ${scoreMaquina} Máquina\n¡Felicidades has ganado la partida!`)
            } else {
                alert(`Usuario ${scoreUsuario} - ${scoreMaquina} Máquina\nHas perdido la partida :(`)
            }
            guardarYLimpiar()
            jugadas = 0
            scoreMaquina = 0
            scoreUsuario = 0
        }, 500);
        
    }
}