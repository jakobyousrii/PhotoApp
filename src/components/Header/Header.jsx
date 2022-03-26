import React, { useEffect, useState } from 'react';
import { HeartIcon, SearchIcon } from '@heroicons/react/solid';
import "./Header.scss";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingPhotos, removePhotos } from '../../features/photos/PhotoSlice';
import { favoriteSelector } from "../../features/photos/PhotoSlice";


const Header = (props) => {
    const [photos, setPhotos] = useState("Paris");
    const dispatch = useDispatch();
    const favorites = useSelector(favoriteSelector);
    const favoriteCount = favorites.reduce((i) => {
        return i += 1;
    }, 0)

    const searchChangeHandler = (e) => {
        setPhotos(e.target.value);
    }

    useEffect(() => {
        if (photos.length > 0) {
            dispatch(fetchingPhotos(photos));
            return (() => {
                dispatch(removePhotos());
            })
        }
    }, [photos, dispatch])

    return (
        <>
            <header className='header-nav'>
                <div className='input-section'>
                    <SearchIcon />
                    <input value={photos} onChange={searchChangeHandler} type="search" />
                </div>
                <div className='likedButton'>
                    <Link to="/liked">
                        {<HeartIcon />}
                        {favoriteCount !== 0 && <span className='favorite-count'>{favoriteCount}</span>}
                    </Link>
                </div>
            </header>
            <main className='main'>
                {props.children}
            </main>
        </>
    );
};

export default Header;