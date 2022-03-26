import React from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, favoriteSelector } from '../../../features/photos/PhotoSlice';
import { XIcon } from '@heroicons/react/solid';
import "./Modal.scss";

const ModalShadow = ({onClick}) => {
    return (
        <div onClick={onClick} className='modalShadow'>
        </div>
    );
};


const ModalSection = ({data, onClick}) => {
    const dispatch = useDispatch();
    const favorites = useSelector(favoriteSelector);
    const findFavorite = favorites.findIndex(favorite => favorite.id === data.id);
    // const heightData = data.webformatHeight / 2;

    const likeHandler = () => {
        dispatch(addFavorites(data));
    }
      
    return (
        <div className='modalSection'>
            <div onClick={onClick} className='x-icon'>
            <XIcon/>
            </div>
            <img className='image' alt={data.id} src={data.largeImageURL} />
            <div onClick={likeHandler} className='modalHeart'   >{
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={findFavorite === -1 ? "none" : "red"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={findFavorite === -1 ? 1 : 0}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            }</div>
        </div>
    );
};

const Modal = (props) => {

    return (
        <section>
            {ReactDOM.createPortal(<ModalShadow onClick={props.onClick} />, document.getElementById("modal"))}
            {ReactDOM.createPortal(<ModalSection onClick={props.onClick} data={props.data} />, document.getElementById("modal"))}
        </section>
    )
}

export default Modal;