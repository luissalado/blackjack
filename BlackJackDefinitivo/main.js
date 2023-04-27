const baraja = []
const jugadorc = document.getElementById('jugador')
const crupierc = document.getElementById('crupier')
const puntosjugador = document.getElementById('jugadorpuntos')
const puntoscrupier = document.getElementById('crupierpuntos')
const jugadorCartas = []
const dealerCartas = []
var fichas = 300
var apuesta = 0
const resultado = document.getElementById('resultado')
const tusfichas = document.getElementById('tus-fichas')
const fichasApostadas = document.getElementById('fichas-apostadas')

function crearBaraja() {
    baraja.splice(0, baraja.length)
    jugadorCartas.splice(0, jugadorCartas.length)
    dealerCartas.splice(0, dealerCartas.length)
    const palos = ['picas', 'corazones', 'treboles', 'diamantes']
    const puntuaciones = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    for (let i = 0; i < palos.length; i++) {
        for (let j = 0; j < puntuaciones.length; j++) {
            baraja.push(`${puntuaciones[j]} de ${palos[i]}`)
        }
    }
    for (let i = baraja.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
    }

}

function sumar(mano) {
    let totalPuntos = 0
    let numAces = 0
    for (let i = 0; i < mano.length; i++) {
        let carta = mano[i].split(' ')[0]
        if (carta === 'As') {
            numAces += 1
            totalPuntos += 11
        } else if (carta === 'J' || carta === 'Q' || carta === 'K') {
            totalPuntos += 10
        } else {
            totalPuntos += parseInt(carta)
        }
    }

    while (totalPuntos > 21 && numAces > 0) {
        totalPuntos -= 10
        numAces--
    }

    return totalPuntos
}



function empezar() {
    if (fichas <= 0 || apuesta == 0) {
        return false
    }
    crearBaraja()
    fichas -= apuesta
    resultado.innerHTML = ''
    jugadorCartas.push(baraja.shift(), baraja.shift())
    dealerCartas.push(baraja.shift())
    if (sumar(dealerCartas) >= 10) {
        dealerCartas.push(baraja.shift())
        crupierc.innerHTML = `<h2>Cartas crupier</h2><ul><img src='cartas/${dealerCartas[0]}.png'><img src='cartas/${dealerCartas[1]}.png'></ul>`
    }
    jugadorc.innerHTML = `<h2>Cartas Jugador</h2><ul><img src='cartas/${jugadorCartas[0]}.png'><img src='cartas/${jugadorCartas[1]}.png'></ul>`
    puntosjugador.innerHTML = `<h2>Puntuacion Jugador: ${sumar(jugadorCartas)}</h2>`
    puntoscrupier.innerHTML = `<h2>Puntuacion crupier: ${sumar(dealerCartas)}</h2>`
    if (sumar(jugadorCartas) == 21) {
        resultado.innerHTML = `<h2>Ganador Jugador</h2>`
        fichas += apuesta * 2
        apuesta = 0
        tusfichas.innerHTML = `Tus fichas: ${fichas}`
        fichasApostadas.innerHTML = `Tu apuesta : ${apuesta}`
    }
    if (dealerCartas.length < 2) {
        crupierc.innerHTML = `<h2>Cartas crupier</h2><ul><img src='cartas/${dealerCartas[0]}.png'></ul>`
        dealerCartas.push(baraja.shift())
    }
    else if (sumar(dealerCartas) == 21) {
        resultado.innerHTML = `<h2>Ganador Crupier</h2>`
        apuesta = 0
        tusfichas.innerHTML = `Tus fichas: ${fichas}`
        fichasApostadas.innerHTML = `Tu apuesta : ${apuesta}`
    }
}


