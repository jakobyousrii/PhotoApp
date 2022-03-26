import { useSelector } from "react-redux";
import { photoSelector, statusSelector } from "../../features/photos/PhotoSlice";
import LoadingSpinner from "../UI/LoadingSpinner";
import Photo from "./Photo/Photo";
import "./Photos.scss";

const Photos = () => {
    const photos = useSelector(photoSelector);
    const status = useSelector(statusSelector);

    let allImages;


    if(status  === "pending"){
        allImages = <div className="photoArticle"><LoadingSpinner/></div>
    }

    else if(status === "error"){
        allImages = <div className="photoArticle">Error with fetching data!</div>
    }

    else if(status === "fullfilled" && photos.length > 0){
        allImages = (
        <section className="photos-grid">
                {photos.map((photo, index) => <Photo key={photo.id} data={photo} index={index}/>)}
        </section>
        )
    }

    else {
        allImages = <div className="photoArticle">No result found for your search!</div>
    }

    return (
        <>
        {allImages}
        </>
    );
};

export default Photos;