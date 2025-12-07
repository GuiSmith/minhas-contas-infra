// Models
import BillModel from '../database/models/billModel.js';
import CategoryModel from '../database/models/categoryModel.js';

// Utils
import { parseNumber } from '../utils/format.js';

const select = async (req, res) => {
    try {
        const { id } = req.params ?? {};
        if (!id) return res.status(400).json({ message: 'Informe o ID para continuar' });

        const bill = await BillModel.findOne({
            where: { id, id_user: req.user.id }
        });
        if (!bill) return res.status(400).json({ message: 'Conta não encontrada' });

        const result = bill.toJSON();
        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao selecionar conta', error);
        return res.status(500).json({ message: 'Erro desconhecido. Contate o suporte!' });
    }
};

const create = async (req, res) => {
    try {
        const body = req.body ?? {};

        // Colunas permitidas/obrigatórias
        const requiredColumns = ['descricao', 'id_categoria', 'valor_base', 'tipo_recorrencia', 'mes_inicial', 'dia_fixo'];

        const permittedColumns = [...requiredColumns, 'ativo', 'observacoes'];

        // Rejeitar chaves desnecessárias
        for (const key of Object.keys(body)) {
            if (!permittedColumns.includes(key)) {
                return res.status(400).json({ message: `Dado desnecessário informado: ${key}` });
            }
        }

        // Validar todos os campos obrigatórios
        for (const column of requiredColumns) {
            if (!body.hasOwnProperty(column)) {
                return res.status(400).json({ message: `Preencha todos os dados obrigatórios!` });
            }
        }

        const data = body;

        // Definindo pertencimento
        data.id_user = req.user.id;

        // Coerção de tipos
        data.valor_base = parseNumber(body.valor_base);

        if (data.valor_base === null || data.valor_base <= 0) {
            return res.status(400).json({ message: 'Valor inválido' });
        }

        // Categoria
        const category = await CategoryModel.findOne({
            where: { id: data.id_categoria, id_user: data.id_user }
        });
        if (!category) {
            return res.status(400).json({ message: 'Categoria não encontrada' });
        }

        // Recorrência
        if (!BillModel.getAttributes().tipo_recorrencia.type.values.includes(data.tipo_recorrencia)) {
            return res.status(400).json({ message: "Tipo de recorrência inválida" });
        }

        // Data de início
        if (!data.mes_inicial) {
            return res.status(400).json({ message: "Data de início inválida ou não informada" });
        }

        // Dia fixo
        if (!data.dia_fixo || (data.dia_fixo < 0 || data.dia_fixo > 25)) {
            return res.status(400).json({ message: "Dia fixo deve ser entre 1 e 25" });
        }

        // Ativo
        if (data.ativo) {
            if(BillModel.getAttributes().ativo.type.values.includes(data.ativo) === false){
                return res.status(400).json('Status inválido');
            }
        }

        const createdBill = await BillModel.create(data);
        const createdBillObj = createdBill.toJSON();
        return res.status(201).json(createdBillObj);

    } catch (error) {
        console.error('Erro ao criar conta', error);
        return res.status(500).json({ message: 'Erro ao criar conta. Contate o suporte!' });
    }
};

export default { select, create };