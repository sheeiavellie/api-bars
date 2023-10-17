const getBars = 'SELECT * FROM bars';
const getBarById = 'SELECT * FROM bars WHERE ID = $1';
const checkGeolocationExist = 'SELECT b FROM bars b WHERE b.geolocation ~= $1';
const addBar = 'INSERT INTO bars (image_name, name, description, char_emoji, geolocation, author) VALUES ($1, $2, $3, $4, $5, $6)';
const removeBar = 'DELETE FROM bars WHERE ID = $1';

module.exports = {
    getBars,
    getBarById,
    checkGeolocationExist,
    addBar,
    removeBar,
};
