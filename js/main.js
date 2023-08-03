const $titleBoxInput = document.querySelector('#title-text');
const $imageInput = document.querySelector('#image-text');
const $notesText = document.querySelector('#notes-text');
const $image = document.querySelector('img');
const $form = document.querySelector('form');
const $ul = document.querySelector('ul');
const $noEntries = document.querySelector('.no-entries');
const $entries = document.querySelector('.entries');
const $entryForm = document.querySelector('.entry-form');
const $entriesAnchor = document.querySelector('#entries-anchor');
const $entryFormAnchor = document.querySelector('#entry-form-anchor');

$imageInput.addEventListener('input', updateImage);

function updateImage(event) {
  const photoURL = event.target.value;
  $image.setAttribute('src', photoURL);
}

$form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  const formValues = {
    photoUrl: $imageInput.value,
    title: $titleBoxInput.value,
    notes: $notesText.value,
    entryId: data.nextEntryId,
  };

  data.nextEntryId++;
  data.entries.unshift(formValues);
  $form.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $ul.prepend(renderEntry(formValues));
  viewSwap('entries');
  toggleNoEntries();
}

function renderEntry(entry) {
  const $li = document.createElement('li');

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  const $imageColumn = document.createElement('div');
  $imageColumn.setAttribute('class', 'column-half');
  $row.appendChild($imageColumn);

  const $imageSrc = document.createElement('img');
  $imageSrc.setAttribute('src', entry.photoUrl);
  $imageColumn.appendChild($imageSrc);

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);

  const $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $columnHalf.appendChild($h2);

  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $columnHalf.appendChild($p);

  return $li;
}

function renderAllEntries(entry) {
  for (let i = 0; i < data.entries.length; i++) {
    const entry = renderEntry(data.entries[i]);
    $ul.appendChild(entry);
  }
  viewSwap(data.view);
  toggleNoEntries();
}

document.addEventListener('DOMContentLoaded', renderAllEntries);

function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntries.className = 'hidden';
  } else {
    $noEntries.className = 'no-entries';
  }
}

function viewSwap(viewName) {
  if (viewName === 'entry-form') {
    $entries.className = 'entries hidden';
    $entryForm.className = 'entry-form';
  } else {
    $entries.className = 'entries';
    $entryForm.className = 'entry-form hidden';
  }
  data.view = viewName;
}

$entriesAnchor.addEventListener('click', function () {
  viewSwap('entries');
});

$entryFormAnchor.addEventListener('click', function () {
  viewSwap('entry-form');
});
