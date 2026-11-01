const quizData = {
  "artificial-intelligence": [
    {
      id: 1,
      question: "What is Artificial Intelligence?",
      options: [
        "A type of computer hardware",
        "The ability of machines to perform intelligent tasks",
        "A programming language",
        "A computer operating system",
      ],
      correctAnswer: 1,
      explanation:
        "Artificial Intelligence enables machines to perform tasks that normally require human intelligence.",
    },
    {
      id: 2,
      question: "Which of the following is an application of AI?",
      options: [
        "Face recognition",
        "A simple light switch",
        "A paper notebook",
        "A normal pencil",
      ],
      correctAnswer: 0,
      explanation:
        "Face recognition uses AI techniques to identify or verify people from images.",
    },
    {
      id: 3,
      question: "What is NLP in Artificial Intelligence?",
      options: [
        "Natural Language Processing",
        "Network Learning Program",
        "Numerical Logic Process",
        "New Language Protocol",
      ],
      correctAnswer: 0,
      explanation:
        "Natural Language Processing helps computers understand and process human language.",
    },
    {
      id: 4,
      question: "Which AI field focuses on understanding images?",
      options: [
        "Computer Vision",
        "Web Development",
        "Database Management",
        "Cloud Storage",
      ],
      correctAnswer: 0,
      explanation:
        "Computer Vision enables computers to analyze and understand visual information.",
    },
    {
      id: 5,
      question: "Which of these is a conversational AI assistant?",
      options: [
        "Calculator",
        "ChatGPT",
        "Text Editor",
        "File Manager",
      ],
      correctAnswer: 1,
      explanation:
        "ChatGPT is an AI assistant that can understand prompts and generate conversational responses.",
    },
  ],

  "machine-learning": [
    {
      id: 1,
      question: "What is Machine Learning?",
      options: [
        "A computer manufacturing process",
        "A method that enables systems to learn patterns from data",
        "A type of keyboard",
        "A website designing tool",
      ],
      correctAnswer: 1,
      explanation:
        "Machine Learning uses data and algorithms to identify patterns and make predictions or decisions.",
    },
    {
      id: 2,
      question: "Which is a type of Machine Learning?",
      options: [
        "Supervised Learning",
        "Manual Typing",
        "Screen Printing",
        "File Formatting",
      ],
      correctAnswer: 0,
      explanation:
        "Supervised Learning trains a model using examples with known labels or target values.",
    },
    {
      id: 3,
      question: "What is the purpose of training data?",
      options: [
        "To decorate a website",
        "To teach a machine learning model patterns",
        "To increase screen brightness",
        "To store computer passwords",
      ],
      correctAnswer: 1,
      explanation:
        "Training data provides examples from which a machine learning model learns patterns.",
    },
    {
      id: 4,
      question: "Which task is an example of classification?",
      options: [
        "Predicting tomorrow's exact temperature",
        "Classifying an email as spam or not spam",
        "Adding two numbers",
        "Sorting files by name",
      ],
      correctAnswer: 1,
      explanation:
        "Classification predicts a category, such as spam or not spam.",
    },
    {
      id: 5,
      question: "What is overfitting?",
      options: [
        "When a model memorizes training data and performs poorly on new data",
        "When a computer runs out of electricity",
        "When data is deleted",
        "When a model has no training data",
      ],
      correctAnswer: 0,
      explanation:
        "An overfitted model learns training-specific details and may fail to generalize to unseen data.",
    },
  ],

  python: [
    {
      id: 1,
      question: "Which symbol is used for comments in Python?",
      options: ["//", "#", "<!--", "**"],
      correctAnswer: 1,
      explanation:
        "In Python, the hash symbol (#) is used to begin a single-line comment.",
    },
    {
      id: 2,
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "define", "def", "fun"],
      correctAnswer: 2,
      explanation:
        "Python uses the def keyword to define a function.",
    },
    {
      id: 3,
      question: "What is the output of print(2 ** 3)?",
      options: ["5", "6", "8", "9"],
      correctAnswer: 2,
      explanation:
        "The ** operator performs exponentiation. Therefore, 2 ** 3 equals 2 × 2 × 2 = 8.",
    },
    {
      id: 4,
      question: "Which data type stores True or False?",
      options: ["String", "Boolean", "List", "Dictionary"],
      correctAnswer: 1,
      explanation:
        "The bool data type represents Boolean values: True and False.",
    },
    {
      id: 5,
      question: "Which brackets are used to create a Python list?",
      options: ["()", "{}", "[]", "<>"],
      correctAnswer: 2,
      explanation:
        "Square brackets [] are used to create a list in Python.",
    },
  ],

  "data-science": [
    {
      id: 1,
      question: "What is Data Science?",
      options: [
        "The study of computer hardware only",
        "Extracting useful insights from data using analytical methods",
        "A type of operating system",
        "A method of designing keyboards",
      ],
      correctAnswer: 1,
      explanation:
        "Data Science combines data analysis, statistics and computing to extract useful insights.",
    },
    {
      id: 2,
      question: "Which Python library is commonly used for data manipulation?",
      options: ["Pandas", "Turtle only", "Pygame only", "Tkinter only"],
      correctAnswer: 0,
      explanation:
        "Pandas provides useful data structures and tools for cleaning, transforming and analyzing data.",
    },
    {
      id: 3,
      question: "What does data visualization help us do?",
      options: [
        "Delete all data",
        "Present data using charts and graphs",
        "Turn off the computer",
        "Replace every database",
      ],
      correctAnswer: 1,
      explanation:
        "Data visualization presents information graphically, making patterns and trends easier to understand.",
    },
    {
      id: 4,
      question: "What is the mean of 2, 4 and 6?",
      options: ["2", "3", "4", "6"],
      correctAnswer: 2,
      explanation:
        "Mean = (2 + 4 + 6) / 3 = 12 / 3 = 4.",
    },
    {
      id: 5,
      question: "Which chart is commonly used to compare categories?",
      options: [
        "Bar chart",
        "Password field",
        "Audio player",
        "Text editor",
      ],
      correctAnswer: 0,
      explanation:
        "A bar chart helps compare values across different categories.",
    },
  ],
};

export default quizData;