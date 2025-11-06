// Voeg een event listener toe aan de download knop
document.getElementById('downloadButton').addEventListener('click', function() {

  // Maak een nieuw <a> element aan
  var link = document.createElement('a');

  // Stel de download attribuut in met de bestandsnaam
  link.setAttribute('download', 'over_mij.html');

  // Stel de href attribuut in met de HTML inhoud van de pagina
  link.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(document.documentElement.outerHTML));
  
  // Simuleer een klik op de <a> link
  link.click();

});