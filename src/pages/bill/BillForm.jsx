// Libraries
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// UI
import '@styles/form.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';


const BillForm = () => {

    const { register, handleSubmit, watch } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);
    }

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
                    <button type='submit' className='btn btn-success'>Salvar</button>
                    <NavLink to='/bills' className={'btn btn-dark'} >Listar</NavLink>
                    <button type='button' className='btn btn-danger'>Deletar</button>
                </div>
                {/* 1° Descrição e Categoria */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Descrição */}
                    <div className='mb-3'>
                        <label htmlFor="descricao" className='form-label'>Descrição</label>
                        <input type="text" className='form-control' id='descricao' {...register('descricao')} placeholder='Conta de Energia' />
                    </div>
                    {/* Categoria */}
                    <div className='mb-3'>
                        <label htmlFor="id_categoria" className='form-label'>Categoria</label>
                        <select id="id_categoria" className='form-control' >
                            <option value="0">Escolha uma categoria</option>
                        </select>
                    </div>
                </div>
                {/* Valor e Data de vencimento */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Valor */}
                    <div className='mb-3'>
                        <label htmlFor="valor" className='form-label'>Valor</label>
                        <input type="number" className='form-control' {...register('valor')} placeholder='R$ 0,00' />
                    </div>
                    {/* Data de vencimento */}
                    <div className='mb-3'>
                        <label htmlFor="data_vencimento" className='form-label'>Data de vencimento</label>
                        <input type="date" className='form-control' {...register('data_vencimento')} />
                    </div>
                </div>
                {/* Recorrência, Status e Data de pagamento */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Recorrência */}
                    <div className='mb-3'>
                        <label htmlFor="recorrencia" className='form-label'>Recorrência</label>
                        <select id='recorrencia' className='form-control' {...register('recorrencia')} >
                            <option value="U">Única</option>
                            <option value="M">Mensal</option>
                            <option value="T">Trimestral</option>
                            <option value="Q">Quadrimestral</option>
                            <option value="A">Anual</option>
                        </select>
                    </div>
                    {/* Status */}
                    <div className='mb-3'>
                        <label htmlFor="status" className='form-label'>Status</label>
                        <select id='status' className='form-control' {...register('status')} >
                            <option value="A">Aberto</option>
                            <option value="P">Pago</option>
                            <option value="C">Cancelado</option>
                        </select>
                    </div>
                    {/* Data de pagamento */}
                    <div className='mb-3' style={{ display: `${watch('status') == 'P' ? 'block' : 'none'}` }}>
                        <label htmlFor="data_pagamento" className='form-label'>Data de Pagamento</label>
                        <input type="date" className='form-control' id='data_pagamento' {...register('data_pagamento')} />
                    </div>
                </div>
                {/* Acréscimos e Descontos */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Acréscimos */}
                    <div className='mb-3'>
                        <label htmlFor="acrescimo" className='form-label'>Acréscimo</label>
                        <input type="number" className='form-control' id='acrescimo' placeholder='R$ 0,00' {...register('acrescimo')} />
                    </div>
                    {/* Desconto */}
                    <div className='mb-3'>
                        <label htmlFor="desconto" className='form-label'>Desconto</label>
                        <input type="number" className='form-control' id='desconto' placeholder='R$ 0,00' {...register('desconto')} />
                    </div>
                </div>
                {/* Observações */}
                <div className='mb-3'>
                    <label htmlFor="observacoes" className='form-label'>Observações</label>
                    <textarea id='observacoes' className='form-control' placeholder='Ex: pagar só depois do dia 10' {...register('observacoes')}></textarea>
                </div>
            </form>
        </article>
    )
};

export default BillForm;