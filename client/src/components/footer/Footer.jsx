import "./footer.scss";

const Footer = () => {
  return (
    <div className="social-media-footer">
      <div className="links">
        <a
          href="https://www.facebook.com/beep.love.520/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href="https://github.com/BabaYaGa74"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="https://www.instagram.com/beep_love7/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
      <p>
        &copy; {new Date().getFullYear()} SocialSanjal Inc. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
