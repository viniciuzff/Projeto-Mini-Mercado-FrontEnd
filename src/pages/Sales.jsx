import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getSales } from "../services/api";

export default function Sales() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSales().then((res) => setSales(res.sales || []));
  }, []);

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
        <div style={styles.header}>
          <h2 style={styles.pageTitle}>Vendas</h2>
          <button style={styles.btnNew} onClick={() => navigate("/sales/new")}>+ Nova Venda</button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Produto</th>
              <th style={styles.th}>Quantidade</th>
              <th style={styles.th}>Preço unit.</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Data</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s.id}>
                <td style={styles.td}>{s.product_name}</td>
                <td style={styles.td}>{s.quantity}</td>
                <td style={styles.td}>R$ {s.price_at_moment.toFixed(2)}</td>
                <td style={styles.td}>R$ {s.total.toFixed(2)}</td>
                <td style={styles.td}>{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  pageTitle: { color: "#1a1a2e" },
  btnNew: { background: "#4f46e5", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "12px", overflow: "hidden" },
  th: { padding: "12px 16px", background: "#f8f9fa", textAlign: "left", fontSize: "13px", color: "#555" },
  td: { padding: "12px 16px", borderTop: "1px solid #f0f0f0", fontSize: "14px" },
};