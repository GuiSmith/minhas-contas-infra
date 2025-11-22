import { NavLink } from 'react-router-dom';

const Register = () => {
    return (
        <article>
            {/* Título */}
            <div className="text-center">
                <h1 className='fw-bold'>Criar Conta</h1>
                <p>Preencha seus dados para continuar</p>
            </div>
            {/* Formulário */}
            <form action="#" className="card shadow-sm p-3">
                {/* E-mail */}
                <div className="mb-4">
                    <label htmlFor="email" className="form-label ms-2 fw-bold">E-mail</label>
                    <input type="email" className="form-control shadow-sm" id="email" name="email" placeholder="email@gmail.com.br" autoFocus required />
                </div>
                {/* Nome */}
                <div className="mb-4">
                    <label htmlFor="name" className="form-label ms-2 fw-bold">Nome</label>
                    <input type="text" className="form-control shadow-sm" id="name" name="name" placeholder = 'John Doe' required />
                </div>
                {/* Senha */}
                <div className="mb-4">
                    <label htmlFor="password" className="form-label ms-2 fw-bold">Senha</label>
                    <input type="password" className="form-control shadow-sm" id="password" name="password" placeholder='Digite sua senha...' required />
                </div>
                {/* Botão de Criar conta */}
                <div>
                    <button className="btn btn-dark w-100 shadow-sm" type='submit'>
                        Criar conta
                    </button>
                </div>
            </form>
            <p className="text-center mt-3">
                <span>Já tem uma conta? </span>
                <NavLink to='/login' className='fw-bold text-decoration-none'>
                    Faça login
                </NavLink>
            </p>
        </article>
    )
};

export default Register;
