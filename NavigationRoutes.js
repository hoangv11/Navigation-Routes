const graph = {
  Fiji: [
    { destination: "Vanuatu", time: 8, capacity: 500 },
    { destination: "Tonga", time: 12, capacity: 400 },
  ],
  Vanuatu: [
    { destination: "Fiji", time: 8, capacity: 500 },
    { destination: "Solomon Islands", time: 10, capacity: 300 },
    { destination: "New Caledonia", time: 6, capacity: 450 },
  ],
  "Solomon Islands": [
    { destination: "Vanuatu", time: 10, capacity: 300 },
    { destination: "New Caledonia", time: 9, capacity: 350 },
  ],
  "New Caledonia": [
    { destination: "Vanuatu", time: 6, capacity: 450 },
    { destination: "Solomon Islands", time: 9, capacity: 350 },
    { destination: "Tonga", time: 14, capacity: 400 },
  ],
  Tonga: [
    { destination: "Fiji", time: 12, capacity: 400 },
    { destination: "New Caledonia", time: 14, capacity: 400 },
  ],
};

const islands = {
  Fiji: {
    population: 928784,
    resources: ["sugarcane", "ginger", "gold"],
    experiences: [
      { experience: "beach resorts", time: 2 },
      { experience: "cultural festivals", time: 4 },
      { experience: "surfing", time: 2 },
    ],
  },
  Vanuatu: {
    population: 332600,
    resources: ["kava", "coconuts", "timber"],
    experiences: [
      { experience: "volcano tours", time: 4 },
      { experience: "tribal ceremonies", time: 3 },
      { experience: "island hiking", time: 2 },
    ],
  },
  "Solomon Islands": {
    population: 825359,
    resources: ["coffee", "sandalwood", "coconut oil"],
    experiences: [{ experience: "scuba diving", time: 3 }],
  },
  "New Caledonia": {
    population: 293000,
    resources: ["nickel", "chromite", "cobalt"],
    experiences: [
      { experience: "marine park", time: 2 },
      { experience: "food tasting", time: 4 },
      { experience: "coral reef exploration", time: 4 },
      { experience: "sailing", time: 2 },
    ],
  },
  Tonga: {
    population: 104597,
    resources: ["vanilla", "root crops", "limestone"],
    experiences: [
      { experience: "whale watching", time: 2 },
      { experience: "traditional dances", time: 4 },
    ],
  },
};

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  parent(index) {
    return Math.floor((index - 1) / 2);
  }

  leftChild(index) {
    return 2 * index + 1;
  }

  rightChild(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  enqueue(priority, item) {
    const element = { priority, item };
    this.heap.push(element);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.parent(index);
      if (this.heap[parentIndex].priority <= this.heap[index].priority) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop().item;
    }

    const min = this.heap[0].item;
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return min;
  }

  heapifyDown(index) {
    while (true) {
      let minIndex = index;
      const leftIndex = this.leftChild(index);
      const rightIndex = this.rightChild(index);

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex].priority < this.heap[minIndex].priority
      ) {
        minIndex = leftIndex;
      }

      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex].priority < this.heap[minIndex].priority
      ) {
        minIndex = rightIndex;
      }

      if (minIndex === index) {
        break;
      }

      this.swap(index, minIndex);
      index = minIndex;
    }
  }
}

function findOptimalTour(startIsland) {
  const visited = new Set();
  const pq = new PriorityQueue();
  pq.enqueue(0, {
    island: startIsland,
    timeSpent: 0,
    experiences: [],
    path: [startIsland],
  });

  let optimalRoute = null;

  while (!pq.isEmpty()) {
    const { island, timeSpent, experiences, path } = pq.dequeue();

    if (visited.has(island)) continue;
    visited.add(island);

    const allExperiences = islands[island].experiences.map((e) => e.experience);
    const experienceTimes = islands[island].experiences.map((e) => e.time);
    const uniqueExperiences = [...new Set([...experiences, ...allExperiences])];
    const newTimeSpent = timeSpent + experienceTimes.reduce((a, b) => a + b, 0);

    if (
      !optimalRoute ||
      uniqueExperiences.length > optimalRoute.experiences.length
    ) {
      optimalRoute = {
        island,
        timeSpent: newTimeSpent,
        experiences: uniqueExperiences,
        path,
      };
    }

    for (const { destination, time } of graph[island]) {
      if (!visited.has(destination)) {
        const totalTravelTime = newTimeSpent + time;
        const newPath = [...path, destination];
        pq.enqueue(totalTravelTime, {
          island: destination,
          timeSpent: totalTravelTime,
          experiences: uniqueExperiences,
          path: newPath,
        });
      }
    }
  }

  return optimalRoute;
}

