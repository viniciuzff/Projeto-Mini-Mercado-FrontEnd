import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProducts, inactivateProduct } from "../services/api";

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
          <button style={s.logoutBtn} onClick={handleLogout} title="Sair">⇥</button>
        </div>
      </div>
    </div>
  );
};

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const load = () => getProducts().then((res) => setProducts(res.products || []));
  useEffect(() => { load(); }, []);

  const handleInactivate = async (id) => {
    if (confirm("Deseja inativar este produto?")) { await inactivateProduct(id); load(); }
  };

  return (
    <div style={s.page}>
      <Sidebar active="/products" />
      <div style={s.main}>
        <div style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>Produtos</h1>
            <p style={s.pageSubtitle}>Gerencie seu catálogo e estoque.</p>
          </div>
          <button style={s.btnNew} onClick={() => navigate("/products/new")}>+ Novo produto</button>
        </div>

        <div style={s.grid}>
          {products.length === 0 && (
            <div style={s.empty}>Nenhum produto cadastrado ainda.</div>
          )}
          {products.map((p) => (
            <div key={p.id} style={s.card}>
              <div style={s.cardImg}>
                {p.image_url
                  ? <img src={`http://127.0.0.1:5000${p.image_url}`} alt={p.name} style={s.img} />
                  : <span style={s.imgPlaceholder}>📦</span>}
              </div>
              <div style={s.cardBody}>
                <div style={s.cardRow}>
                  <span style={s.cardName}>{p.name}</span>
                  <span style={p.status === "ATIVO" ? s.badgeActive : s.badgeInactive}>{p.status}</span>
                </div>
                <div style={s.cardRow}>
                  <span style={s.cardPrice}>R$ {p.price.toFixed(2)}</span>
                  <span style={s.cardStock}>{p.quantity} un.</span>
                </div>
                <div style={s.cardActions}>
                  <button style={s.btnEdit} onClick={() => navigate(`/products/edit/${p.id}`)}>✏ Editar</button>
                  {p.status === "ATIVO" && (
                    <button style={s.btnInactivate} onClick={() => handleInactivate(p.id)}>Inativar</button>
                  )}
                </div>
              </div>
            </div>
          ))}
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
  navLabel: { fontSize: "11px", color: "#4b5280", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 8px", marginBottom: "8px", marginTop: "4px" },
  navLink: { display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "8px", fontSize: "13px", color: "#6b7280", textDecoration: "none" },
  navActive: { display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "8px", fontSize: "13px", color: "#fff", textDecoration: "none", background: "#1e2236" },
  navIcon: { fontSize: "15px", width: "18px", textAlign: "center" },
  sidebarBottom: { borderTop: "1px solid #1e2130", paddingTop: "16px" },
  userRow: { display: "flex", alignItems: "center", gap: "8px", padding: "4px 8px" },
  userAvatar: { width: "28px", height: "28px", background: "#6366f1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: "600" },
  userName: { fontSize: "13px", color: "#9ca3af", flex: 1 },
  logoutBtn: { background: "none", border: "none", color: "#4b5280", cursor: "pointer", fontSize: "16px" },
  main: { flex: 1, padding: "32px 40px" },
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" },
  pageTitle: { fontSize: "24px", fontWeight: "700", color: "#fff" },
  pageSubtitle: { fontSize: "13px", color: "#6b7280", marginTop: "4px" },
  btnNew: { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: "500", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" },
  empty: { color: "#4b5280", fontSize: "14px", padding: "40px", textAlign: "center", gridColumn: "1/-1" },
  card: { background: "#13151f", border: "1px solid #1e2130", borderRadius: "16px", overflow: "hidden" },
  cardImg: { height: "160px", background: "#1a1d2e", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  imgPlaceholder: { fontSize: "48px" },
  cardBody: { padding: "16px" },
  cardRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" },
  cardName: { fontSize: "15px", fontWeight: "600", color: "#fff" },
  cardPrice: { fontSize: "18px", fontWeight: "700", color: "#fff" },
  cardStock: { fontSize: "12px", color: "#6b7280" },
  badgeActive: { background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "500" },
  badgeInactive: { background: "rgba(239,68,68,0.15)", color: "#ef4444", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "500" },
  cardActions: { display: "flex", gap: "8px", marginTop: "12px" },
  btnEdit: { flex: 1, padding: "8px", background: "#1e2236", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", cursor: "pointer" },
  btnInactivate: { padding: "8px 12px", background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "none", borderRadius: "8px", fontSize: "12px", cursor: "pointer" },
};