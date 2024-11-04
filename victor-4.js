const graph = {
  "Fiji": [
      { destination: "Vanuatu", time: 8, capacity: 500 },
      { destination: "Tonga", time: 12, capacity: 400 },
  ],
  "Vanuatu": [
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
  "Tonga": [
      { destination: "Fiji", time: 12, capacity: 400 },
      { destination: "New Caledonia", time: 14, capacity: 400 },
  ],
};

const islands = {
  "Fiji": {
      population: 928784,
      resources: ["sugarcane", "ginger", "gold"],
      experiences: [
          { experience: "beach resorts", time: 2 },
          { experience: "cultural festivals", time: 4 },
          { experience: "surfing", time: 2 },
      ],
  },
  "Vanuatu": {
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
  "Tonga": {
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
      this.elements = [];
  }

  isEmpty() {
      return this.elements.length === 0;
  }

  enqueue(priority, item) {
      this.elements.push({ priority, item });
      this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
      return this.elements.shift().item;
  }
}

function findOptimalTour(startIsland) {
  const visited = new Set();
  const pq = new PriorityQueue();
  pq.enqueue(0, { island: startIsland, timeSpent: 0, experiences: [] });

  let optimalRoute = null;

  while (!pq.isEmpty()) {
      const { island, timeSpent, experiences } = pq.dequeue();

      if (visited.has(island)) continue;
      visited.add(island);

      const allExperiences = islands[island].experiences.map(e => e.experience);
      const uniqueExperiences = [...new Set([...experiences, ...allExperiences])];
      if (!optimalRoute || uniqueExperiences.length > optimalRoute.experiences.length) {
          optimalRoute = { island, timeSpent, experiences: uniqueExperiences };
      }

      for (const { destination, time } of graph[island]) {
          if (!visited.has(destination)) {
              const newTimeSpent = timeSpent + time;
              pq.enqueue(newTimeSpent, { island: destination, timeSpent: newTimeSpent, experiences: uniqueExperiences });
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
console.log("Experiences:");
optimalTour.experiences.forEach(exp => console.log(`- ${exp}`));