function set (key, value) {
    localStorage.setItem(key, value);
};

function fetch (key) {
    return localStorage.getItem(key);
};

function remove (key) {
    localStorage.removeItem(key);
}

export { set, fetch, remove };
