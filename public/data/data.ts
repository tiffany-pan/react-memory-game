export interface Category {
    name: string;
    value: string;
}

export interface CardCount {
    value: string;
}

export interface Data {
    category: Category[];
    number: CardCount[];
}

const data: Data= {
  category: [
      {
          name: "Animals and nature",
          value: "animals-and-nature"
      },
      {
          name: "Food and drink",
          value: "food-and-drink"
      },
      {
          name: "Travel and places",
          value: "travel-and-places"
      },
      {
          name: "Objects",
          value: "objects"
      },
      {
          name: "Symbols",
          value: "symbols"
      }
  ],
  number: [
      {
          value: "10"
      },
      {
          value: "20"
      },
      {
          value: "30"
      },
      {
          value: "40"
      },
      {
          value: "50"
      },
  ]
}

export { data }