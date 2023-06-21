let labelGrafic1 = []
let dataGrafic1 = []

async function fetchGrafic1() {
  return await fetch("http://127.0.0.1:5000/grafic1").then(result => result.json())
}

const grafic1 = document.getElementById("grafic1");

function generateGrafic() {
  new Chart(grafic1, {
    type: 'pie',
    data: {
      labels: [...labelGrafic1],
      datasets: [{
        label: '# of Votes',
        data: [...dataGrafic1],
        borderWidth: 1,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',  
          'rgba(54, 162, 235, 0.8)',  
          'rgba(255, 206, 86, 0.8)',   
          'rgba(75, 192, 192, 0.8)',   
          'rgba(153, 102, 255, 0.8)',  
          'rgba(255, 159, 64, 0.8)',   
          'rgba(255, 0, 0, 0.8)',       
          'rgba(0, 255, 0, 0.8)',      
          'rgba(0, 0, 255, 0.8)',    
          'rgba(255, 255, 0, 0.8)'     
        ]
      }]
    }
  });
}


function renderGrafic1(grafics) {
  const grafic = {
    "nameCategory": grafics[0],
    "qtd": grafics[1]
  }
  labelGrafic1.push(grafic.nameCategory)
  dataGrafic1.push(grafic.qtd)
}
async function updateGrafic1() {
  const result = await fetchGrafic1()
  result.forEach(renderGrafic1)
  generateGrafic()
}

document.addEventListener("DOMContentLoaded", updateGrafic1)

