import { createElement, createTextField } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)

  if(typeof fighter !== 'undefined'){

    const fighterInfo = createElement({
      tagName: 'div',
      className: 'fighter-main-preview'
    });
    const fighterImageWrapper = createElement({
      tagName: 'div',
      className: 'fighter-image-wrapper'
    });

    const fighterImage = createFighterImage({
      source: fighter.source,
      name: `Player ${fighter.name}`
    });

    fighterImageWrapper.append(fighterImage);
    fighterInfo.append(fighterImageWrapper);

    const fighterTextInfo = createElement({
      tagName: 'div',
      className: 'fighter-right-container'
    });
    const header = createTextField({
      tagName: 'p',
      className: 'fighter-text___name',
      text: `Name: ${fighter.name}`
    });
    const health = createTextField({
      tagName: 'p',
      className: 'fighter-container___elem',
      text: `Health: ${fighter.health}`
    });
    const attack = createTextField({
      tagName: 'p',
      className: 'fighter-container___elem',
      text: `Attack: ${fighter.attack}`});

    const defense = createTextField({
      tagName: 'p',
      className: 'fighter-container___elem',
      text: `Defense: ${fighter.defense}`});

    fighterTextInfo.append(header, health, attack, defense);
    fighterInfo.append(fighterTextInfo)
    fighterElement.append(fighterInfo)
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
