import Modal from './Modal';
import Image from 'next/image';
import useDirectors from '../hooks/useDirectors';
import useActors from '../hooks/useActors';
import useGenres from '../hooks/useGenres';
import Spinner from './Spinner';
import { useState } from 'react';

function MovieModal({ info, removeModal }) {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const { directors, isLoading: isDirectorLoading } = useDirectors(info.id);
    const { actors, isLoading: isActorLoading } = useActors(info.id);
    const { genres, isLoading: isGenreLoading } = useGenres(info.id);

    const handleOnLoadImage = () => {
        setIsImageLoading(false);
    };

    const isLoading = () => {
        return (
            isImageLoading ||
            isDirectorLoading ||
            isActorLoading ||
            isGenreLoading
        );
    };

    return (
        <Modal removeModal={removeModal}>
            <div className="flex justify-center">
                <MovieModalImage
                    info={info}
                    isLoading={isLoading()}
                    handleOnLoad={handleOnLoadImage}
                />
                {!isLoading() ? (
                    <MovieModalContent
                        info={info}
                        directors={directors}
                        actors={actors}
                        genres={genres}
                    />
                ) : (
                    <div className="flex justify-center items-center">
                        <Spinner />
                    </div>
                )}
            </div>
        </Modal>
    );
}

function MovieModalImage({ info, isLoading, handleOnLoad }) {
    return (
        <div className={isLoading ? 'hidden' : ''}>
            <Image
                src={`https://api.lorem.space/image/movie?w=300&h=440&x=${info.title}`}
                alt={`poster of ${info.title}`}
                width={300 * 0.9}
                height={440 * 0.9}
                onLoad={handleOnLoad}
            />
        </div>
    );
}

function MovieModalContent({ info, directors, actors, genres }) {
    return (
        <div className="w-2/3">
            <p className="ml-5 mb-3 text-3xl font-black">{info.title}</p>
            <div className="ml-5 flex flex-col">
                <div className="flex">
                    <p className="mr-2 w-16">Rating:</p>
                    <p className=""> {info.rating}</p>
                </div>
                <div className="flex">
                    <p className="mr-2 w-16">Year:</p>
                    <p className=""> {info.year}</p>
                </div>
                <div className="flex">
                    <p className="mr-2 w-16">Genre:</p>
                    <p className="">
                        {genres.map(({ genre }) => genre).join(', ')}
                    </p>
                </div>
                <div className="flex">
                    <p className="mr-2 w-16">Director:</p>
                    <p className="">
                        {directors
                            .map(
                                ({ first_name, last_name }) =>
                                    `${first_name} ${last_name}`
                            )
                            .join(', ')}
                    </p>
                </div>
                <div className="flex">
                    <p className="mr-2 min-w-[4rem]">Actor:</p>
                    <p className="pr-2 text-justify max-h-[240px] overflow-y-auto">
                        {actors
                            .map(
                                ({ first_name, last_name }) =>
                                    `${first_name} ${last_name}`
                            )
                            .join(', ')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;
