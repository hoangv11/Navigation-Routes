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
