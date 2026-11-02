// COMPONENT LAYER — owns UI state (current page, loading, error, data) and
// renders the screen. It calls fetchPostsPage() and has NO idea axios or a
// URL exists underneath — that split is the whole point of a service file.
import { useState, useEffect } from "react";
import { fetchPostsPage } from "./postService";

const PAGE_SIZE = 5;

const PaginatedPostsList = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Re-runs every time `page` changes — that's what makes clicking
  // Previous/Next actually fetch a new page of data.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchPostsPage(page, PAGE_SIZE)
      .then((result) => {
        if (cancelled) return;
        setPosts(result.posts);
        setTotalPages(result.totalPages);
        setError(null);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load posts.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true; // avoid setting state if the page changed again before this finished
    };
  }, [page]);

  return (
    <div className="p-4 max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Paginated Posts (demo)</h2>

      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-2 mb-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white rounded-lg shadow p-3">
              <p className="text-sm font-medium capitalize">{post.title}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
          className="px-3 py-1 border rounded-md text-sm disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
          className="px-3 py-1 border rounded-md text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedPostsList;
