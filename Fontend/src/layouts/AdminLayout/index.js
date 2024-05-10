import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import "./style.css"

function AdminLayout({ children }) {
    // const [showSidebar, setShowSidebar] = useState(true);
    // const viewport = useViewport()
    return (<>
        <Header />
        <div className="d-flex w-full" style={{marginTop: "var(--header-height)", minHeight: "calc(100vh - var(--header-height))"}}>
            <Sidebar />
            <div className="content mt-3 w-100 me-4" style={{marginLeft: "calc(var(--sidebar-width) + 16px)"}}>
                {children}
            </div>
        </div>
    </>);
}

export default AdminLayout;