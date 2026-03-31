let scoreA = 0;
let scoreB = 0;

function addPoint(team) {
  if (team === 'A') {
    scoreA++;
    document.getElementById('scoreA').innerText = scoreA;
  } else {
    scoreB++;
    document.getElementById('scoreB').innerText = scoreB;
  }
}

function removePoint(team) {
  if (team === 'A' && scoreA > 0) {
    scoreA--;
    document.getElementById('scoreA').innerText = scoreA;
  } else if (team === 'B' && scoreB > 0) {
    scoreB--;
    document.getElementById('scoreB').innerText = scoreB;
  }
}
function resetScore() {
  scoreA = 0;
  scoreB = 0;

  document.getElementById('scoreA').innerText = 0;
  document.getElementById('scoreB').innerText = 0;
}