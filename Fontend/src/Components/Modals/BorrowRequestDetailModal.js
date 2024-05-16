import { Button, Checkbox, Form, Input, InputNumber, Modal, Select, Space, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { toast } from "react-toastify";

export const BorrowRequestDetailsModal = ({ ...props }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const modalStyles = {
        header: {
            borderRadius: 0,
            borderBottom: "1px solid #ccc",
            paddingBottom: 4,
            marginBottom: 24
        },
        body: {
            borderRadius: 5,
        },
        footer: {
            borderTop: '1px solid #ccc',
            paddingTop: 16
        },
        content: {
            padding: 20
        },
    };
    const showModal = () => {
        setOpen(true);
    };

    // const handleOk = async () => {
    //     setLoading(true)
    //     try {
    //         await props.onConfirm()
    //         setLoading(false)
    //         setOpen(false);
    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)

    //         toast.error("Đã xảy ra lỗi!")
    //     }
    // };

    const handleCancel = () => {
        setOpen(false);
    };

    // const handleShowModal = () => {
    //     const form = props.form 
    //     const date = props.NgayTra

       
    // }


    let soNgayMuon = 0
    let cost = 0 
    if (props.NgayTra) {
        soNgayMuon = Math.ceil((new Date(props.NgayTra).getTime() - new Date().getTime())/(1000*3600*24))
        cost = Math.floor(soNgayMuon *  props.total * 1000 )
    }


    return (
        <>
            <Tooltip title="Xem chi  tiết"><Button onClick={showModal} icon={<BsEye />} size="small" /></Tooltip>
            <Modal
                style={{ ...modalStyles }}
                destroyOnClose={true}
                title="Thông tin yêu cầu mượn sách"
                open={open}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={800}
                maskClosable={false}
            >

                <div className='container my-4'>
                    <div className="row">
                        <h6>Người yêu cầu: </h6>
                        <div className="ms-3">
                            <div>
                                <span>Họ và tên: </span>
                                <span>{props.borrowRequest.TenNguoiMuon}</span>
                            </div>

                            <div>
                                <span>Mã tài khoản: </span>
                                <span>{props.borrowRequest.MaSoDocGia}</span>
                            </div>
                        </div>
                    </div>
                    <h6 className="mt-2">Thông tin sách mượn: </h6>
                    <div className="row border ms-3">
                        <div className="col-6">
                            <p>Tên Sách</p>
                        </div>

                        <div className="col-6">
                            <p>Số Lượng</p>
                        </div>
                    </div>
                    {
                        props.borrowRequest.SachMuon.map((item, index) => (
                            <div className="row border ms-3">
                                <div className="col-6">
                                    <p>{item.TenSach}</p>
                                </div>

                                <div className="col-6">
                                    <p>{item.SoLuong}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="d-flex flex-wrap">
                    <div className="w-50">
                        <span className="me-3">Tổng số lượng: </span>
                        <b>{10}</b> 
                    </div>

                    <div className="w-50">
                        <span className="me-3">Ngày trả: </span>                        
                        {<b>{props.borrowRequest.NgayTra  ? moment(props.borrowRequest.NgayTra).format("yyyy-MM-DD"): "Unknown"}</b>}
                    </div>

                    <div className="w-50">
                        <span className="me-3">Số ngày mượn: </span>                        
                        <b>{10}</b>
                    </div>

                    <div className="w-50">
                        <span>Phí: </span>
                        <b>{new Intl.NumberFormat().format(props.borrowRequest.Gia)} Vnđ</b>
                    </div>
                </div>

            </Modal>
        </>)
}