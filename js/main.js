const $titleBoxInput = document.querySelector('#title-text');
const $imageInput = document.querySelector('#image-text');
const $notesText = document.querySelector('#notes-text');
const $image = document.querySelector('img');
const $form = document.querySelector('form');

$imageInput.addEventListener('input', updateImage);

function updateImage(event) {
  const photoURL = $imageInput.value;
  $image.setAttribute('src', photoURL);
}

$form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  const formValues = {
    imageUrl: $imageInput.value,
    title: $titleBoxInput.value,
    notes: $notesText.value,
    entryId: data.nextEntryId,
  };

  data.nextEntryId++;
  data.entries.unshift(formValues);
  $form.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
}

function renderEntry(entry) {
  const $li = document.querySelector('li');

  const $row = document.querySelector('.row');
  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  const $imageColumn = document.createElement('div');
  $imageColumn.setAttribute('class', 'column-half');
  $row.appendChild($imageColumn);

  const $imageSrc = document.createElement('img');
  $imageSrc.setAttribute('src', entry.imageURL);
  $imageColumn.appendChild($imageSrc);

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $imageSrc.appendChild($columnHalf);

  const $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $columnHalf.append($h2);

  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $h2.appendChild($p);

  return $li;
}

renderEntry();
