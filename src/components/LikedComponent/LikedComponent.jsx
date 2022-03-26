import { useSelector } from "react-redux";
import { favoriteSelector } from "../../features/photos/PhotoSlice";
import "./LikedComponent.scss";
import Photo from "../Photos/Photo/Photo";
import { HomeIcon } from '@heroicons/react/solid';
import { Link } from "react-router-dom";

const LikedComponent = () => {

    const favorites = useSelector(favoriteSelector);

    let favoriteSection;

    if (favorites.length === 0) {
        favoriteSection = (<div className="no-photos">
            <p>No Liked Photos yet...</p>
        </div>)
    }

    if (favorites.length > 0) {
        favoriteSection = (
            <section className="favorite-grid">
                {favorites.map((favorite, index) => <Photo key={favorite.id} data={favorite} index={index} />)}
            </section>
        )
    }

    return (
        <header className="favorite-section">
            <div className="liked-header">
                <h1>Liked Images</h1>
                <div className='homeButton'>
                    <Link to="/">
                        <HomeIcon />
                    </Link>
                </div>
            </div>
            {favoriteSection}
        </header>
    )
}

export default LikedComponent;