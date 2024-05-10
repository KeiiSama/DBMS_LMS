import "./style.css"

function CartItem({ item }) {
    if (!item) return ""
    return (
        <div key={item.MaSoSach} className="row">
            <div className="col-2">
                <p>{item.TenSach}</p>
            </div>
            <div className="col-6">
                <p className="ellipsis">{item.Mota}</p>
            </div>
            <div className="col-2">
                <img width={50} src={item.Anh} alt={`Ảnh của ${item.TenSach}`} className="img-fluid" />
            </div>
            <div className="col-2">
                <p>{item.SoLuong}</p>
            </div>
        </div>)
}

export default CartItem;