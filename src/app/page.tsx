export default function Home(){
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ConectaEdu - Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">

    <!-- LADO ESQUERDO (LOGIN) -->
    <div class="login-box">
        <h1>ENTRAR</h1>
        <p class="subtitle">Educar para transformar o conhecimento em futuro.</p>

        <form id="loginForm">
            <div class="input-group">
                <input type="text" placeholder="Usuário" required>
            </div>

            <div class="input-group">
                <input type="password" placeholder="Senha" required>
            </div>

            <button class="btn-login" type="submit">Login</button>
        </form>

        <div class="divider">Outros</div>

        <button class="btn-social google">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" />
            Login com Google
        </button>

        <button class="btn-social facebook">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" />
            Login com Facebook
        </button>
    </div>

    <!-- LADO DIREITO (LOGO) -->
    <div class="logo-box">
        <img src="imagens/conectaedujpg.png" alt="Logo ConectaEdu">
    </div>

</div>

<script src="script.js"></script>

</body>
</html>
}
