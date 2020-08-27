const fieldEl = document.querySelector('.field');

const textBlock = document.querySelector('.game__text');
const sword = document.querySelector('.game__weapon');
const healthPlayer = document.querySelector('.game__health--player');
const healthTarget = document.querySelector('.game__health--target');
const notice = document.querySelector('.notice');
// характеристики
let maxHpPlayer = 180;
let maxHpTarget = 80;
let PlayerHP = 180;
let TargetHP = 80;

let playerDamageMax = 13;
let playerDamageMin = 10;
let swordDamageMax = 30;
let swordDamageMin = 25;
let mobDamageMax = 12;
let mobDamageMin = 8;

const wall = document.querySelectorAll('.wall');
const mob = document.querySelectorAll('.mob');
const background = document.querySelectorAll('.background');
const player = document.querySelectorAll('.player');
const weapon = document.querySelectorAll('.weapon');
const luke = document.querySelectorAll('.luke');
const potion = document.querySelectorAll('.potion');
const hpBuff = document.querySelectorAll('.hp-buff');
const damageBuff = document.querySelectorAll('.damage-buff');

function setColor(element, variable, elementColor) {
    for (i = 0; i < element.length; i++) {
        element[i].style.setProperty(variable, colors[arrColor.indexOf(elementColor)]);
    }
    ;
};

var arrSymbol = ['symbolWall', 'symbolMob', "symbolBg", 'symbolPlayer', 'symbolWeapon', 'symbolLuke', 'symbolPotion', 'symbolHpBuff', 'symbolDamageBuff'];
var arrColor = ['wallColor', 'mobColor', "bgColor", 'playerColor', 'weaponColor', 'lukeColor', 'potionColor', 'hpBuffColor', 'damageBuffColor'];

var m_width, m_height, matrixOfSymbols

let mapTitle = "demo1";
let mapDescription = "";

let mapID = window.location.pathname.split('/')[1].split("_")[1];
let count_level = 1;
let current_level = 1
let matrix = "";
let symbols = "#bagjarst";
let colors = ['#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a']

let cl_list_tokens = ['wall', 'mob', 'background', 'player', 'weapon', 'luke', 'potion', 'hp-buff', 'damage-buff'];

var xhr = new XMLHttpRequest();

function getData() {
    var url = "map_" + mapID + "/" + current_level + "/get";

    xhr.open('Post', url, true);

    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        // по окончании запроса доступны:
        // status, statusText
        // responseText, responseXML (при content-type: text/xml)

        if (this.status != 200) {
            // обработать ошибку
            alert('error: ' + (this.status ? this.statusText : 'request failed'));
            return;
        }
        obj = JSON.parse(this.responseText);
        matrix = obj.matrix.split(";");
        symbols = obj.symbols;
        m_height = obj.height;
        m_width = obj.width;
        count_level = parseInt(obj.count_level)
        colors = obj.colors;
        mapTitle = obj.mapTitle;
        mapDescription = obj.mapDescription;
    }

}

getData()
// при загрузке страницы отображаем сохраненный уровень
/*function createField(levelCount){
	if (localStorage.getItem(levelCount) !== null) {
		healthPlayer.style.width = maxHpPlayer + 'px';
		healthTarget.style.width = maxHpTarget + 'px';
		PlayerHP = 180;
		sword.textContent = 'none';
		fieldEl.innerHTML = '';
		fieldEl.insertAdjacentHTML('afterbegin', localStorage.getItem(levelCount));
		cells = document.querySelectorAll('.cell');
		cells.forEach(element => {
			element.classList.remove('cell');
			element.classList.add('cell-no-border');
		});
	} else {
		notice.classList.remove('hidden');
	};
};*/


