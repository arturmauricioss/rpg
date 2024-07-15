document.addEventListener('DOMContentLoaded', () => {

    const raceSelect = document.getElementById('race-select');
    const classSelect = document.getElementById('class-select');
    const characterNameInput = document.getElementById('character-name');
    const generateRandomNameBtn = document.getElementById('generate-random-name');
    const toStep2Btn = document.getElementById('to-step-2');
    const genderSelect = document.getElementById('gender-select');
    const originSelect = document.getElementById('origin-select');
    const alignmentSelect = document.getElementById('alignment-select');
    const createCharacterButton = document.getElementById('create-character');
    const attributeInputs = [
        { id: 'strength', input: document.getElementById('strength'), button: document.getElementById('roll-strength'), rollsSpan: document.getElementById('strength-rolls'), rolls: [] },
        { id: 'dexterity', input: document.getElementById('dexterity'), button: document.getElementById('roll-dexterity'), rollsSpan: document.getElementById('dexterity-rolls'), rolls: [] },
        { id: 'constitution', input: document.getElementById('constitution'), button: document.getElementById('roll-constitution'), rollsSpan: document.getElementById('constitution-rolls'), rolls: [] },
        { id: 'intelligence', input: document.getElementById('intelligence'), button: document.getElementById('roll-intelligence'), rollsSpan: document.getElementById('intelligence-rolls'), rolls: [] },
        { id: 'wisdom', input: document.getElementById('wisdom'), button: document.getElementById('roll-wisdom'), rollsSpan: document.getElementById('wisdom-rolls'), rolls: [] },
        { id: 'charisma', input: document.getElementById('charisma'), button: document.getElementById('roll-charisma'), rollsSpan: document.getElementById('charisma-rolls'), rolls: [] }
    ];

    const raceOptions = [
        { value: 'dragonborn', label: 'Dracônico' },
        { value: 'dwarf', label: 'Anão' },
        { value: 'elf', label: 'Elfo' },
        { value: 'gnome', label: 'Gnomo' },
        { value: 'halfelf', label: 'Meio-Elfo' },
        { value: 'halforc', label: 'Meio-Orc' },
        { value: 'halfling', label: 'Hobbit' },
        { value: 'human', label: 'Humano' },
        { value: 'tiefling', label: 'Nefilim' }
    ];

    const classOptions = [
        { value: 'barbarian', label: 'Bárbaro', title: 'For +3, Con +1' },
        { value: 'bard', label: 'Bardo', title: 'Car +3, Des+1' },
        { value: 'cleric', label: 'Clérigo', title: 'Int +3, Sab +1' },
        { value: 'druid', label: 'Druida', title: 'Sab +3, Con +1' },
        { value: 'fighter', label: 'Guerreiro', title: 'For +3, Des +1' },
        { value: 'monk', label: 'Monge', title: 'Sab +3, Con +1' },
        { value: 'paladin', label: 'Paladino', title: 'For +3, Car +1' },
        { value: 'ranger', label: 'Patrulheiro', title: 'Des +3, Sab +1' },
        { value: 'rogue', label: 'Ladino', title: 'Des +3, Int +1' },
        { value: 'sorcerer', label: 'Feiticeiro', title: 'Car +3, Con +1' },
        { value: 'warlock', label: 'Bruxo', title: 'Con +3, Car +1' },
        { value: 'wizard', label: 'Mago', title: 'Int +3, Con +1' }
    ];

    const raceModifiers = {
        dragonborn: { strength: 2, charisma: 1, constitution: 1 },
        dwarf: { constitution: 2, strength: 1, wisdom: 1 },
        elf: { dexterity: 2, wisdom: 1, intelligence: 1 },
        gnome: { intelligence: 2, constitution: 1, dexterity: 1 },
        halfelf: { charisma: 2, dexterity: 1, wisdom: 1 },
        halforc: { strength: 2, constitution: 2 },
        halfling: { dexterity: 2, charisma: 1, wisdom: 1 },
        human: { charisma: 1, wisdom: 1, intelligence: 1, strength: 1 },
        tiefling: { intelligence: 2, wisdom: 2 }
    };

    const classModifiers = {
        barbarian: { strength: 3, constitution: 1 },
        bard: { charisma: 3, dexterity: 1 },
        cleric: { wisdom: 1, intelligence: 3 },
        druid: { wisdom: 3, constitution: 1 },
        fighter: { strength: 3, dexterity: 1 },
        monk: { wisdom: 3, constitution: 1 },
        paladin: { strength: 3, charisma: 1 },
        ranger: { dexterity: 3, wisdom: 1 },
        rogue: { dexterity: 3, intelligence: 1 },
        sorcerer: { charisma: 3, constitution: 1 },
        warlock: { constitution: 3, charisma: 1 },
        wizard: { intelligence: 3, constitution: 1 }
        // adicione os modificadores para as outras classes conforme necessário
    };

    const genderModifiers = {
        masculino: { strength: 1 },
        feminino: { dexterity: 1 }
    };

    const originModifiers = {
        // Adicione as origens conforme necessário
        realeza: { charisma: 2 },
        nobreza: { charisma: 1, intelligence: 1 },
        mercantilista: { intelligence: 2 },
        plebeu: { wisdom: 2 },
        escoria: { constitution: 2 }
    };

    const alignmentTranslations = {
        "Lawful Good": "Leal e Bom (LB)",
        "Neutral Good": "Neutro e Bom (NB)",
        "Chaotic Good": "Caótico e Bom (CB)",
        "Lawful Neutral": "Leal e Neutro (LN)",
        "True Neutral": "Neutro Verdadeiro (NV)",
        "Chaotic Neutral": "Caótico e Neutro (CN)",
        "Lawful Evil": "Leal e Mau (LM)",
        "Neutral Evil": "Neutro e Mau (NM)",
        "Chaotic Evil": "Caótico e Mau (CM)"
    };

    function getRandomName() {
        const lordOfTheRingsNames = [
            'Frodo', 'Aragorn', 'Gandalf', 'Legolas', 'Gimli', 'Samwise Gamgi', 'Boromir', 'Merry', 'Pippin', 'Saruman', 'Sauron', 'Elrond', 'Galadriel', 'Bilbo Bolseiro', 'Thranduil', 'Gollum', 'Éomer', 'Éowyn', 'Faramir', 'Radagast', 'Athena', 'Icarus', 'Atlas', 'Afrodite', 'Natus Vincere', 'Morfeu', 'Arthur Pendragon', 'Uther', "D'Artagnan", 'Armstrong', 'Celina', 'Aya', 'Pandora', 'Isis', 'Argos', 'Luthien', 'Yavana', 'Elianor', 'Agatha', 'Mira', 'Noele', 'Kael'
        ];
        const randomIndex = Math.floor(Math.random() * lordOfTheRingsNames.length);
        return lordOfTheRingsNames[randomIndex];
    }

    function getRandomDiceRolls() {
        const rolls = [];
        for (let i = 0; i < 4; i++) {
            rolls.push(Math.floor(Math.random() * 6) + 1);
        }
        rolls.sort((a, b) => b - a);
        return rolls;
    }

    function rollAttribute(attributeIndex) {
        const rolls = getRandomDiceRolls();
        const total = rolls[0] + rolls[1] + rolls[2];
        attributeInputs[attributeIndex].input.value = total;
        attributeInputs[attributeIndex].rolls = rolls;

        attributeInputs[attributeIndex].rollsSpan.innerHTML = '';

        rolls.forEach((roll, index) => {
            const rollSpan = document.createElement('span');
            rollSpan.textContent = roll;
            rollSpan.classList.add('roll-number');
            if (index < 3) {
                rollSpan.classList.add('roll-green');
            } else {
                rollSpan.classList.add('roll-red');
            }
            attributeInputs[attributeIndex].rollsSpan.appendChild(rollSpan);
        });

        attributeInputs[attributeIndex].button.disabled = true;
        updateCreateButtonState(); // Atualiza o estado do botão após rolar o atributo
    }

    function validateStep2Fields() {
        const step2Inputs = [
            characterNameInput.value,
            raceSelect.value,
            classSelect.value,
            genderSelect.value,
            originSelect.value,
            alignmentSelect.value
        ];

        // Verificar se algum campo está vazio
        for (let i = 0; i < step2Inputs.length; i++) {
            if (step2Inputs[i] === '') {
                return false;
            }
        }

        // Verificar se todos os atributos estão preenchidos
        for (let i = 0; i < attributeInputs.length; i++) {
            if (attributeInputs[i].input.value === '') {
                return false;
            }
        }

        return true;
    }

    function applyModifiersToAttributes(attributes, race, characterClass, gender, origin) {
        const modifiedAttributes = { ...attributes };

        // Aplicar modificadores de raça
        if (raceModifiers[race]) {
            for (let attribute in raceModifiers[race]) {
                modifiedAttributes[attribute] += raceModifiers[race][attribute];
            }
        }

        // Aplicar modificadores de classe
        if (classModifiers[characterClass]) {
            for (let attribute in classModifiers[characterClass]) {
                modifiedAttributes[attribute] += classModifiers[characterClass][attribute];
            }
        }

        // Aplicar modificadores de gênero
        if (genderModifiers[gender]) {
            for (let attribute in genderModifiers[gender]) {
                modifiedAttributes[attribute] += genderModifiers[gender][attribute] || 0;
            }
        }

        // Aplicar modificadores de origem
        if (originModifiers[origin]) {
            for (let attribute in originModifiers[origin]) {
                modifiedAttributes[attribute] += originModifiers[origin][attribute];
            }
        }

        return modifiedAttributes;
    }
    const characterSheetContainer = document.getElementById('character-sheet-container');
    const characterSheet = document.getElementById('character-sheet');
    // const xpBar = characterSheet.querySelector('#xp-bar');

    
    // function updateHPBar() {
    //     const hpPercentage = (hpCurrent / hpMax) * 100;
    //     const currentHPBar = document.getElementById('current-hp');
    //     currentHPBar.style.width = hpPercentage + '%';
    
    //     // Altera a cor da barra de vida com base na porcentagem
    //     if (hpPercentage <= 25) {
    //         currentHPBar.style.backgroundColor = 'red';
    //     } else if (hpPercentage <= 50) {
    //         currentHPBar.style.backgroundColor = 'orange';
    //     } else {
    //         currentHPBar.style.backgroundColor = 'green';
    //     }
    // }
    
    function generateCharacter(event) {
        event.preventDefault();

        // Capturar os dados do passo 1
        const characterName = characterNameInput.value;
        const selectedRace = raceSelect.value;
        const selectedClass = classSelect.value;
        const selectedGender = genderSelect.value;
        const selectedOrigin = originSelect.value;
        const selectedAlignment = alignmentSelect.value;

        const selectedRaceData = raceOptions.find(race => race.value === selectedRace);
        const selectedRaceLabel = selectedRaceData?.label || selectedRace;
        const selectedRaceImagePath = `media/img/${selectedGender.toLowerCase()}/${selectedRace}-${selectedGender.toLowerCase()}.png`;
        

        // Capturar os atributos do passo 2
        const attributes = {
            strength: parseInt(attributeInputs[0].input.value),
            dexterity: parseInt(attributeInputs[1].input.value),
            constitution: parseInt(attributeInputs[2].input.value),
            intelligence: parseInt(attributeInputs[3].input.value),
            wisdom: parseInt(attributeInputs[4].input.value),
            charisma: parseInt(attributeInputs[5].input.value)
        };

   // Verificar se todos os atributos foram rolados
   const allAttributesFilled = attributeInputs.every(attr => attr.input.value !== '');

   if (!allAttributesFilled) {
       alert('Por favor, role todos os atributos antes de criar o personagem.');
       return;
   }

   // Aplicar modificadores de raça, classe, gênero e origem aos atributos
   const modifiedAttributes = applyModifiersToAttributes(attributes, selectedRace.toLowerCase(), selectedClass.toLowerCase(), selectedGender.toLowerCase(), selectedOrigin.toLowerCase());

   // Montar resumo dos dados do passo 1
   const characterSummaryStep1 = `
   <img style="width:100px;height:100px;" src="${selectedRaceImagePath}" alt="${selectedRaceLabel}" title="${selectedRaceLabel}" class="selected-race-image">
   Nome: ${characterName}
   Raça: ${raceOptions.find(race => race.value === selectedRace)?.label || selectedRace}
   Classe: ${classOptions.find(cls => cls.value === selectedClass)?.label || selectedClass}
   Gênero: ${selectedGender}
   Origem: ${selectedOrigin}
   Alinhamento: ${alignmentTranslations[selectedAlignment] || selectedAlignment}
   `;

    // Montar resumo dos atributos com modificadores
    const attributeSummary = `
    Força: ${modifiedAttributes.strength}
    Destreza: ${modifiedAttributes.dexterity}
    Constituição: ${modifiedAttributes.constitution}
    Inteligência: ${modifiedAttributes.intelligence}
    Sabedoria: ${modifiedAttributes.wisdom}
    Carisma: ${modifiedAttributes.charisma}
`;

    // Exibir no elemento character-sheet no step-3
    const characterSheet = document.getElementById('character-sheet');
    characterSheet.innerHTML = `
            <div style="display: flex; flex-wrap: wrap; margin: 20px; font-family: Arial, sans-serif;">
        <div style="flex: 1 1 80px; margin: auto 10px;">
          <img style="width:200px;height:200px;border-radius:5px" src="${selectedRaceImagePath}" alt="${selectedRaceLabel}" title="${selectedRaceLabel}" class="selected-race-image">
        </div>
        <div style="flex: 1 1 120px; margin: 10px; background: #f4f4f4; padding: 15px; border-radius: 5px;">
            <p style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px;">Dados do Personagem:</p>
            <p>Nome: ${characterName}</p>
            <p>Raça: ${selectedRaceLabel}</p>
            <p>Classe: ${classOptions.find(cls => cls.value === selectedClass)?.label || selectedClass}</p>
            <p>Gênero: ${selectedGender}</p>
            <p>Origem: ${selectedOrigin}</p>
            <p>Alinhamento: ${alignmentTranslations[selectedAlignment] || selectedAlignment}</p>
        </div>
        <div style="flex: 1 1 120px; margin: 10px; background: #f4f4f4; padding: 15px; border-radius: 5px;">
            <p style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px;">Atributos com Modificadores:</p>
            <p>Força: ${modifiedAttributes.strength}</p>
            <p>Destreza: ${modifiedAttributes.dexterity}</p>
            <p>Constituição: ${modifiedAttributes.constitution}</p>
            <p>Inteligência: ${modifiedAttributes.intelligence}</p>
            <p>Sabedoria: ${modifiedAttributes.wisdom}</p>
            <p>Carisma: ${modifiedAttributes.charisma}</p>
        </div>
    </div>
    `;
/* <div id="character-info">
            <p><strong>Nível:</strong> <span id="level">1</span></p>
            <p><strong>XP:</strong> <span id="xp">0</span></p>
            <p><strong>Gold:</strong> <span id="gold">0</span></p>
            <div id="xp-bar-container">
                <button id="add-xp-button" style="float:right; margin-top: -60px">Farmar</button>
                <div id="xp-bar"></div>
            </div>
        <p><strong>Pontos de Vida (HP):</strong> <span id="hp-max">100</span></p>
        <div id="hp-bar">
            <div id="current-hp" style="width: 100%;"></div>
        </div>
            <ul id="monster-info-list"></ul>
    
            </div> */
        // Esconder o step-2 e mostrar o step-3
        document.getElementById('step-2').style.display = 'none';
        document.getElementById('step-3').style.display = 'block';
    
// Lógica para manipular XP e nível
const addButton = document.getElementById('add-xp-button');
const levelElement = document.getElementById('level');
const xpElement = document.getElementById('xp');
const goldElement = document.getElementById('gold');
const xpBar = document.getElementById('xp-bar');
const characterInfo = document.getElementById('character-info');
let hpMax = 100; // Valor inicial de HP máximo

        let hpCurrent = 100; // Valor inicial de HP atual

        // // Função para atualizar a barra de vida com base nos valores atuais
        // function updateHPBar() {
        //     const hpPercentage = (hpCurrent / hpMax) * 100; // Calcula a porcentagem atual de HP

        //     document.getElementById('current-hp').style.width = hpPercentage + '%';
        // }

        // // Chamada inicial para exibir corretamente
        // updateHPBar();

        // Função para simular o aumento de nível
        function levelUp() {
            hpMax += 10; // Aumenta o HP máximo ao subir de nível
            hpCurrent = hpMax; // Atualiza o HP atual para igualar ao máximo

            // Atualiza o texto exibido do HP máximo (para demonstração)
            document.getElementById('hp-max').textContent = hpMax;

            // Atualiza a barra de vida com os novos valores
            updateHPBar();
        }

        // Função para simular o recebimento de dano
        function receiveDamage(damage) {
            hpCurrent -= damage; // Reduz o HP atual pelo dano recebido

            // Garante que o HP atual nunca seja menor que 0
            if (hpCurrent < 0) {
                hpCurrent = 0;
            }

            // Atualiza a barra de vida com os novos valores
            updateHPBar();
        }

let level = 1;
let xp = 0;
let gold = 0;
const initialAddedXP = 222; // Valor adicionado inicialmente ao XP do nível 1
const multiplier = 1.35; // Multiplicador para calcular o XP do próximo nível

const monstersByLevel = [
    [
        { tipo: 'Goblin', nivel: 1, xp: 50, goldMin: 10, goldMax: 20, danoMin: 5, danoMax: 10 },
        { tipo: 'Orc', nivel: 1, xp: 70, goldMin: 15, goldMax: 25, danoMin: 8, danoMax: 12 },
        { tipo: 'Esqueleto', nivel: 1, xp: 60, goldMin: 12, goldMax: 18, danoMin: 6, danoMax: 11 }
    ],
    [
        { tipo: 'Goblin Forte', nivel: 2, xp: 80, goldMin: 18, goldMax: 30, danoMin: 10, danoMax: 15 },
        { tipo: 'Orc Guerreiro', nivel: 2, xp: 100, goldMin: 22, goldMax: 35, danoMin: 12, danoMax: 18 },
        { tipo: 'Zumbi', nivel: 2, xp: 90, goldMin: 20, goldMax: 28, danoMin: 11, danoMax: 16 }
    ],
    [
        { tipo: 'Dragão Jovem', nivel: 3, xp: 150, goldMin: 40, goldMax: 60, danoMin: 15, danoMax: 20 },
        { tipo: 'Elemental de Terra', nivel: 3, xp: 180, goldMin: 45, goldMax: 65, danoMin: 18, danoMax: 25 },
        { tipo: 'Bruxa', nivel: 3, xp: 160, goldMin: 42, goldMax: 58, danoMin: 16, danoMax: 22 }
    ]
];
function encontrarMonstro(nivel) {
    // Selecionar aleatoriamente um monstro do nível especificado
    let monstrosDoNivel = monstersByLevel[nivel - 1]; // porque o índice do array começa em 0
  
    let indiceMonstro = Math.floor(Math.random() * monstrosDoNivel.length);
    let monstro = monstrosDoNivel[indiceMonstro];
  
    // Calcular o dano do monstro (entre danoMin e danoMax)
    let danoDoMonstro = calcularDano(monstro.danoMin, monstro.danoMax);
  
    // Subtrair o dano do monstro do HP atual do personagem
    personagem.hpAtual -= danoDoMonstro;
  
    // Verificar se o HP atual é menor ou igual a 0 (personagem morreu)
    if (personagem.hpAtual <= 0) {
      personagem.hpAtual = 0; // Garantir que o HP não seja negativo
      alert("Você morreu! Game Over.");
      // Aqui você pode implementar lógica para reiniciar o jogo ou redirecionar para a tela inicial
    }
  
    // Atualizar a barra de vida (HP) na interface gráfica
    atualizarBarraDeVida(personagem.hpAtual, personagem.hpMaximo);
  }
  
  // Função para calcular dano aleatório
  function calcularDano(minDano, maxDano) {
    return Math.floor(Math.random() * (maxDano - minDano + 1)) + minDano;
  }
  
  // Função para atualizar a barra de vida na interface
  function atualizarBarraDeVida(hpAtual, hpMaximo) {
    // Implementação da atualização da barra de vida aqui
  }
  
  // Exemplo de como seria o objeto personagem
  let personagem = {
    nome: 'Aventureiro',
    hpMaximo: 100,
    hpAtual: 100,
    nivel: 1, // exemplo de nível inicial do personagem
    xp: 0
  };
  
  // Exemplo de uso da função encontrarMonstro()
  encontrarMonstro(personagem.nivel);

function calculateXPForLevel(level) {
    if (level === 1) {
        return 0;
    } else {
        let previousXP = calculateXPForLevel(level - 1);
        return Math.ceil((previousXP + initialAddedXP) * multiplier);
    }
}
// Atualiza o texto exibido para Nível e XP
// function updateCharacterInfo() {
//     levelElement.textContent = level;
//     xpElement.textContent = xp;
//     goldElement.textContent = gold;
//     xpBar.style.width = calculateXPPercentage() + '%';
// }

// Criar um objeto de áudio para o som de level up
const levelUpSound = new Audio('media/audio/lvlup.mp3');

// Função para reproduzir o som de level up
function playLevelUpSound() {
    levelUpSound.currentTime = 0;
    levelUpSound.play();
}

// addButton.addEventListener('click', function() {
//     const currentMonsters = monstersByLevel[level - 1];
//     const randomIndex = Math.floor(Math.random() * currentMonsters.length);
//     const selectedMonster = currentMonsters[randomIndex];

//     // Adiciona XP ganho pelo monstro derrotado
//     xp += selectedMonster.xp;

//     // Calcula o ouro ganho aleatoriamente dentro do intervalo do monstro e adiciona ao total de ouro
//     gold += Math.floor(Math.random() * (selectedMonster.goldMax - selectedMonster.goldMin + 1)) + selectedMonster.goldMin;

//     // Atualiza as informações do monstro derrotado no DOM


//     // Verifica se o XP atual atingiu ou ultrapassou o necessário para o próximo nível
//     while (xp >= calculateXPForLevel(level)) {
//         level++;
//         playLevelUpSound();
//     }
//     const monsterInfoElement = document.createElement('li');
//     monsterInfoElement.innerHTML = `
//         <p><strong>Farmou:</strong></p>
//         <pre>
//             Monstro: ${selectedMonster.tipo}
//             XP ganho: ${selectedMonster.xp}
//             Ouro ganho: ${gold}
//         </pre>`;
    
//     document.getElementById('character-info').appendChild(monsterInfoElement);
//     // Atualiza as informações visuais do personagem (nível, XP, barra de XP)
//     updateCharacterInfo();
// });


// function calculateXPPercentage() {
//     const currentLevelXP = calculateXPForLevel(level - 1);
//     const nextLevelXP = calculateXPForLevel(level);
//     return ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
// }
// Inicializa a exibição inicial dos dados
// updateCharacterInfo();
    }

    // Função para atualizar o estado do botão "Criar Personagem"
    function updateCreateButtonState() {
        // Verifica se todos os atributos estão preenchidos
        const attributesFilled = attributeInputs.every(attr => attr.input.value !== '');

        // Verifica se todos os botões de rolagem estão desabilitados (atributos rolados)
        const allButtonsDisabled = attributeInputs.every(attr => attr.button.disabled);

        // Habilita o botão "Criar Personagem" se todos os atributos estão preenchidos e botões de rolagem estão desabilitados
        createCharacterButton.disabled = !(attributesFilled && allButtonsDisabled);
    }

    // Event listeners para validar os campos de atributos e de passo 2
    attributeInputs.forEach((attr, index) => {
        attr.input.addEventListener('input', updateCreateButtonState);
        attr.button.addEventListener('click', () => rollAttribute(index));
    });

    // Event listeners para validar os campos de passo 2
    const step2Inputs = [
        characterNameInput,
        raceSelect,
        classSelect,
        genderSelect,
        originSelect,
        alignmentSelect
    ];

    step2Inputs.forEach(input => {
        input.addEventListener('input', updateCreateButtonState);
    });

    // Event listener para o botão "Próximo para o Step 2"
    toStep2Btn.addEventListener('click', () => {
        const form = document.getElementById('character-form-step-1');
        const customAlert = document.getElementById('custom-alert');
    
        // Verificar se o campo de raça foi selecionado
        if (raceSelect.value === '') {
            customAlert.textContent = 'Preencha todas as opções e selecione uma raça antes de prosseguir!';
            customAlert.style.display = 'block';
            return;
        }
    
        if (form.checkValidity()) {
            customAlert.style.display = 'none'; // Esconder o alerta personalizado, se visível
            document.getElementById('step-1').style.display = 'none';
            document.getElementById('step-2').style.display = 'block';
        } else {
            form.reportValidity();
        }
    });
    

    // Event listener para o botão "Gerar Nome Aleatório"
    generateRandomNameBtn.addEventListener('click', () => {
        characterNameInput.value = getRandomName();
        updateCreateButtonState(); // Atualiza o estado do botão após gerar um nome aleatório
    });

    // Event listener para o botão "Criar Personagem"
    createCharacterButton.addEventListener('click', generateCharacter);

    // Preencher opções de raça no select
    raceOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        raceSelect.appendChild(optionElement);
    });

    // Preencher opções de classe no select
    
    classOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        optionElement.title = option.title; // Adiciona o título ao elemento option
        classSelect.appendChild(optionElement);
    });

    // Event listener para exibir o título ao passar o mouse sobre a opção
    classSelect.addEventListener('mouseover', (event) => {
        const selectedOption = event.target;
        if (selectedOption.tagName === 'OPTION') {
            // Mostra o título da opção
            const titleText = selectedOption.title;
            console.log(titleText); // Exemplo: exibe o título no console
        }
    });

    // Event listener para ocultar o título quando o mouse sai da opção
    classSelect.addEventListener('mouseleave', () => {
        // console.log('Mouse deixou a opção.'); 
    });

    // Inicialmente, desabilitar o botão "Criar Personagem"
    // updateCreateButtonState();
});

