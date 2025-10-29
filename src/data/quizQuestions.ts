export interface QuizQuestion {
  id: number;
  patternId: number;
  category: string;
  question: string;
  code: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    patternId: 1,
    category: "Async/Await",
    question: "What's the main issue with this async function?",
    code: `async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}`,
    options: [
      "It's missing error handling",
      "It uses too much memory",
      "It's too slow",
      "The syntax is incorrect"
    ],
    correctAnswer: 0,
    explanation: "This function lacks error handling. Network requests can fail, and responses can have error status codes that should be checked.",
    difficulty: "beginner"
  },
  {
    id: 2,
    patternId: 2,
    category: "Async/Await",
    question: "Why is this code inefficient?",
    code: `async function load() {
  const users = await fetchUsers();
  const posts = await fetchPosts();
  return { users, posts };
}`,
    options: [
      "It uses sequential await instead of parallel execution",
      "It returns an object",
      "It's missing error handling",
      "The variable names are too short"
    ],
    correctAnswer: 0,
    explanation: "The requests are independent but executed sequentially. Using Promise.all() would run them in parallel, significantly improving performance.",
    difficulty: "intermediate"
  },
  {
    id: 3,
    patternId: 11,
    category: "React Hooks",
    question: "What will happen with this useEffect?",
    code: `useEffect(() => {
  fetchUser(userId).then(setUser);
}, []);`,
    options: [
      "It will only fetch once, even if userId changes",
      "It will fetch on every render",
      "It will cause an infinite loop",
      "It will not compile"
    ],
    correctAnswer: 0,
    explanation: "The empty dependency array means this effect only runs once on mount. It should include userId in the deps to refetch when it changes.",
    difficulty: "intermediate"
  },
  {
    id: 4,
    patternId: 12,
    category: "React Hooks",
    question: "What's wrong with this useEffect?",
    code: `useEffect(() => {
  setData(fetchData());
}, [data]);`,
    options: [
      "It creates an infinite loop",
      "It's missing async/await",
      "The dependency is correct",
      "It needs a cleanup function"
    ],
    correctAnswer: 0,
    explanation: "Setting state that's in the dependency array creates an infinite loop. The effect runs, updates data, which triggers the effect again.",
    difficulty: "beginner"
  },
  {
    id: 5,
    patternId: 13,
    category: "React Hooks",
    question: "What's the issue with this click handler?",
    code: `const onClick = () => {
  setTimeout(() => setCount(count + 1), 1000);
};`,
    options: [
      "Stale closure - uses old count value",
      "setTimeout is not allowed in React",
      "It's missing async/await",
      "The arrow function syntax is wrong"
    ],
    correctAnswer: 0,
    explanation: "The closure captures the current count value. If count changes before the timeout fires, it uses the old value. Use setCount(c => c + 1) instead.",
    difficulty: "intermediate"
  },
  {
    id: 6,
    patternId: 16,
    category: "React Hooks",
    question: "What's missing from this useEffect?",
    code: `useEffect(() => {
  const id = setInterval(tick, 1000);
}, []);`,
    options: [
      "A cleanup function to clear the interval",
      "The interval duration should be in deps",
      "It should use setTimeout instead",
      "Nothing, it's correct"
    ],
    correctAnswer: 0,
    explanation: "Without returning a cleanup function, the interval continues after the component unmounts, causing a memory leak.",
    difficulty: "beginner"
  },
  {
    id: 7,
    patternId: 17,
    category: "React Hooks",
    question: "Why is this code problematic?",
    code: `if (condition) {
  useEffect(() => {...});
}`,
    options: [
      "Hooks must not be called conditionally",
      "useEffect doesn't accept conditions",
      "The condition should be in deps",
      "It's missing a return statement"
    ],
    correctAnswer: 0,
    explanation: "This violates the Rules of Hooks. Hooks must be called in the same order every render. Put the condition inside the effect instead.",
    difficulty: "beginner"
  },
  {
    id: 8,
    patternId: 23,
    category: "React Hooks",
    question: "What's wrong with updating state this way?",
    code: `const updateName = (name) => {
  user.name = name;
  setUser(user);
};`,
    options: [
      "Direct mutation prevents re-render",
      "The parameter name conflicts",
      "It's missing async/await",
      "setUser should be called first"
    ],
    correctAnswer: 0,
    explanation: "Mutating state directly violates React's immutability principle. Create a new object: setUser({...user, name}).",
    difficulty: "beginner"
  },
  {
    id: 9,
    patternId: 5,
    category: "Async/Await",
    question: "What's inefficient about this function?",
    code: `async function upper(str) {
  return str.toUpperCase();
}`,
    options: [
      "Unnecessary async adds promise overhead",
      "toUpperCase() is deprecated",
      "It needs error handling",
      "The parameter name is too short"
    ],
    correctAnswer: 0,
    explanation: "This function doesn't use await or any async operations, so the async keyword is unnecessary and adds overhead.",
    difficulty: "beginner"
  },
  {
    id: 10,
    patternId: 9,
    category: "Async/Await",
    question: "Why doesn't this work as expected?",
    code: `items.forEach(async item => {
  await process(item);
});`,
    options: [
      "forEach doesn't wait for async callbacks",
      "async is not allowed in forEach",
      "The arrow function syntax is wrong",
      "It needs Promise.all"
    ],
    correctAnswer: 0,
    explanation: "forEach ignores the promise returned by async callbacks. Use for-of loop or Promise.all with map.",
    difficulty: "intermediate"
  },
  {
    id: 11,
    patternId: 14,
    category: "React Hooks",
    question: "How can this be optimized?",
    code: `function List({items}) {
  const filtered = items.filter(i => i.active);
  return <div>{filtered.map(...)}</div>;
}`,
    options: [
      "Use useMemo to avoid recalculating on every render",
      "Move filter to parent component",
      "Use useCallback instead",
      "It's already optimal"
    ],
    correctAnswer: 0,
    explanation: "The filter operation runs on every render. useMemo caches the result and only recalculates when items changes.",
    difficulty: "intermediate"
  },
  {
    id: 12,
    patternId: 22,
    category: "React Hooks",
    question: "What's inefficient about this state management?",
    code: `const [items, setItems] = useState([]);
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(items.length);
}, [items]);`,
    options: [
      "Count is derived state - just calculate it directly",
      "The effect is missing error handling",
      "setCount should be in a different effect",
      "items.length is too slow"
    ],
    correctAnswer: 0,
    explanation: "Don't store derived state. Just calculate const count = items.length directly - it's fast and avoids extra renders.",
    difficulty: "intermediate"
  },
  {
    id: 13,
    patternId: 4,
    category: "Async/Await",
    question: "What problem can occur with this code?",
    code: `async function loadUser(userId) {
  const data = await fetch(userId);
  display(data);
}`,
    options: [
      "Race condition with multiple rapid calls",
      "fetch is deprecated",
      "Missing return statement",
      "userId should be in backticks"
    ],
    correctAnswer: 0,
    explanation: "Rapid successive calls can complete out of order, showing stale data. Use AbortController to cancel previous requests.",
    difficulty: "advanced"
  },
  {
    id: 14,
    patternId: 8,
    category: "Async/Await",
    question: "What's missing from this fetch?",
    code: `async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}`,
    options: [
      "No timeout - can hang indefinitely",
      "Should use GET method explicitly",
      "Missing const keyword",
      "url should be validated first"
    ],
    correctAnswer: 0,
    explanation: "Network requests should have timeouts to prevent hanging forever. Use AbortController with a timeout.",
    difficulty: "intermediate"
  },
  {
    id: 15,
    patternId: 19,
    category: "React Hooks",
    question: "What's the final count value?",
    code: `setCount(count + 1);
setCount(count + 1);
setCount(count + 1);`,
    options: [
      "count + 1 (only increments once)",
      "count + 3",
      "count + 2",
      "Causes an error"
    ],
    correctAnswer: 0,
    explanation: "All three calls use the same stale count value. Use functional updates: setCount(c => c + 1) to increment correctly.",
    difficulty: "advanced"
  },
  {
    id: 16,
    patternId: 25,
    category: "React Hooks",
    question: "What's a better approach for this state?",
    code: `const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');`,
    options: [
      "Group related fields into a single state object",
      "Use useReducer for all three",
      "Keep them separate - it's optimal",
      "Use refs instead of state"
    ],
    correctAnswer: 0,
    explanation: "Related state should be grouped in a single object for better organization and easier updates.",
    difficulty: "intermediate"
  },
  {
    id: 17,
    patternId: 18,
    category: "React Hooks",
    question: "What could go wrong here?",
    code: `const ref = useRef();
useEffect(() => {
  ref.current.focus();
});`,
    options: [
      "ref.current might be null",
      "focus() is not a valid method",
      "useEffect needs dependencies",
      "useRef should be useCallback"
    ],
    correctAnswer: 0,
    explanation: "Always check if ref.current exists before using it. Also, this effect needs an empty dependency array.",
    difficulty: "intermediate"
  },
  {
    id: 18,
    patternId: 24,
    category: "React Hooks",
    question: "What's the issue with this callback?",
    code: `const handle = useCallback(() => {
  doSomething(value);
}, []);`,
    options: [
      "Missing value in dependencies - stale closure",
      "useCallback should be useMemo",
      "The arrow function syntax is wrong",
      "It's missing a return statement"
    ],
    correctAnswer: 0,
    explanation: "The callback uses value but it's not in the dependency array, creating a stale closure that always uses the initial value.",
    difficulty: "intermediate"
  },
  {
    id: 19,
    patternId: 6,
    category: "Async/Await",
    question: "How can this be simplified?",
    code: `function fetchData() {
  return new Promise((resolve, reject) => {
    fetch('/api/data')
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}`,
    options: [
      "Return fetch directly - it already returns a promise",
      "Add async/await",
      "Use try-catch instead",
      "It can't be simplified"
    ],
    correctAnswer: 0,
    explanation: "This is the Promise constructor anti-pattern. fetch() already returns a Promise, so just return it directly.",
    difficulty: "intermediate"
  },
  {
    id: 20,
    patternId: 10,
    category: "Async/Await",
    question: "What error will this cause?",
    code: `async function getData() {
  try {
    const data = await fetch();
  } catch (e) {}
  return data;
}`,
    options: [
      "ReferenceError - data is not defined",
      "Syntax error in try-catch",
      "fetch() needs a URL parameter",
      "No error - it's correct"
    ],
    correctAnswer: 0,
    explanation: "data is declared inside try block, so it's not accessible outside. Declare it before try or return inside the try block.",
    difficulty: "beginner"
  }
];
