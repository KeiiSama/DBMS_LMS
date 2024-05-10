import { Button, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import React, { useEffect, useState } from "react";

export const CreateBorrowRequestModal = ({ listBook, ...props }) => {
    const [open, setOpen] = useState(false);

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

    const handleOk = async () => {
        await props.onConfirm()
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    return (
        <>
            <Button onClick={showModal}>Yêu cầu mượn sách</Button>
            <Modal
                style={{ ...modalStyles }}
                destroyOnClose
                title="Thông tin yêu cầu mượn sách"
                open={open}
                onOk={handleOk}
                okType="primary"
                okButtonProps={{ className: "bg-primary" }}
                cancelText="Cancel"
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                <div className='container'>
                    <div className="row">
                        <div className="col-6">
                            <p>Tên Sách</p>
                        </div>

                        <div className="col-6">
                            <p>Số Lượng</p>
                        </div>
                    </div>
                    {
                        listBook.map((item, index) => (
                            <div className="row">
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

                <div>
                    <span>Tổng số lượng</span>
                    <span>{20}</span>
                </div>

            </Modal>
        </>)
}