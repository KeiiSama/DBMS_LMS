import { Button, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

export const BookDetailModal = ({values, ...props}) => {
    const [open, setOpen] = useState(false);
    const [editmode, setEditmode] = useState(props.editmode || false)

    console.log(values)
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

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSave = async (values) => {
        if (props.onSave) {
            await props.onSave(values) ;
            setOpen(false)
        }
    }

    if (!values) return ""
    return (
        <>
            <span onClick={showModal}>{props.trigger}</span>
            <Modal
                style={{ ...modalStyles }}
                destroyOnClose
                title="Thông tin sách"
                open={open}
                onOk={handleOk}
                okType="primary"
                okButtonProps={{ className: "bg-primary" }}
                cancelText="Cancel"
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                <Form onFinish={handleSave} layout="vertical" requiredMark={!editmode && "optional"}>
                    <div className="d-flex gap-4">
                        <Form.Item 
                            label="Tên sách" 
                            name="TenSach" 
                            className="w-100"
                            initialValue={values.TenSach} 
                            required rules={[{ required: true, message: 'Chưa nhập tên sách!' }]}
                        >
                            {editmode  ? <Input className="w-100" placeholder='Group name'/>:<b>{values.TenSach}</b>}
                        </Form.Item>

                        <Form.Item 
                            label="Tác Giả" 
                            name="TacGia" 
                            initialValue={values.TacGia} 
                            required 
                            rules={[{ required: true, message: 'Chưa nhập Tác gải' }]}
                            className="w-100"
                        >
                            {editmode ? <Input className="w-100" placeholder='Nhập tên tác giả...' /> : <b>{values.TenSach}</b>}
                        </Form.Item>
                    </div  >


                    <div className="d-flex gap-4">
                        <Form.Item className="w-100" label="Nhà Phát Hành" name="NhaPhatHanh" initialValue={values.NhaPhatHanh} required rules={[{ required: true, message: 'Chưa nhập tên Nhà Phát Hành' }]}>
                            {editmode ? <Input className="w-100" placeholder='Nhập tên nhà xuất bảng...' /> : <b>{values.NhaPhatHanh}</b>}
                        </Form.Item>
                        <Form.Item className="w-100" label="Danh mục" name="TenDanhMuc" initialValue={values.TenDanhMuc} required rules={[{ required: true, message: 'Chưa Chọn Danh mục' }]}>
                            {editmode  ? <Select className="w-100">
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                {/* <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option> */}
                            </Select> : <b>{values.TenDanhMuc}</b>}
                        </Form.Item>

                    </div>
                    <div className="d-flex gap-4">
                        <Form.Item className="w-100" label="Số Lượng" name="SoLuong" initialValue={values.SoLuong} required rules={[{ required: true, message: 'Chưa nhập Số Lượng' }]}>
                            {editmode ? <InputNumber className="w-100" placeholder='Nhập số lượng...' /> : <b>{values.SoLuong}</b>}
                        </Form.Item>

                        <Form.Item className="w-100" label="Trạng Thái" name="TrangThai" initialValue={values.TrangThai} required rules={[{ required: true, message: 'Chưa nhập Số Lượng' }]}>
                            <b>{values.TrangThai}</b>
                        </Form.Item>
                    </div>
                    <Form.Item label="Mô tả" name="MoTa" initialValue={values.Mota} required rules={[{ required: true, message: 'Please input the group description !' }]}>
                       {editmode ? <TextArea placeholder='Nhập  mô tả sách.......' /> : (<b>{values.MoTa}</b>)}
                    </Form.Item>

                    <Form.Item className="w-100 d-flex justify-content-center">
                        {editmode ? <Space align="center" className="w-100">
                            <Button type="default" className="ms-auto" htmlType="reset" onClick={() => setEditmode(false)}>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: "#4A58EC", color: "white" }}>
                                Lưu thay đổi
                            </Button>
                        </Space> : 
                            <Button type="primary" disabled={values.TrangThai  === "DaXoa"} icon={<FaEdit />} onClick={() => setEditmode(true)}>
                                Chỉnh sửa
                            </Button>
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </>)
}