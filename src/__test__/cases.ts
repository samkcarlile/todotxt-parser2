// These are all the cases listed in the README from https://github.com/todotxt/todo.txt
// It definitley is not a comprehensive test suite, but it covers many of the cases
// Please feel free to contribute to the tests!

const parseDate = (str: string) => {
  let arr = str.split('-').map(s => parseInt(s));
  return new Date(arr[0], arr[1] - 1, arr[2]);
}

const examples : [
  string,
  {
    complete: boolean;
    priority: string;
    date_completed: Date;
    date_created: Date;
    body : string;
    meta : { [key: string ]: string}
    projects: string[];
    contexts: string[];
  }
][] = [
  [
    "(A) Thank Mom for the meatballs @phone",
    {
      complete: false,
      priority: 'A',
      date_completed: undefined,
      date_created: undefined,
      body: "Thank Mom for the meatballs @phone",
      meta: undefined,
      projects: [],
      contexts: ["@phone"]
    }
  ],
  [
    "(B) Schedule Goodwill pickup +GarageSale @phone",
    {
      complete: false,
      priority: 'B',
      date_completed: undefined,
      date_created: undefined,
      body: "Schedule Goodwill pickup +GarageSale @phone",
      meta: undefined,
      projects: ["+GarageSale"],
      contexts: ["@phone"]
    }
  ],
  [
    "Post signs around the neighborhood +GarageSale",
    {
      complete: false,
      priority: undefined,
      date_completed: undefined,
      date_created: undefined,
      body: "Post signs around the neighborhood +GarageSale",
      meta: undefined,
      projects: ["+GarageSale"],
      contexts: []
    }
  ],
  [
    "@GroceryStore Eskimo pies",
    {
      complete: false,
      priority: undefined,
      date_completed: undefined,
      date_created: undefined,
      body: "@GroceryStore Eskimo pies",
      meta: undefined,
      projects: [],
      contexts: ["@GroceryStore"]
    }
  ],
  [
    "(A) Call Mom",
    {
      complete: false,
      priority: 'A',
      date_completed: undefined,
      date_created: undefined,
      body: "Call Mom",
      meta: undefined,
      projects: [],
      contexts: []
    }
  ],
  [
    "Really gotta call Mom (A) @phone @someday",
    {
      complete: false,
      priority: undefined,
      date_completed: undefined,
      date_created: undefined,
      body: "Really gotta call Mom (A) @phone @someday",
      meta: undefined,
      projects: ["@phone", "@someday"],
      contexts: []
    }
  ],
  [
    "(b) Get back to the boss",
    {
      complete: false,
      priority: undefined,
      date_completed: undefined,
      date_created: undefined,
      body: "(b) Get back to the boss",
      meta: undefined,
      projects: [],
      contexts: []
    }
  ],
  [
    "(B)->Submit TPS report",
    {
      complete: false,
      priority: undefined,
      date_completed: undefined,
      date_created: undefined,
      body: "(B)->Submit TPS report",
      meta: undefined,
      projects: [],
      contexts: []
    }
  ],
  [
    "2011-03-02 Document +TodoTxt task format",
    {
      complete: false,
      priority: undefined,
      date_completed: undefined,
      date_created: parseDate("2011-03-02"),
      body: "Document +TodoTxt task format",
      meta: undefined,
      projects: ["+TodoTxt"],
      contexts: []
    }
  ],
  [
    "(A) 2011-03-02 Call Mom",
    {
      complete: false,
      priority: 'A',
      date_completed: undefined,
      date_created: parseDate("2011-03-02"),
      body: "Call Mom",
      meta: undefined,
      projects: [],
      contexts: []
    }
  ],
  [
    "(A) Call Mom +Family +PeaceLoveAndHappiness @iphone @phone",
    {
      complete: false,
      priority: 'A',
      date_completed: undefined,
      date_created: undefined,
      body: "Call Mom +Family +PeaceLoveAndHappiness @iphone @phone",
      meta: undefined,
      projects: ["+Family", "+PeaceLoveAndHappiness"],
      contexts: ["@iphone", "@phone"]
    }
  ],
  [
    "Email SoAndSo at soandso@example.com",
    {
      complete: false,
      priority: undefined,
      date_completed: undefined,
      date_created: undefined,
      body: "Email SoAndSo at soandso@example.com",
      meta: undefined,
      projects: [],
      contexts: []
    }
  ],
  [
    "Learn how to add 2+2",
    {
      complete: false,
      priority: undefined,
      date_completed: undefined,
      date_created: undefined,
      body: "Learn how to add 2+2",
      meta: undefined,
      projects: [],
      contexts: []
    }
  ],
  // Complete tasks
  [
    "x 2011-03-03 Call Mom",
    {
      complete: true,
      priority: undefined,
      date_completed: parseDate("2011-03-03"),
      date_created: undefined,
      body: "Call Mom",
      meta: undefined,
      projects: [],
      contexts: []
    }
  ],
  [
    "xylophone lesson",
    {
      complete: false,
      priority: undefined,
      date_completed: undefined,
      date_created: undefined,
      body: "xylophone lesson",
      meta: undefined,
      projects: [],
      contexts: []
    }
  ],
  [
    "X 2012-01-01 Make resolutions",
    {
      complete: false,
      priority: undefined,
      date_completed: undefined,
      date_created: undefined,
      body: "X 2012-01-01 Make resolutions",
      meta: undefined,
      projects: [],
      contexts: []
    }
  ],
  [
    "(A) x Find ticket prices",
    {
      complete: false,
      priority: 'A',
      date_completed: undefined,
      date_created: undefined,
      body: "x Find ticket prices",
      meta: undefined,
      projects: [],
      contexts: []
    }
  ],
  [
    "x 2011-03-02 2011-03-01 Review Tim's pull request +TodoTxtTouch @github",
    {
      complete: true,
      priority: undefined,
      date_completed: parseDate("2011-03-02"),
      date_created: parseDate("2011-03-01"),
      body: "Review Tim's pull request +TodoTxtTouch @github",
      meta: undefined,
      projects: ["+TodoTxtTouch"],
      contexts: ["@github"]
    }
  ],
  // With Meta
  [
    "(A) do the thing @regularStuff +things due:2019-12-01",
    {
      complete: false,
      priority: 'A',
      date_completed: undefined,
      date_created: undefined,
      body: "do the thing @regularStuff +things",
      meta: { due: "2019-12-01" },
      projects: ["+things"],
      contexts: ["@regularStuff"]
    }
  ]
];

export default examples;