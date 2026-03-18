import { supabase } from "../supabase";

export default function ProductTable({ products, reload, setEditing }) {
  async function deleteProduct(id) {
    if (!window.confirm("ต้องการลบสินค้านี้?")) return;

    await supabase.from("products").delete().eq("id", id);

    reload();ด
  }

  return (
    <table>
      <thead>
        <tr>
          <th>รูป</th>
          <th>ชื่อสินค้า</th>
          <th>หมวดหมู่</th>
          <th>ราคา</th>
          <th>จำนวนสินค้า</th>
          <th>จัดการ</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>
              <img
                className="product-img"
                src={p.image || "https://via.placeholder.com/50"}
                alt=""
              />
            </td>

            <td>{p.name}</td>

            <td>{p.category}</td>

            <td>{p.price.toLocaleString()} ฿</td>

            <td>{p.stock} ชิ้น</td>

            <td>
              <button className="edit" onClick={() => setEditing(p)}>
                แก้ไข
              </button>

              <button className="delete" onClick={() => deleteProduct(p.id)}>
                ลบ
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
