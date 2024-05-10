import { useState } from "react";
import TableRender from "../../../Components/TableRender";
import { Button, DatePicker, Form, Input, InputNumber, Popconfirm, Select, Space, Tooltip, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaEdit, FaTrash, FaTrashRestore, FaTrashRestoreAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { BookDetailModal } from "../../../Components/Modals/BookDetailsModal";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import { BsCheck } from "react-icons/bs";

function ManageBorrowRequestPage() {
    const [selectedRows, setSelectedRows] = useState([])
    const [reloadData, setReloadData] = useState(false)
    const columns = [
        {
            title: "Mã đơn",
            dataIndex: "MaDonMuon",
            key: "MaDonMuon",
        },
        {
            title: "Ngày tạo đơn",
            dataIndex: "NgayTaoDon",
            key: "NgayTaoDon",
        },
        {
            title: "Ngày cập nhật trạng thái",
            dataIndex: "NgayQuyetDinh",
            key: "NgayQuyetDinh",
        },
        {
            title: "Trạng Thái",
            dataIndex: "TrangThai",
            key: "TrangThai",
            render: (text) => (text === "DangCho" && "Đang Chờ Duyệt") || (text === "TuChoi" && "Từ Chối") || (text === "ChapNhan" && "Đã duyệt")
        },
        {
            title: "Ngày trả",
            dataIndex: "NgayTraSach",
            key: "NgayTraSach",
        },
        {
            title: "Giá",
            dataIndex: "Gia",
            key: "Gia",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, row, record) => (
                <div className="d-flex gap-4">
                    <Space>
                        <Popconfirm title="Bạn có chắc muốn xóa sách này?" onConfirm={() => {}}>
                            <Button danger icon={<GrClose />} size="small">Từ chối</Button>
                        </Popconfirm>

                        <Popconfirm title="Bạn có chắc muốn xóa sách này?" onConfirm={() => {}}>
                            <Button type='primary' size="small" icon={<BsCheck />}>Chấp nhận</Button>
                        </Popconfirm>
                    </Space>
                </div >
            ),
            align: "center"
        }
    ];


    // const filterItems = [
    //     {
    //         key: "1",
    //         title: "Tên Tài Khoản",
    //         fieldName: "TenTaiKhoan",
    //         type: "input"
    //     },
    //     {
    //         key: "2",
    //         title: "Họ va Tên",
    //         fieldName: "HoVaTen",
    //         type: "input"
    //     },
    //     {
    //         key: "3",
    //         title: "NgaySinh",
    //         fieldName: "NgaySinh",
    //         type: "date"
    //     },
    //     {
    //         key: "4",
    //         title: "Vai Trò",
    //         fieldName: "VaiTro",
    //         type: "select",
    //         options: [
    //             {
    //                 label: "User",
    //                 value: "User"
    //             },
    //             {
    //                 label: "Admin",
    //                 value: "Admin"
    //             },

    //         ]
    //     },
    // ];



    // const onSelectedRows = {
    //     handle: (selecteds) => setSelectedRows(selecteds),
    //     render: () => <p>Selected </p>
    // }


    return (<>
        <TableRender
            columns={columns}
            onSelected={(selecteds) => setSelectedRows(selecteds)}
            url="/borrow-requests"
            reloadData={reloadData}
        />

    </>);
}

export default ManageBorrowRequestPage;