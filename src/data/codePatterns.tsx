// Code patterns data extracted from the original app
export interface CodePattern {
  id: number;
  category: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  badCode: string;
  issues: string[];
  goodCode: string;
  improvements: string[];
  commonPattern: string;
  language?: string; // Optional property from original data
}

// All 100 code patterns
export const codePatterns: CodePattern[] = [
  // ASYNC/AWAIT (1-10)
  {
    id: 1,
    category: "Async/Await",
    title: "Missing Error Handling",
    difficulty: "beginner",
    badCode: `async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}`,
    issues: ["No error handling", "No response.ok check"],
    goodCode: `async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (error) {
    console.error('Failed:', error);
    throw error;
  }
}`,
    improvements: ["Added try-catch", "Check response status"],
    commonPattern: "Always handle errors in async functions"
  },
  {
    id: 2,
    category: "Async/Await",
    title: "Sequential Await",
    difficulty: "intermediate",
    badCode: `async function load() {
  const users = await fetchUsers();
  const posts = await fetchPosts();
  return { users, posts };
}`,
    issues: ["Sequential execution", "Slow performance"],
    goodCode: `async function load() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts()
  ]);
  return { users, posts };
}`,
    improvements: ["Parallel execution", "Better performance"],
    commonPattern: "Use Promise.all for independent operations"
  },
  {
    id: 3,
    category: "Async/Await",
    title: "Missing Return",
    difficulty: "beginner",
    badCode: `async function save(data) {
  await db.insert(data);
}`,
    issues: ["Returns undefined", "Can't verify success"],
    goodCode: `async function save(data) {
  try {
    await db.insert(data);
    return true;
  } catch (error) {
    return false;
  }
}`,
    improvements: ["Return meaningful value", "Error handling"],
    commonPattern: "Always return from async functions"
  },
  {
    id: 4,
    category: "Async/Await",
    title: "Race Conditions",
    difficulty: "advanced",
    badCode: `async function loadUser(userId) {
  const data = await fetch(userId);
  display(data);
}`,
    issues: ["Race condition", "Stale data possible"],
    goodCode: `let controller = null;
async function loadUser(userId) {
  if (controller) controller.abort();
  controller = new AbortController();
  try {
    const data = await fetch(userId, {signal: controller.signal});
    display(data);
  } catch (e) {
    if (e.name !== 'AbortError') throw e;
  }
}`,
    improvements: ["Use AbortController", "Cancel old requests"],
    commonPattern: "Handle concurrent async operations"
  },
  {
    id: 5,
    category: "Async/Await",
    title: "Unnecessary Async",
    difficulty: "beginner",
    badCode: `async function upper(str) {
  return str.toUpperCase();
}`,
    issues: ["Unnecessary async", "Creates promise overhead"],
    goodCode: `function upper(str) {
  return str.toUpperCase();
}`,
    improvements: ["Remove async", "Simpler code"],
    commonPattern: "Only use async when needed"
  },
  {
    id: 6,
    category: "Async/Await",
    title: "Promise Constructor Anti-pattern",
    difficulty: "intermediate",
    badCode: `function fetchData() {
  return new Promise((resolve, reject) => {
    fetch('/api/data')
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}`,
    issues: ["Unnecessary wrapper", "Extra code"],
    goodCode: `function fetchData() {
  return fetch('/api/data');
}`,
    improvements: ["Return promise directly", "Cleaner"],
    commonPattern: "Don't wrap promises unnecessarily"
  },
  {
    id: 7,
    category: "Async/Await",
    title: "Floating Promises",
    difficulty: "intermediate",
    badCode: `function submit() {
  saveData();
  showSuccess();
}`,
    issues: ["Ignored promise", "Success shown too early"],
    goodCode: `async function submit() {
  try {
    await saveData();
    showSuccess();
  } catch (error) {
    showError();
  }
}`,
    improvements: ["Await promise", "Proper timing"],
    commonPattern: "Never ignore promises"
  },
  {
    id: 8,
    category: "Async/Await",
    title: "No Timeout",
    difficulty: "intermediate",
    badCode: `async function fetch(url) {
  const res = await fetch(url);
  return res.json();
}`,
    issues: ["No timeout", "Can hang forever"],
    goodCode: `async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, {signal: controller.signal});
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}`,
    improvements: ["Add timeout", "Better UX"],
    commonPattern: "Always add timeouts to network requests"
  },
  {
    id: 9,
    category: "Async/Await",
    title: "Async in forEach",
    difficulty: "intermediate",
    badCode: `items.forEach(async item => {
  await process(item);
});`,
    issues: ["forEach doesn't wait", "No error handling"],
    goodCode: `for (const item of items) {
  await process(item);
}
// Or parallel
await Promise.all(items.map(item => process(item)));`,
    improvements: ["Use for-of or Promise.all", "Proper await"],
    commonPattern: "Don't use async with forEach"
  },
  {
    id: 10,
    category: "Async/Await",
    title: "Try-Catch Around Await",
    difficulty: "beginner",
    badCode: `async function getData() {
  try {
    const data = await fetch();
  } catch (e) {}
  return data; // ReferenceError!
}`,
    issues: ["Variable scope", "Silent errors"],
    goodCode: `async function getData() {
  try {
    const data = await fetch();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}`,
    improvements: ["Proper scope", "Return in try block"],
    commonPattern: "Mind variable scope in try-catch"
  },

  // REACT HOOKS (11-30)
  {
    id: 11,
    category: "React Hooks",
    title: "Missing Dependencies",
    difficulty: "intermediate",
    badCode: `useEffect(() => {
  fetchUser(userId).then(setUser);
}, []);`,
    issues: ["Missing userId dependency", "Stale closure"],
    goodCode: `useEffect(() => {
  let cancelled = false;
  fetchUser(userId).then(data => {
    if (!cancelled) setUser(data);
  });
  return () => { cancelled = true; };
}, [userId]);`,
    improvements: ["Add dependencies", "Cleanup function"],
    commonPattern: "Include all dependencies in useEffect"
  },
  {
    id: 12,
    category: "React Hooks",
    title: "Infinite Loop",
    difficulty: "beginner",
    badCode: `useEffect(() => {
  setData(fetchData());
}, [data]);`,
    issues: ["Infinite loop", "Performance disaster"],
    goodCode: `useEffect(() => {
  fetchData().then(setData);
}, []);`,
    improvements: ["Remove state from deps", "Run once"],
    commonPattern: "Don't include state being set in deps"
  },
  {
    id: 13,
    category: "React Hooks",
    title: "Stale State",
    difficulty: "intermediate",
    badCode: `const onClick = () => {
  setTimeout(() => setCount(count + 1), 1000);
};`,
    issues: ["Stale closure", "Wrong count"],
    goodCode: `const onClick = () => {
  setTimeout(() => setCount(c => c + 1), 1000);
};`,
    improvements: ["Functional update", "Latest state"],
    commonPattern: "Use functional updates for dependent state"
  },
  {
    id: 14,
    category: "React Hooks",
    title: "Expensive Calculation",
    difficulty: "intermediate",
    badCode: `function List({items}) {
  const filtered = items.filter(i => i.active);
  return <div>{filtered.map(...)}</div>;
}`,
    issues: ["Runs every render", "Poor performance"],
    goodCode: `function List({items}) {
  const filtered = useMemo(
    () => items.filter(i => i.active),
    [items]
  );
  return <div>{filtered.map(...)}</div>;
}`,
    improvements: ["Use useMemo", "Only recompute when needed"],
    commonPattern: "Memoize expensive calculations"
  },
  {
    id: 15,
    category: "React Hooks",
    title: "Inline Functions",
    difficulty: "beginner",
    badCode: `{items.map(i => 
  <button onClick={() => handle(i.id)} />
)}`,
    issues: ["New function every render", "Child re-renders"],
    goodCode: `const Item = memo(({id, onClick}) => 
  <button onClick={() => onClick(id)} />
);
const handle = useCallback((id) => {...}, []);`,
    improvements: ["Use useCallback", "Memoize children"],
    commonPattern: "Avoid inline functions in props"
  },
  {
    id: 16,
    category: "React Hooks",
    title: "No Cleanup",
    difficulty: "beginner",
    badCode: `useEffect(() => {
  const id = setInterval(tick, 1000);
}, []);`,
    issues: ["Memory leak", "Continues after unmount"],
    goodCode: `useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);`,
    improvements: ["Return cleanup", "Clear interval"],
    commonPattern: "Always cleanup side effects"
  },
  {
    id: 17,
    category: "React Hooks",
    title: "Conditional Hooks",
    difficulty: "beginner",
    badCode: `if (condition) {
  useEffect(() => {...});
}`,
    issues: ["Breaks Rules of Hooks", "Hook order changes"],
    goodCode: `useEffect(() => {
  if (condition) {...}
}, [condition]);`,
    improvements: ["Move condition inside", "Consistent order"],
    commonPattern: "Never call hooks conditionally"
  },
  {
    id: 18,
    category: "React Hooks",
    title: "Wrong Ref Usage",
    difficulty: "intermediate",
    badCode: `const ref = useRef();
useEffect(() => {
  ref.current.focus();
});`,
    issues: ["Ref might be null", "No dependency array"],
    goodCode: `const ref = useRef();
useEffect(() => {
  if (ref.current) ref.current.focus();
}, []);`,
    improvements: ["Check for null", "Add deps array"],
    commonPattern: "Always null-check refs"
  },
  {
    id: 19,
    category: "React Hooks",
    title: "State Batching Issues",
    difficulty: "advanced",
    badCode: `setCount(count + 1);
setCount(count + 1);
setCount(count + 1);`,
    issues: ["Only increments once", "Stale state"],
    goodCode: `setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);`,
    improvements: ["Functional updates", "Correct batching"],
    commonPattern: "Use functions for multiple updates"
  },
  {
    id: 20,
    category: "React Hooks",
    title: "Custom Hook Dependencies",
    difficulty: "advanced",
    badCode: `function useData(id) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData(id).then(setData);
  }, []);
  return data;
}`,
    issues: ["Missing id dependency", "Stale data"],
    goodCode: `function useData(id) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let cancelled = false;
    fetchData(id).then(d => {
      if (!cancelled) setData(d);
    });
    return () => { cancelled = true; };
  }, [id]);
  return data;
}`,
    improvements: ["Add id to deps", "Cleanup"],
    commonPattern: "Custom hooks need proper dependencies too"
  },
  {
    id: 21,
    category: "React Hooks",
    title: "Effect Running Twice",
    difficulty: "intermediate",
    badCode: `useEffect(() => {
  logAnalytics('page_view');
}, []);`,
    issues: ["Runs twice in StrictMode", "Duplicate analytics"],
    goodCode: `useEffect(() => {
  let sent = false;
  if (!sent) {
    logAnalytics('page_view');
    sent = true;
  }
}, []);`,
    improvements: ["Guard against double-run", "StrictMode safe"],
    commonPattern: "Handle StrictMode double-invocation"
  },
  {
    id: 22,
    category: "React Hooks",
    title: "Derived State",
    difficulty: "intermediate",
    badCode: `const [items, setItems] = useState([]);
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(items.length);
}, [items]);`,
    issues: ["Unnecessary state", "Extra renders"],
    goodCode: `const [items, setItems] = useState([]);
const count = items.length;`,
    improvements: ["Just calculate it", "No extra state"],
    commonPattern: "Don't store derived state"
  },
  {
    id: 23,
    category: "React Hooks",
    title: "useState with Objects",
    difficulty: "beginner",
    badCode: `const [user, setUser] = useState({});
const updateName = (name) => {
  user.name = name;
  setUser(user);
};`,
    issues: ["Direct mutation", "No re-render"],
    goodCode: `const [user, setUser] = useState({});
const updateName = (name) => {
  setUser({...user, name});
};`,
    improvements: ["Create new object", "Immutable update"],
    commonPattern: "Never mutate state objects"
  },
  {
    id: 24,
    category: "React Hooks",
    title: "useCallback Missing Deps",
    difficulty: "intermediate",
    badCode: `const handle = useCallback(() => {
  doSomething(value);
}, []);`,
    issues: ["Stale closure over value", "Wrong behavior"],
    goodCode: `const handle = useCallback(() => {
  doSomething(value);
}, [value]);`,
    improvements: ["Include all dependencies", "Fresh closure"],
    commonPattern: "useCallback needs correct deps"
  },
  {
    id: 25,
    category: "React Hooks",
    title: "Too Many useState",
    difficulty: "intermediate",
    badCode: `const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
// ... 10 more`,
    issues: ["Too many state vars", "Hard to manage"],
    goodCode: `const [form, setForm] = useState({
  name: '', email: '', phone: ''
});
const update = (field, value) => 
  setForm(f => ({...f, [field]: value}));`,
    improvements: ["Group related state", "Single object"],
    commonPattern: "Group related state together"
  },
  {
    id: 26,
    category: "React Hooks",
    title: "useReducer vs useState",
    difficulty: "advanced",
    badCode: `const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
// Complex logic to update all three`,
    issues: ["Complex state logic", "Multiple setState calls"],
    goodCode: `const [state, dispatch] = useReducer(reducer, {
  loading: false, error: null, data: null
});
// dispatch({type: 'FETCH_SUCCESS', data})`,
    improvements: ["Use useReducer", "Cleaner updates"],
    commonPattern: "Use useReducer for complex state logic"
  },
  {
    id: 27,
    category: "React Hooks",
    title: "useLayoutEffect Misuse",
    difficulty: "advanced",
    badCode: `useLayoutEffect(() => {
  fetchData().then(setData);
}, []);`,
    issues: ["Blocks painting", "Should be useEffect"],
    goodCode: `useEffect(() => {
  fetchData().then(setData);
}, []);`,
    improvements: ["Use useEffect for async", "Better performance"],
    commonPattern: "useLayoutEffect only for DOM measurements"
  },
  {
    id: 28,
    category: "React Hooks",
    title: "Context Performance",
    difficulty: "advanced",
    badCode: `<Context.Provider value={{user, setUser}}>
  <App />
</Context.Provider>`,
    issues: ["New object every render", "All consumers re-render"],
    goodCode: `const value = useMemo(() => 
  ({user, setUser}), [user]
);
<Context.Provider value={value}>
  <App />
</Context.Provider>`,
    improvements: ["Memoize context value", "Prevent re-renders"],
    commonPattern: "Memoize context values"
  },
  {
    id: 29,
    category: "React Hooks",
    title: "Previous Value Hook",
    difficulty: "intermediate",
    badCode: `const [count, setCount] = useState(0);
// No way to access previous count`,
    issues: ["Can't access previous", "Need custom hook"],
    goodCode: `function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}
const prevCount = usePrevious(count);`,
    improvements: ["Custom hook", "Track previous values"],
    commonPattern: "Use refs to track previous values"
  },
  {
    id: 30,
    category: "React Hooks",
    title: "Event Handlers in useEffect",
    difficulty: "intermediate",
    badCode: `useEffect(() => {
  window.addEventListener('resize', handleResize);
}, [handleResize]);`,
    issues: ["handleResize changes every render", "Effect runs constantly"],
    goodCode: `const handleResize = useCallback(() => {
  // logic
}, []);
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [handleResize]);`,
    improvements: ["Memoize handler", "Add cleanup"],
    commonPattern: "Memoize functions used in effects"
  },

  // STATE MANAGEMENT (31-40)
  {
    id: 31,
    category: "State Management",
    title: "Direct Mutation",
    difficulty: "beginner",
    badCode: `const [arr, setArr] = useState([]);
arr.push(item);
setArr(arr);`,
    issues: ["Mutates array", "No re-render"],
    goodCode: `const [arr, setArr] = useState([]);
setArr([...arr, item]);`,
    improvements: ["Create new array", "Triggers re-render"],
    commonPattern: "Never mutate state"
  },
  {
    id: 32,
    category: "State Management",
    title: "Nested Object Updates",
    difficulty: "intermediate",
    badCode: `const [state, setState] = useState({user: {name: ''}});
state.user.name = 'Bob';
setState(state);`,
    issues: ["Nested mutation", "Reference unchanged"],
    goodCode: `setState(s => ({
  ...s,
  user: {...s.user, name: 'Bob'}
}));`,
    improvements: ["Immutable nested update", "New references"],
    commonPattern: "Deep clone nested state updates"
  },
  {
    id: 33,
    category: "State Management",
    title: "Array Item Update",
    difficulty: "intermediate",
    badCode: `const [items, setItems] = useState([]);
items[0].name = 'New';
setItems(items);`,
    issues: ["Item mutation", "Same array reference"],
    goodCode: `setItems(items.map((item, i) => 
  i === 0 ? {...item, name: 'New'} : item
));`,
    improvements: ["Map to new array", "Immutable items"],
    commonPattern: "Map arrays for item updates"
  },
  {
    id: 34,
    category: "State Management",
    title: "State Initialization",
    difficulty: "beginner",
    badCode: `const [state, setState] = useState(
  expensiveComputation()
);`,
    issues: ["Runs on every render", "Performance issue"],
    goodCode: `const [state, setState] = useState(() => 
  expensiveComputation()
);`,
    improvements: ["Lazy initialization", "Runs once"],
    commonPattern: "Use function for expensive initial state"
  },
  {
    id: 35,
    category: "State Management",
    title: "Props in State",
    difficulty: "intermediate",
    badCode: `function Comp({initialValue}) {
  const [value, setValue] = useState(initialValue);
  return <input value={value} />;
}`,
    issues: ["Won't update with new props", "Stale state"],
    goodCode: `function Comp({value, onChange}) {
  return <input value={value} onChange={onChange} />;
}
// Or use key to reset
<Comp key={id} initialValue={value} />`,
    improvements: ["Controlled component", "Use key for reset"],
    commonPattern: "Don't sync props to state"
  },
  {
    id: 36,
    category: "State Management",
    title: "Computed State",
    difficulty: "intermediate",
    badCode: `const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
useEffect(() => {
  setTotal(items.reduce((sum, i) => sum + i.price, 0));
}, [items]);`,
    issues: ["Unnecessary state", "Extra renders"],
    goodCode: `const [items, setItems] = useState([]);
const total = useMemo(() => 
  items.reduce((sum, i) => sum + i.price, 0),
  [items]
);`,
    improvements: ["Calculate from source", "No extra state"],
    commonPattern: "Derive don't duplicate"
  },
  {
    id: 37,
    category: "State Management",
    title: "Boolean Toggle",
    difficulty: "beginner",
    badCode: `const [open, setOpen] = useState(false);
const toggle = () => setOpen(!open);`,
    issues: ["Closure over stale value", "Can fail with rapid clicks"],
    goodCode: `const [open, setOpen] = useState(false);
const toggle = () => setOpen(o => !o);`,
    improvements: ["Functional update", "Always correct"],
    commonPattern: "Use functional updates for toggles"
  },
  {
    id: 38,
    category: "State Management",
    title: "Multiple State Updates",
    difficulty: "intermediate",
    badCode: `setCount(count + 1);
setName('Bob');
setEmail('bob@ex.com');
// Three separate renders`,
    issues: ["Multiple renders", "Performance"],
    goodCode: `// In React 18+, automatic batching
setCount(count + 1);
setName('Bob');
setEmail('bob@ex.com');
// Or use single state object`,
    improvements: ["Rely on batching", "Or combine state"],
    commonPattern: "React batches updates automatically"
  },
  {
    id: 39,
    category: "State Management",
    title: "Reducer State",
    difficulty: "advanced",
    badCode: `const [items, setItems] = useState([]);
const add = () => setItems([...items, item]);
const remove = (id) => setItems(items.filter(i => i.id !== id));
const update = (id, data) => setItems(items.map(i => i.id === id ? {...i, ...data} : i));`,
    issues: ["Repetitive logic", "Error-prone"],
    goodCode: `const [items, dispatch] = useReducer((state, action) => {
  switch(action.type) {
    case 'ADD': return [...state, action.item];
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    case 'UPDATE': return state.map(i => i.id === action.id ? {...i, ...action.data} : i);
    default: return state;
  }
}, []);`,
    improvements: ["Centralized logic", "Clearer intent"],
    commonPattern: "Use reducer for complex state logic"
  },
  {
    id: 40,
    category: "State Management",
    title: "Form State",
    difficulty: "intermediate",
    badCode: `const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
return <>
  <input value={name} onChange={e => setName(e.target.value)} />
  <input value={email} onChange={e => setEmail(e.target.value)} />
</>;`,
    issues: ["Repetitive", "Many state variables"],
    goodCode: `const [form, setForm] = useState({name: '', email: '', phone: ''});
const handleChange = (e) => {
  setForm(f => ({...f, [e.target.name]: e.target.value}));
};
return <input name="email" value={form.email} onChange={handleChange} />`,
    improvements: ["Single form object", "Reusable handler"],
    commonPattern: "Group form fields in single state"
  },

  // PERFORMANCE (41-50)
  {
    id: 41,
    category: "Performance",
    title: "Missing Keys",
    difficulty: "beginner",
    badCode: `{items.map(item => <div>{item.name}</div>)}`,
    issues: ["Missing keys", "Poor reconciliation"],
    goodCode: `{items.map(item => <div key={item.id}>{item.name}</div>)}`,
    improvements: ["Add unique keys", "Better performance"],
    commonPattern: "Always add keys to lists"
  },
  {
    id: 42,
    category: "Performance",
    title: "Index as Key",
    difficulty: "intermediate",
    badCode: `{items.map((item, i) => <div key={i}>{item.name}</div>)}`,
    issues: ["Index not stable", "Reorders break"],
    goodCode: `{items.map(item => <div key={item.id}>{item.name}</div>)}`,
    improvements: ["Use stable ID", "Correct reconciliation"],
    commonPattern: "Never use index as key"
  },
  {
    id: 43,
    category: "Performance",
    title: "Unnecessary Re-renders",
    difficulty: "intermediate",
    badCode: `function Parent() {
  const [count, setCount] = useState(0);
  return <><button onClick={() => setCount(c => c + 1)} /><Child /></>;
}`,
    issues: ["Child re-renders unnecessarily"],
    goodCode: `const Child = memo(() => <div>I don't change</div>);
function Parent() {
  const [count, setCount] = useState(0);
  return <><button onClick={() => setCount(c => c + 1)} /><Child /></>;
}`,
    improvements: ["Memoize child", "Prevent re-renders"],
    commonPattern: "Use React.memo for static children"
  },
  {
    id: 44,
    category: "Performance",
    title: "Large List Rendering",
    difficulty: "advanced",
    badCode: `{items.map(item => <Item key={item.id} data={item} />)}
// 10,000 items`,
    issues: ["Renders all items", "Slow scrolling"],
    goodCode: `// Use virtual scrolling
const visibleItems = items.slice(startIndex, endIndex);
return <div onScroll={handleScroll}>
  <div style={{height: totalHeight}}>
    <div style={{transform: \`translateY(\${offset}px)\`}}>
      {visibleItems.map(item => <Item key={item.id} data={item} />)}
    </div>
  </div>
</div>`,
    improvements: ["Virtual scrolling", "Only render visible"],
    commonPattern: "Virtualize large lists"
  },
  {
    id: 45,
    category: "Performance",
    title: "Expensive Render",
    difficulty: "intermediate",
    badCode: `function Comp({data}) {
  const processed = expensiveOperation(data);
  return <div>{processed}</div>;
}`,
    issues: ["Runs every render", "Slow"],
    goodCode: `function Comp({data}) {
  const processed = useMemo(
    () => expensiveOperation(data),
    [data]
  );
  return <div>{processed}</div>;
}`,
    improvements: ["Memoize calculation", "Only recompute when needed"],
    commonPattern: "Memoize expensive operations"
  },
  {
    id: 46,
    category: "Performance",
    title: "Component Size",
    difficulty: "intermediate",
    badCode: `function MassiveComponent() {
  // 1000 lines of JSX
  return <div>...</div>;
}`,
    issues: ["Hard to optimize", "Slow re-renders"],
    goodCode: `function MassiveComponent() {
  return <><Header /><Body /><Footer /></>;
}`,
    improvements: ["Split into smaller components", "Better optimization"],
    commonPattern: "Keep components small"
  },
  {
    id: 47,
    category: "Performance",
    title: "Context Re-renders",
    difficulty: "advanced",
    badCode: `<UserContext.Provider value={{user, updateUser}}>
  <App />
</UserContext.Provider>`,
    issues: ["New object every render", "All consumers re-render"],
    goodCode: `const value = useMemo(() => ({user, updateUser}), [user]);
<UserContext.Provider value={value}>
  <App />
</UserContext.Provider>`,
    improvements: ["Memoize context value", "Fewer re-renders"],
    commonPattern: "Memoize context values"
  },
  {
    id: 48,
    category: "Performance",
    title: "CSS-in-JS Performance",
    difficulty: "advanced",
    badCode: `function Item() {
  return <div style={{color: 'red', padding: 10}}>Text</div>;
}`,
    issues: ["New style object every render", "Style recalc"],
    goodCode: `const itemStyle = {color: 'red', padding: 10};
function Item() {
  return <div style={itemStyle}>Text</div>;
}`,
    improvements: ["Define styles outside", "Reuse object"],
    commonPattern: "Extract inline styles"
  },
  {
    id: 49,
    category: "Performance",
    title: "Debounce Missing",
    difficulty: "intermediate",
    badCode: `<input onChange={e => search(e.target.value)} />`,
    issues: ["Search on every keystroke", "Too many requests"],
    goodCode: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const debouncedSearch = useMemo(
  () => debounce(search, 300),
  []
);
<input onChange={e => debouncedSearch(e.target.value)} />`,
    improvements: ["Debounce search", "Fewer requests"],
    commonPattern: "Debounce expensive operations"
  },
  {
    id: 50,
    category: "Performance",
    title: "Bundle Size",
    difficulty: "advanced",
    badCode: `// Importing large third-party package
// This adds 50KB+ to your bundle
function processData(items) {
  // Using external library function
  return externalLib.process(items);
}`,
    issues: ["Imports entire library", "Large bundle", "Unnecessary code included"],
    goodCode: `// Use native JavaScript methods
function processData(items) {
  return items.map(x => x * 2)
    .filter(x => x > 10)
    .reduce((a, b) => a + b, 0);
}

// Native methods have zero bundle cost`,
    improvements: ["Use native JavaScript APIs", "Zero bundle size impact", "Better performance"],
    commonPattern: "Prefer native APIs over library imports"
  },
  
  {
    "id": 51,
    "category": "Memory Leaks",
    "title": "Uncleared Intervals",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  setInterval(() => {\n    fetchData();\n  }, 5000);\n}, []);",
    "issues": [
      "Memory leak",
      "Interval continues after unmount"
    ],
    "goodCode": "useEffect(() => {\n  const intervalId = setInterval(() => {\n    fetchData();\n  }, 5000);\n  return () => clearInterval(intervalId);\n}, []);",
    "improvements": [
      "Clear interval on cleanup",
      "Prevent memory leaks"
    ],
    "commonPattern": "Always cleanup timers and subscriptions"
  },
  {
    "id": 52,
    "category": "Memory Leaks",
    "title": "Event Listener Not Removed",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  window.addEventListener('resize', onResize);\n}, []);",
    "issues": [
      "Event listener not removed on unmount",
      "Causes memory leaks",
      "Multiple listeners accumulate"
    ],
    "goodCode": "useEffect(() => {\n  window.addEventListener('resize', onResize);\n  return () => {\n    window.removeEventListener('resize', onResize);\n  };\n}, []);",
    "improvements": [
      "Remove event listeners on cleanup",
      "Prevents memory leaks",
      "Avoid duplicate listeners"
    ],
    "commonPattern": "Always cleanup event listeners in useEffect"
  },
  {
    "id": 53,
    "category": "Memory Leaks",
    "title": "Stale Closures Holding Memory",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "function startTimer() {\n  let counter = 0;\n  setInterval(() => {\n    console.log(counter);\n  }, 1000);\n}",
    "issues": [
      "Timer holds closure to variables indefinitely",
      "Can lead to memory leaks",
      "No way to clear interval"
    ],
    "goodCode": "function startTimer() {\n  let counter = 0;\n  const timerId = setInterval(() => {\n    console.log(counter);\n  }, 1000);\n  return () => clearInterval(timerId);\n}",
    "improvements": [
      "Maintain reference to timers",
      "Clear timers when done",
      "Prevent memory leaks"
    ],
    "commonPattern": "Always clear intervals and timeouts"
  },
  {
    "id": 54,
    "category": "Memory Leaks",
    "title": "Closure in setTimeout",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  setTimeout(() => {\n    console.log('Hello');\n  }, 1000);\n}, []);",
    "issues": [
      "Potential memory leak if timer not cleared",
      "No cleanup handler"
    ],
    "goodCode": "useEffect(() => {\n  const timeoutId = setTimeout(() => {\n    console.log('Hello');\n  }, 1000);\n  return () => clearTimeout(timeoutId);\n}, []);",
    "improvements": [
      "Clear timeout in cleanup",
      "Avoid resource leaks"
    ],
    "commonPattern": "Always clean up timeouts"
  },
  {
    "id": 55,
    "category": "Memory Leaks",
    "title": "Leaking DOM Nodes",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "function setup() {\n  const div = document.createElement('div');\n  document.body.appendChild(div);\n}",
    "issues": [
      "DOM nodes added but never removed",
      "Memory leak over time"
    ],
    "goodCode": "function setup() {\n  const div = document.createElement('div');\n  document.body.appendChild(div);\n  return () => {\n    document.body.removeChild(div);\n  };\n}",
    "improvements": [
      "Remove DOM nodes on cleanup",
      "Prevent memory leaks"
    ],
    "commonPattern": "Manage DOM insertion and removal carefully"
  },
  {
    "id": 56,
    "category": "Memory Leaks",
    "title": "Retained State Due to Long Listeners",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "const listeners = [];\nfunction addListener(el, fn) {\n  listeners.push({ el, fn });\n  el.addEventListener('click', fn);\n}",
    "issues": ["Listeners stored indefinitely", "Potential unintentional retention"],
    "goodCode": "const listeners = [];\nfunction addListener(el, fn) {\n  listeners.push({ el, fn });\n  el.addEventListener('click', fn);\n}\nfunction clearListeners() {\n  listeners.forEach(({ el, fn }) => el.removeEventListener('click', fn));\n  listeners.length = 0;\n}",
    "improvements": ["Remove listeners on cleanup", "Avoid reference buildup"],
    "commonPattern": "Clean up event listeners to prevent leaks"
  },
  {
    "id": 57,
    "category": "Memory Leaks",
    "title": "Large Data Reference Not Released",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "let cachedData;\nfunction loadData() {\n  cachedData = fetchLargeData();\n}",
    "issues": ["Large data kept in memory indefinitely", "No release mechanism"],
    "goodCode": "let cachedData;\nfunction loadData() {\n  cachedData = fetchLargeData();\n}\nfunction clearCache() {\n  cachedData = null;\n}",
    "improvements": ["Release large data references", "Avoid memory consumption"],
    "commonPattern": "Nullify large references when no longer needed"
  },
  {
    "id": 58,
    "category": "Memory Leaks",
    "title": "Missing Cleanup in Subscription",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  const sub = store.subscribe(() => updateData());\n}, []);",
    "issues": ["Subscription not unsubscribed", "Leak over component lifecycle"],
    "goodCode": "useEffect(() => {\n  const sub = store.subscribe(() => updateData());\n  return () => sub.unsubscribe();\n}, []);",
    "improvements": ["Unsubscribe on cleanup", "Avoid leaks from subscriptions"],
    "commonPattern": "Always unsubscribe from listeners"
  },
  {
    "id": 59,
    "category": "Memory Leaks",
    "title": "Reference Held in Closure",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "function setup() {\n  const largeData = fetchLargeData();\n  setTimeout(() => {\n    console.log(largeData);\n  }, 10000);\n}",
    "issues": ["Closure holds large object longer than needed", "Unnecessary memory usage"],
    "goodCode": "function setup() {\n  let largeData = fetchLargeData();\n  setTimeout(() => {\n    console.log(largeData);\n    largeData = null;\n  }, 10000);\n}",
    "improvements": ["Release references", "Manage closures carefully"],
    "commonPattern": "Avoid long-lived closures with large objects"
  },
  {
    "id": 60,
    "category": "Memory Leaks",
    "title": "Holding on to Detached DOM Nodes",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "let detachedNode;\nfunction removeElement(id) {\n  detachedNode = document.getElementById(id);\n  detachedNode.remove();\n}",
    "issues": ["Detached DOM node still referenced", "Memory leak"],
    "goodCode": "function removeElement(id) {\n  const node = document.getElementById(id);\n  if (node) {\n    node.remove();\n  }\n}",
    "improvements": ["Avoid storing detached nodes", "Let GC free resources"],
    "commonPattern": "Do not hold references to removed DOM elements"
  },
  {
    "id": 61,
    "category": "React Hooks",
    "title": "Missing Dependency in useEffect",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "function UserProfile({ userId }) {\n  useEffect(() => {\n    fetchUser(userId).then(setUser);\n  }, []);\n}",
    "issues": ["Stale closure over userId", "Won't update when userId changes"],
    "goodCode": "function UserProfile({ userId }) {\n  useEffect(() => {\n    let cancelled = false;\n    async function load() {\n      const user = await fetchUser(userId);\n      if (!cancelled) setUser(user);\n    }\n    load();\n    return () => { cancelled = true; };\n  }, [userId]);\n}",
    "improvements": ["Added userId dependency", "Cleanup function to prevent updates on unmounted"],
    "commonPattern": "Always include all effect dependencies"
  },
  {
    "id": 62,
    "category": "React Hooks",
    "title": "Improper useEffect Cleanup",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  const id = setInterval(() => doSomething(), 1000);\n}, []);",
    "issues": ["Interval not cleared", "Memory leak potential"],
    "goodCode": "useEffect(() => {\n  const id = setInterval(() => doSomething(), 1000);\n  return () => clearInterval(id);\n}, []);",
    "improvements": ["Clear intervals/timeouts on cleanup", "Prevent leaks"],
    "commonPattern": "Always clean up side effects"
  },
  {
    "id": 63,
    "category": "React Hooks",
    "title": "State Updates in useEffect Without Dependency",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  setCount(count + 1);\n}, []);",
    "issues": ["Missing dependency on count", "State might not update as expected"],
    "goodCode": "useEffect(() => {\n  setCount(c => c + 1);\n}, []);",
    "improvements": ["Use functional updates", "Avoid stale closure issues"],
    "commonPattern": "Use functional updates inside useEffect"
  },
  {
    "id": 64,
    "category": "React Hooks",
    "title": "Inline Functions Causing Re-Renders",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "function List({ items }) {\n  return items.map(item => <Item key={item.id} onClick={() => doSomething(item.id)} />);\n}",
    "issues": ["Inline functions recreate every render", "Causes unnecessary re-renders"],
    "goodCode": "const handleClick = useCallback((id) => doSomething(id), []);\nfunction List({ items }) {\n  return items.map(item => <Item key={item.id} onClick={() => handleClick(item.id)} />);\n}",
    "improvements": ["Use useCallback for handlers", "Avoid inline function creation"],
    "commonPattern": "Memoize event handlers"
  },
  {
    "id": 65,
    "category": "Promises",
    "title": "Forgotten Catch Handler",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "fetchData().then(data => process(data));",
    "issues": ["Unhandled promise rejection", "Silent failures"],
    "goodCode": "fetchData().then(data => process(data)).catch(error => console.error(error));",
    "improvements": ["Always catch promise errors", "Log errors for debugging"],
    "commonPattern": "Always handle promise rejections"
  },
  {
    "id": 66,
    "category": "Promises",
    "title": "Nested Promise Hell",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "fetchUser(userId).then(user => {\n  fetchPosts(user.id).then(posts => {\n    console.log(posts);\n  });\n});",
    "issues": ["Callback hell", "Poor readability"],
    "goodCode": "async function loadData(userId) {\n  const user = await fetchUser(userId);\n  const posts = await fetchPosts(user.id);\n  console.log(posts);\n}",
    "improvements": ["Use async/await", "Flatten promise chains"],
    "commonPattern": "Prefer async/await over nested promises"
  },
  {
    "id": 67,
    "category": "Promises",
    "title": "Promise Executor is Synchronous",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "new Promise((resolve, reject) => {\n  console.log('Start');\n  resolve(42);\n  console.log('End');\n});",
    "issues": ["Executor runs synchronously", "Block UI thread if tasks are heavy"],
    "goodCode": "async function getData() {\n  console.log('Start');\n  await Promise.resolve(42);\n  console.log('End');\n}",
    "improvements": ["Understand promise executor sync behavior", "Use async functions properly"],
    "commonPattern": "Avoid heavy synchronous code in promise executor"
  },
  {
    "id": 68,
    "category": "State Management",
    "title": "Direct State Mutation",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "const [items, setItems] = useState([]);\nitems.push(newItem);\nsetItems(items);",
    "issues": ["Mutates state directly", "React might not detect updates"],
    "goodCode": "const [items, setItems] = useState([]);\nsetItems([...items, newItem]);",
    "improvements": ["Avoid direct mutation", "Create new state objects"],
    "commonPattern": "Never mutate state directly"
  },
  {
    "id": 69,
    "category": "State Management",
    "title": "Multiple State Updates Causing Re-Renders",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "setCount(count + 1);\nsetName('John');\nsetAge(30);",
    "issues": ["Each update causes a re-render", "Performance impact"],
    "goodCode": "setState({\n  count: count + 1,\n  name: 'John',\n  age: 30\n});",
    "improvements": ["Batch updates", "Use single state object"],
    "commonPattern": "Minimize re-renders by batching state updates"
  },
  {
    "id": 70,
    "category": "State Management",
    "title": "Using useReducer for Complex State",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "const [loading, setLoading] = useState(false);\nconst [error, setError] = useState(null);\nconst [data, setData] = useState(null);\n// separate state for related data",
    "issues": ["Multiple related states", "Hard to manage updates"],
    "goodCode": "const [state, dispatch] = useReducer(reducer, {\n  loading: false,\n  error: null,\n  data: null\n});",
    "improvements": ["Centralize state management", "Simplify updates"],
    "commonPattern": "Use useReducer for complex related state"
  }
  ,{
    "id": 71,
    "category": "Memory Leaks",
    "title": "Detached Timer Not Cleared",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  setTimeout(() => {\n    console.log('Delayed action');\n  }, 3000);\n}, []);",
    "issues": ["Timer not cleared on unmount", "Potential memory leak"],
    "goodCode": "useEffect(() => {\n  const timeoutId = setTimeout(() => {\n    console.log('Delayed action');\n  }, 3000);\n  return () => clearTimeout(timeoutId);\n}, []);",
    "improvements": ["Clear timers during cleanup", "Avoid leaks"],
    "commonPattern": "Always cleanup timers in useEffect"
  },
  {
    "id": 72,
    "category": "Memory Leaks",
    "title": "Unremoved MutationObserver",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  const observer = new MutationObserver(handleMutations);\n  observer.observe(document.body, { childList: true });\n}, []);",
    "issues": ["Observer not disconnected on unmount", "Leads to memory leaks"],
    "goodCode": "useEffect(() => {\n  const observer = new MutationObserver(handleMutations);\n  observer.observe(document.body, { childList: true });\n  return () => observer.disconnect();\n}, []);",
    "improvements": ["Disconnect observers on unmount", "Prevent memory leaks"],
    "commonPattern": "Always cleanup observers"
  },
  {
    "id": 73,
    "category": "Memory Leaks",
    "title": "Unsubscribed WebSocket",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  const ws = new WebSocket('wss://example.com');\n  ws.onmessage = handleMessage;\n}, []);",
    "issues": ["WebSocket not closed on unmount", "Leads to ongoing resource usage"],
    "goodCode": "useEffect(() => {\n  const ws = new WebSocket('wss://example.com');\n  ws.onmessage = handleMessage;\n  return () => ws.close();\n}, []);",
    "improvements": ["Close WebSockets to free resources", "Avoid leaks"],
    "commonPattern": "Close WebSocket connections on cleanup"
  },
  {
    "id": 74,
    "category": "Memory Leaks",
    "title": "Unremoved Window Resize Listener",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  window.addEventListener('resize', handleResize);\n}, []);",
    "issues": ["Event listener not removed", "Memory leak risk"],
    "goodCode": "useEffect(() => {\n  window.addEventListener('resize', handleResize);\n  return () => window.removeEventListener('resize', handleResize);\n}, []);",
    "improvements": ["Remove listeners on cleanup", "Free memory"],
    "commonPattern": "Clean event listeners on unmount"
  },
  {
    "id": 75,
    "category": "Memory Leaks",
    "title": "Stale References in Closures",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "function setup() {\n  const data = fetchLargeData();\n  setTimeout(() => {\n    console.log(data);\n  }, 10000);\n}",
    "issues": ["Closure holds large data too long", "Memory leak potential"],
    "goodCode": "function setup() {\n  let data = fetchLargeData();\n  setTimeout(() => {\n    console.log(data);\n    data = null;\n  }, 10000);\n}",
    "improvements": ["Clear references", "Minimize memory usage"],
    "commonPattern": "Avoid keeping large data in closures"
  },
  {
    "id": 76,
    "category": "React Hooks",
    "title": "Incorrect Dependency Array in Custom Hook",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "function useData(id) {\n  useEffect(() => {\n    fetchData(id).then(setData);\n  }, []);\n}",
    "issues": ["Missing dependency 'id'", "State may be stale"],
    "goodCode": "function useData(id) {\n  useEffect(() => {\n    let cancelled = false;\n    fetchData(id).then(data => {\n      if (!cancelled) setData(data);\n    });\n    return () => { cancelled = true; };\n  }, [id]);\n}",
    "improvements": ["List all dependencies", "Add cleanup function"],
    "commonPattern": "Declare all dependencies in useEffect"
  },
  {
    "id": 77,
    "category": "React Hooks",
    "title": "Missing Cleanup in useEffect",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  setInterval(() => tick(), 1000);\n}, []);",
    "issues": ["Interval runs after unmount", "Memory leak"],
    "goodCode": "useEffect(() => {\n  const id = setInterval(() => tick(), 1000);\n  return () => clearInterval(id);\n}, []);",
    "improvements": ["Cleanup intervals", "Avoid leaks"],
    "commonPattern": "Cleanup side effects in useEffect"
  },
  {
    "id": 78,
    "category": "React Hooks",
    "title": "Using Inline Functions Causing Re-Renders",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "const list = items.map(item => <Item onClick={() => handleClick(item.id)} />);",
    "issues": ["Function re-created on every render", "Leads to preventable re-renders"],
    "goodCode": "const memoizedHandler = useCallback(id => handleClick(id), []);\nconst list = items.map(item => <Item onClick={() => memoizedHandler(item.id)} />);",
    "improvements": ["Memoize callbacks", "Prevent unnecessary renders"],
    "commonPattern": "Use useCallback for handlers"
  },
  {
    "id": 79,
    "category": "React Hooks",
    "title": "Stale State in Event Handler",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "const [count, setCount] = useState(0);\nconst onClick = () => {\n  setTimeout(() => setCount(count + 1), 1000);\n};",
    "issues": ["Closure over stale count", "Incorrect updates on rapid clicks"],
    "goodCode": "const onClick = () => {\n  setTimeout(() => setCount(prev => prev + 1), 1000);\n};",
    "improvements": ["Use functional updates", "Correct count value"],
    "commonPattern": "Use functional updates for dependent state"
  },
  {
    "id": 80,
    "category": "React Hooks",
    "title": "Conditional Hook Calls",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "if (condition) {\n  useEffect(() => {\n    doSomething();\n  }, []);\n}",
    "issues": ["Hooks conditionally called", "Violation of hooks rules"],
    "goodCode": "useEffect(() => {\n  if (condition) doSomething();\n}, [condition]);",
    "improvements": ["Always call hooks unconditionally", "Use conditions inside"],
    "commonPattern": "Do not call hooks conditionally"
  },
  {
    "id": 81,
    "category": "Promises",
    "title": "Uncaught Promise Rejection",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "fetchData().then(data => process(data));",
    "issues": ["Uncaught rejection", "Potential silent failure"],
    "goodCode": "fetchData().then(data => process(data)).catch(error => console.error(error));",
    "improvements": ["Always handle promise errors", "Log and manage failures"],
    "commonPattern": "Add catch handlers to promises"
  },
  {
    "id": 82,
    "category": "Promises",
    "title": "Promise Callback Hell",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "fetchUser(userId).then(user => {\n  fetchPosts(user.id).then(posts => {\n    console.log(posts);\n  });\n});",
    "issues": ["Nesting makes code unreadable", "Hard to maintain"],
    "goodCode": "async function load() {\n  const user = await fetchUser(userId);\n  const posts = await fetchPosts(user.id);\n  console.log(posts);\n}",
    "improvements": ["Use async/await syntax", "Flatten promise chains"],
    "commonPattern": "Prefer async/await over nested promises"
  },
  {
    "id": 83,
    "category": "Promises",
    "title": "Missing Promise Return",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "function getUser() {\n  fetch('/user').then(res => res.json());\n}",
    "issues": ["No returned promise", "Caller cannot await"],
    "goodCode": "function getUser() {\n  return fetch('/user').then(res => res.json());\n}",
    "improvements": ["Return promise to allow chaining", "Support async usage"],
    "commonPattern": "Return promises from functions"
  },
  {
    "id": 84,
    "category": "Promises",
    "title": "Mixing Callbacks and Promises",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "function doSomething(cb) {\n  fetch('/data').then(res => cb(res));\n}",
    "issues": ["Callback based on promises", "Mixes paradigms"],
    "goodCode": "function doSomething() {\n  return fetch('/data');\n}\n// usage\n// doSomething().then(res => ...);",
    "improvements": ["Use one async paradigm", "Prefer promises or async/await"],
    "commonPattern": "Avoid mixing callbacks and promises"
  },
  {
    "id": 85,
    "category": "State Management",
    "title": "Direct State Mutation",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "const [list, setList] = useState([]);\nlist.push(newItem);\nsetList(list);",
    "issues": ["Direct mutation", "React may not detect changes"],
    "goodCode": "const [list, setList] = useState([]);\nsetList([...list, newItem]);",
    "improvements": ["Always create new arrays/objects", "Do not mutate state directly"],
    "commonPattern": "Never mutate state directly"
  },
  {
    "id": 86,
    "category": "State Management",
    "title": "Multiple Independent State Updates",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "setName('Alice');\nsetAge(30);\nsetCountry('USA');",
    "issues": ["Multiple re-renders", "Performance overhead"],
    "goodCode": "setState(prev => ({...prev, name: 'Alice', age: 30, country: 'USA'}));",
    "improvements": ["Batch state updates", "Reduce renders"],
    "commonPattern": "Batch related state changes"
  },
  {
    "id": 87,
    "category": "State Management",
    "title": "Incorrect useState Initialization",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "const [count, setCount] = useState(expensiveCalculation());",
    "issues": ["Expensive calculation runs every render"],
    "goodCode": "const [count, setCount] = useState(() => expensiveCalculation());",
    "improvements": ["Use lazy initialization", "Improve performance"],
    "commonPattern": "Use function form to lazy initialize state"
  },
  {
    "id": 88,
    "category": "State Management",
    "title": "Using useReducer for Complex State",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "const [loading, setLoading] = useState(false);\nconst [error, setError] = useState(null);\nconst [data, setData] = useState(null);\n// complex state management",
    "issues": ["Multiple states hard to coordinate"],
    "goodCode": "const [state, dispatch] = useReducer(reducer, { loading: false, error: null, data: null });",
    "improvements": ["Centralize state logic", "Cleaner updates"],
    "commonPattern": "Use useReducer for complex related state"
  },
  {
    "id": 89,
    "category": "State Management",
    "title": "Overuse of State",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "const [count, setCount] = useState(0);\nconst [loading, setLoading] = useState(false);\nconst [error, setError] = useState(null);",
    "issues": ["Too many separate states", "Performance and complexity"],
    "goodCode": "const [state, setState] = useState({ count: 0, loading: false, error: null });",
    "improvements": ["Group related state", "Simplify component"],
    "commonPattern": "Group related states into objects"
  },
  {
    "id": 90,
    "category": "State Management",
    "title": "Derived State Anti-pattern",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "const [items, setItems] = useState([]);\nconst [count, setCount] = useState(items.length);",
    "issues": ["Duplicate state source of truth", "Hard to keep in sync"],
    "goodCode": "const [items, setItems] = useState([]);\nconst count = items.length;",
    "improvements": ["Calculate derived state inline", "Avoid duplicating state"],
    "commonPattern": "Avoid derived state in useState"
  },  {
    "id": 91,
    "category": "Memory Leaks",
    "title": "Effect Missing Cleanup Causes Leak",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  const interval = setInterval(() => {\n    fetchData();\n  }, 2000);\n});",
    "issues": ["Interval is never cleared", "Leads to memory leak when component unmounts"],
    "goodCode": "useEffect(() => {\n  const interval = setInterval(() => {\n    fetchData();\n  }, 2000);\n  return () => clearInterval(interval);\n}, []);",
    "improvements": ["Always clear intervals in cleanup", "Prevent timer leaks"],
    "commonPattern": "Effect cleanup prevents memory leaks"
  },
  {
    "id": 92,
    "category": "Memory Leaks",
    "title": "Not Unsubscribing from Observable",
    "difficulty": "advanced",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  const subscription = observable.subscribe(handleData);\n}, []);",
    "issues": ["No unsubscription on unmount", "Keeps memory and event listeners alive"],
    "goodCode": "useEffect(() => {\n  const subscription = observable.subscribe(handleData);\n  return () => subscription.unsubscribe();\n}, []);",
    "improvements": ["Unsubscribe in cleanup", "Release resources"],
    "commonPattern": "Always unsubscribe to prevent leaks"
  },
  {
    "id": 93,
    "category": "React Hooks",
    "title": "Missing Dependency Array Leads to Stale State",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "useEffect(() => {\n  fetchApi(userId).then(setData);\n}, []);",
    "issues": ["Missing userId dependency", "Effect won’t respond to userId changes"],
    "goodCode": "useEffect(() => {\n  fetchApi(userId).then(setData);\n}, [userId]);",
    "improvements": ["Add all effect dependencies", "Avoid stale closures"],
    "commonPattern": "Proper dependency management in hooks"
  },
  {
    "id": 94,
    "category": "React Hooks",
    "title": "Inline Function Causes Re-renders",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "return <button onClick={() => doAction(id)}>Click</button>;",
    "issues": ["New function instance each render", "Child components re-render unnecessarily"],
    "goodCode": "const handleClick = useCallback(() => doAction(id), [id]);\nreturn <button onClick={handleClick}>Click</button>;",
    "improvements": ["Memoize functions with useCallback", "Improve render performance"],
    "commonPattern": "Avoid inline functions in props"
  },
  {
    "id": 95,
    "category": "Promises",
    "title": "Uncaught Promise Rejection",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "fetchData().then(processData);",
    "issues": ["No error handler", "Unhandled promise rejection risk"],
    "goodCode": "fetchData().then(processData).catch(console.error);",
    "improvements": ["Always handle promise rejection", "Log errors for debugging"],
    "commonPattern": "Handle all promise errors"
  },
  {
    "id": 96,
    "category": "Promises",
    "title": "Nested Promise Callback Hell",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "fetchUser(userId).then(user => {\n  fetchPosts(user.id).then(posts => {\n    console.log(posts);\n  });\n});",
    "issues": ["Complex nested callbacks", "Hard to read and maintain"],
    "goodCode": "async function loadData() {\n  const user = await fetchUser(userId);\n  const posts = await fetchPosts(user.id);\n  console.log(posts);\n}",
    "improvements": ["Use async/await", "Improve readability"],
    "commonPattern": "Use async/await over nested .then chains"
  },
  {
    "id": 97,
    "category": "State Management",
    "title": "Direct State Mutation Prevents Update",
    "difficulty": "beginner",
    "language": "javascript",
    "badCode": "const [items, setItems] = useState([]);\nitems.push(newItem);\nsetItems(items);",
    "issues": ["Mutates array directly", "React fails to detect changes"],
    "goodCode": "setItems(prevItems => [...prevItems, newItem]);",
    "improvements": ["Always create new state objects", "Avoid mutations"],
    "commonPattern": "Never mutate state directly"
  },
  {
    "id": 98,
    "category": "State Management",
    "title": "Multiple Related States Instead of One Object",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "const [name, setName] = useState('');\nconst [email, setEmail] = useState('');\nconst [phone, setPhone] = useState('');",
    "issues": ["Too many separate state variables", "Complex management"],
    "goodCode": "const [form, setForm] = useState({ name: '', email: '', phone: '' });",
    "improvements": ["Group related state", "Simplify updates"],
    "commonPattern": "Group related state into a single object"
  },
  {
    "id": 99,
    "category": "State Management",
    "title": "Derived State Duplicates Source",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "const [items, setItems] = useState([]);\nconst [count, setCount] = useState(items.length);",
    "issues": ["Duplicated state leads to sync issues", "Extra renders"],
    "goodCode": "const [items, setItems] = useState([]);\nconst count = items.length;",
    "improvements": ["Calculate derived values inline", "Avoid unnecessary state"],
    "commonPattern": "Avoid storing derived state"
  },
  {
    "id": 100,
    "category": "State Management",
    "title": "Updating State Based on Previous Values",
    "difficulty": "intermediate",
    "language": "javascript",
    "badCode": "setCount(count + 1);",
    "issues": ["State may be stale in async scenarios"],
    "goodCode": "setCount(prev => prev + 1);",
    "improvements": ["Use functional state updates when relying on previous state"],
    "commonPattern": "Use functional update form for dependent states"
  }
];