function createField(columns, rows) {
    fieldEl.innerHTML = '';
    healthPlayer.style.width = maxHpPlayer + 'px';
    healthTarget.style.width = maxHpTarget + 'px';
    PlayerHP = 180;
    sword.textContent = 'none';
    for (let i = 0; i < rows; i++) {
        const rowEl = document.createElement('div');
        rowEl.classList.add('row');
        for (let j = 0; j < columns; j++) {
            const cellEl = document.createElement('div');
            cellEl.classList.add('cell');
            var index = matrix[i * m_width + j];
            cellEl.classList.add(cl_list_tokens[Number.parseInt(index)]);
            var symbol = matrixOfSymbols[i][j];
            cellEl.textContent = symbol;
            rowEl.appendChild(cellEl);
        }
        fieldEl.appendChild(rowEl);
    }

    setColor(wall, '--wall-color', 'wallColor');
    setColor(mob, '--mob-color', 'mobColor');
    setColor(background, '--bg-color', 'bgColor');
    setColor(player, '--player-color', 'playerColor');
    setColor(weapon, '--weapon-color', 'weaponColor');
    setColor(luke, '--luke-color', 'lukeColor');
    setColor(potion, '--potion-color', 'potionColor');
    setColor(hpBuff, '--hp-buff-color', 'hpBuffColor');
    setColor(damageBuff, '--damage-buff-color', 'damageBuffColor');
};


function createMatrixOfSymbols(width, height) {
    matrixOfSymbols = new Array();
    for (var i = 0; i < height; i++) {
        matrixOfSymbols[i] = new Array();
        for (var j = 0; j < width; j++) {
            matrixOfSymbols[i][j] = symbols[matrix[i * width + j]];
        }
    }
}

xhr.addEventListener('load', function () {
    createMatrixOfSymbols(m_width, m_height);
    createField(m_width, m_height);
    if (current_level == 1) {
        textBlock.insertAdjacentHTML('beforeend', `<p>Game title: ${mapTitle}</p>`)
        textBlock.insertAdjacentHTML('beforeend', `<p>Description: ${mapDescription}</p>`)
    }
})


// функция генерации рандомного целого числа
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

// перезагрузка страницы если игрок умер
function reload() {
    location.reload();
};

// функция перемещения

