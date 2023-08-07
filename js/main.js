const $titleBoxInput = document.querySelector('#title-text');
const $imageInput = document.querySelector('#image-text');
const $notesText = document.querySelector('#notes-text');
const $h2 = document.querySelector('h2');
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

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(formValues);
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $ul.prepend(renderEntry(formValues));
    toggleNoEntries();
  } else {
    formValues.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (formValues.entryId === data.entries[i].entryId) {
        data.entries[i] = formValues;
      }
    }

    $h2.textContent = 'New Entry';
    data.editing = null;
    renderAllEntries();
  }

  $form.reset();
  viewSwap('entries');
}

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  const $imageColumn = document.createElement('div');
  $imageColumn.setAttribute('class', 'column-half');
  $row.appendChild($imageColumn);

  const $imageSrc = document.createElement('img');
  $imageSrc.setAttribute('src', entry.photoUrl);
  $imageSrc.setAttribute('alt', entry.title);
  $imageColumn.appendChild($imageSrc);

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);

  const $columnPusheen = document.createElement('div');
  $columnPusheen.setAttribute('class', 'pusheen');
  $columnHalf.appendChild($columnPusheen);

  const $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $columnPusheen.appendChild($h2);

  const $iPencil = document.createElement('i');
  $iPencil.setAttribute('class', 'fa-solid fa-pencil');
  $columnPusheen.appendChild($iPencil);

  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $columnHalf.appendChild($p);

  return $li;
}

function clearAllEntries() {
  const elements = $ul.getElementsByTagName('li');

  while (elements.length > 0) {
    $ul.removeChild(elements[0]);
  }
}

function renderAllEntries() {
  clearAllEntries();

  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
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

function entryViewSwap() {
  viewSwap('entries');
}

function entryFormViewSwap() {
  $imageInput.setAttribute('value', '');
  $titleBoxInput.setAttribute('value', '');
  $image.setAttribute('src', '');
  $notesText.textContent = null;
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewSwap('entry-form');
}

$entriesAnchor.addEventListener('click', entryViewSwap);
$entryFormAnchor.addEventListener('click', entryFormViewSwap);
$ul.addEventListener('click', clickPencil);

function clickPencil(event) {
  if (event.target.getAttribute('class') === 'fa-solid fa-pencil') {
    const closeLi = event.target.closest('li');
    const liEntryId = closeLi.getAttribute('data-entry-id');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(liEntryId)) {
        data.editing = data.entries[i];

        $imageInput.setAttribute('value', data.editing.photoUrl);
        $titleBoxInput.setAttribute('value', data.editing.title);
        $image.setAttribute('src', data.editing.photoUrl);
        $notesText.textContent = data.editing.notes;
        viewSwap('entry-form');
      }
    }
  }
  $h2.textContent = 'Edit Entry';
}
