import "./footer.scss";

export default function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <p>&copy; 2023 Awesome Four</p>

                <p>Damaris 🙋‍♀️, David 🙋‍♂️, Joe 🙎‍♂️ & Jakub 🕺</p>

                <p>
                    Follow us on <span> </span>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                    >
                        <span className="icon icon-twitter"></span>
                    </a>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <span className="icon icon-facebook"></span>
                    </a>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <span className="icon icon-instagram"></span>
                    </a>
                </p>
            </div>
        </footer>
    );
}
