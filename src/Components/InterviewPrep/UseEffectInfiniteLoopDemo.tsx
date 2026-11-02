import { useEffect, useRef, useState } from "react";

interface User {
  id: number;
  name: string;
}

// GET — loads the list. A short artificial delay so, in the buggy version
// below, you can actually watch each call happen instead of it all finishing
// within one blink.
async function fetchUsers(): Promise<User[]> {
  const [response] = await Promise.all([
    fetch("https://dummyjson.com/users?limit=5"),
    new Promise(resolve => setTimeout(resolve, 400)),
  ]);
  const data = await response.json();
  return data.users;
}

// POST — really saves a new user. This is a genuine action, so it always
// deserves exactly one real API call — in both versions.
async function addUserApi(name: string): Promise<User> {
  const response = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName: name }),
  });
  const data = await response.json();
  return { id: data.id, name: data.firstName };
}

// BUGGY: the GET Effect's dependency is [users] — but the Effect's own job is
// to call setUsers. So the very FIRST automatic fetch already changes `users`,
// which re-triggers this same Effect, which fetches again, which changes
// `users` again... This starts the instant the component mounts. It does not
// need you to click anything — that's the actual bug.
function BuggyUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const apiCalls = useRef(0);
  const stopped = useRef(false); // only so this demo page can't freeze itself — real broken code has no stop

  useEffect(() => {
    if (stopped.current) return;
    apiCalls.current += 1;
    if (apiCalls.current >= 8) stopped.current = true;
    fetchUsers().then(setUsers); // <-- setUsers here is what re-renders and shows the updated count
  }, [users]); // <-- THE BUG: watches the exact state this Effect (and addUser) sets

  async function addUser() {
    apiCalls.current += 1; // the POST call
    const newUser = await addUserApi(`User ${users.length + 1}`);
    setUsers(prev => [...prev, newUser]); // <-- this alone re-triggers the GET Effect above
  }

  return (
    <div className="space-y-2 rounded border-2 border-red-500 p-4">
      <h2 className="font-semibold text-red-500">Buggy — GET Effect depends on [users]</h2>
      <p>Users: {users.length}</p>
      <p>
        API called: {apiCalls.current} time{apiCalls.current === 1 ? "" : "s"}
        {!stopped.current && " — climbing on its own, before any click…"}
        {stopped.current && " — stopped only by this demo's safety cap; real broken code never stops"}
      </p>
      <button type="button" className="border rounded px-3 py-1" onClick={addUser}>
        Add user
      </button>
    </div>
  );
}

// FIXED: the GET Effect's dependency is [], so it only ever runs once, on
// mount. Nothing here is watching `users`, so setting it — whether from the
// GET response or from "Add user" — never re-triggers this Effect.
function FixedUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const apiCalls = useRef(0);

  useEffect(() => {
    apiCalls.current += 1;
    fetchUsers().then(setUsers);
  }, []); // <-- THE FIX: nothing reactive here should restart this Effect

  async function addUser() {
    apiCalls.current += 1; // the POST call — the only thing that ever bumps this counter again
    const newUser = await addUserApi(`User ${users.length + 1}`);
    setUsers(prev => [...prev, newUser]);
  }

  return (
    <div className="space-y-2 rounded border-2 border-green-600 p-4">
      <h2 className="font-semibold text-green-500">Fixed — GET Effect depends on []</h2>
      <p>Users: {users.length}</p>
      <p>API called: {apiCalls.current} time{apiCalls.current === 1 ? "" : "s"} — only ever moves when you click.</p>
      <button type="button" className="border rounded px-3 py-1" onClick={addUser}>
        Add user
      </button>
    </div>
  );
}

export default function UseEffectInfiniteLoopDemo() {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">useEffect — infinite API loop: buggy vs fixed</h1>
      <p>
        Watch the count on load, <strong>before you click anything</strong>: Fixed settles at 1 and stops.
        Buggy keeps climbing by itself, with no click involved — that's the whole bug, it never needed your
        input to break.
      </p>
      <p>
        Now click <strong>Add user</strong> in each: a real save should cost exactly one API call, and that's
        what happens in Fixed (count goes up by 1, every time, and only then). In Buggy, that one save still
        triggers the same runaway chain as before — it's just adding fuel to a fire that was already burning.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <BuggyUsers />
        <FixedUsers />
      </div>
    </section>
  );
}