const startIsland = "Fiji";
const optimalTour = findOptimalTour(startIsland);

console.log("Optimal Tour:");
console.log(`Start Island: ${startIsland}`);
console.log(`Total Time Spent: ${optimalTour.timeSpent}`);
console.log("Order of Islands Visited:");
optimalTour.path.forEach((island) => console.log(`- ${island}`));
console.log("Experiences:");
optimalTour.experiences.forEach((exp) => console.log(`- ${exp}`));

//-------------Jayda Decker's Part(prompt 3)------------------------------//
const resourceTimes = {
  "sugarcane": 3,
  "ginger": 2,
  "gold": 4,
  "kava": 2,
  "coconuts": 1,
  "timber": 5,
  "coffee": 2,
  "sandalwood": 3,
  "coconut oil": 2,
  "nickel": 4,
  "chromite": 3,
  "cobalt": 4,
  "vanilla": 2,
  "root crops": 2,
  "limestone": 3
};

function getResourcePaths(sourceIsland, resource, numCanoes = 1) {
  if (!islands[sourceIsland].resources.includes(resource)) {
    return { success: false, error: `Resource ${resource} not found in ${sourceIsland}` };
  }

  const paths = [];
  const targetIslands = Object.keys(islands).filter(island => 
    island !== sourceIsland && !islands[island].resources.includes(resource)
  );

  function shortestPaths(start) {
    const distances = Object.fromEntries(Object.keys(islands).map(island => [island, Infinity]));
    const previous = {};
    const pq = new PriorityQueue();

    distances[start] = 0;
    pq.enqueue(0, start);

    while (!pq.isEmpty()) {
      const current = pq.dequeue();
      graph[current].forEach(route => {
        const distance = distances[current] + route.time;
        if (distance < distances[route.destination]) {
          distances[route.destination] = distance;
          previous[route.destination] = current;
          pq.enqueue(distance, route.destination);
        }
      });
    }
    return { distances, previous };
  }

  const { distances, previous } = shortestPaths(sourceIsland);
  let remaining = [...targetIslands];

  for (let canoe = 0; canoe < numCanoes && remaining.length; canoe++) {
    const canoePlan = { canoeId: canoe + 1, trips: [], totalTime: 0 };

    while (remaining.length) {
      const next = remaining.reduce((a, b) => (distances[a] < distances[b] ? a : b));
      const path = [];
      let current = next;

      while (current) {
        path.unshift(current);
        current = previous[current];
      }

      canoePlan.trips.push({
        path,
        timeToDestination: distances[next],
        plantingTime: resourceTimes[resource],
        returnTime: distances[next]
      });

      canoePlan.totalTime += 2 * distances[next] + resourceTimes[resource];
      remaining = remaining.filter(island => island !== next);
    }

    paths.push(canoePlan);
  }

  return {
    success: true,
    resource,
    sourceIsland,
    numCanoes,
    paths,
    totalTime: Math.max(...paths.map(p => p.totalTime))
  };
}

function distributeResource(sourceIsland, resource, numCanoes = 1) {
  const result = getResourcePaths(sourceIsland, resource, numCanoes);

  if (!result.success) {
    console.log(result.error);
    return;
  }

  console.log(`\nDistribution Plan for ${resource} from ${sourceIsland} using ${numCanoes} canoe(s):`);
  console.log(`Total time required: ${result.totalTime} units\n`);

  result.paths.forEach(({ canoeId, trips, totalTime }) => {
    console.log(`Canoe ${canoeId} route (Total time: ${totalTime}):`);
    trips.forEach(({ path, timeToDestination, plantingTime, returnTime }, i) => {
      console.log(`  Trip ${i + 1}:`);
      console.log(`    Path: ${path.join(" → ")}`);
      console.log(`    Travel time: ${timeToDestination}`);
      console.log(`    Planting time: ${plantingTime}`);
      console.log(`    Return time: ${returnTime}`);
    });
    console.log();
  });
}

// Example usage
console.log("\nTesting Resource Distribution:");
distributeResource("Fiji", "sugarcane", 2);
