import Navbar from "../../Components/Navbar";

function UserLayout({ children }) {
    // const [showSidebar, setShowSidebar] = useState(true);
    // const viewport = useViewport()
    return (<>
        <>
            <Navbar />
            {children}
        </>
    </>);
}

export default UserLayout;