// Adjaceny List, disctionaries stored in an array

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

// nodes (islands)

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
  "Soloman Islands": {
    population: 825359,
    resources: ["coffee", "sandalwood", "coconut oil"],
    experiences: [{ experience: "scuba diving", time: 3 }],
  },
  "New Caledonia": {
    population: 293000,
    resources: ["nickel", "chromite", "cobalt"],
    experiences: [
      { experience: "marine park", time: 2 },
      { experience: "food testing", time: 4 },
      { experience: "coral reef exploration", time: 4 },
      { experience: "sailing", time: 2 },
    ],
  },
  "Tonga": {
    population: 104597,
    resources: ["vanilla", "root crops", "limestone"],
    experiences: [
      { experience: "whale wathcing", time: 2 },
      { experience: "traditional dances", time: 4 },
    ],
  },
};

// Prompt 1 (Phuong Pham)



// Prompt 4 (Victor Hoang)