document.addEventListener('DOMContentLoaded', () => {
    const raceImages = document.querySelectorAll('.race-option');
    const hiddenRaceSelect = document.getElementById('race-select');

    // Adiciona evento de clique às imagens das raças
    raceImages.forEach(image => {
        image.addEventListener('click', () => {
            // Remove a classe 'selected' de todas as imagens
            raceImages.forEach(img => img.classList.remove('selected'));

            // Adiciona a classe 'selected' à imagem clicada
            image.classList.add('selected');

            // Obtém o valor da raça selecionada
            const selectedRace = image.getAttribute('data-value');

            // Atualiza o valor do campo oculto com a raça selecionada
            hiddenRaceSelect.value = selectedRace;

            // Verifica se uma raça foi selecionada visualmente para tornar o campo oculto obrigatório
            if (selectedRace) {
                hiddenRaceSelect.setAttribute('required', 'required');
            } else {
                hiddenRaceSelect.removeAttribute('required');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const genderSelect = document.getElementById('gender-select');
    const raceImages = document.querySelectorAll('.race-option');

    genderSelect.addEventListener('change', function () {
        const selectedGender = genderSelect.value;

        raceImages.forEach(image => {
            const race = image.dataset.value;

            // Constrói o caminho da imagem conforme o gênero selecionado
            let imagePath;
            if (selectedGender === 'Feminino') {
                imagePath = `media/img/feminino/${race}-feminino.png`;
            } else {
                imagePath = `media/img/masculino/${race}-masculino.png`;
            }

            // Altera o src da imagem conforme o gênero selecionado
            image.src = imagePath;
        });
    });
});


