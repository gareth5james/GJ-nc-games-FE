function SortBy ({sortBy, setSortBy, orderBy, setOrderBy}) {
    return <div><label htmlFor="sort_by">Sort </label>
                <select id="sort_by" value={sortBy} onChange={(event => {
                    setSortBy(event.target.value)
                    })}>
                    <option key="title" value="title">Title</option>
                    <option key="designer" value="designer">Designer</option>
                    <option key="owner" value="owner">Owner</option>
                    <option key="created_at" value="created_at">Date</option>
                    <option key="votes" value="votes">Votes</option>
                    <option key="comment_count" value="comment_count"># of Comments</option>
                </select>
                <select id="order_by" value={orderBy} onChange={(event) => {
                    setOrderBy(event.target.value)
                }}>
                    <option key="asc" value="asc">Ascending</option>
                    <option key="desc" value="desc">Descending</option>
                </select>
            </div>
}

export default SortBy