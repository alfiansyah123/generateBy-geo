import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './InterstitialPage.css';

const InterstitialPage = () => {
    const [searchParams] = useSearchParams();
    const targetUrl = searchParams.get('target') ? decodeURIComponent(searchParams.get('target')) : '#';

    const onRedirect = () => {
        if (targetUrl && targetUrl !== '#') {
            window.location.href = targetUrl;
        }
    };

    // Safety Scripts (Anti-Copy, No Right Click)
    useEffect(() => {
        const disableSelection = (e) => {
            if (typeof e.onselectstart !== "undefined") e.onselectstart = () => false;
            else if (typeof e.style.MozUserSelect !== "undefined") e.style.MozUserSelect = "none";
            else e.onmousedown = () => false;
            e.style.cursor = "default";
        };

        const handleContextMenu = (e) => e.preventDefault();

        const handleKeyDown = (e) => {
            if (e.ctrlKey && [65, 66, 67, 73, 80, 83, 85, 86].includes(e.which)) {
                e.preventDefault();
                return false;
            }
            if (e.keyCode === 123 || e.keyCode === 18) {
                return false;
            }
        };

        // Apply restrictions
        disableSelection(document.body);
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            // Cleanup restricted listeners when unmounting
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Auto-redirect Timer (optional in this flow since there is a button, but good for "cloaking")
    // Use a slightly longer timer or disable if the button is the ONLY intended way.
    // Based on user request "fake clokaer", usually auto-redirects.
    useEffect(() => {
        const timer = setTimeout(() => {
            // Uncomment below inside to enable auto-redirect after X seconds
            onRedirect();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onRedirect]);

    return (
        <React.Fragment>
            <div className="interstitial-theme w-screen h-screen bg-slate-100 overflow-auto">
                <div className="layer"></div>
                <div id="wrapper">
                    {/* Main */}
                    <div className="wrapper">
                        {/* START BG block */}
                        <div className="bg-block">
                            <div className="bg-block-overlay"></div>
                        </div>

                        <p className="center">
                            <img id="logo" src="/images/1.png" style={{ maxWidth: '185px' }} alt="" />
                        </p>

                        <section id="main">
                            <header>
                                <span className="avatar">
                                    <img src="/images/agus1.jpg" alt="Avatar" />
                                </span>
                                <h1></h1>
                                <p>
                                    <b>Come and chat with me privately<br />Call me 18+</b>
                                    <br />
                                </p>
                            </header>
                            <footer>
                                {/* Bind button to onRedirect */}
                                <button
                                    onClick={onRedirect}
                                    className="button big fit icon fa-whatsapp stylee"
                                    style={{ marginTop: '1em', borderColor: '#25d366', color: '#25d366' }}
                                >
                                    Whatsapp
                                </button>
                            </footer>
                        </section>
                        {/* Footer */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default InterstitialPage;


