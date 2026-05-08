import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getDashboard } from "../services/api";

const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  const handleLogout = () => { localStorage.removeItem("token"); navigate("/login"); };
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/products", label: "Produtos", icon: "📦" },
    { to: "/sales", label: "Vendas", icon: "💰" },
  ];
  return (
    <div style={s.sidebar}>
      <div>
        <div style={s.brand}><span>🛒</span><span style={s.brandName}>Mini Mercado</span></div>
        <nav style={s.nav}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={active === l.to ? s.navActive : s.navLink}>
              <span>{l.icon}</span><span>{l.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <button style={s.logout} onClick={handleLogout}>← Sair</button>
    </div>
  );
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboard().then((res) => {
      if (res.error) setError(res.error);
      else setData(res);
    });
  }, []);

  return (
    <div style={s.page}>
      <Sidebar active="/dashboard" />
      <div style={s.main}>
        <div style={s.header}>
          <div>
            <h1 style={s.pageTitle}>Dashboard</h1>
            <p style={s.pageSubtitle}>Visão geral do seu negócio</p>
          </div>
        </div>

        {error && <div style={s.error}>{error}</div>}
        {!data ? (
          <div style={s.loading}>Carregando dados...</div>
        ) : (
          <>
            <div style={s.cards}>
              <div style={s.card}>
                <div style={s.cardIcon}>📦</div>
                <p style={s.cardLabel}>Produtos em estoque</p>
                <p style={s.cardValue}>{data.total_products}</p>
              </div>
              <div style={{...s.card, ...s.cardGreen}}>
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
                <div style={s.tableWrap}>
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
              </div>

              <div style={s.section}>
                <h2 style={s.sectionTitle}>Vendas recentes</h2>
                <div style={s.tableWrap}>
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
                          <td style={s.td} ><span style={s.green}>R$ {sale.total.toFixed(2)}</span></td>
                          <td style={s.td}><span style={s.date}>{sale.date}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const s = {
  page: { display: "flex", minHeight: "100vh", background: "#f8f7f4" },
  sidebar: { width: "240px", background: "#fff", borderRight: "1px solid #e8e5e0", padding: "32px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "sticky", top: 0, height: "100vh" },
  brand: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px", fontSize: "20px" },
  brandName: { fontWeight: "600", fontSize: "16px", color: "#1c1917" },
  nav: { display: "flex", flexDirection: "column", gap: "4px" },
  navLink: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", fontSize: "14px", color: "#78716c", textDecoration: "none" },
  navActive: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", fontSize: "14px", color: "#16a34a", textDecoration: "none", background: "#f0fdf4", fontWeight: "500" },
  logout: { background: "none", border: "1px solid #e8e5e0", padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", color: "#78716c" },
  main: { flex: 1, padding: "40px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" },
  pageTitle: { fontSize: "26px", fontWeight: "600", color: "#1c1917" },
  pageSubtitle: { fontSize: "14px", color: "#78716c", marginTop: "4px" },
  cards: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" },
  card: { background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e8e5e0" },
  cardGreen: { background: "#16a34a", border: "none" },
  cardIcon: { fontSize: "24px", marginBottom: "12px" },
  cardLabel: { fontSize: "13px", color: "#78716c", marginBottom: "8px" },
  cardLabelLight: { fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "8px" },
  cardValue: { fontSize: "32px", fontWeight: "600", color: "#1c1917" },
  cardValueLight: { fontSize: "32px", fontWeight: "600", color: "#fff" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" },
  section: { background: "#fff", borderRadius: "16px", border: "1px solid #e8e5e0", overflow: "hidden" },
  sectionTitle: { fontSize: "15px", fontWeight: "600", color: "#1c1917", padding: "20px 24px", borderBottom: "1px solid #f0ede8" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 24px", textAlign: "left", fontSize: "12px", color: "#78716c", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em", background: "#fafaf9" },
  td: { padding: "14px 24px", fontSize: "14px", color: "#1c1917", borderTop: "1px solid #f0ede8" },
  rank: { background: "#f0fdf4", color: "#16a34a", padding: "2px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" },
  badge: { background: "#f0fdf4", color: "#16a34a", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "500" },
  green: { color: "#16a34a", fontWeight: "500" },
  date: { color: "#78716c", fontSize: "13px" },
  loading: { color: "#78716c", padding: "40px", textAlign: "center" },
  error: { background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
};