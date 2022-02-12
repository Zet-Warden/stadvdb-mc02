import { useEffect, useState } from 'react';
import Modal from './Modal';

let formRef;

function AddMovieModal({ removeModal, handleInsertData }) {
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentRating, setCurrentRating] = useState('');
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
        formRef = process.browser ? document.querySelector('#form') : null;
    }, []);

    const changeTitle = (event) => {
        setCurrentTitle(event.target.value);
    };

    const changeRating = (event) => {
        setCurrentRating(event.target.value);
    };

    const changeYear = (event) => {
        setCurrentYear(event.target.value);
    };

    const insertData = (evt) => {
        evt.preventDefault();

        const data = {
            title: currentTitle,
            year: currentYear,
            rating: currentRating,
        };
        if (formRef.checkValidity()) {
            handleInsertData(data);
        } else {
            formRef.reportValidity();
        }

        // data.title = handleInsertData(data);
    };

    return (
        <Modal removeModal={removeModal}>
            <form
                className="flex flex-col gap-4 text-2xl"
                id="form"
                onSubmit={insertData}
            >
                <div>
                    <label className="block" htmlFor="title">
                        Title
                    </label>
                    <input
                        className=" border border-black"
                        type="text"
                        name="title"
                        id="title"
                        onChange={changeTitle}
                        required
                    />
                </div>
                <div>
                    <label className="block" htmlFor="year">
                        Year
                    </label>
                    <input
                        className="border border-black"
                        type="number"
                        name="year"
                        id="year"
                        onChange={changeYear}
                        required
                    />
                </div>
                <div>
                    <label className="block" htmlFor="rating">
                        Rating
                    </label>
                    <input
                        className="border border-black"
                        type="number"
                        name="rating"
                        id="rating"
                        min="0"
                        max="10"
                        step="0.1"
                        required
                        onChange={changeRating}
                    />
                </div>
                <button className="bg-[#00618A] text-white">Submit</button>
            </form>
        </Modal>
    );
}

export default AddMovieModal;
