import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineMinusSquare, AiOutlinePlus, AiOutlinePlusSquare, AiTwotoneCloseSquare } from "react-icons/ai";
import "./style.css"
import { Button, Form, Popconfirm } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

function CartItem({ item, key, onUpdateQuantity, onDelete }) {
    // const [quantity, setQuantity] = useState(item.SoLuong || 0)
    const handleUpdateQuantity = (action) => {
        if (action === "tru") {
            item.SoLuong > 1 && onUpdateQuantity(item.MaSoSach, item.SoLuong - 1)
        } else if (action === "cong") {
            onUpdateQuantity(item.MaSoSach, item.SoLuong + 1)
        }
    }

    const handleDelete = async (bookId) => {
        try {
            await onDelete(bookId)
        } catch (error) {
            toast.error("Có lỗi xảy ra")
        }
    }
    if (!item) return ""
    return (
        <div key={key} className={`row py-2 align-items-center ${key !== 0 ? "border-bottom" : "border-top"}`}>
            <div className="col-3">
                <p>{item.TenSach}</p>
            </div>
            <div className="col-2">
                <p className="ellipsis">{item.Mota}</p>
            </div>
            <div className="col-2">
                <img width={50} src={item.Anh} alt={`Ảnh của ${item.TenSach}`} className="img-fluid" />
            </div>
            <div className="col-2 d-flex align-items-center">
                <Button
                    className="m-o p-0 border-0"
                    onClick={() => handleUpdateQuantity("tru")}
                    icon={<AiOutlineMinusSquare size={20} />}
                />
                <p className="my-0 mx-2">{item.SoLuong}</p>
                <Button
                    className="m-o p-0 border-0"
                    onClick={() => handleUpdateQuantity("cong")}
                    icon={<AiOutlinePlusSquare size={20} />}
                />
            </div>

            <div className="col-1 text-center">
                <Popconfirm onConfirm={() => handleDelete(item.MaSoSach)} title="Are you sure?">
                    <Button
                        className="m-o p-0 border-0"
                        icon={<AiTwotoneCloseSquare size={20}/>}
                    />
                </Popconfirm>
            </div>
        </div>)
}

export default CartItem;