// Libraries
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

// UI
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useLocation, useParams } from 'react-router-dom';

// Personalized UI
import Loading from '@components/Loading';

// Services
import { apiUrl, apiOptions } from '@services/API';

// Styles
import '@styles/form.css';

const CategoryForm = () => {

    const { register, handleSubmit, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isWaitingResponse, setIsWaitingResponse] = useState(false);

    const [category, setCategory] = useState({});
    const [categories, setCategories] = useState([]);

    const location = useLocation();
    const params = useParams();

    // Buscar categoria
    useEffect(() => {
        if (!params.hasOwnProperty('id')) {
            return;
        }

        const getCategory = async () => {
            try {
                setIsLoading(true);

                const endpoint = `category/${params.id}`;
                const completeUrl = `${apiUrl}${endpoint}`;

                const res = await fetch(completeUrl, apiOptions('GET'));
                const resData = await res.json();

                if (!res.ok) {
                    toast.warning(resData.message);
                } else {
                    setCategory(resData);
                }
            } catch (error) {
                toast.error('Erro ao buscar categoria');
                console.debug(error);
            } finally {
                setIsLoading(false);
            }
        };

        getCategory();
    }, [location.pathname]);

    // Listar categorias
    useEffect(() => {
        const getCategories = async () => {
            try {
                setIsLoading(true);

                const res = await fetch(`${apiUrl}category/list`, apiOptions('GET'));
                const data = await res.json();

                if (!res.ok) {
                    toast.warning(data.message);
                } else {
                    setCategories(data);
                }
            } catch (error) {
                toast.error('Erro ao buscar todas as categorias');
                console.debug(error);
            } finally {
                setIsLoading(false);
            }
        };
        getCategories();
    }, [])

    const onSubmit = async (data) => {
        console.log(data);

        try {
            // Validações
            if (data.descricao.length == 0) {
                toast.warning('Preencha uma descrição!');
                return;
            }

            // Empty father category
            if (data.id_categoria === 0){
                data.id_categoria = null;
            }

        } catch (error) {
            toast.error('Erro desconhecido. Contate o suporte!');
            console.debug(error);
        }
    }

    const handleDelete = async () => {
        toast.warning('Ainda não implementado!');
    }

    return (
        <article>
            {/* Título */}
            <div className='text-center'>
                <h1 className='fw-bold'>Categoria</h1>
                <p>Cadastre sua categoria de conta a pagar</p>
            </div>
            {/* Formulário */}
            <form action="#" className='card shadow-sm p-3' onSubmit={handleSubmit(onSubmit)}>
                {/* Botões */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    <NavLink to='/category/form' className={'btn btn-primary'} >Novo</NavLink>
                    <button type='submit' disabled={isWaitingResponse || isLoading} className='btn btn-success'>Salvar</button>
                    <NavLink to='/category/list' className={'btn btn-dark'} >Listar</NavLink>
                    <button type='button' disabled={isWaitingResponse || isLoading} className='btn btn-danger' onClick={handleDelete}>Deletar</button>
                </div>
                {/* Descrição */}
                <div className='mb-3'>
                    <label htmlFor='descricao' className='form-label'>Descrição</label>
                    <input type="text" id='descricao' className='form-control' placeholder='Digite a descrição' {...register('descricao')} />
                </div>
                {/* Categoria pai */}
                <div className='mb-3'>
                    <label htmlFor='id-categoria' className='form-label'>Categoria Pai</label>
                    <select id='id-categoria' className='form-select' defaultValue="0" {...register('id_categoria')} >
                        <option value="0">Seleciona uma categoria</option>
                        {categories.map((category, index) => <option key={`category-${index}`} value={category.id} >{category.descricao}</option>)}
                    </select>
                </div>
            </form>
            <ToastContainer position='bottom-right' />
        </article>
    )
};

export default CategoryForm;