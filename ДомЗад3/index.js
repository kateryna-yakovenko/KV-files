const setHandlersForButtons = () => {
    document.querySelectorAll('.bl-minus').forEach(elem => {
        elem.onclick = () => {
            const label = elem.nextElementSibling;
            let value = 0;
            try {
                value = parseInt(label.innerText);
            } catch (e) {
                console.warn(e);
                return;
            }
    
            if (value === 1) {
                return;
            }
            
            label.innerText = --value;
            const badgeClass = elem.closest('.bl-row').dataset.badge;
            document.querySelector(`.${badgeClass} .bought__badge`).innerText = value;
        };
    });
    
    document.querySelectorAll('.bl-plus').forEach(elem => {
        const handler = () => {
            const label = elem.previousElementSibling;
            let value = 0;
            try {
                value = parseInt(label.innerText);
            } catch (e) {
                console.warn(e);
                return;
            }
            
            label.innerText = ++value;
            const badgeClass = elem.closest('.bl-row').dataset.badge;
            document.querySelector(`.${badgeClass} .bought__badge`).innerText = value;
        }
        elem.onclick = handler;
    });

    document.querySelectorAll('.bl-cancel').forEach(elem => {
        elem.onclick = () => {
            const rowToDelete = elem.closest('.bl-row');

            document.querySelector(`.${rowToDelete.dataset.badge}`).remove();

            rowToDelete.previousElementSibling.remove();
            rowToDelete.remove();

            
        };
    });

    document.querySelectorAll('.bl-buy').forEach(elem => {
        elem.addEventListener('click', () => {
            const row = elem.closest('.bl-row');
            const badgeClass = row.dataset.badge;

            document.getElementById('bl-bought').append(document.querySelector(`.${badgeClass}`));

            row.querySelector('.bl-product').classList.add('text-cross');
            row.querySelectorAll('.bl-minus, .bl-plus, .bl-cancel, .bl-buy').forEach(button => {button.style.display = 'none'});
            row.querySelector('.bl-no-buy').style.display = 'block';

            setHandlersForButtons();
        });
    });

    document.querySelectorAll('.bl-no-buy').forEach(elem => {
        elem.addEventListener('click', () => {
            const row = elem.closest('.bl-row');
            const badgeClass = row.dataset.badge;

            document.getElementById('badgeList').append(document.querySelector(`.${badgeClass}`));
            row.querySelector('.bl-product').classList.remove('text-cross');
            row.querySelectorAll('.bl-minus, .bl-plus, .bl-cancel, .bl-buy').forEach(button => {button.style.display = 'inline-block'});
            row.querySelector('.bl-no-buy').style.display = 'none';

            setHandlersForButtons();
        });
    });
};




document.getElementById('addBtn').addEventListener('click', function() {
    const goodName = document.getElementById('newGoodName').value;

    if (goodName == "") {
        return;
    }

    const newRow = document.createElement('div');
    newRow.className = 'bl-row';
    const badgeClass = (goodName.split(' '))[0]
    newRow.dataset.badge = badgeClass;
    newRow.innerHTML = `
        <div class="bl-product">
            ${goodName}
        </div>
        <div class="bl-count">
            <button class="bl-minus">-</button>
            <span class="bl-label">1</span>
            <button class="bl-plus">+</button>        
        </div>

        <div class="bl-buttons">
            <button class="bl-buy" data-tooltip="Bouhht">Купленo</button>
            <button class="bl-no-buy" data-tooltip="Bouhht">Не купленo</button>
            <button class="bl-cancel" data-tooltip="Delete">×</button>
        </div>
    `;

    document.getElementById('bl-list').innerHTML += '<hr>';
    document.getElementById('bl-list').append(newRow);

    document.querySelector('#badgeList').innerHTML += `
    <div class="${badgeClass} badgeList__badge">
        <p> ${goodName} </p> 
        <p id="one" class="bought__badge"> 1 </p>
    </div>
    `;

    setHandlersForButtons();
});

let tooltipElem;

document.onmouseover = function(event) {
    let target = event.target;

    if (tooltipElem) {return;}

    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml) {return};


    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltipHtml;
    document.body.append(tooltipElem);

    // спозиционируем его сверху от аннотируемого элемента (top-center)
    let coords = target.getBoundingClientRect();

    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0; // не заезжать за левый край окна

    let top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
    top = coords.top + target.offsetHeight + 5;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';

    let width = tooltipElem.style.width;

    const animation = tooltipElem.animate([
        // keyframes
        // { transform: 'scale(0, 0) translate(0, 10px)' },
        // { transform: 'scale(1, 1) translate(0, 0)' },
        { transform: 'scale(0, 0) translate(0, 200%)' },
        { transform: 'scale(1, 1) translate(0, 0)' },
      ], {
        // timing options
        duration: 1000,
        fill: 'both',
    });
};

document.onmouseout = function(e) {

    if (tooltipElem) {

        const animation = tooltipElem.animate([
            // keyframes
            { transform: 'scale(1, 1) translate(0, 0)' },
            { transform: 'scale(0, 0) translate(0, 200%)' }
            ], {
            // timing options
            duration: 1000,
            fill: 'both',
        });

        animation.onfinish = () => {
            if (tooltipElem) {
                tooltipElem.remove();
                tooltipElem = null;
            }
        }
    }
};


document.addEventListener("DOMContentLoaded", () => {
    setHandlersForButtons();
});