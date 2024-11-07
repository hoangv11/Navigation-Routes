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
  
  // Dijkstra's Algorithm to find shortest paths in terms of travel time
  function dijkstra(graph, startIsland) {
    const distances = {};
    const visited = new Set();
    const pq = [{ island: startIsland, time: 0 }];
  
    // Initialize distances to infinity for all islands except the start
    for (let island in graph) {
      distances[island] = Infinity;
    }
    distances[startIsland] = 0;
  
    while (pq.length > 0) {
      // Sort priority queue by time, pop the island with the shortest time
      pq.sort((a, b) => a.time - b.time);
      const { island, time } = pq.shift();
  
      if (visited.has(island)) continue;
      visited.add(island);
  
      // Update neighbors' times
      for (let neighbor of graph[island]) {
        if (!visited.has(neighbor.destination)) {
          const newTime = time + neighbor.time;
          if (newTime < distances[neighbor.destination]) {
            distances[neighbor.destination] = newTime;
            pq.push({ island: neighbor.destination, time: newTime });
          }
        }
      }
    }
  
    return distances;
  }
  
  // Leader's continuous trip - Travel and accumulate the total travel time
  function leaderContinuousTrip(graph, islands, startingIsland) {
    const visitedIslands = new Set(); // Keep track of visited islands
    let totalTime = 0;
    let currentIsland = startingIsland;
  
    // Log starting island
    console.log(`Leader starts their journey at ${currentIsland}.\n`);
  
    // Loop through islands until all have been visited
    while (visitedIslands.size < Object.keys(islands).length) {
      visitedIslands.add(currentIsland); // Mark current island as visited
  
      // Perform Dijkstra's to find shortest path times from the current island
      const travelTimes = dijkstra(graph, currentIsland);
  
      // Sort islands by population in descending order, excluding visited islands
      const sortedIslands = Object.entries(islands)
        .filter(([island]) => !visitedIslands.has(island))
        .sort((a, b) => b[1].population - a[1].population);
  
      // Choose the next island based on population and shortest travel time
      let nextIsland = null;
      let minTravelTime = Infinity;
  
      for (let [island, info] of sortedIslands) {
        if (travelTimes[island] < minTravelTime) {
          minTravelTime = travelTimes[island];
          nextIsland = island;
        }
      }
  
      // Add the travel time for the next trip to the total time
      if (nextIsland) {
        console.log(`Traveling from ${currentIsland} to ${nextIsland}...`);
        console.log(`Travel time: ${minTravelTime} hours.`);
        totalTime += minTravelTime;
        currentIsland = nextIsland; // Update the current island to the next one
        console.log(`Arrived at ${currentIsland}. Total travel time: ${totalTime} hours.\n`);
      }
    }
  
    return totalTime;
  }
  
  // Example usage
  const startingIsland = "Fiji";
  const totalTravelTime = leaderContinuousTrip(graph, islands, startingIsland);
  
  console.log(`Leader's continuous journey is complete! Total travel time: ${totalTravelTime} hours.`);
  