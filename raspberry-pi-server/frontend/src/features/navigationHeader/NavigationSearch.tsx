import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

export function NavigationSearch() {
    const [query, setQuery] = useState('');
    const history = useHistory();

    const openSearchPage = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (query.trim()) {
                history.push(`/search/${encodeURIComponent(query)}`);
            }
        },
        [history, query]
    );

    return (
        <form className="d-flex" onSubmit={openSearchPage}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Item name or description"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
                Search
            </button>
        </form>
    );
}
