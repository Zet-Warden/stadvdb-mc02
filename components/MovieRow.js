import Image from 'next/image';
import EditButton from '../icons/edit.svg';
import DeleteButton from '../icons/delete.svg';
import OkayButton from '../icons/okay.svg';
import CancelButton from '../icons/cancel.svg';
import { useEffect, useState } from 'react';

function MovieRow({
    info,
    isEven,
    handleClick,
    handleChangeData,
    handleDeleteData,
}) {
    const className = 'px-4 text-xl cursor-pointer hover:bg-gray-300';
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState();
    const [currentRating, setCurrentRating] = useState();
    const [currentYear, setCurrentYear] = useState();

    const [previousTitle, setPreviousTitle] = useState();
    const [previousRating, setPreviousRating] = useState();
    const [previousYear, setPreviousYear] = useState();

    useEffect(() => {
        setCurrentTitle(info.title);
        setCurrentRating(info.rating);
        setCurrentYear(info.year);
    }, [info.title, info.rating, info.year]);

    const toggleEditing = () => {
        setPreviousTitle(currentTitle);
        setPreviousRating(currentRating);
        setPreviousYear(currentYear);
        setIsEditing((isEditing) => !isEditing);
    };

    const cancelEditing = () => {
        setCurrentTitle(previousTitle);
        setCurrentRating(previousRating);
        setCurrentYear(previousYear);

        setIsEditing(false);
    };

    const editData = () => {
        const data = {
            id: info.id,
            title: currentTitle,
            rating: currentRating,
            year: currentYear,
        };
        handleChangeData(data);
    };

    const deleteData = () => {
        const data = {
            id: info.id,
            title: currentTitle,
            rating: currentRating,
            year: currentYear,
        };
        handleDeleteData(data);
    };

    const changeTitle = (event) => {
        setCurrentTitle(event.target.value);
    };

    const changeRating = (event) => {
        setCurrentRating(event.target.value);
    };

    const changeYear = (event) => {
        setCurrentYear(event.target.value);
    };

    return (
        <tr
            className={isEven ? `bg-blue-100 ${className}` : className}
            onClick={handleClick}
        >
            <td className="w-[20%] text-center">
                <div className="flex justify-center align-bottom">
                    <Image
                        src={`https://api.lorem.space/image/movie?w=300&h=440&x=${info.title}`}
                        alt="movie poster"
                        width={150 * 0.5}
                        height={220 * 0.5}
                        quality={1}
                    />
                </div>
            </td>
            {isEditing ? (
                <>
                    <td className="w-[50%] text-left">
                        <input
                            type="text"
                            className="w-full text-left"
                            value={currentTitle}
                            onChange={changeTitle}
                        />
                    </td>
                    <td className="w-[10%] text-center">
                        <input
                            type="text"
                            className="w-full text-center"
                            value={currentRating}
                            onChange={changeRating}
                        />
                    </td>
                    <td className="w-[10%] text-center">
                        <input
                            type="text"
                            className="w-full text-center"
                            value={currentYear}
                            onChange={changeYear}
                        />
                    </td>
                </>
            ) : (
                <>
                    <td className="w-[50%] text-left">{currentTitle}</td>
                    <td className="w-[10%] text-center">
                        {currentRating || 'N/A'}
                    </td>
                    <td className="w-[10%] text-center">{currentYear}</td>
                </>
            )}

            <td>
                <div className="flex items-center justify-end gap-2 pr-5">
                    {!isEditing ? (
                        <>
                            <EditButton
                                className="w-8 hover:fill-yellow-600"
                                onClick={toggleEditing}
                            />
                            <DeleteButton
                                className="w-8 hover:fill-red-500 fill-[#2D527C]"
                                onClick={deleteData}
                            />
                        </>
                    ) : (
                        <>
                            <OkayButton
                                className="w-8 hover:fill-green-600"
                                onClick={() => {
                                    editData();
                                    toggleEditing();
                                }}
                            />
                            <CancelButton
                                className="w-8 hover:fill-red-600"
                                onClick={cancelEditing}
                            />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default MovieRow;
