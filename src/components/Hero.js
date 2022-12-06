import { useState, useEffect } from "react";

const Hero = ({text, bgImgs}) => {
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        if(bgImgs.length > 1) {
            setTimeout(() => {
                if(imgIndex === bgImgs.length - 1) {
                    setImgIndex(0);
                } else {
                    setImgIndex(imgIndex + 1);
                }
            }, 3000);
        }
    }, [imgIndex]);

    return (
        <div className="hero">
            <div className="hero__img">
            <img src={bgImgs[imgIndex]} key={imgIndex} alt="hero img" className="hero__img" />
            </div>
            <h2 className="hero__text">{text}</h2>
        </div>
    )
}

export default Hero;