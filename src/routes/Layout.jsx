
import { Outlet, Link } from 'react-router';

function Layout() {
    return (
        <div className="whole-page">
            <div className="nav-bar">
                <nav>
                    <div>
                        <Link to="/">
                        <h2 className="logo">🌌 Sky Lurk</h2>
                        </Link>
                    </div>
                    <div>
                        <Link to="/view">
                        <h3>Feed</h3>
                        </Link>
                    </div>
                    <div>
                        <Link to="/create"><h3>Create</h3></Link>
                    </div>
                </nav>
            </div>
        <Outlet />
        </div>
    )
}

export default Layout;