// Graph data for the islands
const graph = {
  "Fiji": [
    { destination: "Vanuatu", time: 8, capacity: 500 },
    { destination: "Tonga", time: 12, capacity: 400 }
  ],
  "Vanuatu": [
    { destination: "Fiji", time: 8, capacity: 500 },
    { destination: "Solomon Islands", time: 10, capacity: 300 },
    { destination: "New Caledonia", time: 6, capacity: 450 }
  ],
  "Solomon Islands": [
    { destination: "Vanuatu", time: 10, capacity: 300 },
    { destination: "New Caledonia", time: 9, capacity: 350 }
  ],
  "New Caledonia": [
    { destination: "Vanuatu", time: 6, capacity: 450 },
    { destination: "Solomon Islands", time: 9, capacity: 350 },
    { destination: "Tonga", time: 14, capacity: 400 }
  ],
  "Tonga": [
    { destination: "Fiji", time: 12, capacity: 400 },
    { destination: "New Caledonia", time: 14, capacity: 400 }
  ]
};

// Island data (population, resources, and experiences)
const islands = {
  "Fiji": {
    population: 928784,
    resources: ["sugarcane", "ginger", "gold"],
    experiences: [
      { experience: "beach resorts", time: 2 },
      { experience: "cultural festivals", time: 4 },
      { experience: "surfing", time: 2 }
    ]
  },
  "Vanuatu": {
    population: 332600,
    resources: ["kava", "coconuts", "timber"],
    experiences: [
      { experience: "volcano tours", time: 4 },
      { experience: "tribal ceremonies", time: 3 },
      { experience: "island hiking", time: 2 }
    ]
  },
  "Solomon Islands": {
    population: 825359,
    resources: ["coffee", "sandalwood", "coconut oil"],
    experiences: [{ experience: "scuba diving", time: 3 }]
  },
  "New Caledonia": {
    population: 293000,
    resources: ["nickel", "chromite", "cobalt"],
    experiences: [
      { experience: "marine park", time: 2 },
      { experience: "food tasting", time: 4 },
      { experience: "coral reef exploration", time: 4 },
      { experience: "sailing", time: 2 }
    ]
  },
  "Tonga": {
    population: 104597,
    resources: ["vanilla", "root crops", "limestone"],
    experiences: [
      { experience: "whale watching", time: 2 },
      { experience: "traditional dances", time: 4 }
    ]
  }
};

// Dijkstra's algorithm considering only population and calculating travel time
function dijkstraWithPopulationPriority(start) {
  const distances = {};
  const times = {};  // Object to store travel times
  const visited = new Set();
  const priorityQueue = new MaxHeap();  // Max-heap to prioritize larger populations

  // Initialize distances with negative infinity (because we use max-heap)
  for (let island in graph) {
      distances[island] = -Infinity;
      times[island] = Infinity;  // Start with infinite time
  }
  distances[start] = islands[start].population; // Starting island's population is the "initial" value
  times[start] = 0;  // Travel time for the start island is 0
  priorityQueue.insert({ island: start, population: islands[start].population, time: 0 });

  while (!priorityQueue.isEmpty()) {
      const { island: currentIsland, population, time } = priorityQueue.extractMax();
      if (visited.has(currentIsland)) continue;

      visited.add(currentIsland);

      // Relax edges based on population (maximize the population)
      for (const neighbor of graph[currentIsland]) {
          const { destination, time: travelTime } = neighbor;
          const neighborPopulation = islands[destination].population;
          const newTime = time + travelTime;

          // Only update if we find a higher population and less travel time
          if (neighborPopulation > distances[destination] || 
              (neighborPopulation === distances[destination] && newTime < times[destination])) {
              distances[destination] = neighborPopulation;
              times[destination] = newTime;
              priorityQueue.insert({ island: destination, population: neighborPopulation, time: newTime });
          }
      }
  }

  // Return the distances and travel times
  return { distances, times };
}

// MaxHeap implementation for the priority queue (to prioritize largest population)
class MaxHeap {
  constructor() {
      this.heap = [];
  }

  insert(node) {
      this.heap.push(node);
      this.bubbleUp(this.heap.length - 1);
  }

  extractMax() {
      if (this.heap.length === 1) return this.heap.pop();
      const max = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown(0);
      return max;
  }

  bubbleUp(index) {
      while (index > 0) {
          const parentIdx = Math.floor((index - 1) / 2);
          if (this.heap[index].population <= this.heap[parentIdx].population) break;
          [this.heap[index], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[index]];
          index = parentIdx;
      }
  }

  bubbleDown(index) {
      const length = this.heap.length;
      while (true) {
          let leftIdx = 2 * index + 1;
          let rightIdx = 2 * index + 2;
          let swapIdx = index;

          if (leftIdx < length && this.heap[leftIdx].population > this.heap[swapIdx].population) swapIdx = leftIdx;
          if (rightIdx < length && this.heap[rightIdx].population > this.heap[swapIdx].population) swapIdx = rightIdx;
          if (swapIdx === index) break;

          [this.heap[index], this.heap[swapIdx]] = [this.heap[swapIdx], this.heap[index]];
          index = swapIdx;
      }
  }

  isEmpty() {
      return this.heap.length === 0;
  }
}

// Test the function with Fiji as the starting point
const result = dijkstraWithPopulationPriority("Vanuatu");
console.log("Population and Travel Times from Fiji:");
for (let island in result.distances) {
  console.log(`${island}: Population = ${result.distances[island]}, Travel Time = ${result.times[island]} hours`);
}