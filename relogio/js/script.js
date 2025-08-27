function atualizarRelogio() {
  const agora = new Date();

  let horas = agora.getHours();
  let minutos = agora.getMinutes();
  let segundos = agora.getSeconds();

  horas = horas < 10 ? '0' + horas : horas;
  minutos = minutos < 10 ? '0' + minutos : minutos;
  segundos = segundos < 10 ? '0' + segundos : segundos;

  document.getElementById('horas').textContent = horas;
  document.getElementById('minutos').textContent = minutos;
  document.getElementById('segundos').textContent = segundos;

  let dia = agora.getDate();
  let mes = agora.getMonth() + 1;
  let ano = agora.getFullYear();

  dia = dia < 10 ? '0' + dia : dia;
  mes = mes < 10 ? '0' + mes : mes;

  document.getElementById('dia').textContent = dia;
  document.getElementById('mes').textContent = mes;
  document.getElementById('ano').textContent = ano;
}

function obterLocalizacao() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`);
        const data = await response.json();
        const cidade = data.address.city || data.address.town || data.address.village || "";
        const estado = data.address.state || "";
        document.getElementById("localizacao").textContent = `${cidade} - ${estado}`;
      } catch (e) {
        document.getElementById("localizacao").textContent = "Não foi possível obter a localização";
      }
    }, function() {
      document.getElementById("localizacao").textContent = "Permissão negada para acessar a localização";
    });
  } else {
    document.getElementById("localizacao").textContent = "Geolocalização não suportada";
  }
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();
obterLocalizacao();
