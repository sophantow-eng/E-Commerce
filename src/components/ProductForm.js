import { useState } from "react";
import { supabase } from "../supabase";

export default function ProductForm({ reload, lang, text }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  async function addProduct() {
    if (!name || !price) return;

    await supabase.from("products").insert([
      {
        name,
        price: parseFloat(price),
        category,
        stock: parseInt(stock),
        image,
      },
    ]);

    setName("");
    setPrice("");
    setCategory("");
    setStock("");
    setImage("");

    reload();
  }

  return (
    <div className="form">
      <input
        placeholder={text[lang].name}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder={text[lang].price}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder={text[lang].category}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder={text[lang].stock}
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <input
        placeholder={text[lang].image}
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={addProduct}>{text[lang].add}</button>
    </div>
  );
}
