
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

export const quizQuestions_few: QuizQuestion[] = [
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
      "No error handling and no response.ok check",
      "Missing return statement",
      "Incorrect use of await",
      "fetch is not defined"
    ],
    correctAnswer: 0,
    explanation: "Without error handling and checking response.ok, the function will fail silently or parse error responses as JSON, causing issues.",
    difficulty: "beginner"
  },
  {
    id: 2,
    patternId: 2,
    category: "Async/Await",
    question: "How can you improve the performance of this code?",
    code: `async function load() {
  const users = await fetchUsers();
  const posts = await fetchPosts();
  return { users, posts };
}`,
    options: [
      "Use Promise.all to run requests in parallel",
      "Add more await statements",
      "Use setTimeout",
      "Remove async/await"
    ],
    correctAnswer: 0,
    explanation: "Promise.all runs independent operations in parallel, significantly reducing total execution time from sequential to concurrent.",
    difficulty: "intermediate"
  },
  {
    id: 3,
    patternId: 3,
    category: "Async/Await",
    question: "What will this function return?",
    code: `async function save(data) {
  await db.insert(data);
}
const result = await save(myData);`,
    options: [
      "undefined",
      "true",
      "The inserted data",
      "A promise"
    ],
    correctAnswer: 0,
    explanation: "Functions without explicit return statements return undefined. Always return meaningful values from async functions so callers can verify success.",
    difficulty: "beginner"
  },
  {
    id: 4,
    patternId: 4,
    category: "Async/Await",
    question: "What problem exists with rapid userId changes?",
    code: `async function loadUser(userId) {
  const data = await fetch(userId);
  display(data);
}`,
    options: [
      "Race condition - older requests may complete after newer ones",
      "Memory leak",
      "Syntax error",
      "Infinite loop"
    ],
    correctAnswer: 0,
    explanation: "When userId changes quickly, an older fetch might complete after a newer one, displaying stale data. Use AbortController to cancel previous requests.",
    difficulty: "advanced"
  },
  {
    id: 5,
    patternId: 5,
    category: "Async/Await",
    question: "Why is this function marked as async?",
    code: `async function upper(str) {
  return str.toUpperCase();
}`,
    options: [
      "Unnecessary - there's no await inside",
      "Required for all functions",
      "Needed for string operations",
      "Makes it faster"
    ],
    correctAnswer: 0,
    explanation: "The async keyword is only needed when you use await inside. This function doesn't need async and the extra promise wrapper hurts performance.",
    difficulty: "beginner"
  },
  {
    id: 6,
    patternId: 11,
    category: "React Hooks",
    question: "What happens when userId prop changes?",
    code: `useEffect(() => {
  fetchUser(userId).then(setUser);
}, []);`,
    options: [
      "Effect won't run - stale data will be shown",
      "Effect runs every render",
      "Infinite loop occurs",
      "Component crashes"
    ],
    correctAnswer: 0,
    explanation: "Empty dependency array means the effect only runs on mount. When userId changes, it won't fetch new data. Always include all dependencies.",
    difficulty: "intermediate"
  },
  {
    id: 7,
    patternId: 12,
    category: "React Hooks",
    question: "Why does this cause an infinite loop?",
    code: `useEffect(() => {
  setData(fetchData());
}, [data]);`,
    options: [
      "setData changes data, triggering the effect again",
      "fetchData is called recursively",
      "Missing async/await",
      "useEffect is used incorrectly"
    ],
    correctAnswer: 0,
    explanation: "Including the state you're setting in dependencies creates a loop: effect runs â†’ setData â†’ data changes â†’ effect runs again.",
    difficulty: "beginner"
  },
  {
    id: 8,
    patternId: 13,
    category: "React Hooks",
    question: "What's wrong with rapid clicks on this button?",
    code: `const onClick = () => {
  setTimeout(() => setCount(count + 1), 1000);
};`,
    options: [
      "Uses stale count value from closure",
      "setTimeout is blocking",
      "Memory leak",
      "Syntax error"
    ],
    correctAnswer: 0,
    explanation: "Each setTimeout captures the current count. Multiple clicks all use the same stale value. Use functional updates: setCount(c => c + 1).",
    difficulty: "intermediate"
  },
  {
    id: 9,
    patternId: 14,
    category: "React Hooks",
    question: "When does this filter function run?",
    code: `function List({items}) {
  const filtered = items.filter(i => i.active);
  return <div>{filtered.map(...)}</div>;
}`,
    options: [
      "On every render, even if items don't change",
      "Only when items change",
      "Once on mount",
      "Never"
    ],
    correctAnswer: 0,
    explanation: "Without useMemo, the filter runs on every render. Wrap it in useMemo with [items] dependency to only recompute when items actually change.",
    difficulty: "intermediate"
  },
  {
    id: 10,
    patternId: 16,
    category: "React Hooks",
    question: "What memory issue exists here?",
    code: `useEffect(() => {
  const id = setInterval(tick, 1000);
}, []);`,
    options: [
      "Memory leak - interval continues after unmount",
      "Too many intervals created",
      "tick is not defined",
      "Missing dependency array"
    ],
    correctAnswer: 0,
    explanation: "Without cleanup, the interval continues running even after component unmounts. Always return () => clearInterval(id) to prevent memory leaks.",
    difficulty: "beginner"
  },
  {
    id: 11,
    patternId: 31,
    category: "State Management",
    question: "Why won't React detect this state change?",
    code: `const [arr, setArr] = useState([]);
arr.push(item);
setArr(arr);`,
    options: [
      "Mutating array directly - same reference",
      "push is not allowed",
      "Missing await",
      "setArr is called incorrectly"
    ],
    correctAnswer: 0,
    explanation: "React compares references. Mutating the array keeps the same reference, so React doesn't detect changes. Always create new arrays: setArr([...arr, item]).",
    difficulty: "beginner"
  },
  {
    id: 12,
    patternId: 41,
    category: "React Lists",
    question: "What's missing from this list?",
    code: `{items.map(item => <div>{item.name}</div>)}`,
    options: [
      "key prop for each item",
      "return statement",
      "index parameter",
      "Nothing - it's correct"
    ],
    correctAnswer: 0,
    explanation: "React needs keys to efficiently track list items. Without keys, React may unnecessarily re-render items or lose component state during updates.",
    difficulty: "beginner"
  },
  {
    id: 13,
    patternId: 42,
    category: "React Lists",
    question: "Why is using index as key problematic?",
    code: `{items.map((item, i) => <div key={i}>{item.name}</div>)}`,
    options: [
      "Index changes when items reorder, breaking reconciliation",
      "Index is always undefined",
      "React doesn't allow numbers as keys",
      "It's actually the correct approach"
    ],
    correctAnswer: 0,
    explanation: "When items reorder, indices change but React thinks items are the same, causing bugs. Use stable unique IDs like item.id instead.",
    difficulty: "intermediate"
  },
  {
    id: 14,
    patternId: 15,
    category: "Performance",
    question: "What performance problem exists?",
    code: `{items.map(i => 
  <button onClick={() => handle(i.id)} />
)}`,
    options: [
      "New function created for each item on every render",
      "handle is undefined",
      "Missing key prop",
      "map should be forEach"
    ],
    correctAnswer: 0,
    explanation: "Inline functions create new instances on every render, causing child components to re-render. Use useCallback and pass stable references.",
    difficulty: "beginner"
  },
  {
    id: 15,
    patternId: 23,
    category: "State Management",
    question: "Why doesn't this trigger a re-render?",
    code: `const [user, setUser] = useState({});
user.name = 'Bob';
setUser(user);`,
    options: [
      "Mutating object directly - same reference",
      "name property doesn't exist",
      "setUser is async",
      "Missing await"
    ],
    correctAnswer: 0,
    explanation: "Direct mutation keeps the same object reference. React won't detect the change. Create a new object: setUser({...user, name: 'Bob'}).",
    difficulty: "beginner"
  },
  {
    id: 16,
    patternId: 34,
    category: "Performance",
    question: "What performance issue exists?",
    code: `const [state, setState] = useState(
  expensiveComputation()
);`,
    options: [
      "expensiveComputation runs on every render",
      "useState is used incorrectly",
      "Missing return statement",
      "state is undefined"
    ],
    correctAnswer: 0,
    explanation: "The function is called on every render even though state only initializes once. Use lazy initialization: useState(() => expensiveComputation()).",
    difficulty: "beginner"
  },
  {
    id: 17,
    patternId: 17,
    category: "React Hooks",
    question: "What's wrong with this code?",
    code: `if (condition) {
  useEffect(() => {...});
}`,
    options: [
      "Breaks Rules of Hooks - hooks must be called unconditionally",
      "useEffect can't be in if statements",
      "Missing dependency array",
      "condition is not defined"
    ],
    correctAnswer: 0,
    explanation: "Hooks must be called in the same order every render. Conditional hooks break this. Move the condition inside: useEffect(() => { if (condition) {...} }).",
    difficulty: "beginner"
  },
  {
    id: 18,
    patternId: 37,
    category: "State Management",
    question: "What's the safer way to toggle?",
    code: `const toggle = () => setOpen(!open);`,
    options: [
      "setOpen(o => !o)",
      "setOpen(open = !open)",
      "setOpen(!open) is correct",
      "open = !open; setOpen(open)"
    ],
    correctAnswer: 0,
    explanation: "Functional updates ensure you're working with the latest state value, preventing issues with stale closures in event handlers or timeouts.",
    difficulty: "beginner"
  },
  {
    id: 19,
    patternId: 7,
    category: "Async/Await",
    question: "What happens here?",
    code: `function submit() {
  saveData();
  showSuccess();
}`,
    options: [
      "Success shown before save completes - floating promise",
      "saveData blocks the UI",
      "Syntax error",
      "Everything works correctly"
    ],
    correctAnswer: 0,
    explanation: "saveData returns a promise that's ignored. Success is shown immediately. Await the promise: await saveData(); then showSuccess().",
    difficulty: "intermediate"
  },
  {
    id: 20,
    patternId: 9,
    category: "Async/Await",
    question: "Why doesn't forEach work with async?",
    code: `items.forEach(async item => {
  await process(item);
});`,
    options: [
      "forEach doesn't wait for promises - use for-of or Promise.all",
      "async can't be used with forEach",
      "Missing return statement",
      "await is used incorrectly"
    ],
    correctAnswer: 0,
    explanation: "forEach doesn't wait for async functions. Use 'for (const item of items) await process(item)' or Promise.all for parallel execution.",
    difficulty: "intermediate"
  },
  {
    id: 21,
    patternId: 22,
    category: "State Management",
    question: "What's the issue with this derived state?",
    code: `const [items, setItems] = useState([]);
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(items.length);
}, [items]);`,
    options: [
      "Unnecessary state - just calculate: const count = items.length",
      "Missing return in useEffect",
      "count should be in dependencies",
      "Everything is correct"
    ],
    correctAnswer: 0,
    explanation: "Don't store values you can calculate from existing state. It causes extra renders and synchronization bugs. Just compute: const count = items.length.",
    difficulty: "intermediate"
  },
  {
    id: 22,
    patternId: 25,
    category: "State Management",
    question: "How can you improve this form state?",
    code: `const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');`,
    options: [
      "Group into single object: useState({name: '', email: '', phone: ''})",
      "Use three separate useStates (it's correct)",
      "Use useRef instead",
      "Don't use state at all"
    ],
    correctAnswer: 0,
    explanation: "Related state should be grouped together. Single object is easier to manage and update: setForm(f => ({...f, [field]: value})).",
    difficulty: "intermediate"
  },
  {
    id: 23,
    patternId: 43,
    category: "Performance",
    question: "How can you prevent unnecessary Child re-renders?",
    code: `function Parent() {
  const [count, setCount] = useState(0);
  return <><button onClick={() => setCount(c => c + 1)} /><Child /></>;
}`,
    options: [
      "Wrap Child with React.memo",
      "Use useEffect",
      "Add key prop",
      "Can't be prevented"
    ],
    correctAnswer: 0,
    explanation: "React.memo prevents re-renders when props don't change. Since Child has no props, memo ensures it only renders once.",
    difficulty: "intermediate"
  },
  {
    id: 24,
    patternId: 45,
    category: "Performance",
    question: "When should you use useMemo here?",
    code: `function Comp({data}) {
  const processed = expensiveOperation(data);
  return <div>{processed}</div>;
}`,
    options: [
      "When expensiveOperation is slow and data doesn't change often",
      "Always - useMemo everything",
      "Never - useMemo is bad",
      "Only in production"
    ],
    correctAnswer: 0,
    explanation: "Use useMemo for expensive computations that depend on specific values: useMemo(() => expensiveOperation(data), [data]).",
    difficulty: "intermediate"
  },
  {
    id: 25,
    patternId: 24,
    category: "React Hooks",
    question: "What's missing from this useCallback?",
    code: `const handle = useCallback(() => {
  doSomething(value);
}, []);`,
    options: [
      "value should be in dependency array",
      "Nothing - it's correct",
      "useCallback shouldn't have dependencies",
      "doSomething should be in dependencies"
    ],
    correctAnswer: 0,
    explanation: "useCallback creates a closure. If you use external variables, include them in dependencies or you'll have stale values.",
    difficulty: "intermediate"
  },
  {
    id: 26,
    patternId: 32,
    category: "State Management",
    question: "How do you correctly update nested state?",
    code: `const [state, setState] = useState({user: {name: ''}});
state.user.name = 'Bob';
setState(state);`,
    options: [
      "setState(s => ({...s, user: {...s.user, name: 'Bob'}}))",
      "state.user.name = 'Bob' is correct",
      "setState({user: {name: 'Bob'}})",
      "Can't update nested state"
    ],
    correctAnswer: 0,
    explanation: "Create new objects at each level of nesting to preserve immutability and ensure React detects the change.",
    difficulty: "intermediate"
  },
  {
    id: 27,
    patternId: 33,
    category: "State Management",
    question: "How do you update one item in an array?",
    code: `const [items, setItems] = useState([]);
items[0].name = 'New';
setItems(items);`,
    options: [
      "setItems(items.map((item, i) => i === 0 ? {...item, name: 'New'} : item))",
      "items[0].name = 'New' is correct",
      "setItems([items[0].name = 'New'])",
      "Can't update array items"
    ],
    correctAnswer: 0,
    explanation: "Map creates a new array with updated items while preserving immutability. Create new objects for changed items.",
    difficulty: "intermediate"
  },
  {
    id: 28,
    patternId: 35,
    category: "State Management",
    question: "What's wrong with syncing props to state?",
    code: `function Comp({initialValue}) {
  const [value, setValue] = useState(initialValue);
  return <input value={value} />;
}`,
    options: [
      "Won't update when initialValue prop changes",
      "useState can't use props",
      "initialValue is not defined",
      "Everything is correct"
    ],
    correctAnswer: 0,
    explanation: "State only initializes once. Prop changes won't update it. Make it controlled (pass value as prop) or use key to force remount.",
    difficulty: "intermediate"
  },
  {
    id: 29,
    patternId: 47,
    category: "React Context",
    question: "Why do all context consumers re-render?",
    code: `<UserContext.Provider value={{user, updateUser}}>
  <App />
</UserContext.Provider>`,
    options: [
      "New object created every render - should memoize",
      "Context always causes re-renders",
      "updateUser changes",
      "user is undefined"
    ],
    correctAnswer: 0,
    explanation: "New object reference causes all consumers to re-render. Memoize: const value = useMemo(() => ({user, updateUser}), [user]).",
    difficulty: "advanced"
  },
  {
    id: 30,
    patternId: 49,
    category: "Performance",
    question: "Why should you debounce this input?",
    code: `<input onChange={e => search(e.target.value)} />`,
    options: [
      "Triggers search on every keystroke - too many requests",
      "onChange is too slow",
      "search is undefined",
      "No need to debounce"
    ],
    correctAnswer: 0,
    explanation: "Searching on every keystroke creates too many requests. Debounce delays the search until user stops typing for a short period.",
    difficulty: "intermediate"
  },
  {
    id: 31,
    patternId: 2,
    category: "Async/Await",
    question: "If fetchUsers takes 2s and fetchPosts takes 3s, how long does this take?",
    code: `async function load() {
  const users = await fetchUsers();
  const posts = await fetchPosts();
  return { users, posts };
}`,
    options: [
      "5 seconds (sequential)",
      "3 seconds (parallel)",
      "2 seconds",
      "1 second"
    ],
    correctAnswer: 0,
    explanation: "Sequential awaits add up: 2s + 3s = 5s total. Promise.all runs them in parallel for 3s total (the longest operation).",
    difficulty: "intermediate"
  },
  {
    id: 32,
    patternId: 8,
    category: "Async/Await",
    question: "How do you add timeout protection?",
    code: `async function fetch(url) {
  const res = await fetch(url);
  return res.json();
}`,
    options: [
      "Use AbortController with setTimeout",
      "Add timeout parameter to fetch",
      "Use Promise.race",
      "Wrap in try-finally"
    ],
    correctAnswer: 0,
    explanation: "AbortController with setTimeout is the standard way: controller.abort() after timeout, pass signal to fetch options.",
    difficulty: "intermediate"
  },
  {
    id: 33,
    patternId: 10,
    category: "Async/Await",
    question: "What scope issue exists here?",
    code: `async function getData() {
  try {
    const data = await fetch();
  } catch (e) {}
  return data;
}`,
    options: [
      "data is not in scope outside try block",
      "fetch needs await",
      "Missing throw",
      "Everything is correct"
    ],
    correctAnswer: 0,
    explanation: "Variables declared in try block aren't accessible outside. Declare before try or return inside try block.",
    difficulty: "beginner"
  },
  {
    id: 34,
    patternId: 6,
    category: "Async/Await",
    question: "What's wrong with this promise wrapper?",
    code: `function fetchData() {
  return new Promise((resolve, reject) => {
    fetch('/api').then(resolve).catch(reject);
  });
}`,
    options: [
      "Unnecessary wrapper - fetch already returns promise",
      "Missing await",
      "Promise constructor is wrong",
      "resolve/reject are swapped"
    ],
    correctAnswer: 0,
    explanation: "Don't wrap existing promises. fetch already returns a promise, so just return it directly: return fetch('/api').",
    difficulty: "intermediate"
  },
  {
    id: 35,
    patternId: 18,
    category: "React Hooks",
    question: "What could go wrong with this ref?",
    code: `const ref = useRef();
useEffect(() => {
  ref.current.focus();
});`,
    options: [
      "ref.current might be null",
      "useRef is used incorrectly",
      "focus() doesn't exist",
      "Missing return"
    ],
    correctAnswer: 0,
    explanation: "Refs can be null during initial render. Always check: if (ref.current) ref.current.focus(). Also add empty dependency array.",
    difficulty: "intermediate"
  },
  {
    id: 36,
    patternId: 19,
    category: "State Management",
    question: "How many times will count increment?",
    code: `setCount(count + 1);
setCount(count + 1);
setCount(count + 1);`,
    options: [
      "Once - all use same stale value",
      "Three times",
      "Zero times",
      "Depends on timing"
    ],
    correctAnswer: 0,
    explanation: "All three use the same count value from closure. Use functional updates to increment three times: setCount(c => c + 1).",
    difficulty: "intermediate"
  },
  {
    id: 37,
    patternId: 26,
    category: "React Hooks",
    question: "When should you use useReducer instead of useState?",
    code: `const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);`,
    options: [
      "When state logic is complex with multiple sub-values",
      "Always - useReducer is always better",
      "Never - useState is sufficient",
      "Only for forms"
    ],
    correctAnswer: 0,
    explanation: "useReducer is better for complex state with related values that update together, making state transitions more predictable.",
    difficulty: "advanced"
  },
  {
    id: 38,
    patternId: 28,
    category: "React Context",
    question: "Why do all consumers re-render here?",
    code: `<Context.Provider value={{user, setUser}}>`,
    options: [
      "New object every render - same problem",
      "Context always causes re-renders",
      "user changes too often",
      "setUser shouldn't be in value"
    ],
    correctAnswer: 0,
    explanation: "Creating a new object literal on each render causes all context consumers to re-render. Always memoize context values.",
    difficulty: "advanced"
  },
  {
    id: 39,
    patternId: 30,
    category: "React Hooks",
    question: "What's wrong with this event listener?",
    code: `useEffect(() => {
  window.addEventListener('resize', handleResize);
}, [handleResize]);`,
    options: [
      "handleResize changes every render, effect runs constantly",
      "Missing removeEventListener",
      "window is undefined",
      "resize event doesn't exist"
    ],
    correctAnswer: 0,
    explanation: "If handleResize isn't memoized, it's a new function each render, causing the effect to run constantly. Use useCallback on handleResize.",
    difficulty: "intermediate"
  },
  {
    id: 40,
    patternId: 36,
    category: "State Management",
    question: "What's wrong with storing computed values?",
    code: `const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
useEffect(() => {
  setTotal(items.reduce((sum, i) => sum + i.price, 0));
}, [items]);`,
    options: [
      "Unnecessary state - just compute from items",
      "reduce is used incorrectly",
      "Missing return",
      "Everything is correct"
    ],
    correctAnswer: 0,
    explanation: "Don't store values you can compute. Use useMemo instead: const total = useMemo(() => items.reduce(...), [items]).",
    difficulty: "intermediate"
  },
  {
    id: 41,
    patternId: 39,
    category: "React Hooks",
    question: "When is useReducer better than multiple useState?",
    code: `const [items, setItems] = useState([]);
const add = () => setItems([...items, item]);
const remove = (id) => setItems(items.filter(i => i.id !== id));`,
    options: [
      "When you have complex state logic with multiple operations",
      "Never - useState is always better",
      "Only for performance",
      "Only with TypeScript"
    ],
    correctAnswer: 0,
    explanation: "useReducer centralizes state logic, making it easier to test and maintain. Especially good for CRUD operations on collections.",
    difficulty: "advanced"
  },
  {
    id: 42,
    patternId: 40,
    category: "React Forms",
    question: "How can you simplify this form handling?",
    code: `const [name, setName] = useState('');
const [email, setEmail] = useState('');
return <>
  <input value={name} onChange={e => setName(e.target.value)} />
  <input value={email} onChange={e => setEmail(e.target.value)} />
</>;`,
    options: [
      "Use single form object with name attribute",
      "Can't simplify - this is optimal",
      "Use refs instead",
      "Remove useState"
    ],
    correctAnswer: 0,
    explanation: "Group form fields: const [form, setForm] = useState({name: '', email: ''}). Use single handler with e.target.name.",
    difficulty: "intermediate"
  },
  {
    id: 43,
    patternId: 44,
    category: "Performance",
    question: "What technique improves large list performance?",
    code: `{items.map(item => <Item key={item.id} data={item} />)}
// 10,000 items`,
    options: [
      "Virtual scrolling - only render visible items",
      "Remove keys",
      "Use index as key",
      "Add more useState"
    ],
    correctAnswer: 0,
    explanation: "Virtual scrolling only renders items in the viewport, dramatically improving performance for large lists by reducing DOM nodes.",
    difficulty: "advanced"
  },
  {
    id: 44,
    patternId: 46,
    category: "React Architecture",
    question: "Why should you split large components?",
    code: `function MassiveComponent() {
  // 1000 lines
  return <div>...</div>;
}`,
    options: [
      "Smaller components are easier to optimize and re-render less",
      "React doesn't allow large components",
      "Mandatory after 100 lines",
      "No reason - big is fine"
    ],
    correctAnswer: 0,
    explanation: "Small components can be individually memoized and optimized. Large components re-render entirely even if only part changes.",
    difficulty: "intermediate"
  },
  {
    id: 45,
    patternId: 48,
    category: "Performance",
    question: "What's inefficient about inline styles?",
    code: `<div style={{color: 'red', padding: 10}}>Text</div>`,
    options: [
      "New style object created every render",
      "Style objects aren't allowed",
      "React doesn't support inline styles",
      "Nothing - it's optimal"
    ],
    correctAnswer: 0,
    explanation: "New object every render causes style recalculation. Extract to const outside component: const divStyle = {color: 'red', padding: 10}.",
    difficulty: "advanced"
  },
  {
    id: 46,
    patternId: 50,
    category: "Performance",
    question: "How can you reduce bundle size?",
    code: `// Using third-party library
function processData(items) {
  return externalLib.map(items, i => i.id);
}`,
    options: [
      "Use native JavaScript array methods instead",
      "Don't write any functions",
      "Use require instead of import",
      "Bundle size can't be reduced"
    ],
    correctAnswer: 0,
    explanation: "Native JavaScript array methods like .map(), .filter(), .reduce() work great and have zero bundle cost. Avoid importing libraries for functionality that's built into JavaScript.",
    difficulty: "advanced"
  },
  {
    id: 47,
    patternId: 1,
    category: "Async/Await",
    question: "What should you check before parsing JSON?",
    code: `async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}`,
    options: [
      "Check if response.ok is true",
      "Check if res is null",
      "Check if id is valid",
      "Nothing - JSON always works"
    ],
    correctAnswer: 0,
    explanation: "Always check response.ok before parsing. Error responses (404, 500) might not be valid JSON and will throw errors.",
    difficulty: "beginner"
  },
  {
    id: 48,
    patternId: 4,
    category: "Async/Await",
    question: "How do you cancel in-flight requests?",
    code: `async function loadUser(userId) {
  const data = await fetch(userId);
  display(data);
}`,
    options: [
      "Use AbortController and abort previous requests",
      "Use clearTimeout",
      "Use Promise.race",
      "Can't cancel fetch requests"
    ],
    correctAnswer: 0,
    explanation: "AbortController lets you cancel fetch requests by calling abort() and passing the signal to fetch options.",
    difficulty: "advanced"
  },
  {
    id: 49,
    patternId: 14,
    category: "Performance",
    question: "What optimization applies here?",
    code: `function List({items}) {
  const filtered = items.filter(i => i.active);
  return <div>{filtered.map(...)}</div>;
}`,
    options: [
      "Wrap filter in useMemo with [items] dependency",
      "Use useState instead",
      "Remove the filter",
      "Use useEffect"
    ],
    correctAnswer: 0,
    explanation: "useMemo caches the filtered result and only recomputes when items actually changes, preventing unnecessary filtering on every render.",
    difficulty: "intermediate"
  },
  {
    id: 50,
    patternId: 21,
    category: "React Hooks",
    question: "Why might effects run twice in development?",
    code: `useEffect(() => {
  logAnalytics('page_view');
}, []);`,
    options: [
      "React StrictMode intentionally double-invokes effects",
      "It's a bug",
      "Browser DevTools cause it",
      "Effects always run twice"
    ],
    correctAnswer: 0,
    explanation: "StrictMode in React 18+ double-invokes effects to help find bugs. Guard against duplicate side effects or use cleanup properly.",
    difficulty: "intermediate"
  },
  {
    id: 51,
    patternId: 27,
    category: "React Hooks",
    question: "When should you use useLayoutEffect?",
    code: `useLayoutEffect(() => {
  fetchData().then(setData);
}, []);`,
    options: [
      "Never for async - use useEffect instead",
      "Always for better performance",
      "For all data fetching",
      "Only in production"
    ],
    correctAnswer: 0,
    explanation: "useLayoutEffect blocks painting and should only be used for DOM measurements. Use useEffect for async operations like data fetching.",
    difficulty: "advanced"
  },
  {
    id: 52,
    patternId: 29,
    category: "React Hooks",
    question: "How do you track previous prop values?",
    code: `function Component({count}) {
  // Need previous count
}`,
    options: [
      "Use useRef and update it in useEffect",
      "Use useState",
      "Use useMemo",
      "Can't track previous values"
    ],
    correctAnswer: 0,
    explanation: "Create a custom hook with useRef: useEffect(() => { ref.current = value; }); return ref.current. Ref persists across renders.",
    difficulty: "intermediate"
  },
  {
    id: 53,
    patternId: 2,
    category: "Async/Await",
    question: "What's the key benefit of Promise.all?",
    code: `const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);`,
    options: [
      "Runs operations in parallel - much faster",
      "Better error handling",
      "Uses less memory",
      "Easier to read"
    ],
    correctAnswer: 0,
    explanation: "Promise.all runs all promises concurrently. If each takes 2 seconds, parallel takes 2 seconds vs 4 seconds sequential.",
    difficulty: "intermediate"
  },
  {
    id: 54,
    patternId: 8,
    category: "Async/Await",
    question: "Why add timeouts to network requests?",
    code: `async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}`,
    options: [
      "Prevent hanging on slow/failed connections",
      "Required by fetch API",
      "Makes requests faster",
      "Saves bandwidth"
    ],
    correctAnswer: 0,
    explanation: "Without timeouts, requests can hang indefinitely on network issues, leaving users waiting forever. Always set reasonable timeouts.",
    difficulty: "intermediate"
  },
  {
    id: 55,
    patternId: 11,
    category: "React Hooks",
    question: "What's a stale closure?",
    code: `useEffect(() => {
  fetchUser(userId).then(setUser);
}, []);`,
    options: [
      "Function captures old value of userId that doesn't update",
      "A memory leak",
      "A syntax error",
      "A performance issue"
    ],
    correctAnswer: 0,
    explanation: "Stale closure occurs when a function captures a variable value that becomes outdated. Include userId in deps to get fresh values.",
    difficulty: "intermediate"
  },
  {
    id: 56,
    patternId: 13,
    category: "State Management",
    question: "Why use functional state updates?",
    code: `setTimeout(() => setCount(c => c + 1), 1000);`,
    options: [
      "Ensures you get the latest state value",
      "Required for setTimeout",
      "Makes code faster",
      "Prevents memory leaks"
    ],
    correctAnswer: 0,
    explanation: "Functional updates (c => c + 1) receive the current state, avoiding stale values from closures in async operations or event handlers.",
    difficulty: "intermediate"
  },
  {
    id: 57,
    patternId: 15,
    category: "Performance",
    question: "Why avoid inline arrow functions?",
    code: `{items.map(i => <button onClick={() => handle(i)} />)}`,
    options: [
      "Creates new function instance on every render",
      "Arrow functions don't work in JSX",
      "Causes syntax errors",
      "Memory leak"
    ],
    correctAnswer: 0,
    explanation: "New function instances prevent React.memo from working and cause unnecessary child re-renders. Use useCallback for stable references.",
    difficulty: "beginner"
  },
  {
    id: 58,
    patternId: 16,
    category: "React Hooks",
    question: "What happens without cleanup?",
    code: `useEffect(() => {
  const id = setInterval(tick, 1000);
}, []);`,
    options: [
      "Interval keeps running after component unmounts - memory leak",
      "Nothing - cleanup is optional",
      "Component won't unmount",
      "Causes infinite loop"
    ],
    correctAnswer: 0,
    explanation: "Timers, subscriptions, and listeners continue after unmount without cleanup, causing memory leaks. Always return cleanup function.",
    difficulty: "beginner"
  },
  {
    id: 59,
    patternId: 17,
    category: "React Hooks",
    question: "What's wrong with conditional hooks?",
    code: `if (condition) {
  const [state, setState] = useState(0);
}`,
    options: [
      "Breaks Rules of Hooks - hook order must be consistent",
      "useState can't be in if statements",
      "condition is undefined",
      "Nothing - it's fine"
    ],
    correctAnswer: 0,
    explanation: "Hooks rely on call order. Conditional hooks change the order between renders, breaking React's internal state tracking.",
    difficulty: "beginner"
  },
  {
    id: 60,
    patternId: 23,
    category: "State Management",
    question: "How do you update state objects immutably?",
    code: `const [user, setUser] = useState({name: '', age: 0});`,
    options: [
      "setUser({...user, name: 'Bob'})",
      "user.name = 'Bob'; setUser(user)",
      "setUser(user.name = 'Bob')",
      "user.name = 'Bob'"
    ],
    correctAnswer: 0,
    explanation: "Spread operator creates a new object with updated properties while keeping others unchanged. Never mutate state directly.",
    difficulty: "beginner"
  },
  {
    id: 61,
    patternId: 31,
    category: "State Management",
    question: "Why doesn't React detect this change?",
    code: `const [arr, setArr] = useState([1,2,3]);
arr.push(4);
setArr(arr);`,
    options: [
      "Same array reference - React compares by reference",
      "push returns undefined",
      "setArr is async",
      "Arrays can't be in state"
    ],
    correctAnswer: 0,
    explanation: "React uses shallow comparison (===). Mutating keeps same reference so React thinks nothing changed. Create new array: setArr([...arr, 4]).",
    difficulty: "beginner"
  },
  {
    id: 62,
    patternId: 32,
    category: "State Management",
    question: "How do you update deeply nested objects?",
    code: `const [state, setState] = useState({
  user: {profile: {name: ''}}
});`,
    options: [
      "Spread at each level: {...state, user: {...state.user, profile: {...state.user.profile, name: 'Bob'}}}",
      "state.user.profile.name = 'Bob'",
      "setState({user: {profile: {name: 'Bob'}}})",
      "Can't update nested objects"
    ],
    correctAnswer: 0,
    explanation: "Must create new objects at every nesting level to maintain immutability. Or consider flatter state structure or libraries like Immer.",
    difficulty: "intermediate"
  },
  {
    id: 63,
    patternId: 34,
    category: "Performance",
    question: "When does this expensive function run?",
    code: `const [state] = useState(expensiveFunction());`,
    options: [
      "On every render, even though state only initializes once",
      "Only once on mount",
      "Never",
      "Only when state changes"
    ],
    correctAnswer: 0,
    explanation: "Function is called every render but result is ignored after first. Use lazy init: useState(() => expensiveFunction()) to run only once.",
    difficulty: "beginner"
  },
  {
    id: 64,
    patternId: 37,
    category: "State Management",
    question: "What's safer for boolean toggles?",
    code: `const [open, setOpen] = useState(false);`,
    options: [
      "setOpen(o => !o)",
      "setOpen(!open)",
      "open = !open",
      "setOpen(open === true ? false : true)"
    ],
    correctAnswer: 0,
    explanation: "Functional updates guarantee you're working with current state. Direct reference (!open) can be stale in closures or rapid updates.",
    difficulty: "beginner"
  },
  {
    id: 65,
    patternId: 41,
    category: "React Lists",
    question: "Why is this missing from lists?",
    code: `{items.map(item => <div>{item.text}</div>)}`,
    options: [
      "key prop for React reconciliation",
      "id attribute",
      "className",
      "Nothing is missing"
    ],
    correctAnswer: 0,
    explanation: "Keys help React identify which items changed, added, or removed. Without keys, React may unnecessarily re-render or lose state.",
    difficulty: "beginner"
  },
  {
    id: 66,
    patternId: 42,
    category: "React Lists",
    question: "Why not use array index as key?",
    code: `{items.map((item, i) => <div key={i}>{item.text}</div>)}`,
    options: [
      "Indices change when items reorder, breaking reconciliation",
      "Numbers aren't valid keys",
      "i is always undefined",
      "Index as key is actually recommended"
    ],
    correctAnswer: 0,
    explanation: "When you reorder items, indices stay the same but point to different items, confusing React. Use stable unique IDs instead.",
    difficulty: "intermediate"
  },
  {
    id: 67,
    patternId: 43,
    category: "Performance",
    question: "How do you prevent child re-renders?",
    code: `function Parent() {
  const [count, setCount] = useState(0);
  return <Child data={staticData} />;
}`,
    options: [
      "Wrap Child with React.memo",
      "Use useEffect",
      "Use useCallback on Child",
      "Can't prevent re-renders"
    ],
    correctAnswer: 0,
    explanation: "React.memo prevents re-renders when props haven't changed. Child only re-renders when its props actually change, not when parent state changes.",
    difficulty: "intermediate"
  },
  {
    id: 68,
    patternId: 45,
    category: "Performance",
    question: "When should you memoize?",
    code: `const result = expensiveCalculation(data);`,
    options: [
      "When calculation is expensive and data doesn't change often",
      "Always memoize everything",
      "Never - useMemo is slow",
      "Only for API calls"
    ],
    correctAnswer: 0,
    explanation: "useMemo has overhead. Only use for expensive computations. Simple operations like filtering small arrays don't need memoization.",
    difficulty: "intermediate"
  },
  {
    id: 69,
    patternId: 22,
    category: "State Management",
    question: "Should you store this in state?",
    code: `const [items] = useState([...]);
const [count] = useState(0);
useEffect(() => setCount(items.length), [items]);`,
    options: [
      "No - just compute: const count = items.length",
      "Yes - state is needed",
      "Use useMemo instead",
      "Use useRef"
    ],
    correctAnswer: 0,
    explanation: "Don't duplicate data you can calculate. Derived state causes synchronization issues and extra renders. Just compute from source.",
    difficulty: "intermediate"
  },
  {
    id: 70,
    patternId: 25,
    category: "State Management",
    question: "How should you organize form state?",
    code: `const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [age, setAge] = useState(0);`,
    options: [
      "Group into object: useState({name: '', email: '', age: 0})",
      "Keep separate - it's correct",
      "Use three different components",
      "Don't use state"
    ],
    correctAnswer: 0,
    explanation: "Related state should be grouped. Makes updates easier: setForm(f => ({...f, [field]: value})) and resetting simpler.",
    difficulty: "intermediate"
  },
  {
    id: 71,
    patternId: 24,
    category: "React Hooks",
    question: "What's missing from useCallback deps?",
    code: `const [count] = useState(0);
const handle = useCallback(() => {
  console.log(count);
}, []);`,
    options: [
      "count should be in dependency array",
      "Nothing - it's correct",
      "console.log should be in deps",
      "useCallback doesn't need deps"
    ],
    correctAnswer: 0,
    explanation: "If callback uses external variables, they must be in deps. Otherwise callback has stale values. Include count: }, [count]).",
    difficulty: "intermediate"
  },
  {
    id: 72,
    patternId: 28,
    category: "React Context",
    question: "Why do context consumers re-render?",
    code: `<Context.Provider value={{data, setData}}>
  <App />
</Context.Provider>`,
    options: [
      "New object every render causes all consumers to re-render",
      "Context always causes re-renders",
      "Provider is used incorrectly",
      "data changes too often"
    ],
    correctAnswer: 0,
    explanation: "Object literals create new references every render. All consumers see 'new' value and re-render. Memoize: useMemo(() => ({data, setData}), [data]).",
    difficulty: "advanced"
  },
  {
    id: 73,
    patternId: 30,
    category: "React Hooks",
    question: "Why does this effect run constantly?",
    code: `const handleResize = () => {...};
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, [handleResize]);`,
    options: [
      "handleResize is new function each render, re-running effect",
      "resize fires too often",
      "Missing cleanup",
      "window is undefined"
    ],
    correctAnswer: 0,
    explanation: "handleResize reference changes every render. Memoize with useCallback: const handleResize = useCallback(() => {...}, []).",
    difficulty: "intermediate"
  },
  {
    id: 74,
    patternId: 33,
    category: "State Management",
    question: "How do you update one array item?",
    code: `const [items, setItems] = useState([{id:1, name:'A'}]);
// Update item with id:1`,
    options: [
      "setItems(items.map(i => i.id === 1 ? {...i, name: 'B'} : i))",
      "items[0].name = 'B'; setItems(items)",
      "setItems([items[0].name = 'B'])",
      "items.find(i => i.id === 1).name = 'B'"
    ],
    correctAnswer: 0,
    explanation: "Map creates new array with updated items. Create new object for changed item, keep others as-is. Never mutate items directly.",
    difficulty: "intermediate"
  },
  {
    id: 75,
    patternId: 35,
    category: "State Management",
    question: "What's wrong with syncing props to state?",
    code: `function Input({value}) {
  const [text, setText] = useState(value);
  return <input value={text} />;
}`,
    options: [
      "Won't update when value prop changes",
      "useState can't use props",
      "value is undefined",
      "Everything is correct"
    ],
    correctAnswer: 0,
    explanation: "State initializes once. Prop changes won't update it. Either make it controlled (use value directly) or use key to force new instance.",
    difficulty: "intermediate"
  },
  {
    id: 76,
    patternId: 36,
    category: "State Management",
    question: "Should total be in state?",
    code: `const [items] = useState([...]);
const [total] = useState(0);
useEffect(() => {
  setTotal(items.reduce((s,i) => s + i.price, 0));
}, [items]);`,
    options: [
      "No - just compute: const total = items.reduce(...)",
      "Yes - useEffect is the right pattern",
      "Use useMemo instead of useEffect",
      "Use useRef"
    ],
    correctAnswer: 0,
    explanation: "Storing computed values is redundant. Just calculate from source: const total = items.reduce(...) or use useMemo if expensive.",
    difficulty: "intermediate"
  },
  {
    id: 77,
    patternId: 39,
    category: "React Hooks",
    question: "When is useReducer better?",
    code: `const [items, setItems] = useState([]);
const add = () => setItems([...items, item]);
const remove = (id) => setItems(items.filter(...));
const update = (id, data) => setItems(items.map(...));`,
    options: [
      "When you have multiple related state operations",
      "Never - useState is always better",
      "Only for forms",
      "Only with Redux"
    ],
    correctAnswer: 0,
    explanation: "useReducer centralizes complex state logic in one place, making it more testable and maintainable than scattered setState calls.",
    difficulty: "advanced"
  },
  {
    id: 78,
    patternId: 40,
    category: "React Forms",
    question: "How can you simplify form handling?",
    code: `<input name="email" value={email} onChange={e => setEmail(e.target.value)} />
<input name="name" value={name} onChange={e => setName(e.target.value)} />`,
    options: [
      "Single handler using e.target.name with form object",
      "Can't simplify",
      "Use refs instead",
      "Remove onChange"
    ],
    correctAnswer: 0,
    explanation: "const handleChange = (e) => setForm(f => ({...f, [e.target.name]: e.target.value})). Single handler for all fields using name attribute.",
    difficulty: "intermediate"
  },
  {
    id: 79,
    patternId: 44,
    category: "Performance",
    question: "What's virtual scrolling?",
    code: `// 10,000 item list`,
    options: [
      "Only rendering visible items in viewport",
      "Using CSS scroll-behavior",
      "Animating scroll",
      "Disabling scroll"
    ],
    correctAnswer: 0,
    explanation: "Virtual scrolling renders only items currently visible plus a buffer, dramatically reducing DOM nodes and improving performance.",
    difficulty: "advanced"
  },
  {
    id: 80,
    patternId: 46,
    category: "React Architecture",
    question: "Why split large components?",
    code: `function Giant() {
  // 1000 lines
}`,
    options: [
      "Smaller components can be individually optimized",
      "React has a line limit",
      "Required by ESLint",
      "No benefit"
    ],
    correctAnswer: 0,
    explanation: "Small components can be memoized separately. Large components re-render entirely even if only small part changes. Better for testing too.",
    difficulty: "intermediate"
  },
  {
    id: 81,
    patternId: 48,
    category: "Performance",
    question: "What's inefficient here?",
    code: `<div style={{padding: 10, color: 'red'}}>Text</div>`,
    options: [
      "New style object created every render",
      "Inline styles aren't allowed",
      "Numbers need units",
      "Nothing - it's optimal"
    ],
    correctAnswer: 0,
    explanation: "New object every render causes style recalculation. Extract to const outside: const style = {padding: 10, color: 'red'}.",
    difficulty: "advanced"
  },
  {
    id: 82,
    patternId: 49,
    category: "Performance",
    question: "Why debounce search input?",
    code: `<input onChange={e => search(e.target.value)} />`,
    options: [
      "Prevents search on every keystroke - reduces API calls",
      "Required by browsers",
      "Makes typing faster",
      "Prevents bugs"
    ],
    correctAnswer: 0,
    explanation: "Debouncing delays the search until user stops typing, reducing unnecessary API calls from hundreds to just a few.",
    difficulty: "intermediate"
  },
  {
    id: 83,
    patternId: 3,
    category: "Async/Await",
    question: "What should async functions return?",
    code: `async function save(data) {
  await db.insert(data);
}`,
    options: [
      "Success indicator or result so caller knows what happened",
      "Nothing - async functions don't need returns",
      "Always return true",
      "Always return null"
    ],
    correctAnswer: 0,
    explanation: "Return meaningful values (result, boolean, or object with success/error) so callers can verify operation and handle appropriately.",
    difficulty: "beginner"
  },
  {
    id: 84,
    patternId: 5,
    category: "Async/Await",
    question: "When should you use async keyword?",
    code: `async function getName(user) {
  return user.name;
}`,
    options: [
      "Only when you use await inside",
      "For all functions",
      "For getters",
      "Never use async"
    ],
    correctAnswer: 0,
    explanation: "async creates promise overhead. Only use when you actually await something inside. This function doesn't need async.",
    difficulty: "beginner"
  },
  {
    id: 85,
    patternId: 7,
    category: "Async/Await",
    question: "What's a 'floating promise'?",
    code: `function onClick() {
  saveData();
  showSuccess();
}`,
    options: [
      "Promise that's not awaited or handled",
      "A type of animation",
      "A memory leak",
      "An error"
    ],
    correctAnswer: 0,
    explanation: "Floating promise is called but ignored. Its result/error isn't handled. Always await or .then()/.catch() promises.",
    difficulty: "intermediate"
  },
  {
    id: 86,
    patternId: 9,
    category: "Async/Await",
    question: "Why doesn't forEach wait?",
    code: `items.forEach(async item => {
  await process(item);
});`,
    options: [
      "forEach doesn't handle async - use for-of loop",
      "await is in wrong place",
      "async can't be in forEach",
      "Missing return"
    ],
    correctAnswer: 0,
    explanation: "forEach ignores return values including promises. Use 'for (const item of items) await process(item)' for sequential processing.",
    difficulty: "intermediate"
  },
  {
    id: 87,
    patternId: 10,
    category: "Async/Await",
    question: "What scope issue exists?",
    code: `async function get() {
  try {
    const data = await fetch();
  } catch (e) {
    console.error(e);
  }
  return data;
}`,
    options: [
      "data not accessible outside try block",
      "fetch needs URL",
      "catch should rethrow",
      "Everything is correct"
    ],
    correctAnswer: 0,
    explanation: "Variables in try block have block scope. Declare outside: let data; try { data = await... } or return inside try.",
    difficulty: "beginner"
  },
  {
    id: 88,
    patternId: 18,
    category: "React Hooks",
    question: "What's risky about refs?",
    code: `const ref = useRef();
ref.current.focus();`,
    options: [
      "ref.current might be null initially",
      "useRef doesn't work",
      "focus() doesn't exist",
      "Nothing risky"
    ],
    correctAnswer: 0,
    explanation: "Refs can be null before component mounts or after unmount. Always check: if (ref.current) ref.current.focus().",
    difficulty: "intermediate"
  },
  {
    id: 89,
    patternId: 19,
    category: "State Management",
    question: "How many increments occur?",
    code: `const [count, setCount] = useState(0);
setCount(count + 1);
setCount(count + 1);`,
    options: [
      "One - both use same count value",
      "Two",
      "Zero",
      "Depends on timing"
    ],
    correctAnswer: 0,
    explanation: "Both statements use the same count from closure. Result is 1. Use functional updates: setCount(c => c + 1) for both to get 2.",
    difficulty: "intermediate"
  },
  {
    id: 90,
    patternId: 26,
    category: "React Hooks",
    question: "When is useReducer preferred?",
    code: `const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);`,
    options: [
      "When state logic is complex with multiple sub-values",
      "Never",
      "Always",
      "Only for arrays"
    ],
    correctAnswer: 0,
    explanation: "useReducer centralizes complex state transitions. Better when state updates depend on previous state or involve multiple sub-values.",
    difficulty: "advanced"
  },
  {
    id: 91,
    patternId: 6,
    category: "Async/Await",
    question: "What's wrong with this wrapper?",
    code: `function getData() {
  return new Promise((resolve) => {
    fetch('/api').then(resolve);
  });
}`,
    options: [
      "Unnecessary - fetch already returns promise",
      "Missing reject",
      "Promise syntax wrong",
      "Nothing wrong"
    ],
    correctAnswer: 0,
    explanation: "Don't wrap existing promises unnecessarily. fetch returns a promise, so just return it: return fetch('/api').",
    difficulty: "intermediate"
  },
  {
    id: 92,
    patternId: 27,
    category: "React Hooks",
    question: "What should NOT use useLayoutEffect?",
    code: `useLayoutEffect(() => {
  fetchData().then(setData);
}, []);`,
    options: [
      "Async operations - use useEffect",
      "DOM mutations",
      "Measurements",
      "Scroll positions"
    ],
    correctAnswer: 0,
    explanation: "useLayoutEffect blocks painting. Only use for synchronous DOM measurements/mutations. Use useEffect for async like fetching.",
    difficulty: "advanced"
  },
  {
    id: 93,
    patternId: 47,
    category: "React Context",
    question: "How do you optimize context?",
    code: `<Context.Provider value={{user, actions}}>`,
    options: [
      "Memoize value: useMemo(() => ({user, actions}), [user])",
      "Can't optimize context",
      "Use useState",
      "Don't use context"
    ],
    correctAnswer: 0,
    explanation: "Memoize context value to prevent re-renders of all consumers when Provider re-renders but value hasn't actually changed.",
    difficulty: "advanced"
  },
  {
    id: 94,
    patternId: 29,
    category: "React Hooks",
    question: "How to access previous value?",
    code: `function Component({count}) {
  // Need previous count
}`,
    options: [
      "const prev = useRef(); useEffect(() => prev.current = count)",
      "const prev = useState(count)[0]",
      "const prev = useMemo(() => count)",
      "Can't access previous"
    ],
    correctAnswer: 0,
    explanation: "Use ref updated in useEffect. Ref persists between renders but doesn't trigger re-renders: useRef() + useEffect(() => { ref.current = value }).",
    difficulty: "intermediate"
  },
  {
    id: 95,
    patternId: 38,
    category: "State Management",
    question: "Does React 18 batch these?",
    code: `setCount(count + 1);
setName('Bob');
setEmail('bob@ex.com');`,
    options: [
      "Yes - automatic batching in React 18+",
      "No - three separate renders",
      "Only in event handlers",
      "Only with setTimeout"
    ],
    correctAnswer: 0,
    explanation: "React 18+ automatically batches all state updates, even in promises, setTimeout, and native events. Previous versions only batched in event handlers.",
    difficulty: "advanced"
  },
  {
    id: 96,
    patternId: 21,
    category: "React Hooks",
    question: "Why do effects run twice in StrictMode?",
    code: `useEffect(() => {
  logEvent('mounted');
}, []);`,
    options: [
      "To help detect side effects that need cleanup",
      "It's a bug",
      "Only in production",
      "To slow down the app"
    ],
    correctAnswer: 0,
    explanation: "React 18 StrictMode intentionally double-invokes effects in development to surface bugs with missing cleanup functions.",
    difficulty: "intermediate"
  },
  {
    id: 97,
    patternId: 20,
    category: "React Hooks",
    question: "What must custom hooks do?",
    code: `function useData(id) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData(id).then(setData);
  }, []);
  return data;
}`,
    options: [
      "Include all dependencies - add [id] to useEffect",
      "Nothing - it's correct",
      "Use useCallback",
      "Return array"
    ],
    correctAnswer: 0,
    explanation: "Custom hooks follow same rules as components. Include id in dependencies and add cleanup to handle id changes.",
    difficulty: "advanced"
  },
  {
    id: 98,
    patternId: 45,
    category: "Performance",
    question: "When NOT to use useMemo?",
    code: `const doubled = useMemo(() => value * 2, [value]);`,
    options: [
      "For simple operations - overhead exceeds benefit",
      "With numbers",
      "In functions",
      "Never - always use it"
    ],
    correctAnswer: 0,
    explanation: "useMemo has overhead. Don't use for simple operations like arithmetic. Only for expensive computations like large array operations.",
    difficulty: "intermediate"
  },
  {
    id: 99,
    patternId: 43,
    category: "Performance",
    question: "What does React.memo do?",
    code: `const Child = memo(({data}) => <div>{data}</div>);`,
    options: [
      "Prevents re-render if props haven't changed",
      "Memoizes component creation",
      "Caches DOM nodes",
      "Improves initial render"
    ],
    correctAnswer: 0,
    explanation: "React.memo is HOC that prevents re-renders when props are shallowly equal. Like PureComponent but for function components.",
    difficulty: "intermediate"
  },
  {
    id: 100,
    patternId: 50,
    category: "Performance",
    question: "How does tree-shaking work?",
    code: `// Bundler analyzes imports
function MyComponent() {
  const value = calculateSomething();
  return <div>{value}</div>;
}`,
    options: [
      "Removes unused exports during bundling",
      "Shakes the DOM tree",
      "Optimizes React trees",
      "Removes console.logs"
    ],
    correctAnswer: 0,
    explanation: "Tree-shaking removes unused code during bundling. Use named imports and ES modules to enable it, reducing bundle size by eliminating dead code.",
    difficulty: "advanced"
  },
  {
    "id": 101,
    "patternId": 51,
    "category": "Memory Leaks",
    "question": "What memory leak occurs in this useEffect?",
    "code": `useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1);
  }, 1000);
}, []);`,
    "options": [
      "Interval continues running after component unmounts",
      "setInterval is too slow",
      "count state is not used properly",
      "No memory leak exists"
    ],
    "correctAnswer": 0,
    "explanation": "The setInterval continues running after component unmounts, causing memory leaks and potential errors. Always return a cleanup function: return () => clearInterval(interval);",
    "difficulty": "beginner"
  },
  {
    "id": 102,
    "patternId": 52,
    "category": "Memory Leaks",
    "question": "Why does this event listener cause a memory leak?",
    "code": `useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);`,
    "options": [
      "EventListener remains attached after component unmounts",
      "resize event fires too frequently",
      "handleResize is not defined",
      "Window object should not be used"
    ],
    "correctAnswer": 0,
    "explanation": "Event listeners attached to global objects like window must be removed in cleanup to prevent memory leaks. Return () => window.removeEventListener('resize', handleResize);",
    "difficulty": "beginner"
  },
  {
    "id": 103,
    "patternId": 53,
    "category": "Memory Leaks",
    "question": "What's the memory leak issue with this subscription?",
    "code": `useEffect(() => {
  const subscription = api.subscribe(data => setData(data));
}, []);`,
    "options": [
      "Subscription continues receiving updates after unmount",
      "api.subscribe is deprecated",
      "setData should not be called",
      "No issue - subscriptions auto-clean"
    ],
    "correctAnswer": 0,
    "explanation": "Subscriptions must be unsubscribed to prevent callbacks from executing on unmounted components and holding references. Return () => subscription.unsubscribe();",
    "difficulty": "intermediate"
  },
  {
    "id": 104,
    "patternId": 54,
    "category": "Memory Leaks",
    "question": "How does this AbortController cause a memory leak?",
    "code": `useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(setData);
}, [url]);`,
    "options": [
      "AbortController instance is recreated on every render",
      "fetch should not use AbortController",
      "signal property is incorrect",
      "No memory leak exists"
    ],
    "correctAnswer": 0,
    "explanation": "New AbortController created on every render without aborting previous ones can cause memory leaks. Store in ref or abort in cleanup: return () => controller.abort();",
    "difficulty": "intermediate"
  },
  {
    "id": 105,
    "patternId": 55,
    "category": "Memory Leaks",
    "question": "What memory leak occurs with this timeout?",
    "code": `useEffect(() => {
  const timeout = setTimeout(() => {
    setState('completed');
  }, 5000);
}, []);`,
    "options": [
      "Timeout may execute after component unmounts",
      "setTimeout duration is too long",
      "setState should not be called in timeout",
      "No memory leak - timeout auto-clears"
    ],
    "correctAnswer": 0,
    "explanation": "setTimeout callbacks can execute after component unmounts, causing state updates on unmounted components. Always clear: return () => clearTimeout(timeout);",
    "difficulty": "beginner"
  },
  {
    "id": 106,
    "patternId": 56,
    "category": "Memory Leaks",
    "question": "Why does this WebSocket connection leak memory?",
    "code": `useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080');
  ws.onmessage = (event) => setData(JSON.parse(event.data));
}, []);`,
    "options": [
      "WebSocket remains open and connected after unmount",
      "WebSocket URL is incorrect",
      "onmessage should be useEffect",
      "WebSockets auto-close on unmount"
    ],
    "correctAnswer": 0,
    "explanation": "WebSocket connections remain active and hold references after component unmounts. Close in cleanup: return () => ws.close();",
    "difficulty": "intermediate"
  },
  {
    "id": 107,
    "patternId": 57,
    "category": "Memory Leaks",
    "question": "What's the memory leak in this observable subscription?",
    "code": `useEffect(() => {
  const observable$ = api.getStream();
  observable$.subscribe({
    next: data => setData(data),
    error: err => setError(err)
  });
}, []);`,
    "options": [
      "Observable subscription not unsubscribed",
      "Observable should be in state",
      "Error handling is missing",
      "No memory leak - observables auto-unsubscribe"
    ],
    "correctAnswer": 0,
    "explanation": "RxJS observables continue emitting values unless unsubscribed. This keeps component references in memory. Return () => observable$.unsubscribe();",
    "difficulty": "advanced"
  },
  {
    "id": 108,
    "patternId": 58,
    "category": "Memory Leaks",
    "question": "How does this third-party library cause memory leaks?",
    "code": `useEffect(() => {
  const chart = new ThirdPartyChart('#chart');
  chart.render(data);
}, [data]);`,
    "options": [
      "Chart instance not destroyed on unmount",
      "ThirdPartyChart is not React-compatible",
      "DOM element #chart doesn't exist",
      "No memory leak - charts auto-clean"
    ],
    "correctAnswer": 0,
    "explanation": "Third-party libraries often create DOM references, event listeners, or timers that must be manually cleaned up. Return () => chart.destroy();",
    "difficulty": "intermediate"
  },
  {
    "id": 109,
    "patternId": 59,
    "category": "Memory Leaks",
    "question": "What memory leak occurs with this closure?",
    "code": `useEffect(() => {
  const cachedData = heavyDataProcessing(data);
  setProcessedData(cachedData);
}, [data]);`,
    "options": [
      "heavyDataProcessing holds large data in closure",
      "cachedData should be in state",
      "data dependency is wrong",
      "No memory leak exists"
    ],
    "correctAnswer": 0,
    "explanation": "Large variables in closures prevent garbage collection. Use useMemo for expensive computations: const cachedData = useMemo(() => heavyDataProcessing(data), [data]);",
    "difficulty": "advanced"
  },
  {
    "id": 110,
    "patternId": 60,
    "category": "Memory Leaks",
    "question": "Why does this ref cause a memory leak?",
    "code": `const Component = () => {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = largeObject;
  });
  
  return <div>Content</div>;
};`,
    "options": [
      "Large object stored in ref persists between renders",
      "useRef should not be used for objects",
      "useEffect missing dependencies",
      "No memory leak - refs are managed by React"
    ],
    "correctAnswer": 0,
    "explanation": "Refs hold references indefinitely. Storing large objects in refs prevents garbage collection. Clear refs in cleanup: useEffect(() => () => { ref.current = null; });",
    "difficulty": "advanced"
  },
   {
    "id": 111,
    "patternId": 61,
    "category": "Promises",
    "question": "What's wrong with this promise chain?",
    "code": `fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));`,
    "options": [
      "Missing error handling with .catch()",
      "then() should be await",
      "response.json() is incorrect",
      "No issues - it's correct"
    ],
    "correctAnswer": 0,
    "explanation": "Promises should always have error handling. Network requests can fail, and without .catch(), errors will be silent and hard to debug.",
    "difficulty": "beginner"
  },
  {
    "id": 112,
    "patternId": 62,
    "category": "Promises",
    "question": "What will happen if multiple promises reject?",
    "code": `Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
.then(results => console.log(results))
.catch(error => console.error(error));`,
    "options": [
      "First rejection immediately triggers catch",
      "All promises must reject to trigger catch",
      "It will wait for all promises to settle",
      "No error handling occurs"
    ],
    "correctAnswer": 0,
    "explanation": "Promise.all fails fast - if any promise rejects, the entire Promise.all immediately rejects with that first error, without waiting for other promises.",
    "difficulty": "intermediate"
  },
  {
    "id": 113,
    "patternId": 63,
    "category": "Promises",
    "question": "What's the difference between these promise methods?",
    "code": `// Option A
Promise.allSettled([p1, p2, p3])

// Option B  
Promise.all([p1, p2, p3])`,
    "options": [
      "allSettled waits for all, all fails on first rejection",
      "all is faster, allSettled is more reliable",
      "allSettled only works with fetch",
      "No difference - they are aliases"
    ],
    "correctAnswer": 0,
    "explanation": "Promise.allSettled waits for all promises to complete (fulfilled or rejected) and returns results for all. Promise.all fails immediately on first rejection.",
    "difficulty": "intermediate"
  },
  {
    "id": 114,
    "patternId": 64,
    "category": "Promises",
    "question": "What does Promise.race() do?",
    "code": `Promise.race([
  fetch('/api/fast'),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), 5000)
  )
])`,
    "options": [
      "Returns result of first settled promise (fulfilled or rejected)",
      "Races promises and returns the fastest success",
      "Only works with timeout promises",
      "Throws an error if promises are too slow"
    ],
    "correctAnswer": 0,
    "explanation": "Promise.race returns the result of the first promise that settles (either fulfills or rejects). This pattern is commonly used for timeouts.",
    "difficulty": "intermediate"
  },
  {
    "id": 115,
    "patternId": 65,
    "category": "Promises",
    "question": "Why is this promise construction problematic?",
    "code": `function getData() {
  return new Promise((resolve, reject) => {
    fetch('/api/data')
      .then(resolve)
      .catch(reject);
  });
}`,
    "options": [
      "Unnecessary promise wrapper - fetch already returns promise",
      "Missing async/await",
      "resolve/reject are in wrong order",
      "No issues - it's correct"
    ],
    "correctAnswer": 0,
    "explanation": "This is the 'Promise constructor anti-pattern'. fetch() already returns a promise, so wrapping it in another promise is redundant and adds complexity.",
    "difficulty": "intermediate"
  },
  {
    "id": 116,
    "patternId": 66,
    "category": "Promises",
    "question": "What's the output order of this code?",
    "code": `console.log('1');
Promise.resolve().then(() => console.log('2'));
console.log('3');`,
    "options": [
      "1, 3, 2",
      "1, 2, 3", 
      "2, 1, 3",
      "3, 1, 2"
    ],
    "correctAnswer": 0,
    "explanation": "Promise callbacks are microtasks and execute after synchronous code. So: sync code (1, 3) runs first, then microtasks (2).",
    "difficulty": "intermediate"
  },
  {
    "id": 117,
    "patternId": 67,
    "category": "Promises",
    "question": "How can you create an immediately resolved promise?",
    "code": `// What code goes here?`,
    "options": [
      "Promise.resolve(value)",
      "new Promise(resolve => resolve(value))",
      "Promise.fulfill(value)",
      "Both A and B"
    ],
    "correctAnswer": 3,
    "explanation": "Both Promise.resolve(value) and new Promise(resolve => resolve(value)) create immediately resolved promises. Promise.resolve() is more concise.",
    "difficulty": "beginner"
  },
  {
    "id": 118,
    "patternId": 68,
    "category": "Promises",
    "question": "What's the issue with promise recursion here?",
    "code": `function processItems(items) {
  if (items.length === 0) return Promise.resolve();
  
  const item = items[0];
  return api.process(item)
    .then(() => processItems(items.slice(1)));
}`,
    "options": [
      "Can cause stack overflow with large arrays",
      "Should use async/await instead",
      "items.slice() is inefficient",
      "No issue - it's correct recursion"
    ],
    "correctAnswer": 0,
    "explanation": "Promise chains don't grow the call stack, so this is actually safe and won't cause stack overflow. Each then() creates a new microtask, not a new stack frame.",
    "difficulty": "advanced"
  },
  {
    "id": 119,
    "patternId": 69,
    "category": "Promises",
    "question": "What does Promise.finally() do?",
    "code": `fetch('/api/data')
  .then(response => response.json())
  .catch(error => console.error(error))
  .finally(() => cleanup());`,
    "options": [
      "Runs after promise settles, regardless of outcome",
      "Only runs if promise fulfills",
      "Only runs if promise rejects", 
      "Runs before then/catch"
    ],
    "correctAnswer": 0,
    "explanation": "finally() executes after the promise settles (either fulfilled or rejected), making it perfect for cleanup operations that should run regardless of success/failure.",
    "difficulty": "intermediate"
  },
  {
    "id": 120,
    "patternId": 70,
    "category": "Promises",
    "question": "What's the problem with this error handling?",
    "code": `fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network error');
    }
    return response.json();
  })
  .catch(error => console.error('Fetch failed:', error))
  .then(data => processData(data));`,
    "options": [
      "processData runs even after catch - may receive undefined",
      "Error should be thrown in catch",
      "response.ok check is unnecessary",
      "No issue - error handling is correct"
    ],
    "correctAnswer": 0,
    "explanation": "After catch(), the chain continues. If fetch fails, data in the final then() will be undefined. Either return from catch or put processData before catch.",
    "difficulty": "advanced"
  }
];