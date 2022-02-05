import query from '/utils/query';

async function getActorsByMovieID(req, res) {
    const { movieID } = req.query;
    const data = await query(`
    select actors.first_name, actors.last_name
    from actors
    join roles on actors.id = roles.actor_id
    join movies on roles.movie_id = movies.id
    where movies.id = ${movieID};`);

    const actors = data[0];
    res.json(actors);
}

export default getActorsByMovieID;
