import ReactDOM from 'react-dom';
import { useState } from 'react';
import EditButton from '../icons/edit.svg';
import DeleteButton from '../icons/delete.svg';
import SortButton from '../icons/sort.svg';
import Image from 'next/image';
import MovieModal from './MovieModal';

const modalRoot = process.browser
    ? document.querySelector('#modal-root')
    : null;

function MovieTable({ movies }) {
    return (
        <table className="w-full h-full">
            <thead>
                <tr>
                    <th className="text-2xl">Picture</th>
                    <th className="text-2xl text-left">
                        <div className="flex gap-1">
                            Movie Title{' '}
                            <SortButton className="cursor-pointer" />
                        </div>
                    </th>
                    <th className="text-2xl">
                        <div className="flex justify-center gap-1">
                            Rating <SortButton className="cursor-pointer" />
                        </div>
                    </th>
                    <th className="text-2xl">
                        <div className="flex justify-center gap-1">
                            Year <SortButton className="cursor-pointer" />
                        </div>
                    </th>
                    <th className="sr-only">Edit and Delete Buttons</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie, index) => (
                    <MovieRow
                        key={movie.id}
                        info={movie}
                        isEven={index % 2 === 0}
                    />
                ))}
            </tbody>
        </table>
    );
}

function MovieRow({ info, isEven }) {
    const [showModal, setShowModal] = useState(false);
    const className = 'px-4 text-xl cursor-pointer hover:bg-gray-300';

    const handleClick = () => {
        setShowModal(!showModal);
    };

    const removeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <tr
                className={isEven ? `bg-blue-100 ${className}` : className}
                onClick={handleClick}
            >
                <td className="w-[20%] text-center">
                    <div className="flex justify-center align-bottom">
                        <Image
                            src={`https://api.lorem.space/image/movie?w=300&h=440&x=${
                                (Math.random() * 15) | 0
                            }`}
                            alt="movie poster"
                            width={150 * 0.5}
                            height={220 * 0.5}
                            quality={1}
                        />
                    </div>
                </td>
                <td className="w-[50%] text-left">{info.title}</td>
                <td className="w-[10%] text-center">{info.rating || 'N/A'}</td>
                <td className="w-[10%] text-center">{info.year}</td>
                <td>
                    <div className="flex justify-end gap-2 pr-5">
                        <EditButton />
                        <DeleteButton />
                    </div>
                </td>
            </tr>
            {showModal ? (
                ReactDOM.createPortal(
                    <MovieModal info={info} removeModal={removeModal} />,
                    modalRoot
                )
            ) : (
                <></>
            )}
        </>
    );
}

export default MovieTable;