document.addEventListener('keydown', function move(event) {
    const playerBlock = document.querySelector('.player');

    if (playerBlock !== null) {

        const playerNextBlock = playerBlock.nextSibling;
        const playerPrevBlock = playerBlock.previousSibling;
        const rowEl = playerBlock.parentNode;
        const rowPrev = rowEl.previousSibling;
        const rowNext = rowEl.nextSibling;
        const playerSym = document.querySelector('.player').textContent;
        const bgSym = document.querySelector('.background').textContent;

        textBlock.scrollTop = textBlock.scrollHeight;

// условия взаимодействия с разными объектами
        function changeClass(element, nextElement) {
            playerBlock.textContent = bgSym;
            playerBlock.classList.remove('player');
            playerBlock.classList.add('background');
            nextElement.classList.add('player');
            nextElement.classList.remove(element);
            nextElement.textContent = playerSym;
        };

        function setNewPlayerHP(newHP) {
            PlayerHP = newHP;
            healthPlayer.style.width = PlayerHP + 'px';
        };

        function setNewTargetHP(newHP) {
            TargetHP = newHP;
            healthTarget.style.width = TargetHP + 'px';
        };

        function movePlayer(nextElement) {
            if (nextElement.classList.contains('background')) {
                changeClass('background', nextElement);
            }
            ;
            if (nextElement.classList.contains('potion')) {
                changeClass('potion', nextElement);
                setNewPlayerHP(maxHpPlayer);
                textBlock.insertAdjacentHTML('beforeend', `<p>Your health is restored</p><br>`);
            }
            ;
            if (nextElement.classList.contains('weapon')) {
                textBlock.insertAdjacentHTML('beforeend', `<p>Congratulations, you found the weapon! Now it is displayed in your inventory and you can stand up for yourself!</p><br>`);
                changeClass('weapon', nextElement);
                sword.textContent = 'sword';
            }
            ;
            if (nextElement.classList.contains('mob')) {
                const targetBar = document.querySelector('.game__health--targetbar');
                targetBar.classList.remove('hidden');
                if (sword.textContent === 'sword') {
                    console.log(PlayerHP);
                    if (PlayerHP < 5) {
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>Death has come for you<a href="" class="game__link reload" onclick="reload()">[Начать заново]</a></p>`);
                        playerBlock.textContent = bgSym;
                        playerBlock.classList.remove('player');
                        playerBlock.classList.add('background');
                    }
                    ;
                    if (TargetHP > 15) {
                        const innerDamage = getRandom(mobDamageMin, mobDamageMax);
                        setNewPlayerHP(PlayerHP - innerDamage < 0 ? 0 : PlayerHP - innerDamage);

                        const outerDamage = getRandom(swordDamageMin, swordDamageMax);
                        setNewTargetHP(TargetHP - outerDamage < 0 ? 0 : TargetHP - outerDamage);

                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Done ${outerDamage} damage</p>`);
                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Received ${innerDamage} damage</p>`);
                    } else {
                        changeClass('mob', nextElement);
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>The monster is slayed</p><br>`);
                        setNewTargetHP(maxHpTarget);
                        targetBar.classList.add('hidden');
                    }
                    ;
                } else {
                    if (PlayerHP < 5) {
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>Death has come for you<a href="" class="game__link reload" onclick="reload()">[Начать заново]</a></p>`);
                        playerBlock.textContent = bgSym;
                        playerBlock.classList.remove('player');
                        playerBlock.classList.add('background');
                    }
                    ;
                    if (TargetHP > 15) {
                        const innerDamage = getRandom(mobDamageMin, mobDamageMax);
                        setNewPlayerHP(PlayerHP - innerDamage < 0 ? 0 : PlayerHP - innerDamage);

                        const outerDamage = getRandom(playerDamageMin, playerDamageMax);
                        setNewTargetHP(TargetHP - outerDamage < 0 ? 0 : TargetHP - outerDamage);

                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Done ${outerDamage} damage</p>`);
                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Received ${innerDamage} damage</p>`);
                    } else {
                        changeClass('mob', nextElement);
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>The monster is slayed</p><br>`);
                        setNewTargetHP(maxHpTarget);
                        targetBar.classList.add('hidden');
                    }
                    ;
                }
                ;
            }
            ;
            if (nextElement.classList.contains('luke')) {
                const mobs = document.querySelectorAll('.mob')
                if (mobs.length > 0) {
                    textBlock.insertAdjacentHTML('beforeend', `<br><p>You can't go to the next level until you kill all the mobs</p><br>`);
                } else {
                    current_level = current_level + 1;
                    level = 'level' + '-' + current_level;
                    if (current_level <= count_level) {
                        getData();
                    } else {
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>This was the last level. Congratulations on your victory!</p>`);
                    }
                    ;
                }
                ;
            }
            ;
            if (nextElement.classList.contains('hp-buff')) {
                maxHpPlayer = maxHpPlayer + 5;
                PlayerHP = PlayerHP + 5;
                setNewPlayerHP(PlayerHP);
                changeClass('hp-buff', nextElement);
            }
            ;
            if (nextElement.classList.contains('damage-buff')) {
                playerDamageMax = playerDamageMax + 5;
                playerDamageMin = playerDamageMin + 5;
                swordDamageMax = swordDamageMax + 5;
                swordDamageMin = swordDamageMin + 5;
                changeClass('damage-buff', nextElement);
            }
            ;
        };

// реализация перемещения с помощью клавиатуры
        if (playerNextBlock !== null && event.key === 'ArrowRight') {
            movePlayer(playerNextBlock);
        }
        ;
        if (playerPrevBlock !== null && event.key === 'ArrowLeft') {
            movePlayer(playerPrevBlock);
        }
        ;
        if (event.key === 'ArrowUp') {
            for (i = 0; i < rowEl.childNodes.length; i++) {
                if (rowPrev !== null && rowEl.childNodes[i].classList.contains('player')) {
                    movePlayer(rowPrev.childNodes[i]);
                }
                ;
            }
            ;
        }
        ;
        if (event.key === 'ArrowDown') {
            for (i = 0; i < rowEl.childNodes.length; i++) {
                if (rowNext !== null && rowEl.childNodes[i].classList.contains('player')) {
                    movePlayer(rowNext.childNodes[i]);
                }
                ;
            }
            ;
        }
        ;
// реализация перемещения с помощью сенсора
        // const upBtn = document.querySelector('.up-btn');
        // const leftBtn = document.querySelector('.left-btn');
        // const rightBtn = document.querySelector('.right-btn');
        // const downBtn = document.querySelector('.down-btn');

        // rightBtn.addEventListener('click', function(){
        // 	if (playerNextBlock !== null) {
        // 		movePlayer(playerNextBlock);
        // 	};
        // });
        // leftBtn.addEventListener('click', function(){
        // 	if (playerPrevBlock !== null) {
        // 		movePlayer(playerPrevBlock);
        // 	};
        // });
        // upBtn.addEventListener('click', movePlayer(playerNextBlock));
        // upBtn.addEventListener('click', movePlayer(playerNextBlock));

    }
    ;
});