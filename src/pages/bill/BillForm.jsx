// Libraries
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

// UI
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

// Services
import { apiUrl, apiOptions } from '@services/API';

// Personalized UI
import ToastConfirm from '@ui/ToastConfirm';
import Loading from '@components/Loading';

// Styles
import '@styles/form.css';

const BillForm = () => {

    const { register, handleSubmit, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isWaitingResponse, setIsWaitingResponse] = useState(false);
    const [categories, setCategories] = useState([]);

    // Listar categorias
    useEffect(() => {
        const getCategories = async () => {
            try {
                setIsLoading(true);

                const res = await fetch(`${apiUrl}category/list`, apiOptions('GET'));
                const resData = await res.json();

                if (!res.ok) {
                    toast.warning(resData.message);
                    console.log('Erro ao listar categorias');
                    console.error(resData);
                    return;
                }

                if (resData.length === 0) {
                    toast.warning('Nenhuma categoria cadastrada. Cadastre uma categoria antes de continuar!');
                    setCategories([]);
                    return;
                }

                setCategories(resData);
            } catch (error) {
                toast.error('Erro ao listar categorias. Contate o suporte!');
                console.log('Erro ao listar categorias');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        getCategories();
    }, []);

    // Validações
    const validations = async (data) => {
        try {
            console.log('Inicial: ', data);

            // Categoria não pode estar vazia
            if (!(data.id_categoria > 0)) {
                toast.warning('Preencha uma categoria!');
                return false;
            }

            // Valor não pode ser negativo ou vazio
            if (!(data.valor > 0)) {
                toast.warning('Valor precisa ser maior que 0!');
                return false;
            }

            // Data de vencimento não pode estar vazia
            if (!data.data_vencimento) {
                toast.warning('Preencha data de vencimento!');
                return false;
            }

            // Acréscimos não podem ser negativos
            if (data.acrescimo < 0) {
                toast.warning('Acréscimos não podem ser negativos!');
                return false;
            }

            // Descontos não podem ser negativos
            if (data.desconto < 0) {
                toast.warning('Descontos não podem ser negativos!');
                return false;
            }

            // Se status for cancelado, uma data de cancelamento deve ser especificada
            if (data.status == 'C') {
                if (!data.data_cancelamento) {
                    toast.warning('Preencha a data de cancelamento!');
                    return false;
                }
            } else {
                data.data_cancelamento = '';
            }

            // Se status for pago, uma data de pagamento deve ser especificada
            if (data.status == 'P') {
                if (!data.data_pagamento) {
                    toast.warning('Preencha a data de pagamento!');
                    return false;
                }
            } else {
                data.data_pagamento = '';
            }

            // Perguntar se status deve ser atualizado na data agendada
            if (['P','T'].includes(data.forma_pagamento)) {

                setIsWaitingResponse(true);
                await ToastConfirm({
                    question: 'Atualizar status na data agendada?',
                    onConfirm: () => {
                        data.atualizar_status_na_data = true;
                    },
                    onCancel: () => {
                        data.atualizar_status_na_data = false;
                    }
                });
                setIsWaitingResponse(false);
            }

            console.log('Final: ', data);
            return true;
        } catch (error) {
            toast.error('Erro ao realizar validações. Contate o suporte!');
            console.log('Erro ao realizar validações');
            console.error(error);
            return false;
        }
    };

    const onSubmit = async (data) => {
        try {
            if (isWaitingResponse === true) {
                toast.warning('Responda antes de continuar!');
                return;
            }

            setIsLoading(true);

            const isValid = await validations(data);
            if (!isValid) {
                return;
            }

            toast.success('OK!');
        } catch (error) {
            toast.error('Erro ao salvar conta. Contate o suporte!');
            console.log('Erro ao salvar conta');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async () => {
        toast.warning('Ainda não implementado');
    };

    return (
        <article>
            {/* Título */}
            <div className='text-center'>
                <h1 className='fw-bold'>Conta a pagar</h1>
                <p>Cadastre sua conta a pagar</p>
            </div>
            {/* Formulário */}
            <form action="#" className='card shadow-sm p-3' onSubmit={handleSubmit(onSubmit)} >
                {/* Botões */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    <NavLink to='/bill/form' className={'btn btn-primary'} >Novo</NavLink>
                    <button type='submit' disabled={isWaitingResponse || isLoading} className='btn btn-success'>Salvar</button>
                    <NavLink to='/bill/list' className={'btn btn-dark'} >Listar</NavLink>
                    <button type='button' disabled={isWaitingResponse || isLoading} className='btn btn-danger' onClick={handleDelete}>Deletar</button>
                </div>
                {/* Descrição e Categoria */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Descrição */}
                    <div className='mb-3'>
                        <label htmlFor="descricao" className='form-label'>Descrição</label>
                        <input type="text" className='form-control ' id='descricao' {...register('descricao')} placeholder='Conta de Energia' />
                    </div>
                    {/* Categoria */}
                    <div className='mb-3'>
                        <label htmlFor="id-categoria" className='form-label'>Categoria</label>
                        <select id="id-categoria" className='form-select' {...register('id_categoria')} disabled={categories.length == 0}>
                            <option value="" >{categories.length === 0 ? 'Nenhuma categoria cadastrada' : 'Escolha uma categoria'}</option>
                            {categories.length > 0 && categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.descricao_visual}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Valor e Forma de pagamento */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Valor */}
                    <div className='mb-3'>
                        <label htmlFor="valor" className='form-label'>Valor</label>
                        <input type="tel" step='0.01' min='0' className='form-control' id='valor' {...register('valor')} placeholder='R$ 0,00' />
                    </div>
                    {/* Forma de pagamento */}
                    <div className='mb-3'>
                        <label htmlFor="forma-pagamento" className='form-label'>Forma de pagamento</label>
                        <select id="forma-pagamento" className='form-select' {...register('forma_pagamento')}>
                            <option value="P">Pix</option>
                            <option value="B">Boleto</option>
                            <option value="D">Dinheiro</option>
                            <option value="T">Transferência</option>
                        </select>
                    </div>
                </div>
                {/* Acréscimos e descontos */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Acréscimos */}
                    <div className='mb-3'>
                        <label htmlFor="acrescimo" className='form-label'>Acréscimo</label>
                        <input type="tel" className='form-control' id='acrescimo' placeholder='R$ 0,00' {...register('acrescimo')} />
                    </div>
                    {/* Desconto */}
                    <div className='mb-3'>
                        <label htmlFor="desconto" className='form-label'>Desconto</label>
                        <input type="number" className='form-control' id='desconto' placeholder='R$ 0,00' {...register('desconto')} />
                    </div>
                </div>
                {/* Recorrência e data de vencimento */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Recorrência */}
                    <div className='mb-3'>
                        <label htmlFor="recorrencia" className='form-label'>Recorrência</label>
                        <select id='recorrencia' className='form-select' {...register('recorrencia')} >
                            <option value="U">Única</option>
                            <option value="M">Mensal</option>
                            <option value="A">Anual</option>
                        </select>
                    </div>
                    {/* Data de vencimento */}
                    <div className='mb-3'>
                        <label htmlFor="data-vencimento" className='form-label'>Data de vencimento</label>
                        <input type="date" className='form-control' id='data-vencimento' {...register('data_vencimento')} />
                    </div>
                </div>
                {/* Data inicial e fim da recorrência */}
                <div className={`'mb-3 ${watch('recorrencia') === 'U' ? 'd-none' : 'd-flex flex-wrap'} justify-content-start gap-3`}>
                    {/* Data inicial */}
                    <div className='mb-3'>
                        <label htmlFor="data-inicial" className='form-label'>Data inicial</label>
                        <input type="date" className='form-control' id='data-inicial' {...register('data_inicial')} />
                    </div>
                    {/* Data fnial */}
                    <div className='mb-3'>
                        <label htmlFor="data-final" className='form-label'>Data final</label>
                        <input type="date" className='form-control' id='data-final' {...register('data_final')} />
                    </div>
                </div>
                {/* Status, data de pagamento e cancelamento */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Status */}
                    <div className='mb-3'>
                        <label htmlFor="status" className='form-label'>Status</label>
                        <select id='status' className='form-select' {...register('status')} >
                            <option value="A">Aberto</option>
                            <option value="P">Pago</option>
                            <option value="C">Cancelado</option>
                        </select>
                    </div>
                    {/* Data de pagamento */}
                    <div className='mb-3' style={{ display: `${watch('status') == 'P' ? 'block' : 'none'}` }}>
                        <label htmlFor="data-pagamento" className='form-label'>Data de Pagamento</label>
                        <input type="date" className='form-control' id='data-pagamento' {...register('data_pagamento')} />
                    </div>
                    {/* Data de cancelamento */}
                    <div className='mb-3' style={{ display: `${watch('status') == 'C' ? 'block' : 'none'}` }}>
                        <label htmlFor="data-cancelamento" className='form-label'>Data de Cancelamento</label>
                        <input type="date" className='form-control' id='data-cancelamento' {...register('data_cancelamento')} />
                    </div>
                </div>
                {/* Observações */}
                <div className='mb-3'>
                    <label htmlFor="notes" className='form-label'>Observações</label>
                    <textarea id='notes' className='form-control' placeholder='Ex: pagar só depois do dia 10' {...register('notes')}></textarea>
                </div>
            </form>
            <ToastContainer position='bottom-right' />
            {isLoading ? <Loading /> : <></>}
        </article>
    )
};

export default BillForm;