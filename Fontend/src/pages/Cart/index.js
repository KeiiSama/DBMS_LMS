import { Button, DatePicker, Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { CreateBorrowRequestModal } from "../../Components/Modals/CreateBorrowRequestModal";
import { AiFillCloseCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../Components/Context/CounterContext";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import moment from "moment";


function Cart() {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false);
    const navigate = useNavigate()
    const { handleIncrease } = MyContext()
    const  [form] = useForm()
    const [ngayTra, setNgayTra] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("userData"))
                if (user && user.id) {
                    const result = await axios.get(`http://localhost:3001/api/users/${user.id}/carts`)

                    setProducts(result.data);

                } else {
                    navigate("/login")
                }
            } catch (error) {
                console.log(error)
                message.error("Đã xảy ra lỗi")
            }
        }

        fetchData()
    }, [reload])

    const handleCreateBorrrowRequest = async (values) => {
        console.log(values)
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            if (!userData) {
                navigate("/login0")
            }
            const result = await axios({
                method: "POST",
                url: "http://localhost:3001/api/borrow-requests",
                data: {
                    MaSoDocGia: userData.id,
                    NgayTraSach: moment(values["NgayTraSach"].toLocaleString()).format("yyyy-MM-DD"),
                    SachMuon: products.map((item => ({
                        MaSoSach: item.MaSoSach,
                        SoLuong: item.SoLuong
                    })))
                }
            }) 

            if (result && result.status === 200)  {
                toast.success("Tạo yêu cầu thành công!")
            }
        } catch (error) {
            toast.error("Tạo yêu cầu thất bại")
        }
    }

    const handleDeleteCartItem = async (bookId) => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        if (userData && userData.id) {
            const result = await axios({
                method: "DELETE",
                url: `http://localhost:3001/api/users/${userData.id}/carts/${bookId}`
            })

            if (result && result.status === 200) {
                const newProducts = products.filter(item => item.MaSoSach !== bookId)
                setProducts(newProducts)

                if (userData.num_of_cart_items) {
                    console.log("fadsfas")
                    handleIncrease(userData.num_of_cart_items - 1)
                }
            }
        }
    }

    const handleUpdateQuantity = (id, newQuantity) => {
        const newProduct = products.map(item => {
            if (item.MaSoSach === id) {
                return { ...item, SoLuong: newQuantity }
            }
            return item
        })

        setProducts(newProduct)
    }

    const total_books = products.reduce((prev, curr) => prev + curr.SoLuong, 0)

    return (
        <>
            <div className={('heading')}>
                <h3 className='container py-3 text-brown'>Giỏ hàng của bạn</h3>
            </div>

            <div className="container d-flex align-items-start w-100" >
                <div className='container bg-white shadow p-4' style={{ width: "70%" }}>
                    <div className="row">
                        <div className="col-3">
                            <p>Tên Sách</p>
                        </div>
                        <div className="col-4">
                            <p>Mô tả</p>
                        </div>
                        <div className="col-2">
                            <p>Ảnh</p>
                        </div>
                        <div className="col-2">
                            <p>Số Lượng</p>
                        </div>

                        <div className="col-1">

                        </div>
                    </div>


                    {products.length > 0 ? (
                        products.map((item, index) => {
                            return (<CartItem key={index} item={item}
                                onDelete={handleDeleteCartItem}
                                onUpdateQuantity={handleUpdateQuantity}
                            />) 
                        })
                    ) : (
                        <p>Giỏ hàng trống</p>
                    )}


                </div>

                <div className="px-4" style={{ width: "30%" }}>
                   <Form form={form} onFinish={handleCreateBorrrowRequest}>
                        <div className="bg-white border p-4 rounded shadow">
                            <div className="d-flex align-items-center mb-3">
                                <span>Tổng số lượng: </span>    
                                <b className="ms-3 text-primary">{total_books}</b>
                            </div>
    
                            <Form.Item label="Chọn ngày trả" name="NgayTraSach" require rule={[{min: new Date()}]} validateTrigger="onChange">
                                <DatePicker onChange={(date) => setNgayTra(new Date(date))}/>
                            </Form.Item>
~
                            <div>
                                <span>Phí:</span>
                                <b className="ms-3">1000 VNĐ/1 Ngày cho 1 Quyển</b>
                            </div>
                            
                            <div className="mt-5 d-flex justify-content-end">
                                <CreateBorrowRequestModal 
                                    listBook={products} 
                                    onConfirm={()=>{form.submit()}} 
                                    total={total_books}
                                    NgayTra={ngayTra}
                                    form={form}
                                />
                            </div>

                            
                        </div>
                   </Form>
                </div>
            </div>


        </>
    );
}

export default Cart;