import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProduct } from "../services/api";

const BASE_URL = "http://127.0.0.1:5000";
const getToken = () => localStorage.getItem("token");

const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  const handleLogout = () => { localStorage.removeItem("token"); navigate("/login"); };
const links = [
  { to: "/dashboard", label: "Dashboard", icon: "⊞" },
  { to: "/products", label: "Produtos", icon: "◎" },
  { to: "/sales", label: "Vendas", icon: "🛒" },
];
  return (
    <div style={s.sidebar}>
      <div>
        <div style={s.brand}>
          <div style={s.avatar}>S</div>
          <div>
            <div style={s.brandName}>SellerOS</div>
            <div style={s.brandSub}>Gestão de vendas</div>
          </div>
        </div>
        <div style={s.navGroup}>
          <div style={s.navLabel}>Operação</div>
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={active === l.to ? s.navActive : s.navLink}>
              <span style={s.navIcon}>{l.icon}</span>
              <span>{l.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div style={s.sidebarBottom}>
        <div style={s.userRow}>
          <div style={s.userAvatar}>V</div>
          <span style={s.userName}>Seller</span>
          <button style={s.logoutBtn} onClick={handleLogout}>⇥</button>
        </div>
      </div>
    </div>
  );
};

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getProduct(id).then((res) => {
        if (res.product) {
          setName(res.product.name);
          setPrice(res.product.price);
          setQuantity(res.product.quantity);
          if (res.product.image_url) setPreview(BASE_URL + res.product.image_url);
        }
      });
    }
  }, [id]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    if (imageFile) formData.append("image", imageFile);

    const url = isEdit
      ? `${BASE_URL}/api/products/${id}`
      : `${BASE_URL}/api/products`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    }).then((r) => r.json());

    setLoading(false);
    if (res.product) {
      setSuccess(isEdit ? "Produto atualizado!" : "Produto criado!");
      setTimeout(() => navigate("/products"), 1500);
    } else {
      setError(res.error || "Erro ao salvar produto");
    }
  };

  return (
    <div style={s.page}>
      <Sidebar active="/products" />
      <div style={s.main}>
        <div style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>{isEdit ? "Editar produto" : "Novo produto"}</h1>
            <p style={s.pageSubtitle}>{isEdit ? "Atualize as informações do produto." : "Adicione um novo produto ao catálogo."}</p>
          </div>
        </div>

        {error && <div style={s.error}>{error}</div>}
        {success && <div style={s.successBox}>{success}</div>}

        <div style={s.card}>
          <form onSubmit={handleSubmit}>

            {/* Upload de imagem */}
            <div style={s.uploadArea} onClick={() => document.getElementById("imgInput").click()}>
              {preview
                ? <img src={preview} alt="preview" style={s.previewImg} />
                : <div style={s.uploadPlaceholder}>
                    <span style={s.uploadIcon}>📷</span>
                    <span style={s.uploadText}>Clique para selecionar imagem</span>
                    <span style={s.uploadHint}>PNG, JPG, WEBP até 5MB</span>
                  </div>
              }
              <input id="imgInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImage} />
            </div>

            <div style={s.field}>
              <label style={s.label}>Nome do produto</label>
              <input style={s.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Arroz 5kg" required />
            </div>

            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Preço (R$)</label>
                <input style={s.input} type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0,00" required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Estoque</label>
                <input style={s.input} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0" required />
              </div>
            </div>

            <div style={s.actions}>
              <button style={s.btnCancel} type="button" onClick={() => navigate("/products")}>Cancelar</button>
              <button style={loading ? s.btnDisabled : s.btnSave} type="submit" disabled={loading}>
                {loading ? "Salvando..." : isEdit ? "Atualizar" : "Criar produto"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { display: "flex", minHeight: "100vh", background: "#0f1117" },
  sidebar: { width: "200px", background: "#13151f", borderRight: "1px solid #1e2130", padding: "20px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "sticky", top: 0, height: "100vh" },
  brand: { display: "flex", alignItems: "center", gap: "10px", padding: "8px", marginBottom: "28px" },
  avatar: { width: "36px", height: "36px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "16px" },
  brandName: { fontSize: "14px", fontWeight: "600", color: "#fff" },
  brandSub: { fontSize: "11px", color: "#4b5280" },
  navGroup: { display: "flex", flexDirection: "column", gap: "2px" },
  navLabel: { fontSize: "11px", color: "#4b5280", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 8px", marginBottom: "8px" },
  navLink: { display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "8px", fontSize: "13px", color: "#6b7280", textDecoration: "none" },
  navActive: { display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "8px", fontSize: "13px", color: "#fff", textDecoration: "none", background: "#1e2236" },
  navIcon: { fontSize: "15px", width: "18px", textAlign: "center" },
  sidebarBottom: { borderTop: "1px solid #1e2130", paddingTop: "16px" },
  userRow: { display: "flex", alignItems: "center", gap: "8px", padding: "4px 8px" },
  userAvatar: { width: "28px", height: "28px", background: "#6366f1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: "600" },
  userName: { fontSize: "13px", color: "#9ca3af", flex: 1 },
  logoutBtn: { background: "none", border: "none", color: "#4b5280", cursor: "pointer", fontSize: "16px" },
  main: { flex: 1, padding: "32px 40px" },
  topbar: { marginBottom: "32px" },
  pageTitle: { fontSize: "24px", fontWeight: "700", color: "#fff" },
  pageSubtitle: { fontSize: "13px", color: "#6b7280", marginTop: "4px" },
  error: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  successBox: { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  card: { background: "#13151f", border: "1px solid #1e2130", borderRadius: "16px", padding: "32px", maxWidth: "520px" },
  uploadArea: { border: "2px dashed #1e2130", borderRadius: "12px", height: "180px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: "24px", overflow: "hidden", background: "#0f1117" },
  uploadPlaceholder: { display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" },
  uploadIcon: { fontSize: "32px" },
  uploadText: { fontSize: "14px", color: "#6b7280" },
  uploadHint: { fontSize: "12px", color: "#4b5280" },
  previewImg: { width: "100%", height: "100%", objectFit: "cover" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  field: { marginBottom: "20px" },
  label: { display: "block", fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" },
  input: { width: "100%", padding: "11px 14px", border: "1px solid #1e2130", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#0f1117", color: "#fff", boxSizing: "border-box" },
  actions: { display: "flex", gap: "12px", marginTop: "8px" },
  btnCancel: { flex: 1, padding: "11px", background: "#1e2130", color: "#6b7280", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "14px" },
  btnSave: { flex: 1, padding: "11px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
  btnDisabled: { flex: 1, padding: "11px", background: "#1e2236", color: "#4b5280", border: "none", borderRadius: "10px", cursor: "not-allowed", fontSize: "14px" },
};