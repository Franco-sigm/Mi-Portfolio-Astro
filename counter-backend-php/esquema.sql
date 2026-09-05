-- Tablas que necesita la API. Ejecutar una vez en phpMyAdmin.

CREATE TABLE IF NOT EXISTS metricas (
  id        INT PRIMARY KEY DEFAULT 1,
  visitas   INT DEFAULT 0,
  corazones INT DEFAULT 0
);

INSERT IGNORE INTO metricas (id, visitas, corazones) VALUES (1, 0, 0);

-- El límite por IP vive en la base porque PHP no conserva memoria
-- entre peticiones. La huella es un hash: no se guardan IPs en claro.
CREATE TABLE IF NOT EXISTS rate_limit (
  huella    CHAR(64) PRIMARY KEY,
  usos      INT NOT NULL DEFAULT 1,
  expira_en INT NOT NULL,
  INDEX (expira_en)
);
