import { ArrowsExpandIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, favoriteSelector } from '../../../features/photos/PhotoSlice';
import Modal from '../../UI/Modal/Modal';
import "./Photo.scss";

const Photo = ({ data, index }) => {
    const dispatch = useDispatch();
    const [modalClicked, setModalClicked] = useState(false);
    const favorites = useSelector(favoriteSelector);
    const findFavorite = favorites.findIndex(favorite => favorite.id === data.id);


    const likeHandler = () => {
        dispatch(addFavorites(data));
    }

    const modalHandler = () => {
        setModalClicked(prev => !prev);
    }

    return (
        <>
            <div className={`photoDiv photoDiv${index}`}>
                <div onClick={modalHandler} className='modalButton'>
                    <ArrowsExpandIcon />
                </div>
                {modalClicked && <Modal onClick={modalHandler} data={data} />}
                <img className='image' alt={data.id} src={data.webformatURL} />
                <div onClick={likeHandler} className='heart'>{
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={findFavorite === -1 ? "none" : "red"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={findFavorite === -1 ? 1 : 0}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                }</div>
            </div>
        </>
    );
};

export default Photo;