function calculateZ(c1, c2, x, y) {
  return c1 * Math.pow(x, 2) - c2 * Math.pow(y, 2);
}

function createGrid(min, max) {
  const grid = [];
  for (let i = min; i <= max; i++) {
      grid.push(i);
  }
  return grid;
}

function createData(c1, c2, xGrid, yGrid) {
  const data = [];
  for (const x of xGrid) {
      for (const y of yGrid) {
          const z = calculateZ(c1, c2, x, y);
          data.push({ x, y, z });
      }
  }
  return data;
}

function plotData(data) {
  const trace = {
      x: data.map(d => d.x),
      y: data.map(d => d.y),
      z: data.map(d => d.z),
      mode: 'markers',
      type: 'scatter3d',
      marker: {
          size: 3
      }
  };

  const layout = {
      title: 'Z Calculation Plot',
      scene: {
          xaxis: { title: 'X' },
          yaxis: { title: 'Y' },
          zaxis: { title: 'Z' }
      }
  };

  Plotly.newPlot('plot', [trace], layout);
}

document.getElementById('calculate').addEventListener('click', () => {
  const c1 = parseFloat(document.getElementById('c1').value);
  const c2 = parseFloat(document.getElementById('c2').value);
  const xGrid = createGrid(-10, 10);
  const yGrid = createGrid(-10, 10);
  const data = createData(c1, c2, xGrid, yGrid);
  plotData(data);
});
