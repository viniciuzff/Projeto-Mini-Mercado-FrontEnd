import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProducts, inactivateProduct } from "../services/api";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const load = () => {
    getProducts().then((res) => setProducts(res.products || []));
  };

  useEffect(() => { load(); }, []);

  const handleInactivate = async (id) => {
    if (confirm("Deseja inativar este produto?")) {
      await inactivateProduct(id);
      load();
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
        <div style={styles.header}>
          <h2 style={styles.pageTitle}>Produtos</h2>
          <button style={styles.btnNew} onClick={() => navigate("/products/new")}>+ Novo Produto</button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Preço</th>
              <th style={styles.th}>Estoque</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>R$ {p.price.toFixed(2)}</td>
                <td style={styles.td}>{p.quantity}</td>
                <td style={styles.td}>
                  <span style={p.status === "ATIVO" ? styles.badgeActive : styles.badgeInactive}>
                    {p.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={styles.btnEdit} onClick={() => navigate(`/products/edit/${p.id}`)}>Editar</button>
                  {p.status === "ATIVO" && (
                    <button style={styles.btnInactivate} onClick={() => handleInactivate(p.id)}>Inativar</button>
                  )}
                </td>
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
  badgeActive: { background: "#d1fae5", color: "#065f46", padding: "4px 10px", borderRadius: "12px", fontSize: "12px" },
  badgeInactive: { background: "#fee2e2", color: "#991b1b", padding: "4px 10px", borderRadius: "12px", fontSize: "12px" },
  btnEdit: { background: "#4f46e5", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", marginRight: "8px" },
  btnInactivate: { background: "#e74c3c", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" },
};