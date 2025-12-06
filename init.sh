#!/bin/bash

MODE="$1"

if [ "$MODE" != "dev" ] && [ "$MODE" != "prod" ]; then
    echo "Uso: $0 [dev|prod]"
    exit 1
fi

# Arquivos de ambiente
BASE_ENV=".env"
SPECIFIC_ENV=".env.$MODE"

# Carrega variáveis
export $(grep -v '^#' "$BASE_ENV" | xargs)
export $(grep -v '^#' "$SPECIFIC_ENV" | xargs)

echo "Ambiente: $MODE"
echo "Banco: $MYSQL_DATABASE"

mariadb --version >/dev/null 2>&1
if [ $? -ne 0 ]; then
    apt update
    apt install mariadb-client -y
fi

TABLE_COUNT=$(mariadb -h "$DB_HOST" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -N -e "
    SELECT COUNT(*) 
    FROM information_schema.tables 
    WHERE table_schema = '$MYSQL_DATABASE';
")

RUN_MIGRATION=false

if [ "$MODE" = "prod" ]; then
    echo "Produção detectada. Migração desativada."
else
    if [[ "$AUTO_MIGRATE" = "true" ]]; then
        echo "AUTO_MIGRATE habilitado. Migração será executada."
        RUN_MIGRATION=true
    else
        echo "AUTO_MIGRATE desabilitado. Nenhuma migração será executada."
    fi
fi

if [ "$RUN_MIGRATION" = true ]; then
    echo "Executando migração..."
    node src/database/migration.js
fi

node server.js
