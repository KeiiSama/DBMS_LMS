import { Button, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { CreateBorrowRequestModal } from "../../Components/Modals/CreateBorrowRequestModal";


function Cart() {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false) ;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost:3001/api/users/TK0001/carts")

                setProducts(result.data);
            } catch (error) {
                console.log(error)
                message.error("Đã xảy ra lỗi")
            }
        }

        fetchData()
    }, [reload])

    const handleCreateBorrrowRequest = async () => {
        try {
            // const result = await axios({
            //     method: "POST",
            //     url: "http://localhost:3001/api/borrow-requests",
            //     data: {

            //     }
            // })
        } catch (error) {
            
        }
    }

    return (
        <>
            <div className={('heading')}>
                <h3 className='container py-3 text-brown'>Giỏ hàng của bạn</h3>
            </div>

            <div className='container'>
                <div className="row">
                    <div className="col-2">
                        <p>Tên Sách</p>
                    </div>
                    <div className="col-6">
                        <p>Mô tả</p>
                    </div>
                    <div className="col-2">
                        <p>Ảnh</p>
                    </div>
                    <div className="col-2">
                        <p>Số Lượng</p>
                    </div>
                </div>


                {products.length > 0 ? (
                    products.map((item, index) => {
                        return (<CartItem item={item} />)
                    })
                ) : (
                    <p>Giỏ hàng trống</p>
                )}
                {products.length > 0 && (
                    // <div className={('cart-action')}>
                    //     <div className={('calc-cost')}>
                    //         <b>
                    //             Tổng thanh toán(<span>{ProductsCounter}</span> sản phẩm):{' '}
                    //         </b>
                    //         <Price primary large>
                    //             {products.reduce(
                    //                 (res, item) => (item.isSelected ? res + item.price * item.quantity : res),
                    //                 0,
                    //             )}
                    //         </Price>
                    //     </div>

                    <CreateBorrowRequestModal listBook={products} onConfirm={handleCreateBorrrowRequest}/>
                    // </div>
                )}
            </div>


        </>
    );
}

export default Cart;