
import { Outlet, Link } from 'react-router';

function Layout() {
    return (
        <div className="whole-page">
            <div className="nav-bar">
                <nav>
                    <div>
                        <h3>Feed</h3>
                    </div>
                    <div>
                        <h3>Create</h3>
                    </div>
                </nav>
            </div>
        <Outlet />
        </div>
    )
}

export default Layout;