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
   
   // Define the Island class
   class Island {
       constructor(id, population) {
           this.id = id;
           this.population = population;
           this.neighbors = [];
           this.lastVisit = -1;  // Track the last visit time for skill-sharing
       }
   
       addNeighbor(edge) {
           this.neighbors.push(edge);
       }
   }
   
   // Define the Edge class
   class Edge {
       constructor(destination, travelTime) {
           this.destination = destination;
           this.travelTime = travelTime;
       }
   }
   
   // Define the SeaOfIslandsGraph class
   class SeaOfIslandsGraph {
       constructor() {
           this.islands = {};
       }
   
       addIsland(id, population) {
           const island = new Island(id, population);
           this.islands[id] = island;
       }
   
       addRoute(fromId, toId, travelTime) {
           const fromIsland = this.islands[fromId];
           const toIsland = this.islands[toId];
           const edge = new Edge(toIsland, travelTime);
           fromIsland.addNeighbor(edge);
       }
   }
   
   // Implementing Skill Sharing with Priority-Based DFS
   function shareSkills(graph, startId, currentTime) {
       // Priority queue for islands ordered by (-population, time_since_last_visit)
       const visitPriorityQueue = [];
       heapPush(visitPriorityQueue, { island: graph.islands[startId], lastVisitTime: currentTime, population: graph.islands[startId].population });
   
       const visited = new Set();
       let totalTime = 0;
   
       while (visitPriorityQueue.length > 0) {
           const { island, lastVisitTime } = heapPop(visitPriorityQueue);
           if (visited.has(island.id)) continue;  // Skip if already visited
   
           island.lastVisit = currentTime;  // Update last visit time
           visited.add(island.id);
   
           // Output the travel time and total time
           const timeSpent = currentTime - lastVisitTime;
           totalTime += timeSpent;
           console.log(`Visited ${island.id}, Travel Time: ${timeSpent}, Total Time So Far: ${totalTime}`);
   
           for (const edge of island.neighbors) {
               const neighbor = edge.destination;
               if (!visited.has(neighbor.id)) {
                   // Calculate time priority (longer time since last visit gives higher priority)
                   const timePriority = neighbor.lastVisit !== -1 ? currentTime - neighbor.lastVisit : currentTime;
                   // Push to priority queue with highest population and recency priority
                   heapPush(visitPriorityQueue, {
                       island: neighbor,
                       lastVisitTime: timePriority,
                       population: neighbor.population
                   });
               }
           }
   
           // Increment time based on travel time to the next island (it could vary for each trip)
           currentTime += island.neighbors[0].travelTime;  // Assuming the first neighbor is the next destination for simplicity
       }
   }
   
   // Helper functions for priority queue
   function heapPush(queue, item) {
       queue.push(item);
       queue.sort((a, b) => b.population - a.population || b.lastVisitTime - a.lastVisitTime);
   }
   
   function heapPop(queue) {
       return queue.shift();
   }
   
   // Example Usage
   (function main() {
       // Create the graph
       const graph = new SeaOfIslandsGraph();
       graph.addIsland("Fiji", 928784);
       graph.addIsland("Vanuatu", 332600);
       graph.addIsland("Solomon Islands", 825359);
       graph.addIsland("New Caledonia", 293000);
       graph.addIsland("Tonga", 104597);
   
       graph.addRoute("Fiji", "Vanuatu", 8);
       graph.addRoute("Fiji", "Tonga", 12);
       graph.addRoute("Vanuatu", "Fiji", 8);
       graph.addRoute("Vanuatu", "Solomon Islands", 10);
       graph.addRoute("Vanuatu", "New Caledonia", 6);
       graph.addRoute("Solomon Islands", "Vanuatu", 10);
       graph.addRoute("Solomon Islands", "New Caledonia", 9);
       graph.addRoute("New Caledonia", "Vanuatu", 6);
       graph.addRoute("New Caledonia", "Solomon Islands", 9);
       graph.addRoute("New Caledonia", "Tonga", 14);
       graph.addRoute("Tonga", "Fiji", 12);
       graph.addRoute("Tonga", "New Caledonia", 14);
   
       // Skill sharing by leaders
       const currentTime = 0;  // Start time
       shareSkills(graph, "Fiji", currentTime);  // Start from Fiji
   
   })();