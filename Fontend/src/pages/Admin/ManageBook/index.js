import { useState } from "react";
import TableRender from "../../../Components/TableRender";
import { Button, Form, Input, InputNumber, Popconfirm, Select, Tooltip, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaEdit, FaTrash, FaTrashRestore, FaTrashRestoreAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { BookDetailModal } from "../../../Components/Modals/BookDetailsModal";
import axios from "axios";

function ManageBookPage() {
    const [selectedRows, setSelectedRows] = useState([])
    const [reloadData, setReloadData] = useState(false)
    const columns = [
        {
            title: "Mã số sách",
            dataIndex: "MaSoSach",
            key: "MaSoSach",
        },
        {
            title: "Tên sách",
            dataIndex: "TenSach",
            key: "TenSach",
            render: (text, row) => (
                <BookDetailModal 
                    values={row} 
                    trigger={<a style={{ color: "#4A58EC" }}>{text}</a>} 
                    onSave={async (values) => await handleUpdateBook(row.MaSoSach, values)}
                />),
            // // ...getColumnSearchProps("fullname"),
        },
        {
            title: "Tác giả",
            dataIndex: "TacGia",
            key: "TacGia",
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: "Nhà phát hành",
            dataIndex: "NhaPhatHanh",
            key: "NhaPhatHanh",
        },
        {
            title: "Số Lượng còn lại",
            dataIndex: "SoLuongConLai",
            key: "SoLuongConLai",
        },
        {
            title: "Danh Mục",
            dataIndex: "DanhMuc",
            key: "DanhMuc",
        },
        {
            title: "Trạng Thái",
            dataIndex: "TrangThai",
            key: "TrangThai",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, row, record) => (
                row.TrangThai === "DaXoa" ?
                    <Tooltip  title={"Khôi phục"}>
                        <Popconfirm title="Bạn có chắc muốn khôi  phục?" cancelText="Hủy" onConfirm={() => handleRestoreBook(row.MaSoSach)}>
                            <Button color="#4A58EC" icon={<MdRestore />}></Button>
                        </Popconfirm>
                    </Tooltip>
                    :
                    <div className="d-flex gap-2">
                        <BookDetailModal
                            editmode={true}
                            trigger={
                                <Tooltip placement="topLeft" title={"Chỉnh sửa"} >
                                    <Button type="primary" icon={<FaEdit />}></Button>
                                </Tooltip>
                            }
                            values={row}
                            onSave={async (values) => await handleUpdateBook(row.MaSoSach, values)}
                        />
                        <Tooltip placement="topLeft" title={"Xóa"}>
                            <Popconfirm title="Bạn có chắc muốn xóa sách này?"  onConfirm={() => handleDeleteBook(row.MaSoSach)}>
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
            title: "Tên sách",
            fieldName: "TenSach",
            type: "input"
        },
        {
            key: "2",
            title: "Tác Giả",
            fieldName: "TacGia",
            type: "input"
        },
        {
            key: "3",
            title: "Nhà Phát Hành",
            fieldName: "NhaPhatHanh",
            type: "input"
        },
        {
            key: "4",
            title: "Trạng thái",
            fieldName: "TrangThai",
            type: "select",
            options: [
                {
                    label: "Hoạt động",
                    value: "HoatDong"
                },
                {
                    label: "Không Hoạt động",
                    value: "KhongHoatDong"
                },

            ]
        },
    ];

    const handleDeleteBook = async (id) => {
        try {
            const result = await axios({
                method: "DELETE",
                url: `http://localhost:3001/api/books/${id}`
            })

            setReloadData(!reloadData)
        } catch (error) {
            message.error("Đã xãy ra lỗi")
            console.log(error)
        }
    }

    const handleRestoreBook = async (id) => {
        try {
            const result = await axios({
                method: "PATCH",
                url: `http://localhost:3001/api/books/${id}`,
                data: {
                    TrangThai: "HoatDong"
                }
            })

            setReloadData(!reloadData)
        } catch (error) {
            message.error("Đã xãy ra lỗi")
            console.log(error)
        }
    }

    const handleUpdateBook = async (id,  values)  => {
        try {
            const result = await axios({
                method: "PUT",
                url: `http://localhost:3001/api/books/${id}`,
                data: {...values}
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
            url="/books"
            reloadData={reloadData}
            formCreateElement={
                <>
                    <div className="d-flex gap-2">
                        <Form.Item label="Tên sách" name="TenSach" required rules={[{ required: true, message: 'Chưa nhập  tên sách!' }]}>
                            <Input placeholder='Nhập tên  sách...' />
                        </Form.Item>

                        <Form.Item label="Tác Giả" name="TacGia" required rules={[{ required: true, message: 'Chưa nhập Tác gải' }]}>
                            <Input placeholder='Nhập tên tác giả...' />
                        </Form.Item>
                    </div  >

                    <Form.Item label="Nhà Phát Hành" name="NhaPhatHanh" required rules={[{ required: true, message: 'Chưa nhập tên Nhà Phát Hành' }]}>
                        <Input placeholder='Nhập tên nhà xuất bảng...' />
                    </Form.Item>

                    <div className="d-flex gap-2">
                        <Form.Item className="w-100" label="Số Lượng" name="SoLuong" required rules={[{ required: true, message: 'Chưa nhập Số Lượng' }]}>
                            <InputNumber className="w-100" placeholder='Nhập số lượng...' />
                        </Form.Item>
                        <Form.Item className="w-100" label="Danh mục" name="TenDanhMuc" required rules={[{ required: true, message: 'Chưa Chọn Danh mục' }]}>
                            <Select className="w-100">
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                {/* <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option>
                                <Select.Option value="Kinh te">Kinh tế</Select.Option> */}
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

export default ManageBookPage;