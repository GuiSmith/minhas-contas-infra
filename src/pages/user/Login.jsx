import { NavLink } from 'react-router-dom';

const Login = () => {
    return (
        <article>
            {/* Título */}
            <div className="text-center">
                <h1 className='fw-bold'>Entrar</h1>
                <p>Entre suas credenciais para continuar</p>
            </div>
            {/* Formulário */}
            <form action="#" className="card shadow-sm p-3">
                {/* E-mail */}
                <div className="mb-4">
                    <label htmlFor="email" className="form-label ms-2 fw-bold">E-mail</label>
                    <input type="email" className="form-control shadow-sm" id="email" name="email" placeholder="email@gmail.com.br" autoFocus required />
                </div>
                {/* Senha */}
                <div className="mb-4">
                    <label htmlFor="password" className="form-label ms-2 fw-bold">Senha</label>
                    <input type="password" className="form-control shadow-sm" id="password" name="password" placeholder='Digite sua senha...' required />
                </div>
                {/* Botão de Criar conta */}
                <div>
                    <button className="btn btn-dark w-100 shadow-sm" type='submit'>
                        Entrar
                    </button>
                </div>
            </form>
            <p className="text-center mt-3">
                <span>Não tem uma conta? </span>
                <NavLink to='/register' className='fw-bold text-decoration-none'>
                    Crie sua conta
                </NavLink>
            </p>
        </article>
    )
};

export default Login;
