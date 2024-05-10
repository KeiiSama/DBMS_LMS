import { useState } from "react";
import TableRender from "../../../Components/TableRender";
import { Button, DatePicker, Form, Input, InputNumber, Popconfirm, Select, Tooltip, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaEdit, FaTrash, FaTrashRestore, FaTrashRestoreAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { BookDetailModal } from "../../../Components/Modals/BookDetailsModal";
import axios from "axios";

function ManageUserPage() {
    const [selectedRows, setSelectedRows] = useState([])
    const [reloadData, setReloadData] = useState(false)
    const columns = [
        {
            title: "Mã số Tài Khoản",
            dataIndex: "MaSoTaiKhoan",
            key: "MaSoTaiKhoan",
        },
        {
            title: "Tên Tài Khoản",
            dataIndex: "TenTaiKhoan",
            key: "TenTaiKhoan",
            render: (text, row) => (
                <BookDetailModal
                    values={row}
                    trigger={<a style={{ color: "#4A58EC" }}>{text}</a>}
                    onSave={async (values) => await handleUpdateUser(row.MaSoSach, values)}
                />),
        },
        {
            title: "Họ và Tên",
            dataIndex: "HoVaTen",
            key: "HoVaTen",
        },
        {
            title: "Ngày Sinh",
            dataIndex: "NgaySinh",
            key: "NgaySinh",
        },
        {
            title: "Vai Trò",
            dataIndex: "VaiTro",
            key: "VaiTro",
        },
        {
            title: "Địa Chỉ",
            dataIndex: "DiaChi",
            key: "DiaChi",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "SoDienThoai",
            key: "SoDienThoai",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, row, record) => (
                <div className="d-flex gap-4">
                    <BookDetailModal
                        editmode={true}
                        trigger={
                            <Tooltip placement="topLeft" title={"Chỉnh sửa"} >
                                <Button type="primary" icon={<FaEdit />}></Button>
                            </Tooltip>
                        }
                        values={row}
                        onSave={async (values) => await handleUpdateUser(row.MaSoSach, values)}
                    />
                    <Tooltip placement="topLeft" title={"Xóa"}>
                        <Popconfirm title="Bạn có chắc muốn xóa sách này?" onConfirm={() => handleDeleteBook(row.MaSoSach)}>
                            <Button danger icon={<FaTrash />}></Button>
                        </Popconfirm>
                    </Tooltip>
                </div >
            ),
            align: "center"
        }
    ];


    const filterItems = [
        {
            key: "1",
            title: "Tên Tài Khoản",
            fieldName: "TenTaiKhoan",
            type: "input"
        },
        {
            key: "2",
            title: "Họ va Tên",
            fieldName: "HoVaTen",
            type: "input"
        },
        {
            key: "3",
            title: "NgaySinh",
            fieldName: "NgaySinh",
            type: "date"
        },
        {
            key: "4",
            title: "Vai Trò",
            fieldName: "VaiTro",
            type: "select",
            options: [
                {
                    label: "User",
                    value: "User"
                },
                {
                    label: "Admin",
                    value: "Admin"
                },

            ]
        },
    ];

    const handleDeleteBook = async (id) => {
        try {
            const result = await axios({
                method: "DELETE",
                url: `http://localhost:3001/api/users/${id}`
            })

            setReloadData(!reloadData)
        } catch (error) {
            message.error("Đã xãy ra lỗi")
            console.log(error)
        }
    }

    const handleUpdateUser = async (id, values) => {
        try {
            const result = await axios({
                method: "PUT",
                url: `http://localhost:3001/api/users/${id}`,
                data: { ...values }
            })

            setReloadData(!reloadData)
        } catch (error) {
            message.error("Đã xãy ra lỗi")
            console.log(error)
        }
    }



    // const onSelectedRows = {
    //     handle: (selecteds) => setSelectedRows(selecteds),
    //     render: () => <p>Selected </p>
    // }


    return (<>
        <TableRender
            columns={columns}
            onSelected={(selecteds) => setSelectedRows(selecteds)}
            url="/users"
            reloadData={reloadData}
            formCreateElement={
                <>
                    <div className="d-flex gap-4">
                        <Form.Item className="w-100" label="Tên Tài Khoản" name="TenTaiKhoan" required rules={[{ required: true, message: 'Chưa nhập tên taif khoản!' }]}>
                            <Input className="w-100" placeholder='Nhập tên tài khoản...' />
                        </Form.Item>

                        <Form.Item className="w-100" label="Mật khẩu" name="MatKhau" required rules={[{ required: true, message: 'Chưa nhập mật khẩu' }]}>
                            <Input className="w-100" placeholder='Nhập mật khẩu...' />
                        </Form.Item>
                    </div  >

                    <div className="d-flex gap-4">
                        <Form.Item className="w-100" label="Họ và tên" name="HoVaTen" required rules={[{ required: true, message: 'Chưa nhập họ và tên' }]}>
                            <Input placeholder='Nhập hoj và tên...' />
                        </Form.Item>
                        <Form.Item className="w-100" label="Ngày sinh" name="NgaySinh" required rules={[{ required: true, message: 'Chưa nhập ngày sinh' }]}>
                            <DatePicker />
                        </Form.Item>
                    </div>

                    <div className="d-flex gap-4">
                        <Form.Item className="w-100" label="Số Điện Thoại" name="SoDienThoai" required rules={[{ required: true, message: 'Chưa nhập Số Điện Thoại' }]}>
                            <InputNumber className="w-100" placeholder='Nhập số điện thoại...' />
                        </Form.Item>
                        <Form.Item className="w-100" label="Vai trò" name="VaiTro" required rules={[{ required: true, message: 'Chưa Chọn vai trò' }]}>
                            <Select className="w-100">
                                <Select.Option value="User">User</Select.Option>
                                <Select.Option value="Admin">Admin</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item label="Mô tả" name="MoTa">
                        <TextArea placeholder='Nhập mô tả sách' />
                    </Form.Item>
                </>
            }
            filterItems={filterItems}
        />

    </>);
}

export default ManageUserPage;