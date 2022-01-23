import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useActors(movieID) {
    const { data, error } = useSWR(`/api/movies/${movieID}/actors`, fetcher);

    return {
        actors: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export default useActors;
