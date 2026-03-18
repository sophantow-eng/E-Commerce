import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [lang, setLang] = useState("th");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const text = {
    th: {
      title: "แดชบอร์ดสินค้า",
      products: "จำนวนสินค้า",
      value: "มูลค่ารวม",
      items: "รายการ",
      search: "ค้นหาสินค้า...",
      name: "ชื่อสินค้า",
      price: "ราคา",
      category: "หมวดหมู่",
      stock: "จำนวน",
      image: "ลิงก์รูปภาพ",
      add: "เพิ่มสินค้า",
    },

    en: {
      title: "Product Dashboard",
      products: "Total Products",
      value: "Total Value",
      items: "items",
      search: "Search product...",
      name: "Product name",
      price: "Price",
      category: "Category",
      stock: "Stock",
      image: "Image URL",
      add: "Add Product",
    },
  };

  async function loadProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = products.length;

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div className="container">
      <h1>{text[lang].title}</h1>

      <div className="lang-switch">
        <button onClick={() => setLang("th")}>TH</button>
        <button onClick={() => setLang("en")}>EN</button>
      </div>

      <div className="summary">
        <div className="card">
          <h3>{text[lang].products}</h3>
          <p>
            {totalProducts} {text[lang].items}
          </p>
        </div>

        <div className="card">
          <h3>{text[lang].value}</h3>
          <p>{totalValue.toLocaleString()} ฿</p>
        </div>
      </div>

      <ProductForm reload={loadProducts} lang={lang} text={text} />

      <input
        className="search"
        placeholder={text[lang].search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ProductTable
        products={products}
        reload={loadProducts}
        setEditing={setEditing}
      />
    </div>
  );
}
