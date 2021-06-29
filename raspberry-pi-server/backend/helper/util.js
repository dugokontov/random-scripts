exports.log = (...args) => {
    console.log(`[${new Date().toLocaleString()}]`, ...args);
};

exports.error = (...args) => {
    console.error(`[${new Date().toLocaleString()}]`, ...args);
};
