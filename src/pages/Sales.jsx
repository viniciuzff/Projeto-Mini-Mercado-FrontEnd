import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getSales } from "../services/api";

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

export default function Sales() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSales().then((res) => setSales(res.sales || []));
  }, []);

  const total = sales.reduce((acc, s) => acc + s.total, 0);

  return (
    <div style={s.page}>
      <Sidebar active="/sales" />
      <div style={s.main}>
        <div style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>Vendas</h1>
            <p style={s.pageSubtitle}>Histórico completo de vendas realizadas.</p>
          </div>
          <button style={s.btnNew} onClick={() => navigate("/sales/new")}>+ Nova venda</button>
        </div>

        <div style={s.cards}>
          <div style={s.card}>
            <div style={s.cardIcon}>🛒</div>
            <p style={s.cardLabel}>Total de vendas</p>
            <p style={s.cardValue}>{sales.length}</p>
          </div>
          <div style={{...s.card, ...s.cardPurple}}>
            <div style={s.cardIcon}>💰</div>
            <p style={s.cardLabelLight}>Receita total</p>
            <p style={s.cardValueLight}>R$ {total.toFixed(2)}</p>
          </div>
        </div>

        <div style={s.section}>
          <h2 style={s.sectionTitle}>Histórico de vendas</h2>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Produto</th>
                <th style={s.th}>Quantidade</th>
                <th style={s.th}>Preço unit.</th>
                <th style={s.th}>Total</th>
                <th style={s.th}>Data</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 && (
                <tr>
                  <td colSpan={5} style={{...s.td, textAlign: "center", color: "#4b5280", padding: "40px"}}>
                    Nenhuma venda registrada ainda.
                  </td>
                </tr>
              )}
              {sales.map((sale) => (
                <tr key={sale.id} style={s.tr}>
                  <td style={s.td}><span style={s.productName}>{sale.product_name}</span></td>
                  <td style={s.td}><span style={s.qty}>{sale.quantity} un.</span></td>
                  <td style={s.td}>R$ {sale.price_at_moment.toFixed(2)}</td>
                  <td style={s.td}><span style={s.green}>R$ {sale.total.toFixed(2)}</span></td>
                  <td style={s.td}><span style={s.date}>{sale.date}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
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
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" },
  pageTitle: { fontSize: "24px", fontWeight: "700", color: "#fff" },
  pageSubtitle: { fontSize: "13px", color: "#6b7280", marginTop: "4px" },
  btnNew: { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: "500", cursor: "pointer" },
  cards: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "24px", maxWidth: "420px" },
  card: { background: "#13151f", border: "1px solid #1e2130", padding: "20px 24px", borderRadius: "16px" },
  cardPurple: { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none" },
  cardIcon: { fontSize: "22px", marginBottom: "10px" },
  cardLabel: { fontSize: "12px", color: "#6b7280", marginBottom: "6px" },
  cardLabelLight: { fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px" },
  cardValue: { fontSize: "28px", fontWeight: "700", color: "#fff" },
  cardValueLight: { fontSize: "28px", fontWeight: "700", color: "#fff" },
  section: { background: "#13151f", border: "1px solid #1e2130", borderRadius: "16px", overflow: "hidden" },
  sectionTitle: { fontSize: "14px", fontWeight: "600", color: "#fff", padding: "18px 24px", borderBottom: "1px solid #1e2130" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "10px 24px", textAlign: "left", fontSize: "11px", color: "#4b5280", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em", background: "#0f1117" },
  tr: { transition: "background 0.15s" },
  td: { padding: "14px 24px", fontSize: "13px", color: "#d1d5db", borderTop: "1px solid #1e2130" },
  productName: { fontWeight: "500", color: "#fff" },
  qty: { background: "rgba(99,102,241,0.12)", color: "#818cf8", padding: "3px 8px", borderRadius: "6px", fontSize: "12px" },
  green: { color: "#10b981", fontWeight: "600" },
  date: { color: "#4b5280", fontSize: "12px" },
};