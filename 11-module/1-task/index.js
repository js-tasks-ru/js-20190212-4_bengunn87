(function () {

    class Tooltip {

        /**
         * Имя компонента
         * @property {string}
         */
        get name() {
            return 'tooltip';
        }

        /**
         * Обязательный отступ
         */
        get indent() {
            return 5;
        }

        constructor() {
            /**
             * Данное свойство содержит ссылку на
             * елемент содержащий подсказку
             * @type {HTMLDivElement}
             */
            this.el = document.createElement('div');
            this.el.style.position = 'absolute';

            this.el.classList.add(this.name);
            document.body.appendChild(this.el);

            this.elemListenerList = [];
        }

        /**
         * Метод подключает включает работу подсказок
         * на элементе
         *
         * @param {Element} root - элемент, внутри которого, нужно включить работу подсказок
         */
        attach(root) {
            this.elemListenerList.push(root);

            this._mouseoverРandler = event => {
                if (event.target.hasAttribute('data-tooltip')){
                    showTooltip(event.target, this.el, this.indent);
                }
            }

            this._mouseoutPandler = event=> {
                if (event.target.hasAttribute('data-tooltip')) {
                    this.el.classList.remove('tooltip_active');
                }
            };

            root.addEventListener('mouseover', this._mouseoverРandler);
            root.addEventListener('mouseout', this._mouseoutPandler);

        }
        /**
         * Удаляет все обработчики событий
         */
        detach() {
            while (this.elemListenerList.length != 0){
                const root = this.elemListenerList.pop();
                root.removeEventListener('mouseover', this._mouseoverРandler);
                root.removeEventListener('mouseout', this._mouseoutPandler);
            }
        }
    }

    function showTooltip(target, tooltipEl, indent){
        const coords = target.getBoundingClientRect()
        tooltipEl.innerText = target.dataset.tooltip;
        tooltipEl.classList.add('tooltip_active');

        if ((coords.bottom + indent+tooltipEl.offsetHeight) < document.documentElement.clientHeight)
        {
            tooltipEl.style.bottom = '';
            tooltipEl.style.top = coords.bottom + indent + 'px';
        } else {
            tooltipEl.style.top = '';
            tooltipEl.style.bottom = target.offsetHeight + indent + 'px';
        };

        tooltipEl.style.left = coords.left + 'px';
    }
    window.Tooltip = Tooltip;
})();