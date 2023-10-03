const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create a graph object
const graph = new Graph();

// Add a listener to the "Generate Graph" button
document.getElementById('generateGraphBtn').addEventListener('click', () => {
  const numNodes = document.getElementById('numNodes').value;
  const edgeWeights = document.getElementById('edgeWeights').value.split(',');

  // Generate a random graph with the specified number of nodes
  graph.generateRandomGraph(numNodes);

  // Add the edge weights to the graph
  for (let i = 0; i < edgeWeights.length; i++) {
    const edgeWeight = parseInt(edgeWeights[i]);
    graph.addEdge(i, i + 1, edgeWeight);
  }

  // Visualize the graph
  drawGraph(ctx, graph);
});

// Add a listener to the "Visualize MST" button
document.getElementById('visualizeMSTBtn').addEventListener('click', () => {
  // Find the minimum spanning tree using Prim's algorithm
  const MST = Prim(graph);

  // Visualize the minimum spanning tree
  drawMST(ctx, MST);
});

// Draw a node
function drawNode(ctx, node, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(node, x, y);
}

// Draw an edge
function drawEdge(ctx, edge, color) {
  const startNode = graph.getNode(edge.startNode);
  const endNode = graph.getNode(edge.endNode);

  ctx.beginPath();
  ctx.moveTo(startNode.x, startNode.y);
  ctx.lineTo(endNode.x, endNode.y);
  ctx.strokeStyle = color;
  ctx.stroke();
}

// Draw the graph
function drawGraph(ctx, graph) {
  for (const node of graph.nodes) {
    drawNode(ctx, node.id, node.x, node.y);
  }

  for (const edge of graph.edges) {
    drawEdge(ctx, edge, 'black');
  }
}

// Draw the minimum spanning tree
function drawMST(ctx, MST) {
  for (const edge of MST.edges) {
    drawEdge(ctx, edge, 'red');

  
