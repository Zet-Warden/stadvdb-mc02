import Modal from './Modal';
import Image from 'next/image';
import useDirectors from '../hooks/useDirectors';
import useActors from '../hooks/useActors';
import useGenres from '../hooks/useGenres';

function MovieModal({ info, removeModal }) {
    const { directors, isLoading: isDirectorLoading } = useDirectors(info.id);
    const { actors, isLoading: isActorLoading } = useActors(info.id);
    const { genres, isLoading: isGenreLoading } = useGenres(info.id);

    return (
        <Modal removeModal={removeModal}>
            <div className="flex">
                <div>
                    <Image
                        src={`https://api.lorem.space/image/movie?w=300&h=440&x=${info.title}`}
                        alt={`poster of ${info.title}`}
                        width={300 * 0.9}
                        height={440 * 0.9}
                    />
                </div>

                <div className="w-1/2">
                    <p className="ml-5 mb-3 text-3xl font-black">
                        {info.title}
                    </p>
                    <div className="flex">
                        <div className="ml-5 mr-2">
                            <p>Rating:</p>
                            <p>Year:</p>
                            <p>Genre:</p>
                            <p>Director:</p>
                            <p className="mt-1">Actor:</p>
                        </div>
                        {!isDirectorLoading &&
                        !isActorLoading &&
                        !isGenreLoading ? (
                            <div className="text-md">
                                <p className=""> {info.rating}</p>
                                <p className=""> {info.year}</p>
                                <p className="">
                                    {genres
                                        .map(({ genre }) => genre)
                                        .join(', ')}
                                </p>
                                <p className="">
                                    {directors
                                        .map(
                                            ({ first_name, last_name }) =>
                                                `${first_name} ${last_name}`
                                        )
                                        .join(', ')}
                                </p>
                                <p className="mt-1 pr-2 text-justify max-h-[240px] overflow-y-auto">
                                    {actors
                                        .map(
                                            ({ first_name, last_name }) =>
                                                `${first_name} ${last_name}`
                                        )
                                        .join(', ')}
                                </p>
                            </div>
                        ) : (
                            <p>is loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default MovieModal;