function tomarCarta() {
    if(apuesta == 0){
        return false
    }
    if (resultado.innerHTML != '') {
        return false
    }

    const carta = baraja.shift()
    jugadorCartas.push(carta)
    const jugadorc = document.getElementById('jugador').getElementsByTagName('ul')[0]
    jugadorc.innerHTML += `<img src='cartas/${carta}.png'>`
    crupierc.innerHTML = `<h2>Cartas crupier</h2><ul><img src='cartas/${dealerCartas[0]}.png'><img src='cartas/${dealerCartas[1]}.png'></ul>`
    puntosjugador.innerHTML = `<h2>Puntuacion Jugador: ${sumar(jugadorCartas)}</h2>`
    puntoscrupier.innerHTML = `<h2>Puntuacion crupier: ${sumar(dealerCartas)}</h2>`

    if (sumar(jugadorCartas) == 21) {
        resultado.innerHTML = `<h2>Ganador Jugador</h2>`
        fichas += apuesta * 2
        apuesta = 0
        tusfichas.innerHTML = `Tus fichas: ${fichas}`
        fichasApostadas.innerHTML = `Tu apuesta : ${apuesta}`
    }
    else if (sumar(jugadorCartas) >= 22) {
        resultado.innerHTML = `<h2>Ganador crupier</h2>`
        apuesta = 0
        tusfichas.innerHTML = `Tus fichas: ${fichas}`
        fichasApostadas.innerHTML = `Tu apuesta : ${apuesta}`
    }
}
function rendir(){
    fichas += apuesta * 1/2
    apuesta = 0
    tusfichas.innerHTML=`tus fichas: ${fichas}`
    fichasApostadas.innerHTML= `tu apuesta: ${apuesta}`
    resultado.innerHTML= "Has recuperado la mitad de lo perdido"
    return false
}

function plantar() {
    if(apuesta == 0){
        return false
    }
    resultado.innerHTML = `<h2>${determinarGanador(sumar(jugadorCartas), sumar(dealerCartas))}</h2>`

}

function determinarGanador(puntajeJugador = 0, puntajeDealer = 0) {
    if (puntajeJugador = puntajeDealer) {
        fichas += apuesta
        apuesta = 0
        tusfichas.innerHTML = `Tus fichas: ${fichas}`
        fichasApostadas.innerHTML = `Tu apuesta : ${apuesta}`
        return 'Empate'
    }
    else if (puntajeJugador > 21) {
        apuesta = 0
        tusfichas.innerHTML = `Tus fichas: ${fichas}`
        fichasApostadas.innerHTML = `Tu apuesta : ${apuesta}`
        return 'Ganador Crupier'
    }
    else if (puntajeDealer > 21) {
        fichas += apuesta * 2
        apuesta = 0
        tusfichas.innerHTML = `Tus fichas: ${fichas}`
        fichasApostadas.innerHTML = `Tu apuesta : ${apuesta}`
        return 'Ganador Jugador'
    }
    else if (puntajeJugador > puntajeDealer) {
        fichas += apuesta * 2
        apuesta = 0
        tusfichas.innerHTML = `Tus fichas: ${fichas}`
        fichasApostadas.innerHTML = `Tu apuesta : ${apuesta}`
        return 'Ganador Jugador'
    }
    else if (puntajeDealer > puntajeJugador) {
        apuesta = 0
        tusfichas.innerHTML = `Tus fichas: ${fichas}`
        fichasApostadas.innerHTML = `Tu apuesta : ${apuesta}`
        return 'Ganador crupier'
    }
}


function apostarFichas(apostados = fichas) {
    if (fichas <= 0) {
        return false
    }
    if (apuesta >= fichas || apuesta + apostados > fichas) {
        return false
    }

    tusfichas.innerHTML = `Tus fichas: ${fichas}`
    apuesta += apostados
    fichasApostadas.innerHTML = `Tu apuesta : ${apuesta}`
}


function limpiarApuesta() {
    apuesta = 0
    tusfichas.innerHTML = `Tus fichas: ${fichas}`
    fichasApostadas.innerHTML = `Tu apuesta: ${apuesta}`

}
