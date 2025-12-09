import { DataTypes } from 'sequelize';
import database from '../database.js';

const PaymentModel = database.define('pagamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
    },
    id_conta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
    },
    forma_pagamento: {
        type: DataTypes.ENUM('D', 'CC', 'CD', 'B', 'P', 'T'),
        allowNull: false,
        comment: 'D = Dinheiro, CC = Crédito, CD = Débito, B = Boleto, P = Pix, T = Transferência'
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    juros: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    multa: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    desconto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

BillModel.associate = (models) => {
    BillModel.belongsTo(models.contas_recorrentes, {
        foreignKey: {
            name: 'id_conta',
            allowNull: false,
        }
    });

    BillModel.belongsTo(models.user, {
        foreignKey: {
            name: 'id_user',
            allowNull: false,
        }
    });
};

export default PaymentModel;