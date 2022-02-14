import queryObj from '/utils/query';
const { query, insertQuery } = queryObj;

async function postMovieInfo(req, res) {
    const { title, year, rating, id } = req.body;
    try {
        await insertQuery(
            `
             insert into movies values ('${id}', '${title
                .replaceAll("'", "\\'")
                .replaceAll('"', '\\"')}', ${year}, ${rating})`,
            { year }
        );
        res.json({ msg: 'Data inserted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Data not inserted' });
    }
}

async function getAllMovieData(req, res) {
    try {
        const data = await query(`
    select movies.id as id, movies.name as title, movies.rank as rating, movies.year
    from movies 
    where movies.rank is not null
    `);

        const movies = data[0];
        res.json(movies);
    } catch (err) {
        res.json({ msg: err });
    }
}

async function handler(req, res) {
    if (req.method === 'GET') {
        await getAllMovieData(req, res);
    } else if (req.method === 'POST') {
        await postMovieInfo(req, res);
    }
}

export default handler;
