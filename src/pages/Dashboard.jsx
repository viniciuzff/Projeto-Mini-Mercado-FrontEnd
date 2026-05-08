import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getDashboard } from "../services/api";

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

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard().then((res) => { if (!res.error) setData(res); });
  }, []);

  return (
    <div style={s.page}>
      <Sidebar active="/dashboard" />
      <div style={s.main}>
        <div style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>Dashboard</h1>
            <p style={s.pageSubtitle}>Visão geral do seu negócio.</p>
          </div>
        </div>

        {!data ? <div style={s.loading}>Carregando...</div> : (
          <>
            <div style={s.cards}>
              <div style={s.card}>
                <div style={s.cardIcon}>📦</div>
                <p style={s.cardLabel}>Produtos em estoque</p>
                <p style={s.cardValue}>{data.total_products}</p>
              </div>
              <div style={{...s.card, ...s.cardPurple}}>
                <div style={s.cardIcon}>💰</div>
                <p style={s.cardLabelLight}>Total vendido</p>
                <p style={s.cardValueLight}>R$ {data.total_revenue.toFixed(2)}</p>
              </div>
              <div style={s.card}>
                <div style={s.cardIcon}>📈</div>
                <p style={s.cardLabel}>Vendas realizadas</p>
                <p style={s.cardValue}>{data.recent_sales.length}</p>
              </div>
            </div>

            <div style={s.grid}>
              <div style={s.section}>
                <h2 style={s.sectionTitle}>Produtos mais vendidos</h2>
                <table style={s.table}>
                  <thead>
                    <tr>
                      <th style={s.th}>#</th>
                      <th style={s.th}>Produto</th>
                      <th style={s.th}>Qtd vendida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.top_products.map((p, i) => (
                      <tr key={i}>
                        <td style={s.td}><span style={s.rank}>{i + 1}</span></td>
                        <td style={s.td}>{p.name}</td>
                        <td style={s.td}><span style={s.badge}>{p.total_sold} un.</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={s.section}>
                <h2 style={s.sectionTitle}>Vendas recentes</h2>
                <table style={s.table}>
                  <thead>
                    <tr>
                      <th style={s.th}>Produto</th>
                      <th style={s.th}>Qtd</th>
                      <th style={s.th}>Total</th>
                      <th style={s.th}>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recent_sales.map((sale) => (
                      <tr key={sale.id}>
                        <td style={s.td}>{sale.product_name}</td>
                        <td style={s.td}>{sale.quantity}</td>
                        <td style={s.td}><span style={s.green}>R$ {sale.total.toFixed(2)}</span></td>
                        <td style={s.td}><span style={s.date}>{sale.date}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
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
  cards: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" },
  card: { background: "#13151f", border: "1px solid #1e2130", padding: "24px", borderRadius: "16px" },
  cardPurple: { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none" },
  cardIcon: { fontSize: "24px", marginBottom: "12px" },
  cardLabel: { fontSize: "13px", color: "#6b7280", marginBottom: "8px" },
  cardLabelLight: { fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "8px" },
  cardValue: { fontSize: "32px", fontWeight: "700", color: "#fff" },
  cardValueLight: { fontSize: "32px", fontWeight: "700", color: "#fff" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  section: { background: "#13151f", border: "1px solid #1e2130", borderRadius: "16px", overflow: "hidden" },
  sectionTitle: { fontSize: "14px", fontWeight: "600", color: "#fff", padding: "18px 24px", borderBottom: "1px solid #1e2130" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "10px 24px", textAlign: "left", fontSize: "11px", color: "#4b5280", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em", background: "#0f1117" },
  td: { padding: "14px 24px", fontSize: "13px", color: "#d1d5db", borderTop: "1px solid #1e2130" },
  rank: { background: "rgba(99,102,241,0.15)", color: "#818cf8", padding: "2px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" },
  badge: { background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "500" },
  green: { color: "#10b981", fontWeight: "500" },
  date: { color: "#4b5280", fontSize: "12px" },
  loading: { color: "#4b5280", padding: "40px", textAlign: "center" },
};