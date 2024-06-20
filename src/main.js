import './style.css'
import './app.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Cadastro de Usuário</h1>
    <form id="register-form">
      <div>
        <input type="text" id="nome" placeholder="Nome completo" title="Insira seu nome completo"/>
        <span id="message-nome"></span>
      </div>
      <div>
        <input type="text" id="email" placeholder="E-mail" title="Insira seu melhor e-mail"/>
        <span id="message-email"></span>
      </div>
      <div>
        <input type="password" id="senha" placeholder="Senha" title="Insira a sua senha"/>
        <span id="message-senha"></span>
      </div>
      <div>
        <input type="password" id="confirmacaoSenha" placeholder="Confirmação de Senha" title="Confirme sua senha"/>
        <span id="message-confirmacaoSenha"></span>
      </div>
      <button id="submit-button" type="submit">CRIAR CONTA</button>
    </form>
    <div id="message"></div>
  </div>
`