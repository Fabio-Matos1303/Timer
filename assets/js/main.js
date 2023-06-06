function relogio() {
  // Obtendo os elementos do DOM
  const relogioElement = document.getElementById('relogio');
  const iniciarButton = document.querySelector('.iniciar');
  const pauseButton = document.querySelector('.pause');
  const resetButton = document.querySelector('.reset');

  // Variáveis para controle do timer
  let intervalId;
  let milissegundos = 0;
  let segundos = 0;
  let minutos = 0;
  let horas = 0;
  let pausado = false;

  // Função para formatar o tempo em HH:MM:SS.mmm
  function formatarTempo(tempo) {
    let ms = tempo % 1000;
    let s = Math.floor(tempo / 1000) % 60;
    let m = Math.floor(tempo / (1000 * 60)) % 60;
    let h = Math.floor(tempo / (1000 * 60 * 60)) % 24;

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  }

  // Função para atualizar o relógio
  function atualizarRelogio() {
    milissegundos += 10;
    if (milissegundos === 1000) {
      milissegundos = 0;
      segundos++;
      if (segundos === 60) {
        segundos = 0;
        minutos++;
        if (minutos === 60) {
          minutos = 0;
          horas++;
        }
      }
    }
    const tempoFormatado = formatarTempo((horas * 3600 * 1000) + (minutos * 60 * 1000) + (segundos * 1000) + milissegundos);
    relogioElement.textContent = tempoFormatado;
  }

  // Função para iniciar o timer
  function iniciarTimer() {
    iniciarButton.disabled = true;
    pausado = false;
    intervalId = setInterval(atualizarRelogio, 10);
    relogioElement.classList.remove('pausado');
  }

  // Função para pausar o timer
  function pausarTimer() {
    iniciarButton.disabled = false;
    pausado = true;
    clearInterval(intervalId);
    relogioElement.classList.add('pausado');
  }

  // Função para resetar o timer
  function resetarTimer() {
    pausarTimer();
    milissegundos = 0;
    segundos = 0;
    minutos = 0;
    horas = 0;
    relogioElement.textContent = '00:00:00.000';
    relogioElement.classList.remove('pausado');
  }

  // Adicionando os event listeners aos botões
  iniciarButton.addEventListener('click', iniciarTimer);
  pauseButton.addEventListener('click', pausarTimer);
  resetButton.addEventListener('click', resetarTimer);
}

relogio();