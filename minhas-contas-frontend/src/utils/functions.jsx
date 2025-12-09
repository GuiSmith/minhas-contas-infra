const parseDateFromDB = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day, 0, 0, 0);
};

const getVisualStatus = (bill) => {
    const currentDate = new Date();

    // Status Aberto
    if (bill.status == 'A') {
        if (parseDateFromDB(bill.data_vencimento) > currentDate) {
            return { className: 'btn-primary', text: 'Aberto' };
        } else if (parseDateFromDB(bill.data_vencimento) < currentDate) {
            return { className: 'btn-warning', text: 'Aberto' };
        } else {
            return { className: 'btn-danger', text: 'Vencido' };
        }
    }

    if (bill.status == 'P') {

        if (parseDateFromDB(bill.data_pagamento) > currentDate) {
            return { className: 'btn-dark', text: 'Pagamento agendado' };
        } else {
            if (parseDateFromDB(bill.data_pagamento) > parseDateFromDB(bill.data_vencimento)) {
                return { className: 'btn-success', text: 'Pago atrasado' };
            } else {
                return { className: 'btn-success', text: 'Pago em dia' };
            }
        }
    }

    return { className: 'btn-info', text: 'Não definido' };
}

export { getVisualStatus };