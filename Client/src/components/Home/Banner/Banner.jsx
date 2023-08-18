import "./Banner.scss";
import BannerImage from "../../../assets/banner-img.png";

const Banner = () => {
  return(
  <div className="hero-banner">
    <div className="content">
      <div className="text-content">
        <h1>SALES</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
          obcaecati officia quibusdam provident maiores blanditiis, eveniet
          voluptates sapiente error ea. Vel aliquam id cum alias!
        </p>
        <div className="ctas">
            <div className="banner-cta">Read More</div>
            <div className="banner-cta v2">Shop Now</div>

        </div>
      </div>
      <img src={BannerImage} className="banner-img" />
    </div>
  </div>)
};

export default Banner;
