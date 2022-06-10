import { createElement, createTextField } from '../../helpers/domHelper';
import { showModal } from './modal';

export function showWinnerModal(fighter) {

  const title = `${fighter.name} won this battle!`;
  const bodyElement = createElement({ tagName: 'div', className: 'modal-body' });


  const tryAgainText = createTextField({ tagName: 'button', className: 'modal-button', text: ' Try again'});
  tryAgainText.onclick =  () => {
    window.location = '/';
  };

  bodyElement.append(tryAgainText);

  showModal({
    title,
    bodyElement,
    onClose: () => {
    window.location = '/'
    } });
}
