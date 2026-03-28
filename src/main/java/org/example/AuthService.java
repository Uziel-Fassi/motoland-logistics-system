package org.example;

import org.mindrot.jbcrypt.BCrypt;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AuthService {
    public boolean autenticar(String username, String password) {
        try (Connection conn = DatabaseConnection.getConnection()) {
            if (autenticarDesdeLoguin(conn, username, password)) {
                return true;
            }

            return autenticarDesdeUsuarios(conn, username, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private boolean autenticarDesdeLoguin(Connection conn, String username, String password) throws SQLException {
        String sql = "SELECT password_hash FROM loguin WHERE username = ? AND activo = 1";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, username);

            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return false;
                }

                String storedHash = rs.getString("password_hash");
                if (storedHash == null || storedHash.trim().isEmpty()) {
                    return false;
                }

                if (storedHash.startsWith("$2a$") || storedHash.startsWith("$2b$") || storedHash.startsWith("$2y$")) {
                    return BCrypt.checkpw(password, storedHash);
                }

                return password.equals(storedHash);
            }
        }
    }

    private boolean autenticarDesdeUsuarios(Connection conn, String username, String password) throws SQLException {
        String sql = "SELECT password FROM usuarios WHERE username = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, username);

            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return false;
                }

                String storedPassword = rs.getString("password");
                return password.equals(storedPassword);
            }
        }
    }
}