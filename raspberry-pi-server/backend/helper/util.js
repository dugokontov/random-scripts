exports.log = (...args) => {
    console.log(`[${new Date().toLocaleString()}]`, ...args);
};
