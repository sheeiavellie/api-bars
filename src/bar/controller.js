const pool = require('../database');
const queries = require('./queries');
const s3 = require('../s3');
const uuid = require('uuid');

const getBars = async (req, res) => {
    try {
        const results = await pool.query(queries.getBars);

        if(!results.rows.length)
        {
            res.send(`No bars exist!`);
            return;
        }

        for(const bar of results.rows)
        {
            bar["image_url"] = (await s3.getSignedUrl('images/', bar.image_name)).signedURL;
        };

        res.status(200).json(results.rows);
    } catch(err) {
        res.status(500);
        console.log(err);
    }
};

const getBarById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await pool.query(queries.getBarById, [id]);

        const noBarFound = !results.rows.length;
        if(noBarFound)
        {
            res.status(400).send(`Bar ${id} doesn't exist!`);
            return;
        }

        results.rows[0]["image_url"] = (await s3.getSignedUrl('images/', results.rows[0].image_name)).signedURL;

        res.status(200).json(results.rows);
    } catch(err) {
        res.status(500);
        console.log(err);
    }
};

const addBar = async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);

    const imageName = uuid.v4();
    const buffer = req.file.buffer;

    const { name, description, rating, geolocation, author } = req.body;

    if(Number(rating) > 5 || Number(rating) < 1)
    {
        res.status(400).send("Invalid input: Raiting can only be from 1 to 5!");
        return;
    }

    try {
        const barExist = (await pool.query(queries.checkGeolocationExist, [geolocation])).rows.length;
        if(barExist) {
            res.status(400).send("Bar already exist.");
            return;
        }

        const upload = await s3.s3.Upload({
            buffer: buffer,
            name: `${imageName}.png`,
            },
            '/images/'
        );

        const results = await pool.query(queries.addBar, [imageName, name, description, rating, geolocation, author]);
        res.status(201).send("Bar created successfully!");
    } catch(err) {
        res.status(500);
        console.log(err);
    }
};

const removeBar = async (req, res) => {
    const id = parseInt(req.params.id);   

    try {
        const bar = await pool.query(queries.getBarById, [id]);

        const noBarFound = !bar.rows.length;
        if(noBarFound)
        {
            res.status(400).send(`Bar ${id} doesn't exist!`);
            return;
        }

        console.log(bar.rows[0].image_name);

        const results = await pool.query(queries.removeBar, [id])
        const remove = await s3.s3.Remove(`images/${bar.rows[0].image_name}.png`);

        res.status(200).send("Bar removed successfully!");
    } catch(err) {
        res.status(500);
        console.log(err);
    }
};

module.exports = {
    getBars,
    getBarById,
    addBar,
    removeBar,
};
