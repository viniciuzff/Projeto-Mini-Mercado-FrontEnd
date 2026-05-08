import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProduct, createProduct, updateProduct } from "../services/api";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [form, setForm] = useState({ name: "", price: "", quantity: "", image_url: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isEdit) {
      getProduct(id).then((res) => {
        if (res.product) setForm(res.product);
      });
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = { ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) };
    const res = isEdit ? await updateProduct(id, data) : await createProduct(data);

    if (res.product) {
      setSuccess(isEdit ? "Produto atualizado!" : "Produto criado!");
      setTimeout(() => navigate("/products"), 1500);
    } else {
      setError(res.error || "Erro ao salvar produto");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🛒 Mini Mercado</h2>
        <Link style={styles.navLink} to="/dashboard">Dashboard</Link>
        <Link style={styles.navLink} to="/products">Produtos</Link>
        <Link style={styles.navLink} to="/sales">Vendas</Link>
        <button style={styles.logout} onClick={handleLogout}>Sair</button>
      </div>

      <div style={styles.main}>
        <h2 style={styles.pageTitle}>{isEdit ? "Editar Produto" : "Novo Produto"}</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Nome</label>
            <input style={styles.input} name="name" value={form.name} onChange={handleChange} required />

            <label style={styles.label}>Preço</label>
            <input style={styles.input} name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />

            <label style={styles.label}>Quantidade em estoque</label>
            <input style={styles.input} name="quantity" type="number" value={form.quantity} onChange={handleChange} required />

            <label style={styles.label}>URL da imagem (opcional)</label>
            <input style={styles.input} name="image_url" value={form.image_url || ""} onChange={handleChange} />

            <div style={styles.actions}>
              <button style={styles.btnCancel} type="button" onClick={() => navigate("/products")}>Cancelar</button>
              <button style={styles.btnSave} type="submit">{isEdit ? "Salvar" : "Criar Produto"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", minHeight: "100vh", background: "#f0f2f5" },
  sidebar: { width: "220px", background: "#1a1a2e", padding: "32px 16px", display: "flex", flexDirection: "column", gap: "8px" },
  logo: { color: "#fff", marginBottom: "24px", fontSize: "18px" },
  navLink: { color: "#ccc", textDecoration: "none", padding: "10px 12px", borderRadius: "8px", fontSize: "14px" },
  logout: { marginTop: "auto", background: "#e74c3c", color: "#fff", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer" },
  main: { flex: 1, padding: "32px" },
  pageTitle: { marginBottom: "24px", color: "#1a1a2e" },
  card: { background: "#fff", padding: "32px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", maxWidth: "480px" },
  label: { display: "block", marginBottom: "6px", fontSize: "13px", color: "#555" },
  input: { width: "100%", padding: "10px 12px", marginBottom: "16px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" },
  actions: { display: "flex", gap: "12px", marginTop: "8px" },
  btnCancel: { flex: 1, padding: "10px", background: "#f0f0f0", border: "none", borderRadius: "8px", cursor: "pointer" },
  btnSave: { flex: 1, padding: "10px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" },
  error: { color: "red", marginBottom: "12px" },
  success: { color: "green", marginBottom: "12px" },
};