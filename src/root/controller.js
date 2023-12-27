const getRoot = async (req, res) => {
    res.status(200).send("Welcome to Pullaptica open API!");
};

module.exports = {
    getRoot,
};