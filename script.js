const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')


const markdownToHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}


const askAI = async (question, game, apiKey) => {
    const model = 'gemini-2.5-flash'
    const baseURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const askWarframe = `
       ## Especialidade
        Você é um especialista assistente de meta para o jogo ${game}
       ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas
       ## Regras
        - Se você não sabe a resposta, responda com "Não sei" e não tente inventar uma resposta.
        - Se a pergunta não está relacionada ao jogo, responda com "Essa pergunta não está relacionada ao jogo"
        - Considere a data atual ${new Date().toLocaleTimeString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
        - Nunca responda itens que você não tenha certeza de que existe no patch atual. 
        - Sempre informe o patch em que estamos falando.
       ## Respostas
        - Economize na resposta, seja direto e responda no máximo 1000 caracteres
        - Responda em markdown.
        - Nao precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.
       ## Exemplo de resposta
        Pergunta do usuário: Melhor Build Loki Percurso de aço
        resposta: **Patch 39.0 — Julho de 2025**
        **Build Loki Prime para Percurso de Aço (Steel Path):**
        **Mods com Helminth (Subsume: *Desarmar de Radial*):**  
        - *Primed Continuity*  
        - *Narrow Minded*  
        - *Constitution*  
        - *Stretch*  
        - *Overextended*  
        - *Enemy Radar*  
        - *Rolling Guard*  
        - *Desarmar de Radial (Helminth)*
        **Mods sem Helminth (usando invisibilidade padrão):**  
        - *Primed Continuity*  
        - *Narrow Minded*  
        - *Constitution*  
        - *Stretch*  
        - *Streamline*  
        - *Enemy Radar*  
        - *Rolling Guard*  
        - *Vitality* ou *Adaptation* (sobrevivência)
        **Dica:**  
        Foque em invisibilidade constante com alta duração. Use *Desarmar de Radial* para lidar com grupos. Evite confrontos diretos; jogue com mobilidade e controle.
        ___
        Aqui está a pergunta do usuário: ${question}
    `
    const askLol = `
    ## Especialidade
        Você é um especialista assistente de meta para o jogo ${game}
       ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas
       ## Regras
        - Se você não sabe a resposta, responda com "Não sei" e não tente inventar uma resposta.
        - Se a pergunta não está relacionada ao jogo, responda com "Essa pergunta não está relacionada ao jogo"
        - Considere a data atual ${new Date().toLocaleTimeString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
        - Nunca responda itens que você não tenha certeza de que existe no patch atual. 
        - Sempre informe o patch em que estamos falando.
       ## Respostas
        - Economize na resposta, seja direto e responda no máximo 1000 caracteres
        - Responda em markdown.
        - Nao precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.
        ## Exemplo de resposta  
        Pergunta do usuário: Melhor build da Ahri mid no patch atual  
        resposta: Patch 14.13. Melhor build para **Ahri mid**:\n\n  
        **Itens principais**: Luden's Companion, Shadowflame, Zhonya's.\n\n  
        **Runas**: Eletrocutar + Gosto de Sangue, Globos Oculares e Caça Suprema.\n\n
        **Rotação**: Foque em pressão lateral após o nível 6 e jogue em torno de pickoffs.\n\n  
        **Dica**: Use o R de forma ofensiva só com visão confirmada do inimigo.
         ___
        Aqui está a pergunta do usuário: ${question}
    `
    const askValorant = `
    ## Especialidade
        Você é um especialista assistente de meta para o jogo ${game}
       ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas
       ## Regras
        - Se você não sabe a resposta, responda com "Não sei" e não tente inventar uma resposta.
        - Se a pergunta não está relacionada ao jogo, responda com "Essa pergunta não está relacionada ao jogo"
        - Considere a data atual ${new Date().toLocaleTimeString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
        - Nunca responda itens que você não tenha certeza de que existe no patch atual. 
        - Sempre informe o patch em que estamos falando.
       ## Respostas
        - Economize na resposta, seja direto e responda no máximo 1000 caracteres
        - Responda em markdown.
        - Nao precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.
        ## Exemplo de resposta
        Pergunta do usuário: Melhor agente para defesa no mapa Ascent  
        resposta:  
        **Patch 8.11 — Julho de 2025**  
        Melhor agente para defesa em **Ascent** atualmente é **Killjoy**, devido à força de sua ultimate e controle de áreas com turret e alarm bot.  
        **Setup recomendado (site A):**  
        - Turret em cima da caixa perto da switch  
        - Alarm Bot em entrada principal  
        - Nanoswarms embaixo da entrada ou switch  
        Combina bem com um Sova ou Fade para info. Alta taxa de vitória no competitivo atual.
         ___
        Aqui está a pergunta do usuário: ${question}
    
    `

    const askStardew = ` 
        ## Especialidade
        Você é um especialista assistente de meta para o jogo ${game}
       ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas
       ## Regras
        - Se você não sabe a resposta, responda com "Não sei" e não tente inventar uma resposta.
        - Se a pergunta não está relacionada ao jogo, responda com "Essa pergunta não está relacionada ao jogo"
        - Considere a data atual ${new Date().toLocaleTimeString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
        - Nunca responda itens que você não tenha certeza de que existe no patch atual. 
        - Sempre informe o patch em que estamos falando.
       ## Respostas
        - Economize na resposta, seja direto e responda no máximo 1000 caracteres
        - Responda em markdown.
        - Nao precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.
        ## Exemplo de resposta
        Pergunta do usuário: Melhor layout para primavera no mapa Padrão (Standard Farm)  
        resposta:  
        **Versão 1.6.4 — Julho de 2025**  
        Melhor layout para primavera no mapa **Padrão** foca em:  
        - **Área superior direita**: plantação 9x12 com sprinklers qualidade ou irídio  
        - **Área central**: silo + 4 galinheiros/estábulos em linha, com caminhos de pedra  
        - **Área inferior**: estufa, armazém e máquinas (barris/prensas)  
        **Dica**: use aspersores com caminhos entre eles (ex: 3x3) e cerca ao redor para evitar que animais pisem nas plantações.  
          ___
        Aqui está a pergunta do usuário: ${question}
    `   
    let ask = ''

    if(game == 'warframe') {
        ask = askWarframe
    } 
    else if (game == 'lol'){
        ask = askLol
    }
    else if (game == 'valorant') {
        ask = askValorant
    }
    else if (game == "stardew") {
        ask = askStardew
    }
    const contents = [{
        role: "user",
        parts: [{
            text: ask
        }]
    }]

    const tools = [{
        google_search: {}
    }
    ]

    //chamada API
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
}

const sendForm = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value

    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos')
        return
    }
    askButton.disabled = true
    askButton.textContent = "Perguntando..."
    askButton.classList.add('loading')

    try {
        //Perguntar para a IA
        const text = await askAI(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
        aiResponse.classList.remove('hidden')
    } catch (error) {
        console.log('Erro: ', error)
    } finally {
        askButton.disabled = false;
        askButton.textContent = "Perguntar"
        askButton.classList.remove("loading")
    }
}
form.addEventListener('submit', sendForm)