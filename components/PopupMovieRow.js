import ReactDOM from 'react-dom';
import { useState } from 'react';
import MovieRow from './MovieRow';
import MovieModal from './MovieModal';

const modalRoot = process.browser
    ? document.querySelector('#modal-root')
    : null;

function PopupMovieRow({ info, isEven }) {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(!showModal);
    };

    const removeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <MovieRow info={info} isEven={isEven} handleClick={handleClick} />
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

export default PopupMovieRow;
