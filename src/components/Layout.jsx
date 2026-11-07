
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
    return (
        <div className="app-layout">

            <Sidebar />

            <main className="main-content">
                <Header />

                <div className="page-content">
                    {children}
                </div>
            </main>

        </div>
    );
}

export default Layout;
