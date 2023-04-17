// This ensures that the script runs only after the HTML elements are ready
document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submit-data");
    const dataInput = document.getElementById("data-input");
    const dataInput2 = document.getElementById("data-input2")
    const resultDiv = document.getElementById("result");

    // generates 2d array with all the possible data points
    function getDataPoints() {
      var arr = [];
      for (let i = -10; i < 10; i++) {
        for (let j = -10; j < 10; j++) {
          arr.push([i, j]);
        }
      }
    }

    // Constants
const container = document.getElementById("graph");
const width = container.clientWidth;
const height = container.clientHeight;

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 10;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// Function to create a 3D graph
function createGraph(c1, c2) {
  const geometry = new THREE.Geometry();

  for (let x = -10; x <= 10; x += 0.5) {
    for (let y = -10; y <= 10; y += 0.5) {
      const z = c1 * x ** 2 - c2 * y ** 2;
      geometry.vertices.push(new THREE.Vector3(x, y, z));
      geometry.colors.push(new THREE.Color(`hsl(${Math.random() * 360}, 50%, 50%)`));
    }
  }

  const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
  const graph = new THREE.Points(geometry, material);

  return graph;
}

// Create the graph
const graph = createGraph(1, 1);
scene.add(graph);

// Function to update the graph based on user input
function updateGraph(c1, c2) {
  scene.remove(graph);
  const newGraph = createGraph(c1, c2);
  scene.add(newGraph);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the graph
  graph.rotation.x += 0.01;
  graph.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

  
    function validateDataPoint(data) {
      // Define the expected format here (e.g., a number)
      const regex = /^\d+$/;
      const double = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;

      return regex.test(data) || double.test(data);
    }
  
    // Function to handle input changes
    function onInputChange() {
    const c1 = parseFloat(dataInput.value);
    const c2 = parseFloat(dataInput2.value);
    updateGraph(c1, c2);

    dataInput.addEventListener("input", onInputChange);
    dataInput2.addEventListener("input", onInputChange);
}
    function displayResult(message, isError) {
      resultDiv.innerHTML = `<span id="${isError ? 'error-message' : 'success-message'}">${message}</span>`;
    }
  
    submitButton.addEventListener("click", function() {
      const data = dataInput.value;
      if (validateDataPoint(data) && (validateDataPoint(data2)) ) {
        displayResult(`Data point received: ${data}`, false);
        displayResult(`Data point received: ${data2}`, false);
      } else {
        displayResult("Error: Invalid data point format", true);
      }
    });
  });
  