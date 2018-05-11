function defer() {
  const result = { };
  result.promise = new Promise((resolve, reject) => Object.assign(result, { resolve, reject }));
  return result;
}

function delay(amount, resolution) {
  const { resolve, promise } = defer();
  const finish = resolve.bind(null, resolution);
  setTimeout(finish, amount || 2e3);
  return promise;
}

function el(type, classes, children) {
  const result = document.createElement(type);

  for (let i = 0, list = Array.isArray(classes) ? classes : (classes ? [classes] : []); i < list.length; i++) {
    const item = list[i];
    result.classList.add(item);
  }

  if (!children || !children.length) {
    return result;
  }

  for (let i = 0, c = children.length; i < c; i++) {
    const child = children[i];
    result.appendChild(child);
  }

  return result;
}

function div(classes, children) {
  return el('div', classes, children);
}

function start() {
  const canvas = div(['canvas', 'loading'], [
    div('taco', [
      div(['shadow']),
      div(['back']),
      div(['lettuce', 'one']),
      div(['fry', 'two']),
      div(['meat', 'one']),
      div(['meat', 'two']),
      div(['meat', 'three']),
      div(['meat', 'four']),
      div(['meat', 'five']),
      div(['meat', 'six']),
      div(['tomato', 'one'], [div()]),
      div(['tomato', 'two'], [div()]),
      div(['fry', 'one']),
      div(['fry', 'two']),
      div(['lettuce', 'two']),
      div('front', [
        div(['marks', 'one']),
        div(['marks', 'two']),
        div(['marks', 'three']),
        div(['marks', 'four']),
      ]),
    ]),
  ]);

  document.body.appendChild(canvas);
  fetch('https://randomuser.me/api').then(function(data) {
    return delay(1e3, data);
  }).then(function(data) {
    const sombrero = div('sombrero', [
      div('back'),
      div('front'),
      div('hello'),
    ]);

    canvas.classList.remove('loading');
    canvas.appendChild(sombrero);

    if (data.status !== 200) {
      throw new Error('invalid-status');
    }

    return data.json();
  }).then(function(data) {
    const [{ name }] = data.results;
    const namecard = div('namecard');
    namecard.innerHTML = `Hi ${name.first} ${name.last}!`;
    canvas.appendChild(namecard);
  }).catch(function({ message }) {
    console.error(message);
    const error = div('error');
    error.innerHTML = 'server trouble :(';
    canvas.appendChild(error);
  });
}

document.addEventListener('DOMContentLoaded', start);
