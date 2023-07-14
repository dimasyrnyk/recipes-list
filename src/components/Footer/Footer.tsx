import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <div className="footer">
        by{" "}
        <a
          href="https://www.instagram.com/dimasyrnyk/"
          className="footer__link"
        >
          Dimitri Syrnyk
        </a>{" "}
        | Copyright @ 2023
      </div>
    </footer>
  );
}

export default Footer;
