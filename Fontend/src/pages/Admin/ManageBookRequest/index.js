import { useState } from "react";
import TableRender from "../../../Components/TableRender";
import { Button, DatePicker, Form, Input, InputNumber, Popconfirm, Select, Space, Tooltip, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaEdit, FaTrash, FaTrashRestore, FaTrashRestoreAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { BookDetailModal } from "../../../Components/Modals/BookDetailsModal";
import axios from "axios";
import { GrCheckmark, GrClose } from "react-icons/gr";
import { BsCheck, BsCheckLg, BsEye } from "react-icons/bs";
import moment from "moment";
import { toast } from "react-toastify";
import { BorrowRequestDetailsModal } from "../../../Components/Modals/BorrowRequestDetailModal";

function ManageBorrowRequestPage() {
    const [selectedRows, setSelectedRows] = useState([])
    const [reloadData, setReloadData] = useState(false)
    const [loading, setLoading] = useState(false)


    const UpdateStatus = async (status, id) => {
        setLoading(false)
        try {
            const result = await axios({
                method: "PATCH",
                url: `http://localhost:3001/api/borrow-requests/${id}/${status}`
            })
            setLoading(false)
            setReloadData(!reloadData)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    const handleReject = (id) => {
        UpdateStatus("reject", id)
    }


    const handleAccept = (id) => {
        UpdateStatus("accept", id)
    }


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
            render: (text) => moment(text).format("YYYY-MM-DD")
        },
        {
            title: "Ngày cập nhật trạng thái",
            dataIndex: "NgayCapNhat",
            key: "NgayCapNhat",
            render: (text) => text ? moment(text).format("YYYY-MM-DD hh:mm") : 'Chưa cập nhật'
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
            render: (text) => moment(text).format("YYYY-MM-DD")
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
                        <BorrowRequestDetailsModal borrowRequest={row} />
                        {row.TrangThai === "DangCho" &&
                            <>
                                <Tooltip title="Từ chối">
                                    <Popconfirm title="Bạn có chắc muốn từ chối đơn yêu cầu mượn sách này?" onConfirm={() => { handleReject(row.MaDonMuon) }}>
                                        <Button danger icon={<GrClose />} size="small" />
                                    </Popconfirm>
                                </Tooltip>

                                <Tooltip title="Chấp nhận">
                                    <Popconfirm title="Bạn có chắc muốn chấp nhận đơn yêu cầu mượn sách này?" onConfirm={() => { handleAccept(row.MaDonMuon) }}>
                                        <Button type='primary' size="small" icon={<GrCheckmark />} />
                                    </Popconfirm>
                                </Tooltip>
                            </>}
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