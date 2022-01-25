import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useGenres(movieID) {
    const { data, error } = useSWR(`/api/movies/${movieID}/genres`, fetcher);

    return {
        genres: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export default useGenres;
